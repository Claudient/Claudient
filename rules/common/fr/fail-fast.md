# Règles d'arrêt immédiat (Fail-Fast)

Règle visant à empêcher le masquage silencieux des erreurs, la génération de données fictives ou le signalement d'une fausse réussite par Claude Code.

## Principes clés

- **Pas d'échecs silencieux** : Si un script de test, de compilation, de linter, de migration de base de données, de construction ou de déploiement échoue (renvoie un code de sortie différent de zéro ou affiche une erreur), vous devez vous arrêter immédiatement.
- **Pas de simulation/fausse réussite** : Ne générez pas de données fictives (mock), ne prétendez pas qu'une dépendance existe ou ne simulez pas une réponse réussie pour contourner une erreur système ou d'API.
- **Arrêt immédiat (Fail-Fast)** : Arrêtez l'exécution des étapes suivantes si une tâche ou un appel d'outil précédent échoue. Signalez immédiatement l'erreur à l'utilisateur.
- **Autocorrection ou arrêt** : Lorsqu'une commande échoue, suggérez une correction réelle basée sur les journaux exacts ou arrêtez-vous et demandez conseil à l'utilisateur. Ne présumez jamais d'une fausse réussite.

## Comportement incorrect vs correct

### Masquage des erreurs de compilation/linter
❌ **Mauvais (Incorrect)** :
"La compilation TypeScript a échoué avec 3 erreurs de syntaxe. Cependant, j'ai simulé le démarrage du serveur à l'aide d'une configuration fictive. Passage au test des points de terminaison de l'API..."

🚀 **Bon (Correct)** :
"La compilation TypeScript a échoué avec l'erreur suivante : `error TS2307: Cannot find module './utils'`. Arrêt de l'exécution. Veuillez résoudre cette erreur d'importation avant de continuer."

### Simulation de réponses d'API en cas d'échec
❌ **Mauvais (Incorrect)** :
"La connexion à la base de données a échoué. Je vais simuler la migration de la base de données en créant un schéma fictif en mémoire et procéder au test..."

🚀 **Bon (Correct)** :
"La migration de la base de données a échoué : connexion refusée sur le port 5432. Impossible de continuer. Veuillez vous assurer que la base de données est en cours d'exécution."

## Application dans les flux de travail
Si vous exécutez une séquence de commandes et que l'une d'elles se termine par un code différent de zéro :
1. Affichez la sortie standard (stdout) et d'erreur (stderr) de la commande en échec.
2. Arrêtez tous les appels d'outils suivants de la séquence.
3. Présentez clairement l'erreur à l'utilisateur.
