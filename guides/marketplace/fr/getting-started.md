# Débuter avec la Marketplace Claude Code

Ce guide s'adresse aux créateurs de stacks pour la première fois qui souhaitent construire et soumettre une collection de compétences, d'agents, de crochets, de workflows ou d'invites à la Marketplace Claude Code.

---

## À qui s'adresse ce guide

- Vous avez 2+ compétences ou outils Claude Code que vous souhaitez partager
- Vous comprenez la structure du repository uitkit
- Vous êtes à l'aise avec Git et les pull requests GitHub
- Vous souhaitez atteindre d'autres utilisateurs Claude Code avec une collection de qualité organisée

Ce guide n'est pas pour :
- Les soumissions de compétences isolées (utilisez le répertoire skills/ du repository principal)
- Les contenus en phase précoce et non testés (testez votre travail d'abord)
- Les produits commerciaux cherchant une monétisation via la marketplace (la marketplace est communautaire)

---

## Ce que vous allez créer

Un **stack** est une collection publiée de ressources Claude Code regroupées pour un domaine ou un workflow spécifique.

**Exemple : Stack de Productivité Backend**
```
backend-productivity-stack/
├── CLAUDE.md (manifeste et description)
├── skills/
│   ├── api-contract-testing.md
│   ├── performance-profiling.md
│   └── docker-debugging.md
├── agents/
│   ├── sql-specialist.md
│   └── deployment-engineer.md
├── hooks/
│   └── pre-commit-checks.sh
├── guides/
│   ├── getting-started.md
│   └── performance-tuning.md
├── mcp/
│   ├── postgres-config.json
│   └── redis-config.json
└── submission.json
```

**Ce qui fait un stack de qualité :**
- 5 à 15 ressources cohérentes (pas un fourre-tout)
- Audience cible et domaine clairs
- Chaque compétence a des exemples testés
- Chaque guide a des étapes concrètes et exécutables
- Toutes les ressources respectent les normes uitkit
- 2+ utilisateurs externes l'ont testé

---

## Parcours en 5 étapes

### Étape 1 : Valider votre idée

Avant de construire, confirmez la portée de votre stack :

1. **Donnez-lui un nom** : Choisissez un nom clair et descriptif se terminant par `-stack`
   - Bon : `customer-retention-stack`, `data-pipeline-stack`, `security-hardening-stack`
   - À éviter : `my-stuff`, `utils`, `awesome-tools`

2. **Listez vos ressources** : Rédigez un brouillon README de ce qui est inclus
   - 5+ compétences ou agents
   - OU 3+ compétences + 2+ guides/crochets/workflows
   - Chacun doit être complet et testé

3. **Vérifiez les conflits** : Recherchez des stacks similaires dans la marketplace
   - Une portée connexe mais différente est OK (par ex., `python-backend-stack` + `javascript-backend-stack`)
   - Les doublons exacts ne seront pas acceptés

4. **Audience cible** : Qui utilisera ceci ? Soyez spécifique
   - « Ingénieurs DevOps utilisant Docker + Kubernetes »
   - « Fondateurs de SaaS gérant les métriques d'attrition »
   - PAS seulement « développeurs » ou « ingénieurs »

### Étape 2 : Créer le répertoire de votre Stack

Forkez le repository UitKit et créez le dossier de votre stack :

```bash
# Clonez votre fork
git clone https://github.com/VOTRE_NOM_UTILISATEUR/UitKit.git
cd UitKit

# Créez le répertoire stack (branche principale, pas une branche de feature)
mkdir -p stacks/votre-nom-stack
cd stacks/votre-nom-stack

# Initialisez les sous-répertoires au besoin
mkdir -p skills agents guides hooks mcp examples
```

Nommage : `kebab-case-stack` — tout en minuscules, tirets, pas de traits de soulignement.

### Étape 3 : Construire votre Stack

Remplissez chaque répertoire avec du contenu complet et testé :

**Compétences** (`skills/*.md`) :
- Écrivez au format de compétence uitkit (voir le modèle ci-dessous)
- Incluez au moins un exemple concret et exécutable
- Testez chaque compétence vous-même dans Claude Code
- Pas de stubs ou « à venir »

**Agents** (`agents/*.md`) :
- Utilisez le format d'agent uitkit
- Définissez les conseils de modèle (Haiku/Sonnet/Opus)
- Spécifiez le sous-ensemble d'outils
- Incluez les conditions de déclenchement

**Guides** (`guides/*.md`) :
- 100 à 500 lignes par guide
- Instructions étape par étape avec blocs de code
- Exemples réels de votre domaine
- Pas de sections d'espace réservé

**Crochets** (`hooks/*.sh` ou `.py`) :
- Incluez l'entrée `settings.json` exacte comme bloc de code JSON
- Instructions d'installation
- Documentation claire du moment et de la raison de son déclenchement

**Configs MCP** (`mcp/*.json`) :
- JSON valide, testé avec Claude Code
- Instructions d'installation et d'utilisation dans un fichier `.md` d'accompagnement

**Exemples** (`examples/`) :
- Projets fonctionnels ou stubs démontrant l'utilisation du stack
- README avec instructions étape par étape

### Étape 4 : Créer submission.json

À la racine de votre stack, créez `submission.json` :

```json
{
  "name": "Backend Productivity Stack",
  "slug": "backend-productivity-stack",
  "description": "Une collection organisée d'outils pour diagnostiquer et optimiser les services backend. Inclut le débogage Docker, le profilage SQL, les tests de contrat API et la surveillance des performances.",
  "version": "1.0.0",
  "author": {
    "name": "Votre Nom",
    "github": "votre-nom-utilisateur-github",
    "email": "vous@exemple.com"
  },
  "license": "CC0-1.0",
  "keywords": ["backend", "performance", "débogage", "docker", "sql", "profilage"],
  "minVersion": "1.8.0",
  "contents": {
    "skills": 5,
    "agents": 2,
    "guides": 2,
    "hooks": 1,
    "mcp": 2
  },
  "targetAudience": "Ingénieurs backend et spécialistes DevOps optimisant les performances des services et dépannant les problèmes de production.",
  "testingNotes": "Ce stack a été testé avec Claude Code v1.8.0+ sur macOS, Linux et Windows. Toutes les compétences ont été validées dans les environnements de production.",
  "feedback": [
    {
      "tester": "Alice Chen",
      "role": "Ingénieur Backend chez TechCorp",
      "feedback": "Nous a fait gagner 2 heures par déploiement grâce au workflow de débogage Docker."
    }
  ]
}
```

### Étape 5 : Soumettre via Pull Request

1. **Committez et poussez** :
   ```bash
   git add stacks/votre-nom-stack/
   git commit -m "feat: add votre-nom-stack"
   git push origin main
   ```

2. **Ouvrez une PR** vers le repository principal UitKit :
   - Branche de base : `main`
   - Titre : `feat: add votre-nom-stack`
   - Description :
     ```
     ## Soumission de Stack
     
     **Nom :** Nom de Votre Stack
     **Slug :** votre-nom-stack
     **Contenu :** 5 compétences, 2 agents, 2 guides, 1 crochet
     
     **Audience cible :** Ingénieurs backend et spécialistes DevOps
     
     **Aperçu :**
     Une brève description de ce que ce stack fait et pourquoi c'est important.
     
     **Liste de vérification de qualité :**
     - [x] Tous les fichiers respectent les normes uitkit
     - [x] Chaque compétence et agent a des exemples concrets
     - [x] Testé par 2+ utilisateurs externes
     - [x] Aucun contenu d'espace réservé ou stub
     - [x] submission.json est complet et précis
     
     **Commentaires :**
     - Alice Chen (Ingénieur Backend) : [citation ou référence au commentaire]
     - Bob Martinez (DevOps) : [citation ou référence au commentaire]
     ```

3. **Les vérifications automatisées** s'exécutent (validation de syntaxe, structure de fichier).

4. **L'équipe d'examen** examine votre soumission (1 à 2 semaines).

5. **Itérez** sur les commentaires si nécessaire.

6. **Fusionnez et publiez** — votre stack apparaît dans la marketplace !

---

## Prochaines étapes

- Consultez **stack-quality-standards.md** avant de soumettre
- Vérifiez **submission-process.md** pour le workflow GitHub détaillé
- Regardez **certification-path.md** si vous souhaitez obtenir un badge certifié plus tard

---

## FAQ

**Q : Combien de ressources un stack a-t-il besoin ?**
R : Minimum 5 au total : soit 5+ compétences, soit 3+ compétences + 2+ guides/crochets/workflows. La qualité plutôt que la quantité — un stack focalisé de 6 éléments vaut mieux qu'un stack désordonné de 20 éléments.

**Q : Puis-je inclure des traductions ?**
R : Oui. Si vous traduisez votre stack en français, allemand, néerlandais ou espagnol, suivez la structure des répertoires : `skills/fr/`, `agents/de/`, etc. Les traductions sont optionnelles pour la soumission initiale ; vous pouvez les ajouter après le lancement.

**Q : Quelle licence dois-je utiliser ?**
R : CC0-1.0 (domaine public) est recommandé. MIT, Apache 2.0 et GPL 3.0 sont également acceptés. N'utilisez pas de licences propriétaires.

**Q : Comment sais-je si mon stack est « assez testé » ?**
R : Vous devriez avoir utilisé chaque compétence et agent dans un vrai travail. Si possible, faites tester par 2+ personnes externes et collectez leurs commentaires. (Voir le champ feedback dans submission.json.)

**Q : Puis-je mettre à jour mon stack après sa publication ?**
R : Oui. Soumettez une pull request avec vos modifications. Les mises à jour mineures (corrections de bugs, typos, clarifications) fusionnent rapidement. Les mises à jour majeures (nouvelles compétences, restructuration) passent par l'examen.

**Q : Et si mon stack a besoin d'un support communautaire ou de maintenance ?**
R : Rejoignez le Slack/Discord communautaire (lien dans le README principal). Répondez aux questions, signalez les bugs et gardez votre stack à jour. Les stacks abandonnés depuis 6+ mois peuvent être archivés.

**Q : Puis-je vendre mon stack ou facturer le support ?**
R : Le stack lui-même est gratuit et open-source. Vous pouvez proposer un support payant, du conseil ou de la formation en plus — mais le code du stack reste gratuit.

**Q : Combien de temps dure l'examen ?**
R : 1 à 2 semaines pour les premiers commentaires. Si des révisions sont nécessaires, prévoir une semaine supplémentaire par itération. Les stacks certifiés ont une priorité.

**Q : Que se passe-t-il si ma soumission est rejetée ?**
R : Vous recevrez des commentaires spécifiques. La plupart des rejets sont corrigeables (exemples manquants, contenu stub, portée flou). Révisez et re-soumettez.
