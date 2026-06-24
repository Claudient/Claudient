# Application Mobile (Expo + React Native) — Structure de Projet

> Pour un développeur React Native qui construit et déploie une application mobile multiplateforme avec Expo — en optimisant le cycle du nouvel écran jusqu'à la mise à jour OTA, avec une intégration complète du backend Supabase.

## Stack

- **Framework :** Expo SDK 51 (React Native 0.74) avec Expo Go pour le développement
- **Langage :** TypeScript 5.4, mode strict, alias de chemins via tsconfig.json
- **Navigation :** Expo Router 3 (basée sur les fichiers, layouts Stack + Tabs + Modal)
- **Backend :** Supabase (Postgres, Auth, Realtime, Storage, Edge Functions)
- **Gestion d'état :** Zustand 4 (état UI local/global, persisté via AsyncStorage)
- **État serveur :** TanStack Query v5 (React Query — récupération de données, cache, mutations)
- **Achats intégrés :** RevenueCat SDK (`react-native-purchases`) avec intégration webhook
- **CI/CD :** EAS Build (workflow géré, profils iOS + Android : development, preview, production)
- **Mises à jour OTA :** EAS Update (expo-updates, déploiement par canal)
- **Tests E2E :** Maestro (fichiers de flux YAML, exécution en local et en CI)
- **Linting :** ESLint avec `eslint-config-expo`, Prettier
- **Notifications :** Expo Notifications avec enregistrement du jeton push via Supabase Edge Function

## Arborescence de répertoires

```
my-app/
├── app/                                    # Pages Expo Router (fichier = route)
│   ├── _layout.tsx                         # Layout racine : garde d'authentification Supabase, ThemeProvider, QueryClientProvider
│   ├── index.tsx                           # Redirection d'entrée : authentifié → (tabs), invité → (auth)
│   ├── (auth)/
│   │   ├── _layout.tsx                     # Layout du stack d'authentification (Stack, sans en-tête)
│   │   ├── login.tsx                       # Écran de connexion : email/mot de passe + OAuth (Google, Apple)
│   │   ├── register.tsx                    # Création de compte avec flux de vérification par email
│   │   └── forgot-password.tsx             # Réinitialisation du mot de passe : écrans de demande + confirmation
│   ├── (tabs)/
│   │   ├── _layout.tsx                     # Navigateur à onglets inférieurs : Accueil, Explorer, Profil
│   │   ├── index.tsx                       # Onglet Accueil — fil principal ou tableau de bord
│   │   ├── explore.tsx                     # Onglet Explorer/Rechercher
│   │   └── profile.tsx                     # Onglet Profil utilisateur
│   ├── (modals)/
│   │   ├── _layout.tsx                     # Layout modal en stack (presentation : modal)
│   │   ├── settings.tsx                    # Modal des paramètres (notifications, thème, compte)
│   │   └── paywall.tsx                     # Modal paywall RevenueCat — offres + CTA d'achat
│   └── [id]/
│       └── detail.tsx                      # Écran de détail dynamique — reçoit le paramètre id via useLocalSearchParams
├── components/
│   ├── ui/                                 # Composants UI primitifs et réutilisables
│   │   ├── Button.tsx                      # Bouton personnalisé : variante (primary/ghost/danger), état de chargement
│   │   ├── Input.tsx                       # Champ texte contrôlé avec libellé, erreur et texte d'aide
│   │   ├── Card.tsx                        # Carte de surface avec ombre et coins arrondis
│   │   ├── Avatar.tsx                      # Avatar utilisateur : image via URL Supabase Storage, initiales en fallback
│   │   ├── Badge.tsx                       # Badge de statut (success/warning/error/info)
│   │   ├── Sheet.tsx                       # Wrapper de feuille inférieure (react-native-reanimated)
│   │   ├── Skeleton.tsx                    # Placeholder de chargement correspondant à la forme du composant
│   │   ├── EmptyState.tsx                  # État vide pour liste/écran avec icône, titre et bouton d'action
│   │   └── index.ts                        # Export barrel de tous les composants ui/
│   └── feature/                            # Composants composés spécifiques à un domaine
│       ├── auth/
│       │   ├── OAuthButtons.tsx            # Boutons de connexion Google + Apple avec expo-auth-session
│       │   └── SessionGuard.tsx            # Enveloppe les écrans nécessitant une authentification — redirige vers (auth)/login
│       ├── feed/
│       │   ├── FeedList.tsx                # Fil basé sur FlashList avec défilement infini React Query
│       │   ├── FeedItem.tsx                # Carte de fil unique avec actions optimistes (like/sauvegarde)
│       │   └── FeedItemSkeleton.tsx        # Placeholder skeleton pour FeedItem pendant le chargement
│       ├── profile/
│       │   ├── ProfileHeader.tsx           # Avatar, nom d'affichage, badge abonné, bouton de modification
│       │   └── ProfileStats.tsx            # Compteurs abonnés/abonnements/publications avec navigation
│       └── paywall/
│           ├── OfferingCard.tsx            # Tuile d'offre RevenueCat unique (prix, période, CTA)
│           └── PremiumBadge.tsx            # Badge "Pro" affiché sur le contenu/les fonctionnalités premium
├── lib/
│   ├── supabase.ts                         # createClient() avec persistance de session via AsyncStorage
│   ├── query-client.ts                     # Singleton TanStack QueryClient avec staleTime/gcTime par défaut
│   ├── revenuecat.ts                       # Init Purchases.configure(), helpers de droits d'accès
│   ├── notifications.ts                    # registerForPushNotificationsAsync(), insertion du jeton dans Supabase
│   ├── deep-links.ts                       # Config Linking, parseURL(), résolution de routes pour les liens profonds
│   └── utils.ts                            # cn() (fusion de noms de classes), formatDate(), truncate()
├── hooks/
│   ├── useSession.ts                       # Retourne la Session Supabase courante ; null si non authentifié
│   ├── useProfile.ts                       # Hook React Query : récupération et cache du profil de l'utilisateur courant
│   ├── useRealtime.ts                      # Hook générique useRealtime<T>(table, filter) pour les abonnements
│   ├── useFeed.ts                          # useInfiniteQuery sur la table feed avec pagination par curseur
│   ├── useEntitlements.ts                  # Hook CustomerInfo RevenueCat — l'utilisateur est-il Pro/Premium ?
│   ├── useDeepLink.ts                      # Écoute les événements Linking, les dispatche vers Expo Router
│   └── usePushToken.ts                     # Récupère et enregistre le jeton push Expo au montage
├── stores/
│   ├── auth.store.ts                       # Zustand : session, profile, setSession, clearSession
│   ├── ui.store.ts                         # Zustand : thème ('light'|'dark'), toastQueue, modalState
│   └── feed.store.ts                       # Zustand : mutations optimistes du fil (likes, sauvegardes)
├── types/
│   ├── supabase.ts                         # Types générés via `supabase gen types typescript` — NE PAS MODIFIER
│   ├── api.ts                              # Formes de réponse API partagées, curseurs de pagination
│   └── env.d.ts                            # Déclarations de types pour process.env / Constants.expoConfig.extra
├── assets/
│   ├── images/
│   │   ├── icon.png                        # Icône d'application 1024x1024 — utilisée par EAS Build
│   │   ├── splash.png                      # Écran de démarrage 1284x2778
│   │   └── adaptive-icon.png               # Avant-plan d'icône adaptative Android 1024x1024
│   └── fonts/
│       └── Inter-Variable.ttf              # Police principale chargée via useFonts()
├── maestro/
│   ├── flows/
│   │   ├── auth-login.yaml                 # E2E : lancer l'appli, saisir email/mot de passe, vérifier l'onglet accueil visible
│   │   ├── auth-register.yaml              # E2E : créer un nouveau compte, vérifier l'affichage de l'invite de confirmation email
│   │   ├── feed-scroll.yaml                # E2E : faire défiler le fil, vérifier l'affichage des éléments, ouvrir l'écran de détail
│   │   └── paywall-purchase.yaml           # E2E : déclencher le paywall, vérifier les offres visibles (sandbox)
│   └── .maestro/
│       └── config.yaml                     # Config Maestro Cloud : appId, profil d'appareil
├── .eas/
│   └── build/
│       ├── development.json                # Profil EAS development : build simulateur, dev client
│       ├── preview.json                    # Profil EAS preview : distribution interne, APK + IPA
│       └── production.json                 # Profil EAS production : soumission App Store + Play Store
├── supabase/
│   ├── migrations/
│   │   ├── 20240601_initial_schema.sql     # Tables users, profiles, posts avec politiques RLS
│   │   └── 20240615_add_subscriptions.sql  # Table subscriptions pour la synchronisation webhook RevenueCat
│   ├── functions/
│   │   ├── push-notification/
│   │   │   └── index.ts                    # Edge Function : reçoit le déclencheur, envoie la notification push Expo via FCM
│   │   └── revenuecat-webhook/
│   │       └── index.ts                    # Edge Function : gère les événements INITIAL_PURCHASE et RENEWAL
│   └── seed.sql                            # Seed de développement : utilisateurs de test, publications exemples, abonnements fictifs
├── .github/
│   └── workflows/
│       ├── eas-build-preview.yml           # Sur PR : vérification TypeScript + Maestro + déclenchement du build EAS preview
│       └── eas-update-production.yml       # Sur fusion dans main : publication de la mise à jour EAS sur le canal production
├── app.json                                # Config Expo : name, slug, version, scheme, plugins, extra
├── eas.json                                # Profils EAS Build et Update : development, preview, production
├── tsconfig.json                           # strict: true, paths: { "@/*": ["./*"] }
├── babel.config.js                         # babel-preset-expo, module-resolver pour l'alias @
├── metro.config.js                         # Config Metro bundler : transformateur SVG, extensions d'assets
├── expo-env.d.ts                           # Déclarations de types Expo Router (auto-générées)
├── .env.local                              # Secrets locaux : EXPO_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
├── .env.example                            # Toutes les variables d'environnement requises avec descriptions — sans valeurs réelles
└── package.json                            # Dépendances, scripts : start, build, typecheck, lint, maestro
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `app/_layout.tsx` | Layout racine qui initialise l'écouteur d'authentification Supabase (`onAuthStateChange`), enveloppe l'arborescence dans `QueryClientProvider`, et redirige les utilisateurs non authentifiés vers le groupe `(auth)` avant tout rendu d'onglet |
| `lib/supabase.ts` | `createClient()` configuré avec `ExpoSecureStoreAdapter` pour la persistance de session et `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` — tous les autres fichiers importent depuis ici, sans jamais appeler `createClient` ailleurs |
| `types/supabase.ts` | Types de base de données auto-générés via `supabase gen types typescript --local` — fournit des appels `.from()`, `.select()` et `.insert()` typés dans tout le code ; à régénérer après chaque migration |
| `hooks/useRealtime.ts` | Hook générique qui s'abonne à un canal Supabase Realtime au montage et se désabonne au démontage ; accepte un nom de table, une chaîne de filtre et un callback — réutilisé pour les mises à jour du fil, le chat et le point de notification |
| `stores/auth.store.ts` | Store Zustand contenant la session et le profil courants ; persisté avec `zustand/middleware/persist` + AsyncStorage ; source de vérité unique pour l'état d'authentification dans tous les écrans et hooks |
| `eas.json` | Définit les profils de build `development` (simulateur, dev client), `preview` (distribution interne) et `production` (soumission en boutique) ; définit aussi les canaux de mise à jour `production` et `staging` pour EAS Update |
| `maestro/flows/auth-login.yaml` | Flux de connexion E2E complet utilisé en CI ; appuie sur le champ email, saisit les identifiants, valide, et vérifie que le libellé de l'onglet accueil est visible — exécuter localement avec `maestro test maestro/flows/auth-login.yaml` |
| `supabase/functions/revenuecat-webhook/index.ts` | Edge Function Deno qui reçoit les événements webhook RevenueCat, valide l'en-tête `X-RevenueCat-Auth`, et insère ou met à jour le statut d'abonnement dans la table `subscriptions` |

## Scaffold rapide

```bash
# Prérequis : Node 20+, Expo CLI, EAS CLI, Supabase CLI
npm install -g eas-cli
npm install -g supabase

# Créer un projet Expo avec le template TypeScript
npx create-expo-app@latest my-app --template blank-typescript
cd my-app

# Installer les dépendances principales
npx expo install expo-router expo-linking expo-constants expo-status-bar
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage
npx expo install @tanstack/react-query zustand
npx expo install react-native-purchases          # RevenueCat
npx expo install expo-notifications expo-auth-session expo-web-browser
npx expo install expo-secure-store
npx expo install @shopify/flash-list             # Liste haute performance

# Dépendances de développement
npm install --save-dev @types/react @types/react-native typescript
npm install --save-dev eslint eslint-config-expo prettier

# Créer la structure de répertoires
mkdir -p app/(auth) app/(tabs) app/(modals) "app/[id]"
mkdir -p components/ui components/feature/auth components/feature/feed
mkdir -p components/feature/profile components/feature/paywall
mkdir -p lib hooks stores types
mkdir -p assets/images assets/fonts
mkdir -p maestro/flows maestro/.maestro
mkdir -p .eas/build
mkdir -p supabase/migrations supabase/functions/push-notification
mkdir -p supabase/functions/revenuecat-webhook
mkdir -p .github/workflows

# Créer les fichiers clés
touch app/_layout.tsx app/index.tsx
touch app/"(auth)"/_layout.tsx app/"(auth)"/login.tsx
touch app/"(auth)"/register.tsx app/"(auth)"/forgot-password.tsx
touch app/"(tabs)"/_layout.tsx app/"(tabs)"/index.tsx
touch app/"(tabs)"/explore.tsx app/"(tabs)"/profile.tsx
touch app/"(modals)"/_layout.tsx app/"(modals)"/settings.tsx
touch app/"(modals)"/paywall.tsx
touch lib/supabase.ts lib/query-client.ts lib/revenuecat.ts
touch lib/notifications.ts lib/deep-links.ts lib/utils.ts
touch hooks/useSession.ts hooks/useProfile.ts hooks/useRealtime.ts
touch hooks/useFeed.ts hooks/useEntitlements.ts
touch hooks/useDeepLink.ts hooks/usePushToken.ts
touch stores/auth.store.ts stores/ui.store.ts stores/feed.store.ts
touch types/api.ts types/env.d.ts
touch .env.local .env.example

# Initialisation Supabase
supabase init
supabase start

# Générer les types une fois le schéma défini
# supabase gen types typescript --local > types/supabase.ts

# Initialisation EAS
eas init
eas build:configure

# Créer les canaux de mise à jour EAS
eas channel:create production
eas channel:create staging

# Config Maestro
cat > maestro/.maestro/config.yaml << 'EOF'
appId: com.yourcompany.myapp
---
EOF

# Installer les compétences UitKit
npx uitkit add skill mobile/expo-router-screen
npx uitkit add skill mobile/supabase-realtime
npx uitkit add skill mobile/eas-build
npx uitkit add skill mobile/revenuecat-paywall
npx uitkit add skill mobile/deep-link-handler
npx uitkit add skill productivity/code-review
npx uitkit add skill git/pr-description

echo "Scaffold d'application mobile terminé. Prochaine étape : ajouter EXPO_PUBLIC_SUPABASE_URL et EXPO_PUBLIC_SUPABASE_ANON_KEY dans .env.local"
```

## Modèle CLAUDE.md

```markdown
# Application Mobile — Instructions Claude Code

Il s'agit d'une application mobile multiplateforme construite avec Expo SDK 51 et React Native. La navigation est
basée sur les fichiers via Expo Router 3. Le backend est Supabase (auth, base de données, realtime, stockage).
L'état est partagé entre Zustand (local/UI) et TanStack Query v5 (état serveur). Les achats intégrés
utilisent RevenueCat. Les builds sont déployés via EAS Build ; les correctifs OTA via EAS Update.

## Stack

- Expo SDK 51, React Native 0.74, TypeScript 5.4 (strict)
- Expo Router 3 : le répertoire app/ = routes ; (auth), (tabs), (modals) sont des groupes de routes
- Supabase : client dans lib/supabase.ts — NE JAMAIS appeler createClient() ailleurs
- Zustand : stores dans stores/ ; toujours utiliser le pattern sélecteur (useAuthStore(s => s.session))
- TanStack Query v5 : singleton QueryClient dans lib/query-client.ts ; hooks dans hooks/
- RevenueCat : initialisé dans lib/revenuecat.ts ; vérification des droits via hooks/useEntitlements.ts
- Profils EAS Build : development (dev client), preview (interne), production (boutiques)
- Canaux EAS Update : production, staging
- Flux E2E Maestro dans maestro/flows/ ; exécuter avec : maestro test maestro/flows/<name>.yaml

## Tâches courantes — utiliser ces commandes exactes

### Ajouter un nouvel écran
Créer le fichier dans app/ en suivant la structure du groupe de routes. Exporter un composant React par défaut.
Ajouter un <Link href="/path"> ou router.push('/path') pour y naviguer.
S'il requiert une authentification, envelopper l'export racine avec <SessionGuard />.

### Ajouter une nouvelle table Supabase
1. Créer une migration : supabase migration new <name>
2. Ajouter la DDL de la table et les politiques RLS dans supabase/migrations/<timestamp>_<name>.sql
3. Appliquer localement : supabase db push
4. Régénérer les types : supabase gen types typescript --local > types/supabase.ts
5. Commiter la migration et les types mis à jour ensemble.

### S'abonner au realtime Supabase dans un composant
Utiliser le hook générique :
  const { data } = useRealtime<MyType>('table_name', `column=eq.${id}`)
Le hook dans hooks/useRealtime.ts gère automatiquement le cycle d'abonnement/désabonnement.

### Déclencher un build EAS
Development (simulateur) : eas build --profile development --platform ios
Preview (QR interne) :     eas build --profile preview --platform all
Production (boutiques) :   eas build --profile production --platform all

### Publier une mise à jour OTA
Canal staging :     eas update --channel staging --message "fix: ..."
Canal production :  eas update --channel production --message "fix: ..."
Ne jamais pousser une OTA en production sans l'avoir testée sur staging au préalable.

### Exécuter les tests E2E
Flux unique :  maestro test maestro/flows/auth-login.yaml
Tous les flux : maestro test maestro/flows/

### Vérifier TypeScript
npx tsc --noEmit

### Linting
npx eslint . --ext .ts,.tsx

## Conventions

- Alias de chemin : utiliser @/ pour les imports depuis la racine du projet (ex. @/lib/supabase, @/components/ui/Button)
- Variables d'environnement : préfixer avec EXPO_PUBLIC_ pour l'accès côté client ; les variables serveur uniquement (clé de rôle de service) vont dans les secrets EAS, jamais dans app.json extra
- Types Supabase : types/supabase.ts est auto-généré — ne jamais le modifier manuellement ; régénérer après chaque migration
- Nommage des composants : fichiers en PascalCase ; l'export par défaut correspond au nom du fichier (Button.tsx → export default function Button)
- Stores Zustand : un fichier par domaine dans stores/ ; toujours exporter des hooks sélecteurs typés, pas le store brut
- Clés React Query : définir comme tableaux const dans le fichier du hook — pattern [resource, id] ; invalider par préfixe après les mutations
- Liens profonds : le scheme est défini dans app.json sous "scheme" ; tout le parsing des liens profonds passe par lib/deep-links.ts

## Pattern Zustand — utiliser exactement ceci

```ts
// stores/auth.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Session } from '@supabase/supabase-js'

interface AuthState {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
    }),
    { name: 'auth-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
)
```

## Gestion des liens profonds

Toutes les routes sont disponibles en liens profonds via le scheme de l'application (voir `scheme` dans app.json).
La config Linking se trouve dans lib/deep-links.ts. Pour gérer un nouveau chemin de lien profond :
1. Ajouter le chemin à la structure de fichiers Expo Router (il devient automatiquement une route)
2. Si le chemin nécessite un parsing de paramètres au-delà du comportement par défaut d'Expo Router, ajouter un cas dans lib/deep-links.ts
3. Tester avec : npx uri-scheme open "myapp://path/to/screen" --ios

## Ce qu'il ne faut pas faire

- Ne pas importer supabase createClient depuis @supabase/supabase-js directement dans les composants — toujours utiliser lib/supabase.ts
- Ne pas stocker de secrets dans app.json extra ou dans .env.local commité — utiliser les secrets EAS pour les clés de service
- Ne pas modifier manuellement types/supabase.ts — régénérer avec supabase gen types
- Ne pas utiliser React Navigation directement — toute la navigation passe par Expo Router (router.push, <Link>)
- Ne pas publier une mise à jour EAS Update en production sans test sur staging au préalable
- Ne pas omettre les politiques RLS sur les nouvelles tables Supabase — chaque table doit avoir la sécurité au niveau des lignes activée
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/my-app"
      ]
    },
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": {
        "SENTRY_AUTH_TOKEN": "${SENTRY_AUTH_TOKEN}",
        "SENTRY_ORG": "${SENTRY_ORG}",
        "SENTRY_PROJECT": "${SENTRY_PROJECT}"
      }
    }
  }
}
```

## Hooks recommandés

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'EXT=\"${CLAUDE_TOOL_INPUT_FILE_PATH##*.}\"; if [[ \"$EXT\" == \"ts\" || \"$EXT\" == \"tsx\" ]]; then npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"supabase/migrations/\"; then echo \"[HOOK] Migration écrite — exécuter : supabase db push && supabase gen types typescript --local > types/supabase.ts\" >&2; fi'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"eas update.*(--channel production|production)\"; then echo \"[HOOK] Mise à jour EAS en production détectée — confirmer que staging a été testé en premier (eas update --channel staging).\" >&2; fi'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx uitkit add skill mobile/expo-router-screen
npx uitkit add skill mobile/supabase-realtime
npx uitkit add skill mobile/eas-build
npx uitkit add skill mobile/revenuecat-paywall
npx uitkit add skill mobile/deep-link-handler
npx uitkit add skill mobile/push-notifications
npx uitkit add skill productivity/code-review
npx uitkit add skill git/pr-description
npx uitkit add skill productivity/test-generator
```

## Voir aussi

- [Guide de développement mobile](../guides/mobile-expo-react-native.md)
- [Workflow EAS Build et Update](../workflows/eas-build-update.md)
