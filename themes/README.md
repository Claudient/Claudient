# Claude Code Themes

A collection of 10 hand-crafted Claude Code themes with authentic color palettes from the most popular developer color schemes.

## Themes Included

| File | Name | Base | Accent |
|---|---|---|---|
| `dracula.json` | Dracula | dark | `#bd93f9` purple |
| `nord.json` | Nord | dark | `#88c0d0` frost blue |
| `tokyo-night.json` | Tokyo Night | dark | `#7aa2f7` blue |
| `catppuccin.json` | Catppuccin Mocha | dark | `#cba6f7` lavender |
| `gruvbox.json` | Gruvbox | dark | `#d3869b` pink |
| `solarized-dark.json` | Solarized Dark | dark | `#268bd2` blue |
| `solarized-light.json` | Solarized Light | light | `#268bd2` blue |
| `monokai.json` | Monokai | dark | `#ae81ff` purple |
| `rose-pine.json` | Rose Pine | dark | `#c4a7e7` iris |
| `claudient-brand.json` | Claudient Brand | dark | `#ff8c00` orange |

## How to Install

### Step 1 — Copy the theme file(s) to your Claude themes directory

```bash
# Copy a single theme
cp dracula.json ~/.claude/themes/

# Or copy all themes at once
cp *.json ~/.claude/themes/
```

If `~/.claude/themes/` does not exist yet, create it first:

```bash
mkdir -p ~/.claude/themes
```

### Step 2 — Apply the theme inside Claude Code

Run the theme command inside any Claude Code session:

```
/theme
```

This opens the theme picker. Select your installed theme from the list. The change takes effect immediately — no restart needed.

### Step 3 — Verify

Your prompt border, diff colors, plan mode highlights, and error/success indicators will all reflect the theme palette.

## Color Tokens Reference

Each theme overrides the following Claude Code color tokens:

| Token | Purpose |
|---|---|
| `claude` | Claude's response text and primary accent |
| `text` | General foreground text |
| `inactive` | Dimmed / secondary UI elements |
| `error` | Error messages and destructive diff lines |
| `success` | Success messages and added diff lines |
| `warning` | Warnings and caution highlights |
| `diffAdded` | Added lines in diffs |
| `diffRemoved` | Removed lines in diffs |
| `promptBorder` | Border around the input prompt |
| `planMode` | Highlight color when plan mode is active |

## Creating Your Own Theme

Copy any `.json` file as a starting point and change the hex values. The `base` field must be one of:

- `dark`
- `light`
- `dark-daltonized`
- `light-daltonized`

The `overrides` object accepts any subset of available color tokens — only the tokens you include are overridden; the rest inherit from the base theme.

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
