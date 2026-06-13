---
name: technical-assessor
description: Designs role-specific technical assessment (coding challenge, system design task, case study) and evaluates candidate submission. Returns rubric score, hiring recommendation, and learning curve assessment. Focuses on core job functions, not trick questions.
allowed-tools: Read, Write, WebSearch
effort: medium
---

# Technical Assessor

## When to activate

After candidate passes initial screening (score 60+) and hiring manager approves moving to technical evaluation. Only send assessment to candidates who have demonstrated minimum baseline fit via resume. Assessment should take 2–4 hours; longer assessments reduce completion rate and demoralize candidates.

## When NOT to use

Not for screening. Not for candidates scoring <60 on initial screen. Not for roles that are 100% non-technical (pure recruiting, operations, sales). Not as a gotcha test — assessments should measure job-relevant skills, not obscure algorithms or trivia. Not without a rubric prepared in advance.

## Assessment Design Framework

Match assessment to role's top 3 job functions. For a Backend Engineer, prioritize system design + coding + debugging. For a Data Analyst, prioritize SQL + analytics thinking + visualization. For a Product Manager, prioritize strategy + tradeoff analysis + communication.

### For Backend/Frontend Engineers

**Type 1: Coding Challenge (1.5–2 hours)**
- Real-world problem from your actual codebase or equivalent difficulty
- Problem statement, sample inputs, expected outputs
- Constraint: Must be solvable cleanly in 90 minutes by a competent engineer at the target level
- Language choice: Allow candidate to choose; evaluate intent + correctness, not style

**Type 2: System Design Task (2–3 hours)**
- Design a feature or system at your company's scale
- Provide context: current architecture, traffic/data size, constraints
- Evaluate: trade-offs, scalability thinking, realistic implementation path (not hand-waving)

**Type 3: Debugging/Code Review (1–1.5 hours)**
- Real buggy code or suboptimal implementation from similar role's day 1
- Ask candidate to identify issues and propose fixes
- Evaluates code reading, critical thinking, not just writing

### For Product/Strategy Roles

**Type 1: Case Study (1.5–2 hours)**
- Real or realistic business problem: "Competitor launched feature X. How do we respond?" or "We're seeing 15% churn. Root cause and solution?"
- Candidate documents thinking: hypothesis → data → recommendation → trade-offs
- Evaluate: reasoning clarity, data literacy, stakeholder awareness

**Type 2: Strategy Exercise (2 hours)**
- Define a go-to-market strategy for a new product or market expansion
- Provide: product brief, target market, competitive landscape, internal constraints
- Evaluate: prioritization, customer empathy, realistic timelines

### For Data/Analytics Roles

**Type 1: SQL + Analysis (1.5–2 hours)**
- Real dataset (or sample from your database schema)
- 3–5 questions escalating in complexity: simple SELECT → joins → window functions → cohort analysis
- Evaluate: SQL correctness, analytical thinking, interpretation of results

**Type 2: Dashboard/Visualization Brief (1–2 hours)**
- Business question: "How do we measure product adoption?" or "What's driving retention churn?"
- Provide sample dataset; ask candidate to propose metrics, visualization approach, insights
- Evaluate: metric choice, storytelling, data intuition

## Evaluation Rubric (0–100 Score)

| Dimension | 20 pts | 15 pts | 10 pts | 5 pts | 0 pts |
|---|---|---|---|---|---|
| **Technical Correctness** | No errors; handles edge cases | Minor bugs; most logic sound | Major bug; misses one key requirement | Multiple errors; fundamentally flawed | No attempt or completely wrong |
| **Approach & Thinking** | Clear strategy; efficient solution | Reasonable path; some inefficiency | Muddled approach; correct answer | Trial-and-error; lucky guess | No visible strategy |
| **Code/Communication Quality** | Well-structured, readable, documented | Readable, some documentation | Hard to follow; sparse comments | Difficult to parse | Unreadable |
| **Problem Scope Understanding** | Addresses all requirements + edge cases | Addresses all core requirements | Misses minor requirements | Misses major requirements | Fundamental misunderstanding |
| **Learning Agility** | Asks clarifying questions; adapts quickly | Seeks feedback; adjusts approach | Needs direction; gets back on track | Defensive; resists feedback | Ignores guidance |

**Score Interpretation:**
- **85–100:** Hire immediately. Exceeds bar for role. Ready to contribute day 1.
- **70–84:** Strong hire. Minor gaps in 1–2 areas, but demonstrates core competency. ~2 week ramp.
- **55–69:** Conditional hire. Gaps in technical depth or approach. Requires mentoring. ~4–6 week ramp.
- **40–54:** Not a fit for this role. May succeed in more junior/adjacent role. Consider feedback loop before rejection.
- **<40:** Do not hire. Significant skill gaps for the role level.

## Submission Evaluation Process

1. **Review submission against specification.** Does it answer all questions? Meet all stated constraints?
2. **Test execution.** If code: does it run? Do outputs match expected results?
3. **Evaluate approach.** Is it naive or thoughtful? Efficient or brute-force?
4. **Check for red flags:**
   - Code copied from Stack Overflow without understanding
   - Solution doesn't scale (works for test data, breaks on real data)
   - No thought given to edge cases
   - Unreadable or hostile code
5. **Rate on rubric.** Be consistent across candidates.
6. **Generate learning curve estimate.** Based on gaps, estimate weeks to productivity.

## Output Format

```
## [Candidate Name] — [Role] Assessment

### Assessment Details
- **Type:** [Coding Challenge | System Design | Case Study | SQL | Other]
- **Completion Time:** [Actual time taken by candidate]
- **Submission Quality:** [Complete | Mostly complete | Incomplete]

### Rubric Scoring
- Technical Correctness: [X]/20
- Approach & Thinking: [X]/20
- Code/Communication Quality: [X]/20
- Problem Scope Understanding: [X]/20
- Learning Agility: [X]/20
**Total Score: [X]/100**

### Recommendation: [HIRE | STRONG HIRE | CONDITIONAL HIRE | NOT A FIT]

### Strengths
- [Specific strength 1]
- [Specific strength 2]

### Areas for Growth
- [Specific gap 1]
- [Specific gap 2]

### Estimated Ramp Time
[Weeks] weeks to independent productivity.

### Next Step
[Move to interview | Schedule offer call | Provide feedback and reject | Retest on [topic]]
```

## Critical Rules

- **Measure job-relevant skills only.** If you wouldn't encounter this problem in the first 3 months on the job, don't ask it.
- **Difficulty should match role level.** A mid-level engineer should solve it in 2 hours; a junior engineer might take 3–4; a senior should solve it in 60 minutes.
- **Allow help tools.** Candidates can use Stack Overflow, documentation, IDE autocomplete. Measure problem-solving, not memorization.
- **No gotcha questions.** If the assessment relies on obscure knowledge or a trick, you're not measuring job fit — you're measuring luck.
- **Communication matters.** Ask candidates to explain their approach and trade-offs, not just submit code. Clarity on thinking is as important as the solution.
- **One retest allowed.** If a strong candidate underperforms (high stress, first-time jitters), offer one retake on a different assessment topic.

## Example

**Candidate:** Alex Rodriguez | **Role:** Senior Data Engineer | **Assessment:** SQL + Analytics

### Assessment Details
- **Type:** SQL + Analysis
- **Completion Time:** 95 minutes (target: 90–120)
- **Submission Quality:** Complete

### Rubric Scoring
- Technical Correctness: 19/20 (correct SQL; missed one edge case in window function)
- Approach & Thinking: 18/20 (efficient joins, thoughtful indexing notes; could have optimized one query)
- Code/Communication Quality: 19/20 (well-commented, clear naming; documentation could be slightly more thorough)
- Problem Scope Understanding: 20/20 (understood all 5 questions; answered each completely)
- Learning Agility: 17/20 (asked one clarifying question; adapted approach based on feedback)
**Total Score: 93/100**

### Recommendation: HIRE

### Strengths
- Strong SQL fundamentals. Nested queries and window functions correct and efficient.
- Clear thinking on data modeling and optimization. Mentioned indexes and query plans proactively.
- Analytical insight: identified data quality issue in one dataset and proposed validation approach.
- Excellent communication. Code is readable; explanations are concise but thorough.

### Areas for Growth
- One edge case missed in window function partition (didn't handle null values). Coachable.
- Could deepen knowledge on advanced query optimization (execution plans, cost analysis). Not critical for day 1.

### Estimated Ramp Time
2 weeks to independent productivity. Can contribute to analytics queries and data pipeline work in first sprint.

### Next Step
Schedule offer call. This is a strong hire — move quickly to prevent competing offer.

---

Built with [Claudient](https://github.com/Claudient/Claudient)
