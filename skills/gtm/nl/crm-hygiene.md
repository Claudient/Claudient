---
name: crm-hygiene
description: "CRM data hygiene: detect stale records, merge duplicates, fill missing fields, reassign ownership, run scheduled cleanup — HubSpot and Salesforce patterns"
---

> 🇳🇱 Nederlandse versie. [Engelse versie](../crm-hygiene.md).

# Skill: CRM-gegevenshygiëne

## Wanneer activeren
- Uw CRM bevat contacten die al maanden/jaren niet zijn aangeraakt
- Dubbele records vervuilen rapporten en outreach-lijsten
- Sleutelvelden (telefoon, bedrijf, functietitel) ontbreken bij veel records
- Voorbereiding van een campagne waarbij gegevenskwaliteit belangrijk is
- Uitvoering van een kwartaal- of jaarlijkse CRM-opschoning

## Wanneer NIET gebruiken
- Real-time gegevensvalidatie (bouw dit liever in uw invoerformulieren)
- AVG/gegevensverwijderingsverzoeken — apart behandelen met juridisch advies
- Migratie tussen CRM-platforms — gebruik een speciaal migratietool

## Instructies

### Verouderde contacten vinden

```typescript
// HubSpot API — contacten zonder activiteit in 90 dagen
const staleContacts = await hubspot.crm.contacts.searchApi.doSearch({
  filterGroups: [{
    filters: [
      {
        propertyName: 'hs_last_sales_activity_date',
        operator: 'LT',
        value: String(Date.now() - 90 * 86400000),
      },
      {
        propertyName: 'lifecyclestage',
        operator: 'EQ',
        value: 'lead',
      },
    ],
  }],
  properties: ['email', 'firstname', 'lastname', 'company', 'hs_last_sales_activity_date'],
  limit: 100,
})

// Beslissing per verouderd contact:
// < 180 dagen: herengagementsequentie
// 180–365 dagen: naar levenscyclusfase 'koud' verplaatsen
// > 365 dagen: archiveren of verwijderen (met AVG-controle)
```

### Duplicaten detecteren en samenvoegen

```typescript
// Waarschijnlijke duplicaten vinden op e-maildomein + naamgelijkenis
async function findDuplicates(contacts: Contact[]): Promise<DuplicatePair[]> {
  const pairs: DuplicatePair[] = []
  const emailMap = new Map<string, Contact[]>()

  // Groeperen op e-mail (exact)
  for (const c of contacts) {
    const key = c.email.toLowerCase()
    emailMap.set(key, [...(emailMap.get(key) ?? []), c])
  }

  // Exacte e-mailduplicaten markeren
  for (const [email, dupes] of emailMap) {
    if (dupes.length > 1) {
      pairs.push({ type: 'exact_email', contacts: dupes, email })
    }
  }

  // Ook controleren: zelfde naam + zelfde bedrijf (fuzzy)
  // ... naamgelijkenis logica ...

  return pairs
}

// HubSpot samenvoegen (record met meeste activiteit behouden)
async function mergeContacts(primaryId: string, secondaryId: string) {
  await hubspot.crm.contacts.mergeApi.merge({
    primaryObjectId: primaryId,
    objectIdToMerge: secondaryId,
  })
}
```

### Ontbrekende velden invullen via verrijking

```typescript
async function fillMissingFields(contactId: string, email: string) {
  const contact = await hubspot.crm.contacts.basicApi.getById(contactId, ['company', 'jobtitle', 'phone'])

  const missingFields = []
  if (!contact.properties.company) missingFields.push('company')
  if (!contact.properties.jobtitle) missingFields.push('jobtitle')

  if (missingFields.length === 0) return

  // Verrijken vanuit externe bron
  const enriched = await clearbit.enrichment.find({ email })

  const updates: Record<string, string> = {}
  if (!contact.properties.company && enriched?.company?.name) {
    updates.company = enriched.company.name
  }
  if (!contact.properties.jobtitle && enriched?.person?.employment?.title) {
    updates.jobtitle = enriched.person.employment.title
  }

  if (Object.keys(updates).length > 0) {
    await hubspot.crm.contacts.basicApi.update(contactId, { properties: updates })
  }
}
```

### Eigenaarshertoewijzing

```typescript
// Contacten van vertrokken teamleden hertoewijzen
async function reassignContacts(fromOwnerId: string, toOwnerId: string) {
  const orphanedContacts = await hubspot.crm.contacts.searchApi.doSearch({
    filterGroups: [{
      filters: [{ propertyName: 'hubspot_owner_id', operator: 'EQ', value: fromOwnerId }],
    }],
    properties: ['email', 'firstname', 'lastname'],
    limit: 100,
  })

  for (const contact of orphanedContacts.results) {
    await hubspot.crm.contacts.basicApi.update(contact.id, {
      properties: { hubspot_owner_id: toOwnerId },
    })
    await new Promise(r => setTimeout(r, 100)) // snelheidslimiet
  }

  console.log(`Reassigned ${orphanedContacts.results.length} contacts`)
}
```

### Geplande hygiënerun (cron-patroon)

```typescript
// Wekelijks uitvoeren — zondagnacht
// 1. Verouderde contacten vinden en markeren
// 2. Exacte e-mailduplicaten vinden
// 3. Top-3 meest voorkomende ontbrekende velden invullen
// 4. Samenvatting naar Slack sturen

async function weeklyHygieneRun() {
  const report = {
    staleContacts: 0,
    duplicatesFound: 0,
    fieldsFilled: 0,
    errors: [] as string[],
  }

  // Stap 1: Verouderde contacten
  const stale = await findStaleContacts(90)
  report.staleContacts = stale.length
  await tagContactsForReview(stale, 'needs-review-stale')

  // Stap 2: Duplicaten
  const allContacts = await getAllContacts()
  const dupes = await findDuplicates(allContacts)
  report.duplicatesFound = dupes.length
  await tagDuplicatesForReview(dupes)

  // Stap 3: Meest voorkomende ontbrekende velden verrijken
  const incomplete = await getContactsMissingFields(['company', 'jobtitle'])
  for (const c of incomplete.slice(0, 50)) { // max 50/run
    await fillMissingFields(c.id, c.properties.email)
    report.fieldsFilled++
  }

  // Naar Slack sturen
  await postSlackSummary(report)
}
```

### CRM-gezondheidsscore

```typescript
// Beoordeel uw CRM-gegevenskwaliteit van 0-100
function calculateCRMHealthScore(contacts: Contact[]): number {
  const scores = contacts.map(c => {
    let score = 0
    if (c.email) score += 20
    if (c.company) score += 15
    if (c.jobtitle) score += 15
    if (c.phone) score += 10
    if (c.lifecyclestage) score += 15
    if (c.hubspot_owner_id) score += 10
    if (c.hs_last_sales_activity_date) score += 15
    return score
  })

  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}
```

## Voorbeeld

**Gebruiker:** Voer een maandelijkse hygiënerun uit op ons HubSpot CRM — verouderde leads vinden, duplicaten markeren en elke eerste maandag een rapport naar Slack sturen.

**Verwachte output:**
- `scripts/crm-hygiene.ts` — vindt verouderde contacten (90 dagen), exacte e-mailduplicaten, verrijkt de 50 meest voorkomende ontbrekende bedrijfsvelden
- `scheduleHygieneRun()` — cron: `0 9 1 * 1` (eerste maandag 9:00)
- Slack-rapport: "🧹 CRM-hygiëne: 47 verouderde leads gemarkeerd, 12 duplicaten gevonden, 38 bedrijfsvelden ingevuld"

---

> **Werk met ons:** Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten en B2B-oplossingen met ontwikkelaarsgemeenschappen.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
