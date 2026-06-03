# Claude Code Keybindings Presets

Four ready-to-use keybinding presets for Claude Code, each targeting a different workflow style.

---

## Presets

| File | Style | Best for |
|---|---|---|
| `vim.json` | Vim-style navigation | Developers who live in vim/neovim |
| `emacs.json` | Emacs muscle memory | Emacs users, GNU readline habits |
| `ergonomic.json` | Alt-key chords, less pinky strain | Extended sessions, RSI prevention |
| `power-user.json` | Fast access to AI controls | Heavy Claude Code users, model switching |

---

## How to Install

Claude Code loads keybindings from `~/.claude/keybindings.json`. To apply a preset, merge it into that file.

### Option 1 — Use a preset directly (replaces existing keybindings)

```bash
cp vim.json ~/.claude/keybindings.json
```

### Option 2 — Merge a preset into existing keybindings (recommended)

If you already have custom bindings you want to keep, manually merge the `bindings` array from the preset into your `~/.claude/keybindings.json`.

```bash
# Back up first
cp ~/.claude/keybindings.json ~/.claude/keybindings.json.bak

# Then open both files and merge the bindings arrays manually
```

### Option 3 — Cherry-pick individual bindings

Copy only the context blocks you want from a preset into your existing `~/.claude/keybindings.json`.

Changes take effect the next time you open Claude Code. No restart of any daemon is needed.

---

## Keybindings File Format

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+s": null
      }
    }
  ]
}
```

- Set a key to `null` to unbind it entirely.
- Chords are space-separated: `"ctrl+x ctrl+e"` means press Ctrl+X then Ctrl+E.
- Modifiers: `ctrl`, `shift`, `alt` (alias: `opt`), `cmd` (alias: `super`).

---

## Contexts

| Context | When it applies |
|---|---|
| `Global` | Always active |
| `Chat` | Main chat input is focused |
| `Scroll` | Scrolling through the transcript |
| `Autocomplete` | Autocomplete menu is open |
| `Confirmation` | A yes/no confirmation prompt is shown |
| `Transcript` | Transcript view is open |
| `HistorySearch` | History search overlay is active |
| `ModelPicker` | Model selection menu is open |

---

## Action Reference

### app — always available
| Action | Description |
|---|---|
| `app:interrupt` | Stop the current operation |
| `app:toggleTodos` | Show/hide the todo panel |
| `app:toggleTranscript` | Show/hide the transcript view |

### chat — Chat context
| Action | Description |
|---|---|
| `chat:submit` | Send the message |
| `chat:newline` | Insert a newline without submitting |
| `chat:cancel` | Cancel current input |
| `chat:clearInput` | Clear the input field |
| `chat:cycleMode` | Cycle between input modes |
| `chat:modelPicker` | Open model selection |
| `chat:fastMode` | Toggle fast/Haiku mode |
| `chat:thinkingToggle` | Toggle extended thinking |
| `chat:externalEditor` | Open input in $EDITOR |
| `chat:undo` | Undo last input change |

### scroll — Scroll context
| Action | Description |
|---|---|
| `scroll:lineUp` | Scroll up one line |
| `scroll:lineDown` | Scroll down one line |
| `scroll:top` | Jump to top |
| `scroll:bottom` | Jump to bottom |
| `scroll:pageUp` | Scroll up one page |
| `scroll:pageDown` | Scroll down one page |

### confirmation — Confirmation context
| Action | Description |
|---|---|
| `confirmation:confirm` | Accept the confirmation |
| `confirmation:deny` | Reject the confirmation |

### historySearch — HistorySearch context
| Action | Description |
|---|---|
| `historySearch:up` | Previous history match |
| `historySearch:down` | Next history match |
| `historySearch:cancel` | Close history search |

### autocomplete — Autocomplete context
| Action | Description |
|---|---|
| `autocomplete:up` | Previous suggestion |
| `autocomplete:down` | Next suggestion |
| `autocomplete:cancel` | Dismiss autocomplete |

### modelPicker — ModelPicker context
| Action | Description |
|---|---|
| `modelPicker:up` | Previous model |
| `modelPicker:down` | Next model |
| `modelPicker:cancel` | Close model picker |

---

## Reserved Keys (cannot be rebound)

- `Ctrl+C` — hard interrupt / copy
- `Ctrl+D` — EOF / exit
- `Ctrl+M` — Enter / submit (alias)

Attempting to bind these will have no effect or may cause unexpected behavior.

---

## Tips

- The `vim.json` preset pairs best with `editorMode: "vim"` set in Claude Code settings (`/config`).
- The `emacs.json` chord system (`ctrl+x ctrl+e`, etc.) mirrors Emacs conventions but is limited to Claude Code's available action set.
- The `ergonomic.json` preset moves nearly everything to `alt+<letter>` to keep fingers on the home row.
- The `power-user.json` preset uses `ctrl+shift+<key>` chords to avoid conflicts with terminal emulator defaults.

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
