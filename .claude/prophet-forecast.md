# The Prophet: Predictive Outage & Tech Debt Report

Generated: 2026-06-19T08:21:48.295Z | Target Workspace: `/Users/tushar/Desktop/Claudient`

This report ranks codebase files by **Outage Risk Score**, which is calculated as:
$$\text{Risk Score} = \text{Git Churn (last 100 commits)} \times \frac{\text{Line Count}}{100}$$

## 📊 Top Hotspot Risk Ranking

| Rank | File Path | Churn (Edits) | Line Count | Outage Risk Score |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `scripts/cli.js` | 14 | 2751 | **385.14** |
| 2 | `site/src/components/os/apps/CliApp.tsx` | 5 | 1137 | **56.85** |
| 3 | `site/src/components/os/apps/StacksApp.tsx` | 4 | 702 | **28.08** |
| 4 | `site/src/components/os/apps/ToolkitApp.tsx` | 5 | 559 | **27.95** |
| 5 | `site/src/components/os/apps/HomeApp.tsx` | 8 | 342 | **27.36** |
| 6 | `site/src/components/os/apps/ShowcaseApp.tsx` | 4 | 461 | **18.44** |
| 7 | `scripts/test-cli.js` | 7 | 211 | **14.77** |
| 8 | `site/src/components/os/apps.ts` | 7 | 208 | **14.56** |
| 9 | `site/src/components/os/apps/InstallApp.tsx` | 5 | 231 | **11.55** |
| 10 | `site/src/components/os/apps/McpApp.tsx` | 3 | 320 | **9.6** |
| 11 | `site/src/components/os/apps/PricingApp.tsx` | 2 | 465 | **9.3** |
| 12 | `site/src/components/os/MenuBar.tsx` | 9 | 102 | **9.18** |
| 13 | `site/src/components/os/apps/GuidesApp.tsx` | 3 | 267 | **8.01** |
| 14 | `scripts/build-catalog.js` | 3 | 258 | **7.74** |
| 15 | `site/src/components/os/AppContent.tsx` | 7 | 86 | **6.02** |
| 16 | `scripts/build-plugins.js` | 1 | 564 | **5.64** |
| 17 | `scripts/visualize-graph.js` | 1 | 491 | **4.91** |
| 18 | `site/src/components/os/types.ts` | 7 | 67 | **4.69** |
| 19 | `site/src/components/os/apps/SwarmApp.tsx` | 1 | 425 | **4.25** |
| 20 | `site/src/components/os/apps/CommunityApp.tsx` | 2 | 192 | **3.84** |
| 21 | `site/src/components/os/apps/SkillsApp.tsx` | 3 | 125 | **3.75** |
| 22 | `professional-stacks/ai_product_manager_stack/commands/ux-audit.py` | 1 | 333 | **3.33** |
| 23 | `scripts/council.js` | 1 | 321 | **3.21** |
| 24 | `site/src/components/os/apps/ExamplesApp.tsx` | 1 | 301 | **3.01** |
| 25 | `site/src/components/os/apps/AgentsApp.tsx` | 2 | 141 | **2.82** |
| 26 | `site/src/components/os/apps/HooksApp.tsx` | 2 | 137 | **2.74** |
| 27 | `scripts/translate-assets.js` | 1 | 273 | **2.73** |
| 28 | `scripts/incident.js` | 2 | 131 | **2.62** |
| 29 | `scripts/oracle.js` | 1 | 253 | **2.53** |
| 30 | `scripts/generate-refresh-report.js` | 1 | 249 | **2.49** |
| 31 | `scripts/audit-certified.js` | 1 | 249 | **2.49** |
| 32 | `scripts/learn.js` | 1 | 245 | **2.45** |
| 33 | `site/src/components/os/apps/MarketplaceApp.tsx` | 1 | 231 | **2.31** |
| 34 | `scripts/tribunal.js` | 1 | 214 | **2.14** |
| 35 | `scripts/sweep.js` | 1 | 202 | **2.02** |
| 36 | `scripts/bisect.js` | 1 | 192 | **1.92** |
| 37 | `scripts/permissions.js` | 1 | 189 | **1.89** |
| 38 | `scripts/validate-catalog.js` | 1 | 185 | **1.85** |
| 39 | `site/src/components/os/apps/BenchmarksApp.tsx` | 1 | 184 | **1.84** |
| 40 | `scripts/chart.js` | 1 | 179 | **1.79** |
| 41 | `scripts/certify-stack.js` | 1 | 176 | **1.76** |
| 42 | `site/src/components/os/apps/CommandsApp.tsx` | 1 | 174 | **1.74** |
| 43 | `site/src/components/os/apps/PersonasApp.tsx` | 2 | 85 | **1.7** |
| 44 | `site/src/components/os/apps/RulesApp.tsx` | 2 | 85 | **1.7** |
| 45 | `site/src/components/os/apps/PluginsApp.tsx` | 2 | 84 | **1.68** |
| 46 | `scripts/nightshift.js` | 1 | 160 | **1.6** |
| 47 | `scripts/validate-stacks.js` | 1 | 156 | **1.56** |
| 48 | `scripts/enforce.js` | 1 | 148 | **1.48** |
| 49 | `site/src/components/os/ClaudientOS.tsx` | 2 | 73 | **1.46** |
| 50 | `scripts/prophet.js` | 1 | 144 | **1.44** |
| 51 | `scripts/jit.js` | 1 | 143 | **1.43** |
| 52 | `scripts/handoff.js` | 1 | 140 | **1.4** |
| 53 | `scripts/generate-benchmarks.js` | 1 | 140 | **1.4** |
| 54 | `scripts/tdd.js` | 1 | 138 | **1.38** |
| 55 | `site/src/components/os/apps/AboutApp.tsx` | 2 | 69 | **1.38** |
| 56 | `site/src/components/os/Window.tsx` | 1 | 132 | **1.32** |
| 57 | `site/src/components/os/apps/CompareApp.tsx` | 1 | 126 | **1.26** |
| 58 | `scripts/spec.js` | 1 | 124 | **1.24** |
| 59 | `site/src/components/os/apps/WorkflowsApp.tsx` | 1 | 117 | **1.17** |
| 60 | `scripts/add-descriptions.js` | 1 | 117 | **1.17** |
| 61 | `site/src/components/os/useWindows.ts` | 1 | 116 | **1.16** |
| 62 | `scripts/repair.js` | 1 | 111 | **1.11** |
| 63 | `scripts/commit.js` | 1 | 100 | **1** |
| 64 | `scripts/checkpoint.js` | 1 | 97 | **0.97** |
| 65 | `scripts/ci.js` | 1 | 91 | **0.91** |
| 66 | `scripts/documentation.js` | 1 | 81 | **0.81** |
| 67 | `scripts/chaos.js` | 1 | 71 | **0.71** |
| 68 | `scripts/caveman.js` | 1 | 68 | **0.68** |
| 69 | `scripts/auto-frontmatter.js` | 1 | 58 | **0.58** |
| 70 | `site/src/components/os/apps/ui.tsx` | 1 | 45 | **0.45** |
| 71 | `site/src/components/os/Taskbar.tsx` | 1 | 39 | **0.39** |
| 72 | `site/src/components/os/Desktop.tsx` | 1 | 33 | **0.33** |
| 73 | `site/src/components/os/apps/TrashApp.tsx` | 1 | 27 | **0.27** |
| 74 | `site/src/utils/cn.ts` | 1 | 7 | **0.07** |
| 75 | `site/src/components/os/apps/EnterpriseApp.tsx` | 2 | 0 | **0** |
| 76 | `ai_product_manager_stack/commands/ux-audit.py` | 1 | 0 | **0** |
| 77 | `site/src/content.config.ts` | 1 | 0 | **0** |
| 78 | `site/src/data/featured.ts` | 1 | 0 | **0** |
| 79 | `site/src/lib/content.ts` | 1 | 0 | **0** |
| 80 | `site/src/lib/og.ts` | 1 | 0 | **0** |
| 81 | `site/src/lib/seo.ts` | 1 | 0 | **0** |
| 82 | `site/src/pages/[lang]/raw/[collection]/[...slug].md.ts` | 1 | 0 | **0** |
| 83 | `site/src/pages/llms.txt.ts` | 1 | 0 | **0** |
| 84 | `site/src/pages/og/[collection]/[...slug].svg.ts` | 1 | 0 | **0** |
| 85 | `site/src/pages/og/default.svg.ts` | 1 | 0 | **0** |
| 86 | `site/src/pages/raw/[collection]/[...slug].md.ts` | 1 | 0 | **0** |
| 87 | `site/src/pages/rss-agents.xml.ts` | 1 | 0 | **0** |
| 88 | `site/src/pages/rss-guides.xml.ts` | 1 | 0 | **0** |
| 89 | `site/src/pages/rss-hooks.xml.ts` | 1 | 0 | **0** |
| 90 | `site/src/pages/rss-mcp.xml.ts` | 1 | 0 | **0** |
| 91 | `site/src/pages/rss-skills.xml.ts` | 1 | 0 | **0** |
| 92 | `site/src/pages/rss-workflows.xml.ts` | 1 | 0 | **0** |
| 93 | `site/src/pages/rss.xml.ts` | 1 | 0 | **0** |
| 94 | `site/src/pages/sitemap-index.xml.ts` | 1 | 0 | **0** |

## 💡 Key Recommendations
1. **Refactor `scripts/cli.js`**: High risk score indicates excessive complexity combined with frequent modifications. Split this module into smaller, isolated components to reduce regression potential.
2. **Increase Test Coverage**: Add unit tests covering high-churn files to prevent future outages during rapid changes.
