---
name: responsive-grids
description: "Design robust, fluid multi-column grid layouts that scale gracefully from mobile devices to desktop viewports"
updated: 2026-06-23
---

# Responsive Grids Skill

## When to activate

- Designing web page layouts, dashboards, marketing galleries, and pricing matrices.
- Aligning dynamic content blocks that shift column configurations on resizing.

## When NOT to use

- Single-column standard articles, code listings, or basic form rows.
- Absolute or canvas-based pixel positioning (like desktop simulations).

## Instructions

Implement responsive design systems using CSS Grid with mobile-first columns:

### 1. Mobile-First Columns
Always declare single-column layouts by default to fit narrow mobile displays, and scale columns up inside media queries (`sm:`, `md:`, `lg:`):
- Tailwind CSS: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

### 2. Auto-Fit Column Patterns
For dynamic lists where column count adjusts automatically based on card sizes without hardcoded media queries:
- Tailwind CSS: `grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]`

### 3. Gutters and Spacing
Keep grid spacing proportional to viewport size to prevent tight margins on mobile or huge blank slots on desktop:
- Tailwind CSS: `gap-4 md:gap-6`

---

## Example (Tailwind CSS)

```html
<!-- Grid scaling from 1 col on mobile, 2 on tablet, and 4 on desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
  <div class="rounded-xl border border-hairline p-4">Card Content 1</div>
  <div class="rounded-xl border border-hairline p-4">Card Content 2</div>
  <div class="rounded-xl border border-hairline p-4">Card Content 3</div>
  <div class="rounded-xl border border-hairline p-4">Card Content 4</div>
</div>
```
