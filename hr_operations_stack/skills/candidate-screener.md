---
name: candidate-screener
description: Evaluates resume against job description, team needs, and culture fit. Returns numerical score (0–100), screening recommendation (PASS/HOLD/REJECT), and hiring manager notes. No personal/protected characteristics considered.
allowed-tools: Read, Write
effort: low
---

# Candidate Screener

## When to activate

Immediately upon receiving a resume for an open role. Required input: resume (PDF, Word, or plain text), job description, and team context (current team size, role scope, seniority level expected). Activation is mandatory before any resume reaches a hiring manager.

## When NOT to use

Not for evaluating interview performance — use technical-assessor for that. Not as a replacement for hiring manager judgment — only a data-informed recommendation. Not for candidates already referred by internal employees (still screen, but note the referral source). Not without a clear JD — vague or outdated job descriptions skew scoring.

## Scoring Rubric

Score 0–100 across 5 dimensions (each 0–20 points):

| Dimension | 20 pts (Strong) | 12 pts (Adequate) | 5 pts (Weak) | 0 pts (Missing) |
|---|---|---|---|---|
| **Experience Match** | 5+ years relevant role | 3–4 years similar domain | <2 years or tangential | No related experience |
| **Technical Skills** | 4+ required skills listed | 2–3 required skills | 1 required skill | No technical skills listed |
| **Educational Fit** | Degree in relevant field | Degree + bootcamp or self-taught | Self-taught only | No formal education listed |
| **Growth Trajectory** | Promoted 2+ times or clear arc | Held roles 2–3 years each | Job-hopped or flat progression | Unexplained gaps or unclear path |
| **Culture Signals** | Leadership, cross-functional, teaching | Solo IC, specialized domain | Heads-down contributor | No signals of collaboration |

**Total Score Interpretation:**
- **80–100 (PASS):** Meets or exceeds all JD requirements. Recommend to hiring manager. Low risk of early exit.
- **60–79 (HOLD):** Meets most requirements but has one gap (e.g., missing one technical skill, or less experience). Can move to phone screen if manager approves. May require 30–60 day ramp.
- **40–59 (HOLD):** Demonstrates potential but has significant gaps. Only screen if pipeline is thin or candidate shows exceptional growth trajectory. High training cost. Flag to manager.
- **<40 (REJECT):** Does not meet core JD requirements. Not a fit at this time. Suggest candidate apply for more junior/adjacent role.

## Screening Process

1. **Parse resume systematically:** Extract years of experience, listed skills, educational background, progression, and role scope.
2. **Compare to JD:** Note which JD requirements are met, partially met, or missing.
3. **Assess growth trajectory:** Look for promotions, scope expansion, or skill diversification. Penalize unexplained multi-month gaps.
4. **Flag red flags:**
   - Frequent job changes (<1 year tenure, pattern of hopping)
   - Skill regression (roles getting junior/narrower)
   - Large unexplained employment gaps
   - Role titles that don't match scope described
5. **Look for strong signals:**
   - Leadership, mentorship, or cross-functional collaboration
   - Training or certification relevant to role
   - Public contributions (GitHub, blog, speaking) for technical roles
   - Promotions within same company (demonstrates trust and growth)

## Output Format

Return the following structure:

```
## [Candidate Name] — [Role Title]

### Scoring Summary
- Experience Match: [X]/20
- Technical Skills: [X]/20
- Educational Fit: [X]/20
- Growth Trajectory: [X]/20
- Culture Signals: [X]/20
**Total Score: [X]/100**

### Recommendation: [PASS | HOLD | REJECT]

### Hiring Manager Notes
[2–3 bullets of context]

### Strengths
- [Specific strength 1]
- [Specific strength 2]
- [Specific strength 3]

### Gaps
- [Specific gap 1]
- [Specific gap 2]

### Next Step
[Specific next step — phone screen, technical assessment, hold pending other candidates, reject]
```

## Critical Rules

- **No protected characteristics in evaluation.** Never score based on name, age, gender, or any protected class. If you notice this information on the resume, ignore it.
- **Assume good faith on employment gaps.** Gaps of <6 months do not automatically reduce score. Many candidates have legitimate reasons (caring for family, sabbatical, job search). Only penalize if pattern is clear or gap is >12 months without explanation.
- **Overweight recent experience.** Last 2 years matter more than 5+ years ago. Recent skill drift is a concern; recent re-skilling is positive.
- **Technical skills: required vs. nice-to-have.** Clearly distinguish JD requirements from nice-to-haves. PASS can have 1–2 missing nice-to-haves; HOLD may have 1 missing required skill; REJECT lacks 2+ required skills.
- **Education is not a blocker.** Self-taught developers, bootcamp grads, and degree-holders are scored equally on skills and trajectory. Degree is a +5 bonus only if role specifically requires it (rare).

## Example

**Candidate:** Sarah Chen | **Role:** Senior Backend Engineer

### Scoring Summary
- Experience Match: 18/20 (5 years backend, 2 in Go — matches role)
- Technical Skills: 19/20 (Go, PostgreSQL, Kafka, Docker, AWS — all required)
- Educational Fit: 15/20 (BS Computer Science, no postgrad certification)
- Growth Trajectory: 17/20 (IC → Tech Lead → Senior Engineer over 5 years — steady promotion)
- Culture Signals: 16/20 (Led mentoring of 2 junior engineers, no cross-functional leadership noted)
**Total Score: 85/100**

### Recommendation: PASS

### Hiring Manager Notes
- Strong technical fit. All required skills present and demonstrated at current company (Stripe).
- Only minor gap: no direct experience with our specific payment processing library (proprietary). Can learn in first 2 weeks.
- Growth arc is textbook. Recommend moving to technical phone screen immediately.

### Strengths
- 5+ years backend engineering with 2 years Go production experience
- All required technical skills with proven depth (led Kafka migration at Stripe)
- Clear promotion path (IC → Tech Lead → Senior) demonstrates growth and team trust
- Mentored 2 junior engineers, showing teaching capability

### Gaps
- No prior experience with our specific payment processing stack (minor; learnable)
- No cross-functional or product management exposure (not critical for this role)

### Next Step
Schedule 30-min technical phone screen with hiring manager. If passed, move to 2-hour technical assessment (system design + Go coding challenge).

---

Built with [Claudient](https://github.com/Claudient/Claudient)
