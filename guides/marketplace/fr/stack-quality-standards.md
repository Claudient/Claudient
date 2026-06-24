# Normes de qualité des stacks

Ce guide définit ce que signifie « qualité » pour un stack soumis à la Marketplace Claude Code. Utilisez cette liste de vérification avant de soumettre votre stack.

---

## Le principe de qualité

Un stack de qualité est :
- **Ciblé** : Résout un problème spécifique ou supporte un workflow spécifique
- **Complet** : Chaque compétence, agent et guide est fini ; pas de placeholders
- **Testé** : Vous et 2+ autres l'avez utilisé dans un vrai travail
- **Professionnel** : Écriture claire, exemples corrects, pas de baratin marketing
- **Maintenable** : Vous allez répondre aux rapports de bugs et demandes de features

Un stack n'est PAS :
- Une collection d'outils aléatoires
- En phase précoce ou expérimental
- Non testé dans des scénarios réels
- Abandonné ou non maintenu

---

## Normes CLAUDE.md

Chaque stack doit inclure un fichier `CLAUDE.md` à la racine. Il définit la portée du stack, sa gouvernance et les directives pour les contributeurs.

**Sections obligatoires :**

```markdown
# Nom du Stack

## Ce qu'est ce Stack
[2–3 phrases. Quel problème résout-il ? Qui l'utilise ?]

## Ce qui est inclus
[Liste de toutes les compétences, agents, guides, crochets, workflows, intégrations MCP]

## Démarrage rapide
[Instructions copy-paste : installer le stack et utiliser une compétence/agent]

## Conventions de nommage des fichiers
[Documentez vos règles de nommage. Référencez les conventions du repository principal.]

## Format de fichier de compétence
[Copiez depuis CLAUDE.md principal, ou indiquez : « Suit les normes du repository principal »]

## Format de fichier d'agent
[Copiez depuis CLAUDE.md principal, ou indiquez : « Suit les normes du repository principal »]

## Directives de contribution
[Si vous acceptez les PRs externes : processus d'examen, normes, comment proposer des changements]

## Quand contribuer
[Qui peut contribuer, et comment proposer de nouvelles compétences/agents pour le stack]
```

**Liste de vérification :**
- [ ] CLAUDE.md existe et est complet
- [ ] Aucune section n'est vide ou marquée « à venir »
- [ ] L'audience cible est clairement énoncée
- [ ] Les conventions de nommage des fichiers sont explicites

---

## Normes des compétences

Chaque compétence doit respecter le format uitkit et répondre à ces critères de qualité.

**Format (obligatoire) :**
```markdown
# Nom de la compétence

## Quand l'activer
[Déclencheurs spécifiques — pas « quand vous avez besoin de X »]

## Quand NE PAS l'utiliser
[Anti-modèles et cas d'abus]

## Instructions
[Étapes concrètes, modèles et techniques]

## Exemple
[Exemple réel, fonctionnant avec entrée et sortie]
```

**Liste de vérification de qualité :**

1. **Déclencheurs d'activation clairs**
   - [ ] « Quand l'activer » est spécifique, pas vague
   - [ ] Exemple : « Quand débogage un crash de conteneur Docker » (bon) vs. « Quand vous avez besoin d'aide » (mauvais)
   - [ ] Les déclencheurs font référence à des fonctionnalités réelles Claude Code (slash commands, tools, hooks)

2. **Instructions concrètes**
   - [ ] Aucun tutorat condescendant ; cible les développeurs seniors
   - [ ] Les instructions incluent des blocs de code si pertinent
   - [ ] Chaque étape est actionnable, pas seulement consultatif
   - [ ] La terminologie technique est utilisée correctement
   - [ ] Pas de conseils LLM génériques (« pense étape par étape »)

3. **Exemples réels**
   - [ ] Au moins un exemple par compétence
   - [ ] Les exemples montrent entrée, étapes et sortie
   - [ ] Les exemples sont exécutables en copy-paste (pas du pseudocode)
   - [ ] L'exemple répond au déclencheur d'activation énoncé
   - [ ] Si l'exemple nécessite une configuration, incluez une section setup

4. **Gestion des erreurs**
   - [ ] Les instructions abordent « et si cela échoue »
   - [ ] Les erreurs courantes sont documentées avec des corrections
   - [ ] Les cas limites sont notés

5. **Longueur**
   - [ ] 400–800 lignes par compétence (sweet spot pour la profondeur)
   - [ ] Les compétences plus longues doivent être divisées en plusieurs compétences ciblées

**Échecs courants :**
- La compétence est un tutoriel général, pas un workflow Claude Code spécifique
- L'exemple est du pseudocode ou incomplet
- Les instructions sont vagues (« essayez différentes approches »)
- Pas de condition de déclenchement claire
- La compétence duplique une autre dans le stack

---

## Normes des agents

Chaque agent doit respecter le format uitkit et répondre à ces critères de qualité.

**Format (obligatoire) :**
```markdown
# Nom de l'agent

## Objectif
[Une phrase — spécialité ou domaine d'activité]

## Conseils de modèle
[Haiku / Sonnet / Opus — avec justification]

## Outils
[Sous-ensemble d'outils spécifiques ; pas tous les outils disponibles]

## Quand déléguer ici
[Conditions de déclenchement spécifiques]

## Exemple de cas d'usage
[Exemple concret de délégation]
```

**Liste de vérification de qualité :**

1. **Objectif clair**
   - [ ] Énoncé d'objectif d'une phrase
   - [ ] Répond à : « En quoi cet agent est-il spécialisé ? »
   - [ ] Pas trop large (« spécialiste backend » est trop large ; « spécialiste optimisation SQL » est juste)

2. **Sélection de modèle justifiée**
   - [ ] Si Haiku : tâche sensible aux coûts avec logique simple
   - [ ] Si Sonnet : équilibre vitesse/coût/raisonnement
   - [ ] Si Opus : raisonnement complexe ou recherche multi-étapes
   - [ ] La justification explique le choix

3. **Portée d'outils étroite**
   - [ ] Liste 5–8 outils spécifiques, pas « tous les outils »
   - [ ] Les outils s'alignent avec l'objectif de l'agent
   - [ ] Exemple : Un agent optimisation SQL n'a pas besoin de recherche web ou d'outils email

4. **Déclencheurs de délégation concrets**
   - [ ] « Quand déléguer ici » inclut des conditions spécifiques
   - [ ] Exemple : « Quand vous avez besoin de profiler une requête lente » (bon) vs. « Quand vous avez besoin d'aide avec la base de données » (mauvais)

5. **Exemple fonctionnant**
   - [ ] L'exemple montre ce que l'utilisateur demande et ce que l'agent retourne
   - [ ] L'exemple est assez détaillé pour comprendre la valeur de l'agent
   - [ ] L'exemple correspond à l'objectif énoncé

---

## Normes des guides

Chaque guide doit être complet, testé et professionnel.

**Liste de vérification de qualité :**

1. **Audience et objectif clairs**
   - [ ] La première phrase énonce à qui s'adresse le guide
   - [ ] Énoncé clair du problème ou de l'objectif
   - [ ] Section « Quand NE PAS l'utiliser » pour les anti-modèles

2. **Structure et navigation**
   - [ ] Les en-têtes progressent logiquement
   - [ ] Pas de murs de texte (divisez en sous-sections)
   - [ ] Table des matières pour les guides de plus de 1000 lignes
   - [ ] Liens croisés vers les guides connexes

3. **Contenu concret et actionnable**
   - [ ] Chaque instruction est étape par étape
   - [ ] Les blocs de code sont syntaxiquement corrects
   - [ ] Exemples en copy-paste inclus
   - [ ] Captures d'écran ou diagrammes pour les workflows visuels
   - [ ] Pas « à titre d'exercice, implémentez X » — fournissez l'implémentation

4. **Testé et précis**
   - [ ] Vous avez complété toutes les étapes du guide
   - [ ] Tous les exemples de code fonctionnent comme écrit
   - [ ] Les commandes sont testées sur le système d'exploitation indiqué (macOS/Linux/Windows)
   - [ ] Les numéros de version sont actuels (ou explicitement épinglés pour la stabilité)

5. **Ton professionnel**
   - [ ] Pas de langage marketing (« cet outil incroyable »)
   - [ ] Pas de jargon inutile
   - [ ] La grammaire et l'orthographe sont correctes
   - [ ] Formatage et style cohérents

6. **Longueur**
   - [ ] Minimum 100 lignes ; maximum 500 lignes par guide
   - [ ] Les sujets plus longs doivent être divisés en plusieurs guides

---

## Normes des workflows

Chaque workflow doit documenter clairement les processus end-to-end.

**Liste de vérification de qualité :**

1. **Objectif clair**
   - [ ] La première section énonce l'objectif du workflow
   - [ ] L'audience cible est spécifiée
   - [ ] Une estimation de temps pour compléter est fournie

2. **Processus étape par étape**
   - [ ] Chaque étape est numérotée et titré
   - [ ] Les entrées et sorties sont claires
   - [ ] Les préconditions sont énoncées au début
   - [ ] Les points de décision (if/then) sont diagrammés

3. **Outils et ressources**
   - [ ] Chaque outil/compétence/agent utilisé dans le workflow est listé
   - [ ] Des liens vers la documentation complète sont fournis
   - [ ] Des exemples de configuration sont inclus

4. **Critères de succès**
   - [ ] Comment savoir que le workflow a réussi
   - [ ] Modes d'échec courants et étapes de récupération
   - [ ] Section dépannage

5. **Exemple de walkthrough**
   - [ ] Exemple réel montrant le workflow en action
   - [ ] Toutes les entrées, sorties et branches de décision démontrées

---

## Normes des crochets

Chaque crochet doit avoir une configuration correcte et une documentation claire.

**Liste de vérification de qualité :**

1. **Configuration JSON valide**
   - [ ] L'extrait settings.json est un JSON valide
   - [ ] Tous les champs obligatoires sont présents
   - [ ] Le type de déclenchement est l'un de : `before-start`, `after-command`, `on-event`

2. **Qualité du script**
   - [ ] Script shell (.sh) ou script Python (.py)
   - [ ] Se termine avec le code 0 en succès, non-zéro en erreur
   - [ ] Les messages d'erreur sont clairs
   - [ ] Pas d'exceptions non gérées

3. **Documentation**
   - [ ] Explique ce que le crochet fait
   - [ ] Explique quand/pourquoi il se déclenche
   - [ ] Les instructions de configuration sont complètes
   - [ ] Les instructions de désinstallation sont fournies

4. **Sécurité**
   - [ ] Le crochet ne supprime pas de fichiers sans confirmation
   - [ ] Le crochet est idempotent (sûr à exécuter plusieurs fois)
   - [ ] Le crochet enregistre les actions importantes pour le débogage

---

## Normes MCP

Chaque intégration MCP doit être fonctionnelle, sûre et documentée.

**Liste de vérification de qualité :**

1. **Validité de la configuration**
   - [ ] Le JSON est syntaxiquement correct
   - [ ] Tous les champs MCP requis sont présents
   - [ ] Les variables d'environnement sont documentées
   - [ ] Les identifiants/secrets ne sont pas codés en dur

2. **Test d'intégration**
   - [ ] Le serveur MCP a été testé avec Claude Code
   - [ ] Tous les outils exposés fonctionnent comme documenté
   - [ ] La gestion des erreurs est élégante (pas d'échecs silencieux)

3. **Documentation**
   - [ ] Les instructions d'installation sont étape par étape
   - [ ] Des exemples d'utilisation pour chaque outil sont fournis
   - [ ] Une estimation du temps de configuration est incluse (par ex., « 15 minutes »)
   - [ ] Section dépannage pour les problèmes courants
   - [ ] Les implications de coûts (le cas échéant) sont divulguées

4. **Sécurité**
   - [ ] Les clés API sont passées via des variables d'environnement
   - [ ] Pas de données sensibles dans les exemples de config
   - [ ] La documentation avertit des limites de taux ou quotas

---

## Grammaire et ton

Tout contenu doit être professionnel, clair et inclusif.

**Liste de vérification :**

- [ ] Orthographe française correcte
- [ ] Pas de contractions dans la documentation formelle
- [ ] Les phrases sont claires et concises
- [ ] Pas de mots vides (« basiquement », « juste », « réellement »)
- [ ] Langage inclusif (pas de pronoms genrés pour les gens ; utilisez « ils/elles »)
- [ ] Pas de baratin marketing ou d'hype
- [ ] Temps cohérent (présent pour les instructions, passé pour les exemples)

**Exemples de corrections :**
- « Vous avez juste besoin d'exécuter cette commande » → « Exécutez cette commande »
- « Cela crée basiquement un conteneur Docker » → « Cela crée un conteneur Docker »
- « Comme vous le savez peut-être, DevOps est important » → « Les équipes DevOps bénéficient de l'automatisation »

---

## Exigences de test

Avant de soumettre votre stack, testez en profondeur :

1. **Test personnel**
   - [ ] Vous avez utilisé chaque compétence dans un vrai travail
   - [ ] Vous avez délégué à chaque agent au moins une fois
   - [ ] Vous avez suivi chaque guide de bout en bout
   - [ ] Vous avez déclenché chaque crochet dans un environnement de test
   - [ ] Vous avez testé chaque intégration MCP

2. **Test externe**
   - [ ] 2+ personnes en dehors de votre équipe ont testé le stack
   - [ ] Les testeurs représentent votre audience cible
   - [ ] Les testeurs ont fourni des commentaires écrits
   - [ ] Vous avez abordé les blocages majeurs soulevés par les testeurs

3. **Cas limites**
   - [ ] Vous avez testé avec différentes versions Claude Code (si pertinent)
   - [ ] Vous avez testé sur macOS, Linux ou Windows (documentez lequel)
   - [ ] Vous avez testé avec différentes configurations de modèle (si pertinent)

---

## Liste de vérification pré-soumission

Avant d'ouvrir une pull request :

- [ ] CLAUDE.md est complet et précis
- [ ] Toutes les compétences respectent le format et les normes de qualité
- [ ] Tous les agents ont un objectif clair et une portée d'outils étroite
- [ ] Tous les guides sont testés et incluent des exemples fonctionnants
- [ ] Tous les workflows sont documentés avec des instructions étape par étape
- [ ] Tous les crochets ont du JSON valide et de la documentation
- [ ] Toutes les intégrations MCP sont testées et documentées
- [ ] submission.json est complet et précis
- [ ] Pas de contenu placeholder ou « à venir »
- [ ] La grammaire et le ton sont professionnels partout
- [ ] Vous avez testé personnellement et avez 2+ testeurs externes
- [ ] README.md existe et résume le stack
- [ ] Le fichier LICENSE existe (CC0-1.0, MIT, Apache 2.0, ou GPL 3.0)

---

## Raisons courantes de rejet

Les stacks sont rejetés ou invités à réviser s'ils :

1. Manquent CLAUDE.md clair ou submission.json
2. Incluent du contenu stub (« plus à venir »)
3. Les compétences manquent d'exemples concrets ou de code exécutable
4. Les agents ont un objectif vague ou une portée d'outils trop large
5. Les guides sont incomplets ou non testés
6. Audience cible incertaine
7. Pas de preuve de test externe
8. Les normes de qualité ne sont pas respectées (typos, erreurs, mauvaise structure)

---

## Questions ?

- Vérifiez **getting-started.md** pour les directives de workflow
- Vérifiez **submission-process.md** pour les détails GitHub
- Demandez dans le Slack/Discord communautaire (lien dans le README principal)
