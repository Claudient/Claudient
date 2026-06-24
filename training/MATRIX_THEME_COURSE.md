# Matrix Theme Self-Paced Training Course

> A comprehensive 4-module deep-dive into the Matrix Theme for Claude Code, designed for individual learners and team rollouts.

---

## Course Overview

**Target Audience:** Claude Code users, teams, developers  
**Duration:** ~8 hours (self-paced)  
**Prerequisites:** Claude Code installed, basic terminal familiarity  
**Delivery:** Online, video + hands-on labs + quizzes  
**Certification:** Certificate of completion upon all modules  

---

## Module 1: Installation & Basics

### Learning Objectives
- Install the Matrix Theme into Claude Code
- Navigate the Matrix interface
- Configure basic settings
- Understand core UI components

### 1.1 Video: "Getting Started with Matrix" (8 min)

**Topics Covered:**
- What is the Matrix Theme? (history, philosophy, design approach)
- System requirements check
- Step-by-step installation process
- First launch walkthrough
- UI orientation: sidebar, editor, terminal, theme indicator

**Video Script Outline:**
```
[00:00-00:30] Welcome & intro to Matrix
[00:30-02:00] System requirements & installation methods
[02:00-05:00] Live install demo (showing each step)
[05:00-07:00] First launch and UI tour
[07:00-08:00] Quick settings overview
```

**Deliverable:** Downloadable MP4 (720p, ~120MB)

---

### 1.2 Hands-On Lab: "Installation Checkpoint"

**Objective:** Learner installs Matrix Theme and performs basic navigation.

**Lab Steps:**

1. **Install the Theme**
   ```bash
   # Open Claude Code settings
   cd ~/.claude
   # Verify theme config in settings.json
   cat settings.json | grep -A 5 '"theme"'
   ```

2. **Verify Installation**
   - Close and restart Claude Code
   - Confirm Matrix theme is active
   - Check that syntax highlighting is applied
   - Verify terminal colors match Matrix palette

3. **Explore Core UI**
   - Open a sample file (any `.ts`, `.py`, or `.md`)
   - Test sidebar collapse/expand
   - Toggle terminal pane
   - Switch between light/dark modes (if applicable)

4. **Capture Evidence**
   - Screenshot showing Matrix theme active
   - Run `cat ~/.claude/settings.json` and save theme block
   - Note any issues or questions

**Pass Criteria:**
- Matrix theme is active and persists across restarts
- User can navigate all major UI sections
- No console errors related to theme

**Time Estimate:** 15-20 minutes

---

### 1.3 Knowledge Quiz

**Format:** 10-question multiple choice, 80% to pass

**Sample Questions:**

1. What is the primary design philosophy of the Matrix Theme?
   - A) Minimalist and monochrome
   - B) High contrast, cyberpunk-inspired, optimized for long sessions
   - C) Colorful and playful
   - D) Grayscale only

2. How do you verify that Matrix Theme is installed?
   - A) Check the theme selector in the sidebar
   - B) Look for `"theme": "matrix"` in `~/.claude/settings.json`
   - C) Open the Extensions menu
   - D) Both A and B

3. Can Matrix Theme be mixed with other themes in Claude Code?
   - A) Yes, but requires manual config
   - B) No, only one theme per session
   - C) Yes, per-file basis
   - D) Only in the editor, not terminal

4. What color palette does Matrix Theme use by default?
   - A) Solarized Dark
   - B) Dracula
   - C) Green-on-black (#00FF00 text on #000000 background)
   - D) Blue-on-white

5. Where are theme settings stored?
   - A) `~/.claude/settings.json`
   - B) `/opt/claude/config`
   - C) Claude Cloud sync
   - D) Environment variables only

**[Questions 6-10 follow similar pattern]**

**Pass Certificate:** "Module 1: Installation & Basics Certified"

---

### 1.4 Checklists & Resources

**Pre-Course Checklist:**
- [ ] Claude Code v1.15+ installed
- [ ] 200MB free disk space
- [ ] Terminal/bash access
- [ ] Internet connection for video streaming

**Post-Module Checklist:**
- [ ] Matrix Theme installed and active
- [ ] Settings verified
- [ ] Lab completed with evidence captured
- [ ] Quiz score: 80%+
- [ ] Certificate saved

**Resources:**
- [Matrix Theme GitHub Repo](https://github.com/uitkit/matrix-theme)
- [Claude Code Documentation](https://claude.com/docs)
- [Troubleshooting Guide](./matrix-troubleshooting.md)

---

---

## Module 2: Customization

### Learning Objectives
- Customize fonts, colors, and spacing
- Create personal theme variants
- Configure keyboard shortcuts for theme switching
- Export and share custom configs

### 2.1 Video: "Personalizing Your Matrix Setup" (10 min)

**Topics Covered:**
- `settings.json` deep dive: theme-specific options
- Font selection for coding (fixed-width recommendations)
- Color scheme tweaks: accent colors, syntax highlighting
- Sidebar and editor spacing customization
- Terminal font and line-height tuning
- Creating named variants (e.g., "matrix-high-contrast", "matrix-soft")
- Live demo: Before/after customization

**Video Script Outline:**
```
[00:00-00:45] Why customize? (use cases)
[00:45-03:00] Settings structure walkthrough
[03:00-06:00] Font customization (4 popular options + live preview)
[06:00-08:30] Color tweaks and syntax overrides
[08:30-09:30] Performance tips for custom configs
[09:30-10:00] Sharing your setup
```

**Deliverable:** Downloadable MP4 (720p, ~150MB)

---

### 2.2 Hands-On Lab: "Build Your Matrix Variant"

**Objective:** Learner creates a personalized theme variant and shares config.

**Lab Tasks:**

1. **Backup Existing Config**
   ```bash
   cp ~/.claude/settings.json ~/.claude/settings.json.backup
   ```

2. **Customize Fonts**
   - Open `~/.claude/settings.json`
   - Set preferred font (Fira Code, JetBrains Mono, Inconsolata, or Hack)
   - Adjust font size (14-18 recommended for Matrix)
   - Set line-height (1.5-1.8 for readability)
   - Example:
     ```json
     "editor.fontFamily": "Fira Code",
     "editor.fontSize": 14,
     "editor.lineHeight": 1.6
     ```

3. **Tweak Color Accents**
   - Modify at least 2 syntax highlight colors
   - Test with a sample code file
   - Verify readability and contrast
   - Document your choices

4. **Create a Named Variant**
   - Create a subdirectory: `~/.claude/matrix-variants/`
   - Save your custom settings as `my-matrix-variant.json`
   - Create README explaining your choices

5. **Test Switching**
   ```bash
   # Switch between default and custom
   # Verify theme persists across restarts
   # Screenshot your final setup
   ```

6. **Share Configuration**
   - Export JSON to a gist or file
   - Create a 100-word "setup story" (why these choices?)
   - Optional: contribute to community variants collection

**Deliverables:**
- Custom `my-matrix-variant.json` file
- Setup story (text)
- Screenshot of personalized theme
- Evidence of successful theme switching

**Pass Criteria:**
- Customization applied and verified
- Config is syntactically valid JSON
- Theme persists across 2+ restarts
- Written explanation of customization choices

**Time Estimate:** 30-45 minutes

---

### 2.3 Knowledge Quiz

**Format:** 12-question mix of multiple choice and short answer, 80% to pass

**Sample Questions:**

1. In `settings.json`, which key controls the editor's font family?
   - A) `"font"`
   - B) `"editor.fontFamily"`
   - C) `"fontName"`
   - D) `"typography.font"`

2. What is the recommended line-height for Matrix Theme with Fira Code?
   - A) 1.0
   - B) 1.2
   - C) 1.5-1.8
   - D) 2.5

3. **Short Answer:** Name two fixed-width fonts that pair well with Matrix Theme and explain why.

4. How do you export your custom Matrix variant for team use?
   - A) Via Claude Cloud sync
   - B) Copy the settings.json file and share
   - C) Export from the theme selector menu
   - D) Only via git

5. **Short Answer:** If your syntax highlighting has poor contrast after customization, what two things should you check?

6. What file path stores Claude Code theme settings?
   - A) `~/.config/claude/theme`
   - B) `~/.claude/settings.json`
   - C) `/etc/claude/default-theme`
   - D) Environment variable `CLAUDE_THEME`

**[Questions 7-12 follow similar pattern]**

**Pass Certificate:** "Module 2: Customization Certified"

---

### 2.4 Real-World Scenario

**Scenario:** Your team has 50 developers. You've created a "Company Standard Matrix Variant" with specific fonts, colors, and spacing. How do you roll it out?

**Expected Answer:**
- Version the config in a shared git repo or document
- Create installation script for automation
- Provide onboarding in Module 4 (team rollout)
- Include troubleshooting guide for common issues

---

---

## Module 3: Advanced Theming

### Learning Objectives
- Extend Matrix Theme with custom plugins/hooks
- Create conditional theme switching (time-based, project-based, ambient)
- Integrate with CLI tools and shell prompts
- Debug theme issues at the system level
- Performance optimization for large projects

### 3.1 Video: "Master Matrix: Advanced Techniques" (14 min)

**Topics Covered:**
- Theme architecture internals (CSS-in-JS, theme engine)
- Custom hooks: `.claude/hooks/on-theme-load.sh`
- Conditional switching with environment detection
- Time-based theme switching (Matrix day vs. Matrix night)
- Shell integration: `.bashrc` / `.zshrc` theme sync
- Integration with git hooks (e.g., switch theme on branch change)
- Performance profiling: identifying slow customizations
- Debugging with `--debug-theme` flag
- Advanced color interpolation and accessibility

**Video Script Outline:**
```
[00:00-01:00] Recap: customization vs. advanced
[01:00-03:30] Theme engine architecture
[03:30-06:00] Writing custom hooks (live demo)
[06:00-09:00] Conditional switching patterns
[09:00-11:30] Shell integration deep-dive
[11:30-13:00] Performance & debugging
[13:00-14:00] Community showcase + Q&A
```

**Deliverable:** Downloadable MP4 (1080p, ~250MB)

---

### 3.2 Hands-On Lab: "Build a Conditional Theme Switcher"

**Objective:** Learner creates an automated system to switch Matrix variants based on project context.

**Lab Tasks:**

1. **Understand Theme Hooks**
   - Review `.claude/hooks/` directory structure
   - Study `settings.json` hook configuration
   - Example hook structure:
     ```json
     "hooks": {
       "on-project-load": "~/.claude/hooks/theme-on-project-load.sh",
       "on-time-change": "~/.claude/hooks/theme-on-time-change.sh"
     }
     ```

2. **Create Time-Based Switcher**
   - Write shell script: `~/.claude/hooks/theme-on-time-change.sh`
   - Logic:
     - 08:00-18:00: "matrix-work" variant (slightly higher contrast)
     - 18:00-08:00: "matrix-night" variant (reduced blue light)
   - Test by manually changing system time or via cron
   - Verify theme switches without restart

   **Example Script:**
   ```bash
   #!/bin/bash
   HOUR=$(date +%H)
   
   if (( HOUR >= 8 && HOUR < 18 )); then
     # Day theme
     jq '.theme = "matrix-work"' ~/.claude/settings.json > /tmp/s.json
   else
     # Night theme
     jq '.theme = "matrix-night"' ~/.claude/settings.json > /tmp/s.json
   fi
   
   mv /tmp/s.json ~/.claude/settings.json
   ```

3. **Create Project-Based Switcher**
   - Write script: `~/.claude/hooks/theme-on-project-load.sh`
   - Detect `.git/config` or `package.json` to identify project type
   - Apply project-specific theme variant
   - Test by opening 2-3 different projects

   **Example Logic:**
   ```bash
   PROJECT_TYPE=$(grep -q '"devDependencies"' package.json && echo "web" || echo "generic")
   
   case $PROJECT_TYPE in
     web) THEME="matrix-web" ;;
     *) THEME="matrix" ;;
   esac
   ```

4. **Integrate with Shell Prompt**
   - Edit `~/.bashrc` or `~/.zshrc`
   - Add function to display current Matrix theme in prompt
   - Test: open new shell, verify theme name appears in prompt

5. **Performance Baseline**
   - Measure theme load time: `time ~/.claude/hooks/theme-on-project-load.sh`
   - Document baseline (should be <50ms)
   - Identify any bottlenecks

6. **Documentation**
   - Create `~/.claude/matrix-hooks-README.md`
   - Document all installed hooks and their triggers
   - Provide troubleshooting steps

**Deliverables:**
- `theme-on-time-change.sh` (working and tested)
- `theme-on-project-load.sh` (working and tested)
- Updated shell prompt integration
- Performance baseline report
- README documenting all hooks

**Pass Criteria:**
- Both hooks execute without errors
- Theme actually switches when conditions trigger
- Performance is <100ms per hook
- Hooks survive system restart
- Documentation is clear and complete

**Time Estimate:** 60-75 minutes

---

### 3.3 Knowledge Quiz

**Format:** 14-question mix, includes code analysis, 80% to pass

**Sample Questions:**

1. What file structure enables hooks in Claude Code?
   - A) `~/.claude/hooks/` + `settings.json` hook config
   - B) `~/.config/claude.conf`
   - C) Environment variables only
   - D) Plugin marketplace

2. **Code Analysis:** Given this hook script, what will happen?
   ```bash
   THEME=$(echo $RANDOM | jq '.theme')
   ```
   - A) Randomly selects a theme
   - B) Returns a JSON parsing error
   - C) Uses default theme
   - D) Throws "jq: command not found"

3. How often does the `on-time-change` hook typically fire?
   - A) Every keystroke
   - B) Every minute (configurable)
   - C) Every hour
   - D) On Claude Code restart only

4. **Short Answer:** Design a hook that switches Matrix theme based on git branch name. (Write pseudocode.)

5. What performance threshold is acceptable for a theme hook?
   - A) <10ms
   - B) <50ms
   - C) <200ms
   - D) <1s

6. **Debugging Question:** A hook runs successfully but the theme doesn't change. Name 3 things to check.

**[Questions 7-14 follow similar pattern, including accessibility and color science]**

**Pass Certificate:** "Module 3: Advanced Theming Certified"

---

### 3.4 Capstone Project Option

**Project:** "Full-Stack Theme Automation"

**Requirements:**
- Implement 2+ conditional theme switchers
- Write and integrate custom hooks
- Document in README
- Achieve <100ms hook performance
- Share setup on community board

**Deliverable:** GitHub gist or community contribution

---

---

## Module 4: Team Rollout

### Learning Objectives
- Plan a team-wide Matrix Theme adoption
- Create rollout strategy (phased, opt-in, mandated)
- Automate configuration distribution
- Handle support and troubleshooting at scale
- Measure adoption and gather feedback

### 4.1 Video: "Rolling Out Matrix to Your Team" (12 min)

**Topics Covered:**
- Rollout strategy types (big bang, phased, opt-in, mandated)
- Pre-rollout survey: assess team needs
- Creating a standardized company variant
- Automation scripts for bulk deployment
- Configuration management (git, secrets, versioning)
- Change management: communication plan
- Support infrastructure: FAQ, help desk integration
- Measuring success: adoption metrics, satisfaction surveys
- Common issues and escalation paths
- Case study: Company X rolled out Matrix to 200 engineers

**Video Script Outline:**
```
[00:00-01:00] Why roll out? Benefits for teams
[01:00-02:30] Rollout strategy decision matrix
[02:30-04:30] Pre-rollout planning checklist
[04:30-07:00] Automation script demo (bulk config)
[07:00-09:00] Communication & training setup
[09:00-11:00] Common issues + support prep
[11:00-12:00] Success metrics & feedback loops
```

**Deliverable:** Downloadable MP4 (1080p, ~220MB)

---

### 4.2 Hands-On Lab: "Design Your Team Rollout Plan"

**Objective:** Learner designs a complete, executable rollout strategy for their team/organization.

**Lab Tasks:**

1. **Assess Your Team**
   - Gather baseline data:
     - Team size
     - Current theme/tool stack
     - Technical skill levels (junior to senior)
     - Remote vs. co-located
     - Existing standardization
   - Create a 1-page "Team Profile"

2. **Choose Rollout Strategy**
   - Evaluate 3 approaches:
     - **Opt-in:** Voluntary adoption, self-service
     - **Phased:** 10% → 50% → 100% over 4 weeks
     - **Mandated:** All at once, with support
   - Write 250-word justification for your choice

3. **Create Standardized Variant**
   - Design a "Company Standard Matrix" variant
   - Must include:
     - Font and size recommendations
     - Color choices (with accessibility rationale)
     - Spacing/padding standards
     - Keyboard shortcuts for productivity
   - Save as `company-matrix-standard.json`
   - Write 150-word guide explaining choices

4. **Develop Deployment Script**
   - Write an idempotent shell script: `deploy-matrix-team.sh`
   - Must:
     - Backup existing configs
     - Download company variant
     - Apply config to all users on a machine
     - Verify installation
     - Log deployment success/failure
   - Test on 2+ machines (or VMs if needed)

   **Example Structure:**
   ```bash
   #!/bin/bash
   set -e
   
   TEAM_CONFIG_URL="https://internal-repo/company-matrix-standard.json"
   BACKUP_DIR="$HOME/.claude/backups"
   
   mkdir -p "$BACKUP_DIR"
   cp "$HOME/.claude/settings.json" "$BACKUP_DIR/settings.$(date +%s).json"
   
   curl -o /tmp/company-matrix.json "$TEAM_CONFIG_URL"
   jq '.theme_config |= . + (input | .theme_config)' \
     "$HOME/.claude/settings.json" /tmp/company-matrix.json > /tmp/merged.json
   cp /tmp/merged.json "$HOME/.claude/settings.json"
   
   echo "✓ Matrix Theme deployed successfully"
   ```

5. **Create Support Plan**
   - Write FAQ (10+ questions)
   - Design 1-page troubleshooting guide
   - Create Slack/Teams channel for support
   - Identify 2-3 "theme champions" for peer support
   - Define escalation path (support ticket system)

6. **Communication Plan**
   - Write announcement email (150 words)
   - Create Slack post with installation link
   - Design 5-minute demo video script
   - Plan 2-week feedback cadence

7. **Measure Success**
   - Define 5 success metrics:
     - Adoption rate (% with Matrix active)
     - Install/uninstall rate
     - Support tickets per week
     - Team satisfaction score
     - Time-to-productive (new installs)
   - Create tracking spreadsheet template

**Deliverables (Complete Rollout Package):**
- Team Profile document
- Rollout strategy justification
- `company-matrix-standard.json`
- Configuration guide (150 words)
- `deploy-matrix-team.sh` (tested, documented)
- FAQ (10+ Q&A)
- Troubleshooting guide
- Communication templates (email, Slack, video script)
- Success metrics + tracking template

**Pass Criteria:**
- Rollout plan is specific to team context
- Deployment script works without manual intervention
- Support materials are complete and clear
- Success metrics are measurable and realistic
- All deliverables are documented

**Time Estimate:** 90-120 minutes

---

### 4.3 Knowledge Quiz

**Format:** 16-question, includes scenario analysis, 80% to pass

**Sample Questions:**

1. For a team of 150 engineers, which rollout strategy minimizes disruption?
   - A) Big bang (all at once)
   - B) Phased rollout (10% per week)
   - C) Opt-in with incentives
   - D) Mandatory with support team

2. **Scenario:** Your team has strong opinions about their current theme. What should you do?
   - A) Override preferences; Matrix is mandatory
   - B) Launch opt-in pilot with feedback channel
   - C) Delay rollout indefinitely
   - D) Require opt-out request with justification

3. What is the critical content of a team deployment script?
   - A) Download and install
   - B) Backup, download, apply, verify, log
   - C) Download only
   - D) Manual confirmation at each step

4. **Short Answer:** Write a troubleshooting script snippet that verifies Matrix is active after deployment.

5. How often should you survey team satisfaction post-rollout?
   - A) Once, after 1 week
   - B) Bi-weekly for first month, then monthly
   - C) Never; assume adoption means satisfaction
   - D) Continuously via telemetry

6. **Scenario Analysis:** Your deployment script fails on 20% of machines. The error: "jq: command not found". What went wrong?

**[Questions 7-16 follow similar pattern, covering change management, stakeholder communication, rollback procedures, accessibility in team rollouts]**

**Pass Certificate:** "Module 4: Team Rollout Certified"

---

### 4.4 Capstone Project: "End-to-End Team Rollout"

**Project Objective:** Execute (or simulate) a complete Matrix Theme rollout for your team.

**Requirements:**
1. Team profile and rollout strategy (approved by manager/lead)
2. Tested deployment script and config
3. Complete support materials (FAQ, guide, troubleshooting)
4. Communication plan with templates
5. Success metrics and tracking setup
6. Post-rollout report (if executed) or simulation report

**Deliverable:** Portfolio-ready rollout package (README + all artifacts)

**Success Criteria:**
- Plan is executable and documented
- Deployment is automated and tested
- Support materials anticipate common issues
- Metrics are measurable
- Team confidence is high

---

---

## Certification & Continuing Education

### Module Completion Certificates

Upon passing each module's quiz (80%+):

**Module 1 Certificate:**
```
═══════════════════════════════════════════════════════
  MATRIX THEME TRAINING
  Installation & Basics Certified
  ────────────────────────────────────────────────────
  [Name]
  Completed: [Date]
  Authorized by: UitKit Training Program
═══════════════════════════════════════════════════════
```

**Module 2, 3, 4:** Similar format, progressive titles.

### Final Diploma

Upon completion of all 4 modules + capstone project:

```
═══════════════════════════════════════════════════════
  MATRIX THEME EXPERT CERTIFICATION
  ────────────────────────────────────────────────────
  [Name] has successfully completed the comprehensive
  Matrix Theme self-paced training program, demonstrating
  mastery in installation, customization, advanced
  theming, and team rollout strategies.
  
  Completed: [Date]
  Authorized by: UitKit Training Program
  Reference: [Unique ID]
═══════════════════════════════════════════════════════
```

---

### Continuing Education Paths

**After Course Completion:**

1. **Monthly Challenge:** Advanced theme project (1st Monday of month)
2. **Community Forum:** Peer support & idea sharing
3. **Guest Lectures:** Quarterly deep-dives by theme experts
4. **Advanced Specialization (Optional):**
   - Accessible theming for colorblind users
   - Theme design for team compliance/security
   - Performance optimization for large-scale deployments

---

---

## Course Delivery & Infrastructure

### Hosting Platform

- **Videos:** YouTube (unlisted) or Vimeo (private) with timestamps
- **Quizzes:** Kahoot or custom LMS (Moodle, Canvas)
- **Labs:** Tracked via GitHub (private) with automated grading
- **Certificates:** PDF generation + OpenBadges integration

### Resource Repo Structure

```
training/
├── MATRIX_THEME_COURSE.md (this file)
├── module-1/
│   ├── video.mp4
│   ├── lab-checkpoint.md
│   ├── quiz.json
│   └── resources/
├── module-2/
│   ├── video.mp4
│   ├── lab-variant.md
│   ├── quiz.json
│   ├── resources/
│   └── example-variants/
├── module-3/
│   ├── video.mp4
│   ├── lab-hooks.md
│   ├── quiz.json
│   ├── resources/
│   └── hook-examples/
├── module-4/
│   ├── video.mp4
│   ├── lab-rollout.md
│   ├── quiz.json
│   ├── resources/
│   └── rollout-templates/
├── capstone/
│   ├── rubric.md
│   ├── submission-guide.md
│   └── examples/
├── certificates/
│   ├── module-1.pdf
│   ├── module-2.pdf
│   ├── module-3.pdf
│   ├── module-4.pdf
│   └── diploma.pdf
└── FAQ.md
```

---

## Support & Feedback

### Help Channels

- **Email:** training@uitkit.dev
- **Slack:** #matrix-theme-training (private community)
- **GitHub Issues:** Technical questions tagged `[training]`
- **Office Hours:** Weekly 30-min Q&A (async video provided)

### Feedback Loop

- Post-module survey (5 min, 5 questions)
- End-of-course feedback (10 min, open-ended)
- Anonymous issue reports
- Success stories and use-case sharing

### Course Updates

- Quarterly review and content refresh
- Module updates released with Claude Code version updates
- Community contributions accepted (see CONTRIBUTING.md)

---

## Appendix: Quick Reference

### Key Commands

```bash
# Verify Matrix is active
cat ~/.claude/settings.json | jq '.theme'

# Backup current config
cp ~/.claude/settings.json ~/.claude/settings.json.backup

# List available variants
ls ~/.claude/matrix-variants/

# Test a theme hook
bash ~/.claude/hooks/theme-on-project-load.sh

# Check hook performance
time bash ~/.claude/hooks/theme-on-time-change.sh
```

### Keyboard Shortcuts (Matrix Default)

| Action | Shortcut |
|--------|----------|
| Cycle theme variant | `Cmd+Shift+T` (Mac) / `Ctrl+Shift+T` (Linux/Win) |
| Toggle sidebar | `Cmd+B` / `Ctrl+B` |
| Toggle terminal | `Ctrl+` ` ` |
| Command palette | `Cmd+Shift+P` / `Ctrl+Shift+P` |

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Theme not persisting | Check `settings.json` syntax; restart Claude Code |
| Hook not firing | Verify hook path in `settings.json`; check file permissions |
| Poor performance | Profile hooks with `time` command; check for blocking I/O |
| Accessibility issues | Use color-blind simulator; test contrast ratios |

---

## Glossary

- **Variant:** A named configuration of Matrix Theme with specific fonts, colors, and settings
- **Hook:** An event-triggered script that runs when conditions are met (time, project load, etc.)
- **Settings.json:** The main Claude Code config file at `~/.claude/settings.json`
- **Jq:** Command-line JSON processor used in scripts
- **Rollout:** The process of deploying software/config to a team or organization

---

## License & Attribution

This training course is part of UitKit, a knowledge system for Claude Code.

- Author: UitKit Training Team
- Last Updated: 2026-06-22
- License: CC BY-SA 4.0 (content), MIT (scripts)

---

**Start with Module 1 today. Your certification awaits.**
