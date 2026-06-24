# Community Stack Review Checklist

This document defines the review process and acceptance criteria for community stack submissions to UitKit.

---

## Phase 1: Automated Validation (24 hours)

Before manual review begins, all submissions are validated by automated checks. Fix any failures before proceeding.

### File Structure
- [ ] Stack directory exists at repo root (kebab-case name)
- [ ] `CLAUDE.md` exists and is not empty
- [ ] `README.md` exists and is not empty
- [ ] `submission.json` exists at stack root
- [ ] `skills/` directory exists with at least 1 skill
- [ ] No `src/`, `bin/`, `dist/`, or runtime code directories
- [ ] All directories use kebab-case naming

### Frontmatter & Metadata
- [ ] `submission.json` is valid JSON
- [ ] All required fields are present (name, displayName, description, category, author, license, version)
- [ ] `name` field is kebab-case and unique
- [ ] `author` object has name and email (GitHub optional)
- [ ] `license` is one of: MIT, Apache-2.0, GPL-3.0, CC-BY-4.0
- [ ] `version` follows semantic versioning (e.g., 1.0.0)
- [ ] `skills` list is non-empty and matches actual skill directories

### Markdown Syntax
- [ ] All `.md` files have valid markdown syntax (no unclosed blocks, broken lists)
- [ ] No 404 links (internal links point to existing files)
- [ ] Code blocks are properly fenced (triple backticks with language specified)
- [ ] No special characters causing encoding issues

### File Naming
- [ ] All directories are kebab-case
- [ ] All files are kebab-case.md or kebab-case.sh/.py
- [ ] No uppercase letters in file/directory names
- [ ] No spaces or special characters in paths

### No Malicious Content
- [ ] No hidden scripts or binaries
- [ ] No external API calls to undisclosed services
- [ ] No credential harvesting or telemetry
- [ ] No SQL injection, code injection, or other attack vectors
- [ ] Hooks/scripts are readable and transparent

**Status after Phase 1:**
- ✅ **Pass:** Proceed to manual review
- ❌ **Fail:** Automated error report generated; submitter fixes and re-submits

---

## Phase 2: Manual Review (1-2 weeks)

Reviewers check content quality, accuracy, completeness, and alignment with UitKit standards. A single reviewer is assigned per submission.

### CLAUDE.md Completeness

All required sections must be present and substantive (not placeholders).

#### Identity & Domain
- [ ] "Identity & Domain" section clearly states the role/persona
- [ ] Domain boundaries are explicit (e.g., "AI/ML product strategy, NOT general product management")
- [ ] Core competencies are listed (3-5 specific skills or areas of expertise)

#### Persona
- [ ] Persona describes the person/role using this stack (e.g., "AI PM balancing user needs, market dynamics, technical feasibility")
- [ ] Persona includes perspectives or value systems relevant to the domain
- [ ] Persona is written in second person or descriptive form (not generic)

#### Architecture Overview
- [ ] Directory structure is shown with all key files
- [ ] File purposes are briefly explained (not just listed)
- [ ] Structure matches actual repository layout

#### Skills Table
- [ ] Table lists all skills with Purpose, When to Use, Output, and Time columns
- [ ] At least 3 skills defined
- [ ] Time estimates are realistic (measured in hours or minutes, not vague)
- [ ] Skill purposes are distinct and non-overlapping

#### Commands Section (if applicable)
- [ ] Each command has name, usage example, and brief description
- [ ] Examples include actual flags and arguments
- [ ] Output is described (what does the command produce?)
- [ ] At least 1 command included (if stack defines commands)

#### Hooks Section (if applicable)
- [ ] Each hook has name, trigger condition, action, and output
- [ ] Trigger is specific (e.g., "Weekly on Monday 9 AM", not "periodically")
- [ ] Action clearly describes what the hook does
- [ ] At least 1 hook included (if stack defines hooks)

#### Domain Frameworks
- [ ] Framework or mental model is explained (e.g., decision matrices, process flows)
- [ ] Framework is visualized where helpful (ASCII diagrams, tables)
- [ ] Framework connects to the stack's purpose
- [ ] At least 1 framework is substantive (not trivial)

#### Integration & Best Practices
- [ ] Integration with Claude Code is explained (slash commands, hooks)
- [ ] Best practices section provides actionable guidance (not generic advice)
- [ ] Example session flow shows how the stack is used end-to-end

#### Glossary (if needed)
- [ ] Domain-specific terms are defined
- [ ] Definitions are accurate and concise
- [ ] Glossary covers terms used in CLAUDE.md and skills

### Skill Content Quality

Each skill must follow UitKit's SKILL.md format and provide real, actionable instructions.

#### Format Compliance
- [ ] Skill file is named `SKILL.md` and located in `skills/[skill-name]/`
- [ ] All required sections present: When to activate, When NOT to use, Instructions, Example
- [ ] No extra sections (unless clearly justified)
- [ ] Sections are in order as specified

#### When to Activate
- [ ] Describes specific trigger conditions (not generic)
- [ ] Example: "You have a backlog of features and need to rank them by impact, effort, and confidence"
- [ ] Not: "Use this skill when you need help prioritizing things"
- [ ] Covers multiple use cases (bullet points or numbered list)

#### When NOT to Use
- [ ] Lists anti-patterns or incorrect use cases
- [ ] Clarifies boundaries with related skills
- [ ] Example: "For multi-quarter roadmap planning, use Roadmap Planning instead"
- [ ] At least 2-3 items listed

#### Instructions
- [ ] Instructions are step-by-step, not narrative prose
- [ ] Each step is numbered and has a clear action
- [ ] Sub-steps use bullet points or nested numbering
- [ ] Instructions reference templates, frameworks, or examples
- [ ] Code blocks (if present) are real, not placeholder
- [ ] Instructions are specific to the domain (not generic LLM advice)
- [ ] Technical depth is appropriate for the audience (senior developers)
- [ ] At least 3-5 steps for substantive skills

**Checklist for Instructions:**
- [ ] Are these instructions specific enough that someone could follow them verbatim?
- [ ] Would a junior practitioner understand what to do?
- [ ] Are there any hand-wavy phrases ("using your judgment", "as needed")?
- [ ] Are all acronyms defined on first use?

#### Example
- [ ] Example is concrete and runnable (not placeholder text)
- [ ] Example walks through the skill in a realistic scenario
- [ ] Example includes sample input and output
- [ ] Example is relevant to the domain (not contrived)
- [ ] Example is detailed enough to be useful (not just 2-3 sentences)

**Checklist for Examples:**
- [ ] Could someone copy-paste this example and modify it for their own use case?
- [ ] Does the example reference actual domains/products (not generic "Feature X")?
- [ ] Are numbers and estimates realistic?

### README.md Quality

The README must clearly explain how to use the stack.

#### Structure
- [ ] README starts with 1-2 sentence description of the stack
- [ ] Quick Start section with 3-5 getting-started steps
- [ ] Directory structure shown
- [ ] Skill reference table or list with brief descriptions

#### Clarity
- [ ] Each skill is described with When, Input, Output, Time
- [ ] If commands exist, usage examples are provided
- [ ] If hooks exist, schedules and actions are listed
- [ ] "Learn more" or "Next steps" section at the end

#### Accuracy
- [ ] All skill names match CLAUDE.md
- [ ] All command examples are syntactically correct
- [ ] Time estimates match CLAUDE.md
- [ ] Example workflow is realistic and follows the stack's purpose

#### Tone
- [ ] Matches CLAUDE.md tone (professional, senior developer audience)
- [ ] No marketing language or over-selling
- [ ] No filler or generic advice

### Skill Examples in Detail

For each skill, test the example by hand (or conceptually):

#### Test Checklist
- [ ] Example has a clear setup (input, context, scenario)
- [ ] Steps in the example are actionable
- [ ] Output is realistic and detailed
- [ ] Someone unfamiliar with the domain could follow it
- [ ] Numbers and estimates are plausible
- [ ] The example demonstrates the skill's core value, not edge cases

**Example of a GOOD example:**
```markdown
## Example

**Scenario:** You have 10 features in the backlog. Engineering says they 
can ship 3-4 per quarter. Which should you prioritize?

**Process:**
1. List features with reach (# customers), impact (1-10), confidence (%), 
   effort (months)
2. Calculate RICE for each: (1000 × 8 × 0.8) ÷ 2 = 3200
3. Rank by RICE score
4. Select features until capacity is reached (7 person-months available)

**Output:**
- Feature A (RICE 3200) → Q2 Committed
- Feature B (RICE 2100) → Q2 Committed
- Feature C (RICE 1500) → Q3 (deferred due to capacity)
- Decision memo: "Why we deprioritized Feature C in Q2"
```

**Example of a BAD example:**
```markdown
## Example

Here's how you might use this skill:
- Use RICE to score your features
- Pick the top ones
- Ship them

That's it! Easy.
```

### No Typos or Grammar Errors

- [ ] All text is spell-checked (use a tool: Grammarly, aspell, VS Code spell check)
- [ ] Common mistakes avoided:
  - [ ] "its" vs. "it's" (correct usage throughout)
  - [ ] "there" vs. "their" vs. "they're"
  - [ ] Consistent capitalization (title case, sentence case)
  - [ ] Serial comma used consistently
- [ ] Sentences are clear and not overly complex
- [ ] No run-on sentences or fragments

### Tone Consistency

- [ ] Stack is written for a senior developer audience (no hand-holding, no filler)
- [ ] All sections use consistent voice and terminology
- [ ] Domain language is consistent (e.g., don't switch between "feature" and "work item")
- [ ] No overly promotional or marketing language
- [ ] Examples use realistic, industry-standard scenarios

### Integration Testing

For submissions with commands or hooks:

- [ ] Commands are syntactically valid shell or Python scripts
- [ ] Hooks reference real trigger conditions (not made-up)
- [ ] Commands have clear input/output contracts
- [ ] Hooks don't require external API keys without documentation
- [ ] Example commands can be tested (reviewer runs them locally if possible)

### Completeness Check

- [ ] No "Coming soon" or placeholder content
- [ ] All referenced tools/frameworks are explained
- [ ] All acronyms are defined
- [ ] Stack does what it claims to do (no feature gaps)
- [ ] All sections are substantive (at least 3-5 sentences per section)

### Attribution & License

- [ ] Author information is correct
- [ ] License is clearly stated (submission.json and README)
- [ ] If code is adapted from other sources, those sources are credited
- [ ] No copyright violations

---

## Review Outcome

### Approved ✅

If all checks pass, the reviewer approves the PR with a comment:

```markdown
## ✅ APPROVED

This community stack meets all UitKit standards:
- [x] CLAUDE.md is complete and clear
- [x] All skills follow the SKILL.md format
- [x] Examples are concrete and actionable
- [x] No typos or grammar issues
- [x] Tone is consistent and professional

**Next steps:**
1. Merge this PR
2. Add stack to marketplace index
3. Credit the author
4. Open an issue for translation (DE, ES, FR, NL if desired)

Welcome to the UitKit community! 🎉
```

### Changes Requested 🔄

If feedback is needed, the reviewer opens a comment with specific suggestions:

```markdown
## 🔄 CHANGES REQUESTED

Great submission! A few items to address before approval:

**CLAUDE.md:**
- [ ] Expand the "Persona" section; it's currently too brief. Add perspectives on how [domain expert] thinks.
- [ ] Domain Frameworks section: your decision matrix is good, but add a worked example.

**Skills:**
- [ ] `contract-analysis/SKILL.md`: Example is placeholder. Can you walk through a real contract (redacted)?
- [ ] Instructions, Step 3: "Summarize the contract" is vague. What should the summary include?

**README:**
- [ ] Skill reference table: time estimates (e.g., "1-2 hours") are helpful; add these for all skills.
- [ ] Typo: Line 42 "reccomendations" → "recommendations"

**Review again:** Push changes to this branch; I'll re-review within 1 week.
```

The submitter responds to comments (either with code changes or discussion) and re-requests review.

### Rejected ❌

If major issues make the submission unsuitable:

```markdown
## ❌ REJECTED

Thanks for the contribution. Unfortunately, this submission doesn't meet 
UitKit standards at this time:

1. **No application code:** Your submission includes `src/compile.py` and `dist/` 
   directory, which violates our policy. Remove these and resubmit.

2. **Incomplete CLAUDE.md:** Several required sections are missing (Domain Frameworks, 
   Best Practices). See the template for reference.

3. **Placeholder content:** Skills have "[EDIT ME]" notes and vague instructions. 
   These need to be filled in with real, actionable guidance.

**Next steps:**
- Review the template: `community/template/stack-template/CLAUDE.md`
- Re-read the guidelines: `community/README.md`
- Address the issues above and resubmit

We're happy to help if you have questions. Feel free to open a discussion issue.
```

---

## Estimated Review Timeline

| Phase | Duration | What Happens |
|-------|----------|--------------|
| **Submitted** | 0 days | PR is opened |
| **Automated checks** | 1 day | Syntax, structure, metadata validated |
| **Reviewer assigned** | 1-2 days | UitKit maintainer claims PR |
| **Manual review** | 5-7 days | Reviewer checks all criteria; may request changes |
| **Changes requested** | 3-5 days | Submitter responds to feedback; re-reviews happen |
| **Approved & merged** | 1 day | PR is merged; stack added to marketplace |

**Total:** 1-2 weeks for straightforward submissions; up to 3-4 weeks if major revisions needed.

**To speed up review:**
- Test thoroughly before submitting
- Follow the template closely
- Use the checklist in this document
- Respond quickly to feedback

---

## Reviewer Guidelines

(For UitKit maintainers)

### Tone
- Be encouraging and constructive
- Assume good intent
- Highlight what's working, not just issues
- Suggest specific fixes (not just "improve this")

### Standards
- Apply the checklist consistently across submissions
- Don't accept "good enough"—hold to the same bar every time
- Domain expertise isn't required; clarity and completeness are

### Timeline
- Assign submissions within 2 days
- Provide feedback within 5-7 days (or communicate delay)
- Respond to follow-up comments within 2-3 days
- Merge approved PRs within 1 day

### Feedback Template
Use this structure for consistency:

```markdown
## Review Feedback

### CLAUDE.md
- [ ] Section Name: Feedback here
- [ ] Section Name: Feedback here

### Skills
- [ ] Skill Name: Feedback here
- [ ] Skill Name: Feedback here

### README.md
- [ ] Feedback here

### General
- [ ] Feedback here

**Verdict:** Approved / Changes Requested / Rejected
**Next step:** [Merge / Re-review after changes / Close PR]
```

---

**Last updated:** June 15, 2026 | **Maintained by:** UitKit Community Team
