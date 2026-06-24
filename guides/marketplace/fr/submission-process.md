# Processus de soumission à la marketplace

Instructions étape par étape pour soumettre votre stack à la Marketplace Claude Code via GitHub.

---

## Aperçu

Le processus de soumission dure 1 à 2 semaines de la pull request à la publication. Vous utiliserez Git et GitHub pour proposer votre stack, les systèmes automatisés le valideront et l'équipe d'examen évaluera la qualité. Si des révisions sont nécessaires, vous itérerez et re-soumettrez.

**Chronologie :**
1. Forker et préparer (30 min)
2. Soumettre PR (5 min)
3. Vérifications automatisées (5 min)
4. Examen initial (1–3 jours)
5. Révisions (si nécessaire) (3–5 jours)
6. Fusionner et publier (1 jour)

---

## Étape 1 : Fork le repository

1. Accédez à https://github.com/tushar2704/UitKit
2. Cliquez sur **Fork** dans le coin supérieur droit
3. Choisissez votre compte GitHub comme destination du fork
4. Cliquez sur **Create fork**

Vous avez maintenant votre propre copie du repository.

---

## Étape 2 : Clonez votre fork en local

```bash
# Clonez votre fork
git clone https://github.com/VOTRE_NOM_UTILISATEUR/UitKit.git
cd UitKit

# Ajoutez le remote upstream pour la synchronisation
git remote add upstream https://github.com/tushar2704/UitKit.git
```

Remplacez `VOTRE_NOM_UTILISATEUR` par votre identifiant GitHub.

---

## Étape 3 : Créez le répertoire de votre Stack

Créez un répertoire pour votre stack dans le dossier `stacks/` :

```bash
# Assurez-vous que vous êtes sur la branche main et synchronisé
git checkout main
git pull upstream main

# Créez le répertoire stack
mkdir -p stacks/votre-nom-stack

# Initialisez les sous-répertoires (au besoin)
mkdir -p stacks/votre-nom-stack/{skills,agents,guides,hooks,mcp,examples}

cd stacks/votre-nom-stack
```

**Convention de nommage :**
- Nom du dossier : `kebab-case-stack` (tout en minuscules, tirets, se termine par `-stack`)
- Exemples : `backend-productivity-stack`, `data-pipeline-stack`, `security-hardening-stack`

---

## Étape 4 : Construisez votre Stack

Remplissez le répertoire de votre stack avec du contenu complet et testé :

```
votre-nom-stack/
├── CLAUDE.md                          # Obligatoire : manifeste du stack
├── README.md                          # Obligatoire : aperçu et démarrage rapide
├── LICENSE                            # Obligatoire : CC0-1.0 ou licence open-source
├── submission.json                    # Obligatoire : métadonnées de soumission
├── skills/
│   ├── skill-one.md
│   ├── skill-two.md
│   └── ...
├── agents/
│   ├── agent-one.md
│   └── ...
├── guides/
│   ├── guide-one.md
│   └── ...
├── hooks/
│   ├── hook-one.sh
│   └── hook-one.md
├── workflows/
│   └── workflow-one.md
├── mcp/
│   ├── service-one.json
│   └── service-one.md
└── examples/
    ├── example-one/
    │   ├── README.md
    │   └── [fichiers du projet]
    └── ...
```

**Fichiers obligatoires :**
- `CLAUDE.md` — Manifeste du stack respectant les normes uitkit
- `README.md` — Aperçu, démarrage rapide, 100–200 lignes
- `LICENSE` — CC0-1.0, MIT, Apache 2.0, ou GPL 3.0
- `submission.json` — Métadonnées de soumission

**Recommandé mais optionnel :**
- `skills/` — 5+ compétences ou plus
- `agents/` — 2+ agents
- `guides/` — 1–2 guides
- `hooks/` — Automatisations déclenchées par événement
- `mcp/` — Intégrations de serveur MCP
- `examples/` — Exemples de projets fonctionnels

Voir **getting-started.md** pour des directives détaillées sur chaque type de ressource.

---

## Étape 5 : Créez submission.json

À la racine de votre stack, créez `submission.json` :

```json
{
  "name": "Nom de votre stack",
  "slug": "votre-nom-stack",
  "description": "Une description concise d'une phrase de ce que ce stack fait.",
  "longDescription": "Un aperçu détaillé de 2-3 phrases. Quel problème résout-il ? Qui l'utilise ?",
  "version": "1.0.0",
  "author": {
    "name": "Votre nom complet",
    "github": "votre-nom-utilisateur-github",
    "email": "vous@exemple.com"
  },
  "license": "CC0-1.0",
  "repository": "https://github.com/VOTRE_NOM_UTILISATEUR/UitKit/tree/main/stacks/votre-nom-stack",
  "keywords": [
    "mot-clé1",
    "mot-clé2",
    "mot-clé3"
  ],
  "minVersion": "1.8.0",
  "contents": {
    "skills": 5,
    "agents": 2,
    "guides": 2,
    "hooks": 1,
    "workflows": 0,
    "mcp": 2
  },
  "targetAudience": "Description spécifique de l'audience. Qui bénéficie le plus de ce stack ?",
  "useCases": [
    "Cas d'usage 1 : Brève description",
    "Cas d'usage 2 : Brève description"
  ],
  "testingNotes": "Ce stack a été testé avec Claude Code v1.8.0+ sur macOS et Linux. Toutes les compétences ont été validées dans [décrire l'environnement].",
  "externalReviewers": [
    {
      "name": "Nom du testeur",
      "role": "Rôle ou entreprise",
      "feedback": "Résumé de leurs commentaires ou une citation"
    },
    {
      "name": "Un autre testeur",
      "role": "Rôle ou entreprise",
      "feedback": "Leurs commentaires"
    }
  ],
  "relatedStacks": [
    "backend-productivity-stack",
    "another-related-stack"
  ],
  "changelog": {
    "1.0.0": "Version initiale"
  }
}
```

**Explications des champs :**

| Champ | Obligatoire | Notes |
|-------|-------------|-------|
| `name` | Oui | Nom lisible du stack |
| `slug` | Oui | Identifiant sûr pour l'URL (doit correspondre au nom du dossier) |
| `description` | Oui | Une phrase |
| `longDescription` | Oui | 2–3 phrases |
| `version` | Oui | Format Semver (1.0.0) |
| `author` | Oui | Votre nom, identifiant GitHub, email |
| `license` | Oui | CC0-1.0, MIT, Apache 2.0, ou GPL 3.0 |
| `repository` | Oui | Lien vers votre stack dans le repository |
| `keywords` | Non | 3–5 tags consultables |
| `minVersion` | Oui | Version Claude Code minimale requise |
| `contents` | Oui | Nombre de ressources dans chaque catégorie |
| `targetAudience` | Oui | À qui s'adresse-t-il ? Soyez spécifique. |
| `useCases` | Oui | 2–3 exemples de comment il est utilisé |
| `testingNotes` | Oui | Où et comment vous avez testé |
| `externalReviewers` | Oui | 2+ testeurs externes et leurs commentaires |
| `relatedStacks` | Non | Stacks similaires dans la marketplace |
| `changelog` | Oui | Historique des versions |

---

## Étape 6 : Créez README.md

À la racine de votre stack, créez `README.md` :

```markdown
# Nom de votre stack

Une description sur une ligne.

## Aperçu

Que fait ce stack ? Pourquoi quelqu'un l'utiliserait-il ? (2–3 phrases)

## Ce qui est inclus

- **5 compétences** : Brève description de ce qu'elles font
- **2 agents** : Dans quels domaines ils se spécialisent
- **2 guides** : Sujets couverts
- **1 crochet** : Quelle automatisation est fournie
- **2 intégrations MCP** : Services externes intégrés

## Démarrage rapide

```bash
# Instructions d'installation (le cas échéant)

# Exemple : utiliser votre première compétence
# Copiez-collez ici
```

## Audience cible

Description spécifique. Qui bénéficie le plus ?

## Obtenir de l'aide

- Vérifiez les guides pour les tutoriels étape par étape
- Consultez les exemples pour les projets fonctionnels
- Signalez les problèmes sur GitHub : [lien]
```

---

## Étape 7 : Créez LICENSE

À la racine de votre stack, créez un fichier `LICENSE`. Option recommandée :

**CC0-1.0 (domaine public) :**
```
Creative Commons Legal Code

CC0 1.0 Universal

Ce travail est marqué avec CC0 1.0 Universal. Pour voir une copie de cette licence,
visitez http://creativecommons.org/publicdomain/zero/1.0/

Voir le fichier LICENSE pour le texte complet.
```

Ou utilisez une licence open-source existante :
- **MIT**: https://opensource.org/licenses/MIT
- **Apache 2.0**: https://opensource.org/licenses/Apache-2.0
- **GPL 3.0**: https://www.gnu.org/licenses/gpl-3.0.html

---

## Étape 8 : Committez et poussez

```bash
# Indexez tous les fichiers
git add stacks/votre-nom-stack/

# Committez avec un message clair
git commit -m "feat: add votre-nom-stack"

# Poussez vers votre fork
git push origin main
```

---

## Étape 9 : Ouvrez une Pull Request

1. Accédez à votre fork : https://github.com/VOTRE_NOM_UTILISATEUR/UitKit
2. Cliquez sur l'onglet **Pull requests**
3. Cliquez sur **New pull request**
4. Définissez :
   - Repository de base : `tushar2704/UitKit`
   - Branche de base : `main`
   - Repository de tête : `VOTRE_NOM_UTILISATEUR/UitKit`
   - Branche de tête : `main`
5. Cliquez sur **Create pull request**

---

## Étape 10 : Complétez la description de la PR

Utilisez ce modèle :

```markdown
## Soumission de Stack

**Nom du stack :** Nom de votre stack
**Slug :** votre-nom-stack
**Contenu :** 5 compétences, 2 agents, 2 guides, 1 crochet, 2 MCP

### Aperçu

Une brève description de ce que ce stack fait et du problème qu'il résout.

### Audience cible

Description spécifique de l'audience (par ex., « Ingénieurs backend optimisant les performances des services »).

### Liste de vérification de qualité

- [x] Tous les fichiers respectent les normes uitkit
- [x] Chaque compétence a des exemples concrets et testés
- [x] Chaque agent a un objectif clair et une portée d'outils étroite
- [x] Tous les guides sont complets et testés
- [x] Aucun contenu placeholder ou stub
- [x] submission.json est complet et précis
- [x] Testé par 2+ utilisateurs externes
- [x] Grammaire et ton professionnels
- [x] README.md et LICENSE présents

### Résumé des tests

**Tests personnels :**
- [x] Utilisé toutes les compétences dans un vrai travail
- [x] Délégué à tous les agents
- [x] Suivi tous les guides de bout en bout
- [x] Déclenché tous les crochets

**Tests externes :**
- [x] Testé par Alice Chen (ingénieur backend chez TechCorp)
  - Commentaires : « Nous a fait gagner du temps avec le workflow de débogage Docker »
- [x] Testé par Bob Martinez (DevOps chez StartupXYZ)
  - Commentaires : « Excellent ensemble complet d'outils »

### Liens

- [Voir submission.json](./stacks/votre-nom-stack/submission.json)
- [Voir CLAUDE.md](./stacks/votre-nom-stack/CLAUDE.md)
```

---

## Étape 11 : Vérifications automatisées

Quand vous créez la PR, GitHub Actions exécute automatiquement :

1. **Validation de syntaxe** : Vérifiez que les fichiers JSON sont valides, la structure des répertoires est correcte
2. **Structure de fichier** : Vérifiez que les fichiers obligatoires (CLAUDE.md, submission.json, LICENSE) existent
3. **Linting Markdown** : Vérifiez les problèmes de formatage

Si les vérifications échouent :
1. Consultez les messages d'erreur
2. Corrigez les problèmes en local
3. Committez et poussez les corrections
4. La PR se met à jour automatiquement

---

## Étape 12 : Examen humain

Les responsables examinent votre soumission (1–3 jours). Ils vérifient :

1. **Normes de qualité** : Les ressources respectent-elles les normes publiées ?
2. **Complétude** : Toutes les sections sont-elles remplies avec du contenu réel ?
3. **Test** : Y a-t-il une preuve de test externe ?
4. **Portée** : Le stack est-il ciblé et cohérent ?
5. **Documentation** : Les instructions sont-elles claires et les exemples fonctionnent-ils ?

---

## Étape 13 : Adressez les commentaires

Si les examinateurs demandent des modifications :

1. Consultez les commentaires sur la PR
2. Faites les révisions demandées en local
3. Committez et poussez vos modifications
4. Répondez à chaque commentaire confirmant le correctif
5. Les examinateurs re-vérifient

Les révisions typiques prennent 3–5 jours.

---

## Étape 14 : Fusionnez et publiez

Une fois approuvé :

1. Les responsables fusionnent votre PR à `main`
2. Votre stack est automatiquement publié sur la marketplace
3. Vous recevez une notification de confirmation
4. Votre stack est désormais disponible au téléchargement

---

## Après la publication

**Responsabilités de maintenance :**

- Répondez aux problèmes GitHub (bugs, questions) dans la semaine
- Mettez à jour votre stack quand Claude Code publie des versions majeures
- Gardez les exemples et guides actuels
- Fournissez les corrections de bugs selon les besoins

**Gagnez le badge certifié (optionnel) :**

Après 2+ semaines sans problèmes, 2+ utilisateurs externes et une maintenance active, vous pouvez demander la certification. Voir **certification-path.md**.

---

## Dépannage

### Les vérifications PR échouent avec « Invalid JSON in submission.json »

**Solution** : Utilisez un validateur JSON en ligne (jsonlint.com) pour trouver l'erreur de syntaxe. Problèmes courants :
- Virgule de fin dans les tableaux ou objets
- Crochet fermant manquant
- Guillemets non échappés dans les strings

### Les vérifications PR échouent avec « Missing required file: CLAUDE.md »

**Solution** : Assurez-vous que ces fichiers existent à la racine de votre stack :
- `CLAUDE.md`
- `submission.json`
- `LICENSE`
- `README.md`

### « L'examen prend plus de temps que prévu »

L'équipe d'examen examine les stacks dans l'ordre de réception. Le temps typique est 1–2 semaines. Si vous n'avez pas de nouvelles en 3 semaines, commentez la PR pour demander une mise à jour.

### J'ai besoin de mettre à jour mon stack après publication

**Mises à jour mineures (typos, petits correctifs) :** Soumettez une PR avec vos modifications. Celles-ci fusionnent rapidement.

**Mises à jour majeures (nouvelles compétences, restructuration) :** Commentez sur le problème GitHub original (créé quand votre stack a été fusionné). Discutez de la portée et obtenez l'approbation avant d'implémenter.

---

## Questions ?

- **Avant la soumission** : Consultez **getting-started.md** et **stack-quality-standards.md**
- **Questions générales** : Vérifiez la FAQ dans **getting-started.md**
- **Dépannage** : Commentez sur votre PR ; les responsables vous aideront
- **Communauté** : Rejoignez le Slack/Discord communautaire (lien dans le README principal)

---

## Liste de vérification : Avant de cliquer sur « Create Pull Request »

- [ ] Le répertoire du stack s'appelle `votre-nom-stack` (kebab-case, se termine par `-stack`)
- [ ] `CLAUDE.md` est présent et complet
- [ ] `README.md` est présent avec aperçu et démarrage rapide
- [ ] Le fichier `LICENSE` est présent (CC0-1.0 ou compatible)
- [ ] `submission.json` est un JSON valide et complet
- [ ] Toutes les compétences respectent le format et ont des exemples fonctionnants
- [ ] Tous les agents ont un objectif clair et sont testés
- [ ] Tous les guides sont complets et testés
- [ ] Aucun contenu stub ou placeholder
- [ ] Vous avez testé personnellement
- [ ] 2+ personnes externes ont testé et fourni des commentaires
- [ ] La grammaire et le ton sont professionnels
- [ ] Tous les noms de fichiers sont kebab-case
- [ ] Vous avez synchronisé avec upstream avant de pousser (`git pull upstream main`)

Bonne chance avec votre soumission !
