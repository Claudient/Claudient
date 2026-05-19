---
name: crm-hygiene
description: "CRM data hygiene: detect stale records, merge duplicates, fill missing fields, reassign ownership, run scheduled cleanup — HubSpot and Salesforce patterns"
---

> 🇪🇸 Versión en español. [Versión en inglés](../crm-hygiene.md).

# Habilidad de Higiene de CRM

## Cuándo activar
- Su CRM tiene contactos que no se han tocado en meses/años
- Los registros duplicados están contaminando informes y listas de prospección
- Los campos clave (teléfono, empresa, cargo) faltan en muchos registros
- Preparación para una campaña donde la calidad de los datos es importante
- Ejecución de una limpieza trimestral o anual del CRM

## Cuándo NO usar
- Validación de datos en tiempo real (incorpórela a sus formularios de entrada)
- Solicitudes de eliminación de datos RGPD — gestionar por separado con asesoría legal
- Migración entre plataformas CRM — usar una herramienta de migración dedicada

## Instrucciones

### Encontrar contactos obsoletos

```typescript
// API de HubSpot — contactos sin actividad en 90 días
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

// Decisión por contacto obsoleto:
// < 180 días: secuencia de reenganche
// 180–365 días: mover a etapa de ciclo de vida 'frío'
// > 365 días: archivar o eliminar (con verificación RGPD)
```

### Detectar y fusionar duplicados

```typescript
// Encontrar probables duplicados por dominio de email + similitud de nombre
async function findDuplicates(contacts: Contact[]): Promise<DuplicatePair[]> {
  const pairs: DuplicatePair[] = []
  const emailMap = new Map<string, Contact[]>()

  // Agrupar por email (exacto)
  for (const c of contacts) {
    const key = c.email.toLowerCase()
    emailMap.set(key, [...(emailMap.get(key) ?? []), c])
  }

  // Marcar duplicados exactos de email
  for (const [email, dupes] of emailMap) {
    if (dupes.length > 1) {
      pairs.push({ type: 'exact_email', contacts: dupes, email })
    }
  }

  // También verificar: mismo nombre + misma empresa (fuzzy)
  // ... lógica de similitud de nombres ...

  return pairs
}

// Fusión en HubSpot (conservar el registro con más actividad)
async function mergeContacts(primaryId: string, secondaryId: string) {
  await hubspot.crm.contacts.mergeApi.merge({
    primaryObjectId: primaryId,
    objectIdToMerge: secondaryId,
  })
}
```

### Rellenar campos faltantes mediante enriquecimiento

```typescript
async function fillMissingFields(contactId: string, email: string) {
  const contact = await hubspot.crm.contacts.basicApi.getById(contactId, ['company', 'jobtitle', 'phone'])

  const missingFields = []
  if (!contact.properties.company) missingFields.push('company')
  if (!contact.properties.jobtitle) missingFields.push('jobtitle')

  if (missingFields.length === 0) return

  // Enriquecer desde fuente externa
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

### Reasignación de propiedad

```typescript
// Reasignar contactos de miembros del equipo que se han ido
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
    await new Promise(r => setTimeout(r, 100)) // límite de velocidad
  }

  console.log(`Reassigned ${orphanedContacts.results.length} contacts`)
}
```

### Ejecución programada de higiene (patrón cron)

```typescript
// Ejecutar semanalmente — domingo por la noche
// 1. Encontrar y marcar contactos obsoletos
// 2. Encontrar duplicados exactos de email
// 3. Rellenar los 3 campos faltantes más comunes
// 4. Publicar resumen en Slack

async function weeklyHygieneRun() {
  const report = {
    staleContacts: 0,
    duplicatesFound: 0,
    fieldsFilled: 0,
    errors: [] as string[],
  }

  // Paso 1: Contactos obsoletos
  const stale = await findStaleContacts(90)
  report.staleContacts = stale.length
  await tagContactsForReview(stale, 'needs-review-stale')

  // Paso 2: Duplicados
  const allContacts = await getAllContacts()
  const dupes = await findDuplicates(allContacts)
  report.duplicatesFound = dupes.length
  await tagDuplicatesForReview(dupes)

  // Paso 3: Enriquecer los campos faltantes más comunes
  const incomplete = await getContactsMissingFields(['company', 'jobtitle'])
  for (const c of incomplete.slice(0, 50)) { // límite de 50/ejecución
    await fillMissingFields(c.id, c.properties.email)
    report.fieldsFilled++
  }

  // Publicar en Slack
  await postSlackSummary(report)
}
```

### Puntuación de salud del CRM

```typescript
// Puntúe la calidad de los datos de su CRM de 0-100
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

## Ejemplo

**Usuario:** Ejecute un pase mensual de higiene en nuestro CRM HubSpot — encontrar leads obsoletos, marcar duplicados y publicar un informe en Slack cada primer lunes.

**Resultado esperado:**
- `scripts/crm-hygiene.ts` — encuentra contactos obsoletos (90 días), duplicados exactos de email, enriquece los 50 primeros campos de empresa faltantes
- `scheduleHygieneRun()` — cron: `0 9 1 * 1` (primer lunes a las 9 am)
- Informe de Slack: "🧹 Higiene CRM: 47 leads obsoletos marcados, 12 duplicados detectados, 38 campos de empresa completados"

---

> **Trabaje con nosotros:** Claudient está respaldado por [Uitbreiden](https://uitbreiden.com/) — construimos productos de IA y soluciones B2B con comunidades de desarrolladores.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
