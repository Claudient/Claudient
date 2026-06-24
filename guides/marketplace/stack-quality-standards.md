# Stack Quality Standards

This guide defines what "quality" means for a stack submitted to the Claude Code Marketplace. Use this checklist before submitting your stack.

---

## The Quality Principle

A quality stack is:
- **Focused**: Solves a specific problem or supports a specific workflow
- **Complete**: Every skill, agent, and guide is finished; no placeholders
- **Tested**: You and 2+ others have used it in real work
- **Professional**: Clear writing, correct examples, no marketing fluff
- **Maintainable**: You will respond to bug reports and feature requests

A stack is NOT:
- A collection of random tools
- Early-stage or experimental
- Untested in real scenarios
- Abandoned or unmaintained

---

## CLAUDE.md Standards

Every stack must include a `CLAUDE.md` file at the root. It defines the stack's scope, governance, and guidelines for contributors.

**Required sections:**

```markdown
# Stack Name

## What This Stack Is
[2–3 sentences. What problem does it solve? Who uses it?]

## What's Included
[List of all skills, agents, guides, hooks, workflows, MCP integrations]

## Quick Start
[Copy-paste instructions: install the stack and use one skill/agent]

## File Naming Conventions
[Document your naming rules. Reference the main repository conventions.]

## Skill File Format
[Copy from main CLAUDE.md, or state: "Follows main repository standards"]

## Agent File Format
[Copy from main CLAUDE.md, or state: "Follows main repository standards"]

## Contribution Guidelines
[If you accept outside PRs: review process, standards, how to propose changes]

## When to Contribute
[Who can contribute, and how to propose new skills/agents for the stack]
```

**Checklist:**
- [ ] CLAUDE.md exists and is complete
- [ ] No sections are left blank or marked "coming soon"
- [ ] Target audience is clearly stated
- [ ] File naming conventions are explicit

---

## Skill Standards

Every skill must follow the uitkit skill format and meet these quality criteria.

**Format (required):**
```markdown
# Skill Name

## When to activate
[Specific triggers — not "when you need X"]

## When NOT to use
[Anti-patterns and misuse cases]

## Instructions
[Concrete steps, patterns, and techniques]

## Example
[Real, working example with input and output]
```

**Quality checklist:**

1. **Clear activation triggers**
   - [ ] "When to activate" is specific, not vague
   - [ ] Example: "When debugging a Docker container crash" (good) vs. "When you need help" (bad)
   - [ ] Triggers reference real Claude Code features (slash commands, tools, hooks)

2. **Concrete instructions**
   - [ ] No hand-holding; target senior developers
   - [ ] Instructions include code blocks where relevant
   - [ ] Each step is actionable, not advisory
   - [ ] Technical jargon is used correctly
   - [ ] No generic LLM advice ("think step by step")

3. **Real examples**
   - [ ] At least one example per skill
   - [ ] Examples show input, steps, and output
   - [ ] Examples are copy-paste runnable (not pseudocode)
   - [ ] Example addresses the stated activation trigger
   - [ ] If the example requires setup, include a setup section

4. **Error handling**
   - [ ] Instructions address "what if this fails"
   - [ ] Common errors are documented with fixes
   - [ ] Edge cases are noted

5. **Length**
   - [ ] 400–800 lines per skill (sweet spot for depth without bloat)
   - [ ] Longer skills should be split into multiple focused skills

**Common failures:**
- Skill is a general tutorial, not a Claude Code specific workflow
- Example is pseudocode or incomplete
- Instructions are vague ("try different approaches")
- No clear trigger condition
- Skill duplicates another in the stack

---

## Agent Standards

Every agent must follow the uitkit agent format and meet these quality criteria.

**Format (required):**
```markdown
# Agent Name

## Purpose
[One sentence — domain or task ownership]

## Model guidance
[Haiku / Sonnet / Opus — with justification]

## Tools
[Specific tool subset; not all available tools]

## When to delegate here
[Specific trigger conditions]

## Example use case
[Concrete example of delegation]
```

**Quality checklist:**

1. **Clear purpose**
   - [ ] One-sentence purpose statement
   - [ ] Answers: "What does this agent specialize in?"
   - [ ] Not too broad ("backend specialist" is too broad; "SQL optimization specialist" is right)

2. **Justified model selection**
   - [ ] If Haiku: cost-sensitive task with simple logic
   - [ ] If Sonnet: balanced speed/cost/reasoning
   - [ ] If Opus: complex reasoning or multi-step research
   - [ ] Justification explains the choice

3. **Tight tool scope**
   - [ ] Lists 5–8 specific tools, not "all tools"
   - [ ] Tools align with the agent's purpose
   - [ ] Example: A SQL optimization agent doesn't need web search or email tools

4. **Concrete delegation triggers**
   - [ ] "When to delegate here" includes specific conditions
   - [ ] Example: "When you need to profile a slow query" (good) vs. "When database help is needed" (bad)

5. **Working example**
   - [ ] Example shows what the user asks and what the agent returns
   - [ ] Example is detailed enough to understand the agent's value
   - [ ] Example matches the stated purpose

---

## Guide Standards

Every guide must be complete, tested, and professional.

**Quality checklist:**

1. **Clear audience and purpose**
   - [ ] First sentence states who this is for
   - [ ] Clear problem statement or goal
   - [ ] "When NOT to use" section for anti-patterns

2. **Structured and navigable**
   - [ ] Headings logically progress
   - [ ] No wall-of-text sections (break into subsections)
   - [ ] Table of contents for guides over 1000 lines
   - [ ] Cross-links to related guides

3. **Concrete, actionable content**
   - [ ] Every instruction is step-by-step
   - [ ] Code blocks are syntactically correct
   - [ ] Copy-paste examples included
   - [ ] Screenshots or diagrams for visual workflows
   - [ ] No "as an exercise, implement X" — provide the implementation

4. **Tested and accurate**
   - [ ] You have completed all steps in the guide
   - [ ] All code examples work as written
   - [ ] Commands are tested on the stated OS (macOS/Linux/Windows)
   - [ ] Version numbers are current (or explicitly pinned for stability)

5. **Professional tone**
   - [ ] No marketing language ("this amazing tool")
   - [ ] No unnecessary jargon
   - [ ] Grammar and spelling are correct
   - [ ] Consistent formatting and style

6. **Length**
   - [ ] Minimum 100 lines; maximum 500 lines per guide
   - [ ] Longer topics should be split into multiple guides

---

## Workflow Standards

Every workflow must document end-to-end processes clearly.

**Quality checklist:**

1. **Clear objective**
   - [ ] First section states the workflow's goal
   - [ ] Target audience is specified
   - [ ] Time estimate to complete is provided

2. **Step-by-step process**
   - [ ] Each step is numbered and titled
   - [ ] Inputs and outputs are clear
   - [ ] Preconditions are stated upfront
   - [ ] Decision points (if/then) are diagrammed

3. **Tools and resources**
   - [ ] Every tool/skill/agent used in the workflow is listed
   - [ ] Links to full documentation provided
   - [ ] Configuration examples included

4. **Success criteria**
   - [ ] How to know the workflow succeeded
   - [ ] Common failure modes and recovery steps
   - [ ] Troubleshooting section

5. **Example walkthrough**
   - [ ] Real example showing the workflow in action
   - [ ] All inputs, outputs, and decision branches demonstrated

---

## Hook Standards

Every hook must have correct configuration and clear documentation.

**Quality checklist:**

1. **Valid JSON configuration**
   - [ ] settings.json snippet is valid JSON
   - [ ] All required fields are present
   - [ ] Trigger type is one of: `before-start`, `after-command`, `on-event`

2. **Script quality**
   - [ ] Shell script (.sh) or Python script (.py)
   - [ ] Exits with code 0 on success, non-zero on error
   - [ ] Error messages are clear
   - [ ] No unhandled exceptions

3. **Documentation**
   - [ ] Explains what the hook does
   - [ ] Explains when/why it fires
   - [ ] Setup instructions are complete
   - [ ] Uninstall instructions are provided

4. **Safety**
   - [ ] Hook does not delete files without confirmation
   - [ ] Hook is idempotent (safe to run multiple times)
   - [ ] Hook logs important actions for debugging

---

## MCP Standards

Every MCP integration must be working, safe, and documented.

**Quality checklist:**

1. **Configuration validity**
   - [ ] JSON is syntactically correct
   - [ ] All required MCP server fields are present
   - [ ] Environment variables are documented
   - [ ] Credentials/secrets are not hardcoded

2. **Integration testing**
   - [ ] MCP server has been tested with Claude Code
   - [ ] All exposed tools work as documented
   - [ ] Error handling is graceful (no silent failures)

3. **Documentation**
   - [ ] Installation instructions are step-by-step
   - [ ] Usage examples for each tool are provided
   - [ ] Setup time estimate is included (e.g., "15 minutes")
   - [ ] Troubleshooting section for common issues
   - [ ] Cost implications (if any) are disclosed

4. **Security**
   - [ ] API keys are passed via environment variables
   - [ ] No sensitive data in example configs
   - [ ] Documentation warns about rate limits or quota

---

## Grammar and Tone

All content must be professional, clear, and inclusive.

**Checklist:**

- [ ] American English spelling (or specify your region)
- [ ] No contractions in formal documentation
- [ ] Sentences are clear and concise
- [ ] No filler words ("basically," "just," "actually")
- [ ] Inclusive language (no gendered pronouns for people; use "they")
- [ ] No marketing fluff or hype
- [ ] Consistent tense (present tense for instructions, past for examples)

**Example corrections:**
- "You just need to run this command" → "Run this command"
- "This basically creates a Docker container" → "This creates a Docker container"
- "As you might know, DevOps is important" → "DevOps teams benefit from automation"

---

## Testing Requirements

Before submitting your stack, test thoroughly:

1. **Personal testing**
   - [ ] You have used every skill in real work
   - [ ] You have delegated to every agent at least once
   - [ ] You have followed every guide end-to-end
   - [ ] You have triggered every hook in a test environment
   - [ ] You have tested every MCP integration

2. **External testing**
   - [ ] 2+ people outside your team have tested the stack
   - [ ] Testers represent your target audience
   - [ ] Testers provided written feedback
   - [ ] You addressed major blockers raised by testers

3. **Edge cases**
   - [ ] You tested with different Claude Code versions (if relevant)
   - [ ] You tested on macOS, Linux, or Windows (document which)
   - [ ] You tested with different model configurations (if relevant)

---

## Pre-Submission Checklist

Before opening a pull request:

- [ ] CLAUDE.md is complete and accurate
- [ ] All skills follow the format and quality standards
- [ ] All agents have clear purpose and tool scoping
- [ ] All guides are tested and include working examples
- [ ] All workflows are documented with step-by-step instructions
- [ ] All hooks have valid JSON and documentation
- [ ] All MCP integrations are tested and documented
- [ ] submission.json is complete and accurate
- [ ] No placeholder or "coming soon" content
- [ ] Grammar and tone are professional throughout
- [ ] You have tested personally and have 2+ external testers
- [ ] README.md exists and summarizes the stack
- [ ] LICENSE file exists (CC0-1.0, MIT, Apache 2.0, or GPL 3.0)

---

## Common Rejection Reasons

Stacks are rejected or asked to revise if they:

1. Lack clear CLAUDE.md or submission.json
2. Include stub content ("more coming soon")
3. Skills lack concrete examples or runnable code
4. Agents have vague purpose or overly broad tool scope
5. Guides are incomplete or untested
6. Unclear target audience
7. No evidence of external testing
8. Quality standards not met (typos, errors, poor structure)

---

## Questions?

- Check **getting-started.md** for workflow guidance
- Check **submission-process.md** for GitHub details
- Ask in the community Slack/Discord (linked in main README)
