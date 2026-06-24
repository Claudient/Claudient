# Healthcare-Administrator-Arbeitsbereich — Projektstruktur

> Für einen Healthcare-Administrator, der klinische Abläufe, Terminplanung, Vorabgenehmigungen, Versicherungsprüfung, Compliance und Patientenkommunikation verwaltet — ohne PHI außerhalb des EHR-Systems zu speichern.

## Stack

- **Epic** oder **Athenahealth** — EHR/PM-System als zentrale Datenquelle; alle patientenspezifischen Daten werden ausschließlich hier gespeichert
- **Google Workspace** (Gmail, Docs, Drive, Calendar) — externe Kommunikation, Dokumentenverwaltung, Terminkoordination
- **Microsoft Teams** oder **Slack** — interne Mitarbeiterkommunikation, Abteilungskanäle, Schichtvertretungsanfragen
- **DocuSign** — Weiterleitung von Einwilligungsformularen, Unterzeichnung von Lieferantenverträgen, Nachverfolgung von Richtlinienzustimmungen
- **Zoom** — Koordination von Telegesundheitsbesuchen, Mitarbeiterschulungen, Lieferantenmeetings
- **QuickBooks** — Abrechnungsabstimmung, Buchung von Anspruchszahlungen, Verfolgung von Ablehnungen, Verwaltung von Lieferantenrechnungen
- **Claude Code** — Entwurf von Vorabgenehmigungen, Compliance-Checklisten, Erstellung von Patientenbriefen, Verfassen von SOPs, Onboarding-Dokumentation für Mitarbeiter

## Verzeichnisstruktur

```
healthcare-admin-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Arbeitsbereichsanweisungen — PHI-Regeln, Befehle, Konventionen
│   ├── settings.json                          # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── patient-intake.md                  # /patient-intake — Checkliste für Aufnahmepaket und Willkommensbrief-Vorlage erstellen
│       ├── prior-auth.md                      # /prior-auth — Vorabgenehmigungsanfrageschreiben auf Basis klinischer Kriterien entwerfen
│       ├── insurance-verify.md                # /insurance-verify — Versicherungsprüfungs-Checkliste und Nachfassskript
│       ├── compliance-check.md                # /compliance-check — HIPAA/CMS-Compliance-Checkliste für einen Prozess ausführen
│       ├── staff-schedule.md                  # /staff-schedule — Schichtvertretungsplan oder Bereitschaftsrotationsvorlage erstellen
│       ├── patient-letter.md                  # /patient-letter — Terminerinnerungen, Entlassungsanweisungen oder Überweisungsschreiben entwerfen
│       └── incident-report.md                 # /incident-report — Strukturierte Vorfallsberichtsvorlage mit Feldern zur Ursachenanalyse
├── patients/
│   ├── README.md                              # WICHTIG: PHI-Richtlinie — keine Patientennamen, Geburtsdaten, MRN oder Diagnosen hier speichern
│   ├── templates/
│   │   ├── welcome-letter-template.md         # Willkommensbrief für neue Patienten — nur [NAME]-Platzhalter, keine echten Patientendaten
│   │   ├── appointment-reminder-template.md   # Terminerinnerung — Datum/Uhrzeit/Ort-Felder; Zusammenführung aus Epic
│   │   ├── discharge-instructions-template.md # Entlassungsanweisungen nach dem Besuch — allgemein nach Erkrankungskategorie
│   │   ├── referral-letter-template.md        # Überweisungsschreiben an Fachärzte — Platzhalterstruktur für klinische Zusammenfassung
│   │   ├── no-show-follow-up-template.md      # Nachfassschreiben nach verpasstem Termin
│   │   ├── payment-plan-letter-template.md    # Angebotsschreiben für Ratenzahlungsplan bei finanzieller Härte
│   │   └── prior-auth-denial-appeal.md        # Widerspruchsvorlage bei Ablehnung von Vorabgenehmigungen durch Versicherungen
│   ├── intake/
│   │   ├── new-patient-checklist.md           # Admin-Checkliste: Versicherungskarte, Lichtbildausweis, Einwilligungsformulare, demografische Daten
│   │   ├── insurance-verification-sop.md      # Schritt-für-Schritt-Prozess zur Überprüfung der Versicherungsberechtigung
│   │   ├── intake-packet-contents.md          # Liste der Formulare im Neupatientenpaket — verweist auf DocuSign-Umschlag-IDs
│   │   └── intake-workflow-diagram.md         # Ablaufdiagramm der Aufnahmeschritte von der Anmeldung bis zur Einzimmerung
│   └── discharge/
│       ├── discharge-checklist.md             # Administrative Schritte bei der Entlassung: Nachbesuchszusammenfassung, Folgetermin, Überweisungen
│       ├── referral-tracking-log.md           # Protokoll ausstehender Überweisungen nach Versanddatum — kein PHI; nur Fallnummer
│       └── telehealth-discharge-sop.md        # Checkliste für den Abschluss von Zoom-Telegesundheitsbesuchen und technischer Support-Leitfaden
├── compliance/
│   ├── hipaa/
│   │   ├── hipaa-checklist-annual.md          # Jährliche HIPAA-Sicherheits- und Datenschutzprüfungs-Checkliste
│   │   ├── hipaa-checklist-new-hire.md        # Checkliste zur Überprüfung der HIPAA-Schulung für neue Mitarbeiter
│   │   ├── phi-access-log-template.md         # Vorlage zur Protokollierung von PHI-Zugriffsanfragen und -offenlegungen (im EHR ausfüllen)
│   │   ├── breach-notification-sop.md         # Schritt-für-Schritt-Verfahren zur Datenschutzverletzungsmeldung — HHS-Meldung, Patientenbenachrichtigung
│   │   ├── minimum-necessary-policy.md        # Richtliniendokument: Minimalnotwendigkeitsstandard für PHI-Nutzung und -Offenlegung
│   │   └── business-associate-agreement-log.md # Verzeichnis aktiver BAAs — Lieferantenname, Unterzeichnungsdatum, Verlängerungsdatum
│   ├── cms/
│   │   ├── cms-conditions-of-participation.md # CMS CoP-Checkliste für die Compliance in der ambulanten Versorgung
│   │   ├── meaningful-use-checklist.md        # MIPS/APM-Berichtsanforderungs-Tracker nach Quartal
│   │   └── quality-measure-tracker.md         # Monatliches Leistungsprotokoll für Qualitätskennzahlen (nur de-identifizierte Aggregate)
│   ├── audits/
│   │   ├── audit-log.md                       # Laufendes Protokoll interner und externer Prüfungen — Datum, Umfang, Befunde, Status
│   │   ├── corrective-action-plan-template.md # KAP-Vorlage für Prüfungsbefunde — Befund, Verantwortlicher, Fälligkeitsdatum, Nachweis
│   │   └── mock-survey-checklist.md           # Interne Vorbereitung auf Probeprüfungen — Fragen, erforderliche Unterlagen, Verantwortlicher
│   └── policies/
│       ├── policy-index.md                    # Hauptindex aktiver Richtlinien — Name, Inkrafttreten, Überprüfungsdatum, Verantwortlicher
│       ├── privacy-policy-summary.md          # Verständliche Zusammenfassung des Datenschutzhinweises
│       ├── security-incident-policy.md        # Richtlinie zur Reaktion auf Sicherheitsvorfälle und Eskalationspfad
│       └── telehealth-consent-policy.md       # Anforderungen an die informierte Einwilligung für Telegesundheit nach Bundesstaat
├── scheduling/
│   ├── shift-templates/
│   │   ├── weekday-shift-template.md          # Standard Mo-Fr-Schichtblöcke — MA, Empfang, Arzt, Abrechnung
│   │   ├── weekend-shift-template.md          # Vorlage für Wochenend-/Feiertagsvertretungsrotation
│   │   ├── on-call-rotation-template.md       # Bereitschaftsdienstplanvorlage — Rollen, Kontakthierarchie, Eskalation
│   │   └── coverage-request-template.md       # Formular für Schichtvertretungsanfragen — Grund, Datum, bevorzugter Tauschpartner
│   ├── sops/
│   │   ├── scheduling-sop.md                  # Terminplanungs-SOP — Buchungsregeln, Slot-Typen, Halterichtlinien
│   │   ├── cancellation-sop.md                # Handhabung von Stornierungen und Nichterscheinen — Warteliste, Umbuchung, Abrechnungsmarkierungen
│   │   ├── provider-template-sop.md           # Anleitung zum Erstellen und Ändern von Arztterminvorlagen in Epic/Athena
│   │   └── telehealth-scheduling-sop.md       # Terminplanung für Telegesundheitsbesuche — Zoom-Link-Erstellung, Patientenvorbereitung
│   └── coverage-log.md                        # Laufendes Protokoll offener Schichten, bestätigter Vertretungen und Eskalationen
├── billing/
│   ├── claim-templates/
│   │   ├── clean-claim-checklist.md           # Checkliste für saubere Ansprüche vor der Einreichung — Pflichtfelder nach Kostenträger
│   │   ├── secondary-claim-template.md        # Schritte zur Einreichung von Sekundäransprüchen bei Leistungskoordination
│   │   └── superbill-review-checklist.md      # Superbill-Prüfungs-Checkliste — Diagnose, Modifikator, Leistungsort
│   ├── denials/
│   │   ├── denial-appeal-sop.md               # Schritt-für-Schritt-Widerspruchsverfahren — Fristen, erforderliche Unterlagen nach Ablehnungscode
│   │   ├── denial-code-reference.md           # Häufige Ablehnungscodes (CO-4, CO-97, PR-96 usw.) mit Lösungsschritten
│   │   ├── appeal-letter-library/
│   │   │   ├── medical-necessity-appeal.md    # Widerspruchsvorlage für Ablehnungen wegen medizinischer Notwendigkeit
│   │   │   ├── timely-filing-appeal.md        # Widerspruchsvorlage für Ablehnungen wegen Einreichungsfrist mit Nachweis der rechtzeitigen Einreichung
│   │   │   ├── authorization-retro-appeal.md  # Vorlage für rückwirkende Genehmigungswidersprüche
│   │   │   └── duplicate-claim-appeal.md      # Widerspruch bei doppelten Ansprüchen mit Nachweis der eigenständigen Leistung
│   │   └── denial-tracker.md                  # Ablehnungsprotokoll — Kostenträger, Ablehnungscode, Datum, Status (kein PHI — nur Fallnummer)
│   ├── reconciliation/
│   │   ├── daily-reconciliation-sop.md        # Tagesabschluss-Abstimmung für Bar-, Scheck- und Kartenzahlungen mit QuickBooks-Schritten
│   │   ├── era-posting-sop.md                 # Workflow zur Buchung elektronischer Remittance Advice — ERA nach QuickBooks
│   │   ├── monthly-close-checklist.md         # Monatsabschluss-Checkliste Abrechnung — ausstehende Ansprüche, Abschreibungen, Berichte
│   │   └── payer-contract-rate-sheet.md       # Vertraglich vereinbarte Sätze nach Kostenträger und CPT-Codebereich (kein PHI-Referenzdokument)
│   └── payers/
│       ├── payer-contact-directory.md         # Versicherungskontakte — Anbieterverhältnisse, Anspruchsstatus, Genehmigungshotlines
│       └── payer-portal-login-sop.md          # Zugriffsschritte für Kostenträger-Portale — keine Zugangsdaten hier speichern; Passwort-Manager verwenden
├── staff/
│   ├── onboarding/
│   │   ├── new-hire-checklist.md              # Onboarding-Checkliste Tag 1–90 — IT-Zugang, Badge, Schulung, HIPAA-Unterschrift
│   │   ├── hipaa-training-checklist.md        # HIPAA-Schulungsabschluss-Tracker — Rolle, Abschlussdatum, Bestätigung
│   │   ├── epic-access-request-sop.md         # Schritt-für-Schritt-Anforderung und Bereitstellung von rollenbasiertem Epic-Zugang
│   │   ├── athenahealth-access-request-sop.md # Schritte zur Benutzereinrichtung und Rollenzuweisung in Athenahealth
│   │   └── welcome-email-template.md          # Willkommens-E-Mail-Vorlage für neue Mitarbeiter — Logistik zum ersten Arbeitstag
│   ├── training/
│   │   ├── training-calendar.md               # Geplante Mitarbeiterschulungen — Thema, Datum, Pflicht vs. freiwillig
│   │   ├── competency-checklist-ma.md         # Checkliste zur Kompetenzüberprüfung für medizinische Fachangestellte
│   │   ├── competency-checklist-front-desk.md # Kompetenz-Checkliste für Empfangsmitarbeiter — Terminplanung, Anmeldung, Zuzahlung
│   │   └── in-service-log.md                  # Protokoll abgeschlossener Inhouse-Schulungen und Teilnehmer
│   └── performance/
│       ├── performance-review-template.md     # Halbjährliche Mitarbeiterbeurteilungsvorlage
│       └── corrective-action-template.md      # Vorlage für Korrekturdokumentationen
├── vendors/
│   ├── vendor-contract-log.md                 # Aktive Lieferantenverträge — Anbieter, Leistung, Laufzeit, Verlängerungsdatum, BAA erforderlich?
│   ├── vendor-contact-directory.md            # Wichtige Lieferantenkontakte — Epic/Athena-Support, DocuSign, Zoom, QuickBooks
│   ├── docusign-sop.md                        # DocuSign-Umschlageinrichtung, Weiterleitung von Einwilligungsformularen, Abruf des Prüfpfads
│   └── zoom-telehealth-setup-sop.md           # Zoom for Healthcare-Konfiguration — HIPAA BAA, Warteraum, Aufzeichnungsrichtlinie
└── templates/
    ├── letters/
    │   ├── prior-auth-request-letter.md       # Vorabgenehmigungsanfrageschreiben — Platzhalterstruktur für klinische Begründung
    │   ├── prior-auth-appeal-letter.md        # Vorabgenehmigungswiderspruch — Versionen für Peer-to-Peer-Anfrage und schriftlichen Widerspruch
    │   ├── insurance-verification-script.md   # Telefonleitfaden für Anrufe zur Versicherungsberechtigungsprüfung
    │   ├── collections-letter-template.md     # Patientensaldo-Inkassoschreiben — erste und zweite Mahnung
    │   └── provider-credentialing-letter.md   # Anschreibenvorlage für Arztzulassungseinreichungen bei Kostenträgern
    ├── forms/
    │   ├── consent-form-checklist.md          # Erforderliche Einwilligungsformulare nach Besuchstyp — Links zu DocuSign-Vorlagen
    │   └── release-of-information-log.md      # ROI-Anfragenprotokoll — Datum, Anfragetyp, Status (kein PHI — nur Fallnummer)
    └── sops/
        ├── sop-template.md                    # Master-SOP-Vorlage — Zweck, Umfang, Schritte, Verantwortlicher, Überprüfungsdatum
        └── sop-index.md                       # Index aller aktiven SOPs — Name, Verantwortlicher, letzte Überprüfung, Speicherort
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/prior-auth.md` | Slash-Befehl, der auf Basis klinischer Kriterien ein Vorabgenehmigungsanfrageschreiben erstellt — nimmt Kostenträgername, Eingriff und klinische Begründung als Eingabe entgegen; enthält niemals echte Patientenkennungen |
| `.claude/commands/compliance-check.md` | Slash-Befehl, der eine HIPAA- oder CMS-Compliance-Checkliste gegen einen beschriebenen Prozess ausführt — gibt bestanden/nicht bestanden je Punkt und empfohlene Korrekturmaßnahmen zurück |
| `.claude/commands/incident-report.md` | Slash-Befehl, der eine strukturierte Vorfallsberichtsvorlage mit Feldern zur Ursachenanalyse, Zeitabschnitt und Gerüst für Korrekturmaßnahmen erstellt |
| `compliance/hipaa/breach-notification-sop.md` | Schritt-für-Schritt-Verfahren zur Reaktion auf Datenschutzverletzungen, das die HHS OCR-Meldefrist (60-Tage-Regel), Anforderungen an die Patientenbenachrichtigung und aufzubewahrende Dokumentation abdeckt |
| `billing/denials/denial-appeal-sop.md` | Maßgeblicher Widerspruchsprozess mit kostenträgerspezifischen Fristen, erforderlicher Dokumentation nach Ablehnungscodekategorie und Eskalationspfad zur Peer-to-Peer-Prüfung |
| `billing/denials/appeal-letter-library/` | Einsatzbereite Widerspruchsschreibenvorlagen für die vier häufigsten Ablehnungskategorien — reduziert die Entwurfszeit von 30 Minuten auf unter 5 Minuten pro Widerspruch |
| `patients/README.md` | PHI-Richtlinien-Durchsetzungshinweis — die wichtigste Datei; legt fest, dass keine patientenspezifischen Daten (Name, Geburtsdatum, MRN, Diagnose) jemals in diesem Arbeitsbereich gespeichert werden |
| `compliance/policies/policy-index.md` | Hauptindex aller aktiven Richtlinien mit Inkrafttretensdaten und Überprüfungsdaten — wird bei Prüfungen und Probeprüfungen verwendet, um die Aktualität der Richtlinien zu bestätigen |
| `scheduling/sops/scheduling-sop.md` | Maßgebliche Terminplanungs-SOP, die Buchungsregeln, Vorlagenslot-Typen, Halte- und Stornierungsrichtlinien sowie Eskalation bei dringenden Zusatzterminen am selben Tag abdeckt |
| `staff/onboarding/new-hire-checklist.md` | Onboarding-Checkliste für Tag 1–90, die IT-Zugangsbereitstellung, HIPAA-Schulungsunterschrift, Epic/Athena-Zugang, Badge und 30/60/90-Tage-Check-ins abdeckt |

## Schnellgerüst

```bash
# Arbeitsbereichswurzel erstellen
mkdir -p healthcare-admin-workspace

# .claude-Struktur erstellen
mkdir -p healthcare-admin-workspace/.claude/commands

# Patientenvorlagenverzeichnisse erstellen (KEIN PHI — nur Vorlagen)
mkdir -p healthcare-admin-workspace/patients/templates
mkdir -p healthcare-admin-workspace/patients/intake
mkdir -p healthcare-admin-workspace/patients/discharge

# Compliance-Verzeichnisse erstellen
mkdir -p healthcare-admin-workspace/compliance/hipaa
mkdir -p healthcare-admin-workspace/compliance/cms
mkdir -p healthcare-admin-workspace/compliance/audits
mkdir -p healthcare-admin-workspace/compliance/policies

# Terminplanungsverzeichnisse erstellen
mkdir -p healthcare-admin-workspace/scheduling/shift-templates
mkdir -p healthcare-admin-workspace/scheduling/sops

# Abrechnungsverzeichnisse erstellen
mkdir -p healthcare-admin-workspace/billing/claim-templates
mkdir -p healthcare-admin-workspace/billing/denials/appeal-letter-library
mkdir -p healthcare-admin-workspace/billing/reconciliation
mkdir -p healthcare-admin-workspace/billing/payers

# Mitarbeiterverzeichnisse erstellen
mkdir -p healthcare-admin-workspace/staff/onboarding
mkdir -p healthcare-admin-workspace/staff/training
mkdir -p healthcare-admin-workspace/staff/performance

# Lieferanten- und Vorlagenverzeichnisse erstellen
mkdir -p healthcare-admin-workspace/vendors
mkdir -p healthcare-admin-workspace/templates/letters
mkdir -p healthcare-admin-workspace/templates/forms
mkdir -p healthcare-admin-workspace/templates/sops

# PHI-Richtlinien-README anlegen
cat > healthcare-admin-workspace/patients/README.md << 'EOF'
# CRITICAL: PHI POLICY

This directory contains TEMPLATE FILES ONLY.

DO NOT store any of the following in this workspace:
- Patient names
- Dates of birth (DOB)
- Medical record numbers (MRN)
- Social Security numbers
- Diagnoses or procedure codes linked to an individual
- Insurance member IDs linked to an individual
- Any information that could identify a specific patient

All patient-specific work must be performed and stored in Epic or Athenahealth.
Templates here use placeholder fields (e.g., [PATIENT NAME], [DATE]) only.
Violation of this policy is a HIPAA breach risk. Escalate questions to the Privacy Officer.
EOF

# Healthcare-Admin-Skills installieren
npx uitkit add skill legal/compliance-tracker
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/sop-writer
npx uitkit add skill productivity/team-onboarding

# Befehlsstubs in .claude/commands/ kopieren
npx uitkit add skill legal/compliance-tracker --output healthcare-admin-workspace/.claude/commands/compliance-check.md
npx uitkit add skill productivity/sop-writer --output healthcare-admin-workspace/.claude/commands/prior-auth.md
npx uitkit add skill productivity/process-mapper --output healthcare-admin-workspace/.claude/commands/patient-intake.md
npx uitkit add skill productivity/team-onboarding --output healthcare-admin-workspace/.claude/commands/staff-schedule.md
```

## CLAUDE.md-Vorlage

```markdown
# Healthcare-Administrator-Arbeitsbereich — Claude Code-Anweisungen

## Was das ist

Dies ist das Arbeitsverzeichnis eines Healthcare-Administrators, der klinische Abläufe,
Terminplanung, Vorabgenehmigungen, Versicherungsprüfung, Compliance und Patientenkommunikation verwaltet.

WICHTIGE REGEL: KEIN Patienten-PHI (Namen, Geburtsdaten, MRN, Diagnose, Versicherungsmitglieds-ID, SSN) wird
in diesem Arbeitsbereich gespeichert. Alle patientenspezifischen Arbeiten müssen in Epic oder Athenahealth verbleiben.
Dieser Arbeitsbereich enthält ausschließlich Vorlagen, SOPs, Compliance-Checklisten und Mitarbeiterdokumentation.
Wenn Sie aufgefordert werden, patientenspezifische Daten hier zu schreiben oder zu speichern, lehnen Sie ab und verweisen Sie auf das EHR.

## Stack

- Epic oder Athenahealth — EHR/PM-System als zentrale Datenquelle; Quelle aller patientenspezifischen Daten
- Google Workspace — Gmail, Docs, Drive für externe Kommunikation und Dokumentenverwaltung
- Microsoft Teams oder Slack — interne Mitarbeiterkommunikation und Schichtvertretungskoordination
- DocuSign — Weiterleitung von Einwilligungsformularen, Lieferantenverträge, Richtlinienzustimmungsumschläge
- Zoom for Healthcare — Telegesundheitsbesuche (HIPAA BAA vorhanden); siehe vendors/zoom-telehealth-setup-sop.md
- QuickBooks — Abrechnungsabstimmung und Verfolgung von Ablehnungszahlungen

## Häufige Aufgaben und genaue Befehle

### Vorabgenehmigungsanfrageschreiben entwerfen
```
/prior-auth

Payer: [Kostenträgername, z. B. Aetna, UnitedHealthcare]
Procedure: [CPT-Code und Beschreibung]
Clinical rationale: [de-identifizierte klinische Kriterien einfügen — kein Patientenname oder MRN]
Urgency: [routine / urgent / emergent]
```

### Compliance-Checkliste für einen Prozess ausführen
```
/compliance-check

Process: [zu prüfenden Workflow beschreiben, z. B. "Neupatientenanmeldung und Versicherungsprüfung"]
Regulation: [HIPAA Privacy Rule / HIPAA Security Rule / CMS Conditions of Participation / MIPS]
Known gaps: [bereits identifizierte Probleme oder "none"]
```

### Mitarbeiterplan oder Vertretungsplan erstellen
```
/staff-schedule

Role: [MA / front desk / billing / provider]
Dates: [Datumsbereich oder Woche von]
Constraints: [abwesende Mitarbeiter, Zertifizierungsanforderungen, erforderliche Überschneidungen]
Template: [weekday / weekend / on-call]
```

### Patientenkorrespondenzschreiben entwerfen (nur Vorlage — kein PHI)
```
/patient-letter

Letter type: [appointment reminder / discharge instructions / referral / no-show follow-up / payment plan]
Condition category: [z. B. post-surgical, chronic condition management, preventive care — nur allgemein]
Special instructions: [nicht-PHI-Kontext zu Ton, erforderlichen Offenlegungen oder Lesebarkeitsniveau]
```

### Widerspruchsschreiben bei Ablehnung einer Vorabgenehmigung entwerfen
```
/prior-auth

Mode: appeal
Payer: [Kostenträgername]
Denial code: [Code und Beschreibung, z. B. "CO-197: precertification absent"]
Procedure: [CPT-Code und Beschreibung]
Appeal type: [written appeal / peer-to-peer request]
Clinical basis: [de-identifizierte klinische Begründung — keine Patientenkennungen]
```

### Versicherungsprüfungs-Skript erstellen
```
/insurance-verify

Payer: [Kostenträgername]
Visit type: [new patient / established patient / specialist / telehealth]
Key fields to verify: [eligibility, deductible, copay, coinsurance, authorization required Y/N, referral required Y/N]
```

### Vorfallsbericht erstellen
```
/incident-report

Incident type: [privacy incident / safety event / billing error / equipment failure / staff complaint]
Date of incident: [Datum]
Location: [Abteilung oder Bereich — keine Patientennamen]
Description: [was geschah — de-identifiziert]
Immediate actions taken: [Liste]
```

### Patienten-Aufnahme-Checkliste erstellen
```
/patient-intake

Visit type: [new patient / annual wellness / specialist consult / telehealth]
Payer type: [commercial / Medicare / Medicaid / self-pay]
Special requirements: [z. B. minderjähriger Patient, Dolmetscher erforderlich, Behinderungsunterkunft]
```

## Einzuhaltende Konventionen

- PHI-REGEL: Niemals Patientennamen, Geburtsdaten, MRNs, Diagnosen oder Versicherungs-IDs in eine Datei dieses Arbeitsbereichs schreiben
- Alle Schreiben und Formulare verwenden Platzhalter in eckigen Klammern ([PATIENT NAME], [DATE], [PROVIDER NAME]) — echte Daten werden aus Epic/Athena zusammengeführt
- SOP-Dateien folgen der Vorlage unter templates/sops/sop-template.md — jede SOP hat Zweck, Umfang, Schritte, Verantwortlichen und Überprüfungsdatum
- Widerspruchsschreiben bei Ablehnungen befinden sich in billing/denials/appeal-letter-library/ — neue Vorlagen hinzufügen, sobald neue Ablehnungsmuster auftreten
- Compliance-Checklisten in compliance/ werden nach einem rollierenden Zeitplan überprüft, der in compliance/policies/policy-index.md dokumentiert ist
- Neue Lieferantenverträge werden innerhalb von 48 Stunden nach Unterzeichnung in vendors/vendor-contract-log.md eingetragen, einschließlich BAA-Status
- Mitarbeiter-Onboarding-Aufgaben werden in staff/onboarding/new-hire-checklist.md verfolgt — erst als abgeschlossen markieren, wenn die Bestätigung unterzeichnet ist
- Schichtvertretungsbestätigungen werden in scheduling/coverage-log.md mit Datum und bestätigendem Mitarbeiter protokolliert
- Alle Widerspruchsschreiben enthalten die Anspruchs- oder Fallnummer — niemals die Identitätsinformationen des Patienten — damit der Kostenträger den Anspruch finden kann
```

## MCP-Server

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@google/mcp-server-google-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@slack/mcp-server"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-slack-bot-token",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/your-username/healthcare-admin-workspace"
      ]
    }
  }
}
```

## Empfohlene Hooks

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if echo \"$FILE\" | grep -qE \"patients/\"; then python3 -c \"import sys,re; content=open(sys.argv[1]).read() if __import__(\\\"os\\\").path.exists(sys.argv[1]) else \\\"\\\"; phi_patterns=[r\\\"\\\\b\\\\d{4}-\\\\d{2}-\\\\d{2}\\\\b\\\",r\\\"\\\\bMRN[:\\\\s]\\\\s*\\\\d+\\\",r\\\"\\\\bDOB[:\\\\s]\\\",r\\\"\\\\bSSN[:\\\\s]\\\\s*\\\\d\\\"]; found=[p for p in phi_patterns if re.search(p,content)]; sys.exit(1) if found else sys.exit(0)\" \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || echo \"[PHI GUARD] Potential PHI pattern detected in patients/ file — review before saving. All patient data must stay in the EHR.\"; fi'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if echo \"$FILE\" | grep -q \"compliance/\"; then echo \"[compliance] File updated: $FILE — check compliance/policies/policy-index.md if this is a new or revised policy\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'DOW=$(date +%u); if [ \"$DOW\" = \"5\" ]; then echo \"[reminder] Friday checklist: confirm this week denial appeals logged in billing/denials/denial-tracker.md, open shift coverage confirmed in scheduling/coverage-log.md, and any new vendor contracts entered in vendors/vendor-contract-log.md\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
# Kern-Healthcare-Admin-Skills
npx uitkit add skill legal/compliance-tracker
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/sop-writer
npx uitkit add skill productivity/team-onboarding

# Ergänzende Produktivitäts-Skills
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/exec-briefing
```

## Verwandte Ressourcen

- [Healthcare-Administrator-Leitfaden](../guides/for-healthcare-admin.md)
- [Workflow für Vorabgenehmigungen](../workflows/prior-auth-workflow.md)
- [HIPAA-Compliance-Workflow](../workflows/hipaa-compliance-audit.md)
