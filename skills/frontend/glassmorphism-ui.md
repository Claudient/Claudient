---
name: glassmorphism-ui
description: "Implement premium frosted glass (glassmorphism) interfaces using backdrop filters, translucent borders, and shadows"
updated: 2026-06-23
---

# Glassmorphism UI Skill

## When to activate

- Building premium dashboards, overlay modals, settings panels, or floating tooltips.
- Designing landing pages with rich, vibrant gradient backgrounds.
- Implementing modern, high-contrast layouts.

## When NOT to use

- Building highly dense tables, raw text documentation, or enterprise search results.
- Environments requiring maximum legacy browser compatibility (where backdrop-filter is unsupported).

## Instructions

To construct a perfect glassmorphism component, apply the four fundamental design layers:

### 1. Translucent Background
Apply a semi-transparent base color to allow the underlying background to bleed through slightly:
- Tailwind CSS: `bg-white/70` or `bg-slate-900/60`

### 2. Backdrop Blur
Inject blur filters to soften underlying textures and guarantee readable text contrast:
- Tailwind CSS: `backdrop-blur-md` or `backdrop-blur-lg`

### 3. Hairline Translucent Border
Add a subtle highlight border on the top and left to simulate glass depth and light refraction:
- Tailwind CSS: `border border-white/20` (light backgrounds) or `border border-white/10` (dark backgrounds)

### 4. Shadow Depth
Simulate floating elevation with soft, spread-out box shadows:
- Tailwind CSS: `shadow-lg` or `shadow-xl`

---

## Example (Tailwind CSS)

```html
<div class="relative bg-gradient-to-tr from-brand-orange to-brand-red p-12">
  <!-- Frosted Glass Card -->
  <div class="rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 p-6 shadow-lg max-w-sm">
    <h3 class="text-lg font-bold text-ink">Glassmorphism Card</h3>
    <p class="text-sm text-body mt-2">Elegant frosted glass aesthetic with high text contrast and lighting depth.</p>
  </div>
</div>
```
