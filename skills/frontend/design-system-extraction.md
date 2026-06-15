---
name: design-system-extraction
description: "Design system extraction: extract design tokens from Figma/designs, generate component libraries, theme mapping, color palette analysis, typography scaling, and design-to-code bridging"
updated: 2026-06-13
---

# Design System Extraction — Design-to-Code Bridge

## When to activate
- Extracting design tokens (colors, spacing, typography, shadows) from Figma or design files
- Generating a component library scaffold from an existing design system
- Creating a theme system (light/dark mode, brand variants) from design specifications
- Auditing an existing codebase against its design system for consistency
- Bridging the gap between designers (Figma) and developers (CSS/Tailwind/Styled Components)
- When the user says "match the design" or "extract the design system from this"

## When NOT to use
- Creating designs from scratch (this extracts from existing designs, not creates them)
- Simple color palette generation without a design source
- When the design system is already fully implemented in code
- One-off styling tasks that don't need systematic token extraction

## Instructions

### 1. Design Token Extraction Pipeline

```
Figma Design / Screenshot / Style Guide
    │
    ▼
[Step 1: Identify] ──── Extract raw values (hex colors, px sizes, font families)
    │
    ▼
[Step 2: Normalize] ─── Convert to design tokens (semantic names, relative units)
    │
    ▼
[Step 3: Structure] ──── Organize into token categories (color, spacing, type, shadow)
    │
    ▼
[Step 4: Generate] ───── Output code (CSS variables, Tailwind config, JS objects)
```

### 2. Color Token Extraction

**From raw values to semantic tokens:**

```yaml
# Raw extraction (what you see in Figma)
raw_colors:
  - "#2563EB"  # used in buttons, links
  - "#1E293B"  # used in headings
  - "#64748B"  # used in secondary text
  - "#F8FAFC"  # used in backgrounds
  - "#EF4444"  # used in error states

# Normalized tokens (semantic naming)
color_tokens:
  brand:
    primary: "#2563EB"        # → --color-brand-primary
    primary-hover: "#1D4ED8"  # → calculated 10% darker
    primary-light: "#DBEAFE"  # → calculated 10% opacity
    
  text:
    default: "#1E293B"        # → --color-text-default
    secondary: "#64748B"      # → --color-text-secondary
    disabled: "#94A3B8"       # → --color-text-disabled
    
  surface:
    default: "#FFFFFF"        # → --color-surface-default
    elevated: "#F8FAFC"       # → --color-surface-elevated
    overlay: "rgba(0,0,0,0.5)" # → --color-surface-overlay
    
  feedback:
    success: "#22C55E"        # → --color-feedback-success
    warning: "#F59E0B"        # → --color-feedback-warning
    error: "#EF4444"          # → --color-feedback-error
```

### 3. Typography Token Extraction

```yaml
typography_tokens:
  font_family:
    heading: "'Inter', -apple-system, sans-serif"
    body: "'Inter', -apple-system, sans-serif"
    mono: "'JetBrains Mono', 'Fira Code', monospace"
    
  font_size:
    xs: "0.75rem"     # 12px
    sm: "0.875rem"    # 14px
    base: "1rem"      # 16px
    lg: "1.125rem"    # 18px
    xl: "1.25rem"     # 20px
    2xl: "1.5rem"     # 24px
    3xl: "1.875rem"   # 30px
    4xl: "2.25rem"    # 36px
    
  font_weight:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
    
  line_height:
    tight: 1.25       # headings
    normal: 1.5       # body
    relaxed: 1.75     # long-form reading
    
  letter_spacing:
    tight: "-0.025em"   # large headings
    normal: "0"          # body
    wide: "0.025em"      # uppercase labels
```

### 4. Spacing & Layout Tokens

```yaml
spacing_tokens:
  # 4px base scale
  0: "0"
  1: "0.25rem"   # 4px
  2: "0.5rem"    # 8px
  3: "0.75rem"   # 12px
  4: "1rem"      # 16px
  5: "1.25rem"   # 20px
  6: "1.5rem"    # 24px
  8: "2rem"      # 32px
  10: "2.5rem"   # 40px
  12: "3rem"     # 48px
  16: "4rem"     # 64px
  20: "5rem"     # 80px

layout_tokens:
  container:
    sm: "640px"
    md: "768px"
    lg: "1024px"
    xl: "1280px"
  
  border_radius:
    none: "0"
    sm: "0.25rem"    # 4px — buttons, inputs
    md: "0.5rem"     # 8px — cards
    lg: "1rem"       # 16px — modals
    full: "9999px"   # pills, avatars
    
  shadow:
    sm: "0 1px 2px rgba(0,0,0,0.05)"
    md: "0 4px 6px rgba(0,0,0,0.07)"
    lg: "0 10px 15px rgba(0,0,0,0.1)"
```

### 5. Code Generation Outputs

**CSS Custom Properties:**
```css
:root {
  /* Colors */
  --color-brand-primary: #2563EB;
  --color-text-default: #1E293B;
  --color-text-secondary: #64748B;
  --color-surface-default: #FFFFFF;
  --color-surface-elevated: #F8FAFC;
  
  /* Typography */
  --font-family-heading: 'Inter', -apple-system, sans-serif;
  --font-size-base: 1rem;
  --font-weight-semibold: 600;
  
  /* Spacing */
  --space-4: 1rem;
  --space-8: 2rem;
  
  /* Shadows */
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --radius-md: 0.5rem;
}
```

**Tailwind config:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { primary: '#2563EB', hover: '#1D4ED8' },
        surface: { default: '#FFFFFF', elevated: '#F8FAFC' },
      },
      fontFamily: {
        heading: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0,0,0,0.07)',
        modal: '0 10px 15px rgba(0,0,0,0.1)',
      },
    },
  },
};
```

### 6. Dark Mode Theme Generation

```css
/* Auto-generate dark mode from light tokens */
:root {
  --color-surface-default: #FFFFFF;
  --color-text-default: #1E293B;
}

[data-theme="dark"] {
  --color-surface-default: #0F172A;     /* inverted luminance */
  --color-text-default: #F1F5F9;       /* inverted luminance */
  --color-brand-primary: #60A5FA;      /* lighter shade for dark bg */
}
```

### 7. Design Audit Checklist

Compare codebase against extracted tokens:

```yaml
audit:
  colors:
    - check: "All hex values in CSS match a defined token"
    - check: "No hardcoded colors outside the token system"
    - check: "Color contrast ratios meet WCAG AA (4.5:1 text, 3:1 large)"
    
  typography:
    - check: "Font sizes use token scale (no arbitrary px values)"
    - check: "Heading hierarchy follows defined scale (h1→h6)"
    - check: "Line heights match token definitions"
    
  spacing:
    - check: "Padding/margin use spacing scale"
    - check: "No magic numbers (13px, 17px, etc.)"
    - check: "Consistent gap values in flex/grid layouts"
    
  consistency:
    - check: "Button sizes match across all pages"
    - check: "Card border-radius is uniform"
    - check: "Shadow depth matches elevation hierarchy"
```

## Example

**Extracting a design system from a Figma screenshot:**

```
User: "Here's a screenshot of our Figma design system page. Extract all
       the tokens and generate our Tailwind config."

Agent:
1. Analyze screenshot — identify color swatches, type scale, spacing examples
2. Extract raw values:
   - 6 brand colors (primary through 50-900 shades)
   - 4 neutral grays for text
   - Type scale: 12px, 14px, 16px, 20px, 24px, 32px
   - Border radius: 4px (buttons), 8px (cards), 16px (modals)
3. Normalize to semantic tokens
4. Generate:
   - tailwind.config.js with extended theme
   - tokens.css with CSS custom properties
   - tokens.json for JavaScript consumption
5. Report: 42 tokens extracted, 3 WCAG contrast warnings on light gray text
```

## Anti-Patterns

- **Magic numbers:** Using 13px padding because "it looked right" — always snap to the spacing scale
- **Token explosion:** Creating 200 color tokens when 20 suffice — group by semantic purpose, not by every shade
- **Skipping dark mode:** Generating tokens without considering dark mode — always plan the dark variant upfront
- **Ignoring accessibility:** Extracting colors without checking contrast ratios — validate WCAG AA compliance during extraction
- **Figma-code drift:** Extracting once and never syncing — establish a process for re-extraction when designs update
- **Over-tokenizing:** Tokenizing every single CSS property — focus on values that change across themes (colors, radii, shadows), not structural values (display, position)
