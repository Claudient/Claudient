# [EDIT ME: Stack Name]

[EDIT ME: 1-2 sentence description of what this stack does and who it's for. Example: "Professional toolkit for security engineers defending cloud infrastructure. Includes threat analysis, incident response, and compliance automation."]

## Quick Start

1. **Load the stack:** In Claude Code, activate this stack by role or reference the skills directly.

2. **Core skills:**
   - `[skill-name]` — [Brief description of what it does]
   - `[skill-name]` — [Brief description of what it does]
   - `[skill-name]` — [Brief description of what it does]

3. **Run a command:** (if applicable)
   ```bash
   ./commands/[command-name].sh --[flag] "[value]"
   ```

4. **Enable hooks:** (if applicable)
   - `[hook-name].sh` — [Brief description of trigger and action]

## Directory Structure

```
[stack-name]/
├── CLAUDE.md                 # Stack identity, framework, domain rules
├── README.md                 # This file
├── skills/                   # Reusable domain-specific skills
│   ├── [skill-1]/SKILL.md
│   ├── [skill-2]/SKILL.md
│   └── [skill-3]/SKILL.md
├── commands/                 # Executable workflows (optional)
│   └── [command].sh
├── hooks/                    # Event-triggered automations (optional)
│   └── [hook].sh
└── mcp/                      # AI model connections (optional)
    └── [connection].md
```

## Skill Reference

### [Skill Name 1]
**When:** [When to use this skill]
```
Input: [What information you provide]
Output: [What you get back]
Time: [X-Y hours]
```

### [Skill Name 2]
**When:** [When to use this skill]
```
Input: [What information you provide]
Output: [What you get back]
Time: [X-Y hours]
```

### [Skill Name 3]
**When:** [When to use this skill]
```
Input: [What information you provide]
Output: [What you get back]
Time: [X-Y hours]
```

## Commands

[EDIT ME: If you have commands, document them with examples. Example:]

### `[command-name].sh`
```bash
./commands/[command-name].sh --[flag1] "[value]" --[flag2] "[value]"
```
[Brief description of what it does and sample output.]

[Remove this section if you don't have commands.]

## Hooks

[EDIT ME: If you have hooks, document when they trigger and what they do. Example:]

### `[hook-name].sh`
- **Schedule:** [When it runs]
- **Action:** [What it does]
- **Output:** [Where output goes]
- **Enable:** Add to settings.json hooks configuration

[Remove this section if you don't have hooks.]

## Best Practices

[EDIT ME: 2-3 best practices for using this stack effectively. Example:

1. **Always validate assumptions** — Before acting on analysis output, verify with primary data
2. **Document decisions** — Record why you chose option A over B for future reference
3. **Iterate quickly** — Use the framework iteratively; don't wait for perfect information]

## Example Workflow

**Scenario:** [EDIT ME: Describe a realistic scenario]

```
1. [Step 1 — what happens]
2. [Step 2 — which skill to activate]
3. [Step 3 — what output you get]
4. [Step 4 — what action to take next]
5. [Final outcome]
```

[Brief explanation of why this workflow makes sense and when you'd repeat it.]

## Glossary

[EDIT ME: Define domain-specific terms used in this stack. Example:

- **[Term 1]:** Definition
- **[Term 2]:** Definition
- **[Term 3]:** Definition]

## Support & Contribution

This stack is maintained as part of the UitKit knowledge system. For bugs, questions, or contributions:

- **GitHub:** [Link to repository, if public]
- **Issues:** Report problems or suggest improvements
- **Discussions:** Ask questions in the UitKit community forum

## Disclaimer

Community-contributed. Maintained by [EDIT ME: Your Name]. For support or maintenance questions, contact the author directly.

---

**Last updated:** [EDIT ME: Date] | **Status:** [Production/Development] | **Model:** Haiku/Sonnet
