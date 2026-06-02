# SDR Sequence Builder

## When to run

This workflow activates when you're launching a new outbound sequence targeting a specific account segment. Triggers include:
- Quarterly planning cycle requires a new segment focus
- Product launch requires outbound motion to new buyer personas
- Vertical expansion strategy needs segment-specific sequences
- Win-loss analysis identifies a repeatable signal you want to target

## Inputs required

Before starting, gather:
1. **ICP definition** — company size, industry, revenue range, technology stack
2. **Signal type** — trigger-based (funding, job change, tech adoption) or static outbound (expansion within existing segment)
3. **Account tier** — which tier(s) you're targeting (Tier 1 = $10M+, Tier 2 = $1-10M, Tier 3 = <$1M, or your own scale)
4. **Seniority target** — VP-level, C-suite, Director, Manager
5. **Account list or data source** — CSV, Salesforce query result, or Apollo/Hunter export (N accounts, typically 50-500)
6. **Messaging framework choices** — select from: Short Trigger, Do the Math, Founder's Story, Compliance + ROI, Community Proof, Feature Parity, DM Social, or custom

## Steps

### Step 1 — Define Target Segment (15 min)

**Claude action:**
Ask Claude to refine your segment definition. Provide:
- ICP definition (or rough sketch)
- Signal type (trigger or static)
- Account tier(s)
- Seniority target

**Claude prompt:**
"Help me define the segment for this sequence. ICP: [X]. Signal: [Y]. Account tier: [Z]. Seniority: [W]. What firmographic and technographic filters should I use to narrow this list? Should I exclude any company types, regions, or industries?"

**Claude output:**
- Refined segment criteria (5-10 specific filters)
- Rationale for each filter
- Estimated addressable market size
- Flag any data quality concerns

**Decision point:**
Does the segment feel actionable (500-2000 accounts) or too narrow (<100) or too broad (>5000)?

---

### Step 2 — Build and Score Account List (30 min)

**Your action:**
Export your account list from your data source. Ensure it includes:
- Company name, domain, company size, funding, tech stack (if available)
- Contact names, titles, emails for 2-4 decision makers per account
- Any recent signals (job change, funding event, tech adoption) with dates

**Claude action:**
Score and tier the accounts. Provide Claude with the list.

**Claude prompt:**
"Score these [N] accounts against the ICP. Tier them 1/2/3 based on fit. Flag which ones have signals in the last 14 days. For the 20 highest-scoring Tier 1 accounts, list the signal(s) and dates. Output as a CSV: Account | Tier | Score | Signal | Signal Date."

**Claude output:**
- Scored account list (ranked by tier and fit score)
- 20 warm accounts (Tier 1 + recent signal)
- 20 cold accounts (Tier 1, no signal, but strong ICP fit)
- Red flags (companies to deprioritize or avoid)

**Decision point:**
Do you have at least 15 Tier 1 accounts to target? If not, expand the segment or lower the tier threshold.

---

### Step 3 — Select Messaging Framework (10 min)

**Claude action:**
Recommend the best messaging framework for your segment.

**Claude prompt:**
"Given this segment: Tier 1 accounts, [seniority target], [signal type], in [industry/use case], which of these 8 frameworks fits best and why? Frameworks: (1) Short Trigger, (2) Do the Math, (3) Founder's Story, (4) Compliance + ROI, (5) Community Proof, (6) Feature Parity, (7) DM Social, (8) Custom. Justify your pick with 2-3 reasons."

**Claude output:**
- Recommended framework with justification
- Key hooks and pain points to emphasize
- 3 example opening lines unique to this framework
- Alternative framework if the primary doesn't resonate

**Decision point:**
Does the framework align with your sales playbook and team's messaging? If not, suggest a different framework.

---

### Step 4 — Write the Sequence (45 min)

**Claude action:**
Generate the 4-email sequence for 3-5 example accounts.

**Claude prompt:**
"Write the 4-email sequence for these 3 example accounts using the [Framework] framework. Details: Target title [X], company tier [Y], signal: [Z]. Email 1: hook + specific signal reference, under 100 words. Email 2: pain point + relevant KPI, 120-150 words. Email 3: delegation/social proof + soft ask, 100-140 words. Email 4: break-up + value reminder, 80-100 words. Include subject lines. For each email, show 2 variations (Version A and B) so I can A/B test."

**Claude output:**
For each of 3 accounts:
- Email 1 (2 versions): Hook + Signal
- Email 2 (2 versions): Pain + KPI
- Email 3 (2 versions): Delegation + Ask
- Email 4 (2 versions): Break-up
- Recommended send cadence (days between each email)

**Decision point:**
Do all 4 emails feel personalized and credible to your team? Do they avoid product pitch in Email 1?

---

### Step 5 — QA Check (15 min)

**Claude action:**
QA review against the 5-point quality checklist.

**Claude prompt:**
"QA these 12 emails against the messaging rules. For each email, check: (1) Under word limit (Email 1: <100w, Email 2: <150w, Email 3: <140w, Email 4: <100w)? (2) Specific personalization (mentions signal, company, or use case, not generic)? (3) Email 1 has no product pitch? (4) Clear CTA (specific ask, not 'let's chat')? (5) No spam trigger words? Flag violations. Suggest 1 fix per issue."

**Claude output:**
- QA pass/fail for each email
- Flagged violations with specific fixes
- Revised emails (if needed)
- Approval to proceed to CRM load

**Decision point:**
Are all 4 emails approved? If not, revise and re-QA.

---

### Step 6 — CRM Load and Sequence Configuration (20 min)

**Your action:**
1. Tag all contacts in your target list with: `[Sequence Name] - Active` and account tier tags
2. Log into your outreach tool (Salesforce/Outreach/Instantly/etc.)
3. Create the sequence with staggered start dates
4. Configure send cadence:
   - Email 1: Day 0 (immediate, 9 AM recipient timezone)
   - Email 2: Day 2 (48 hours later, 10 AM)
   - Email 3: Day 5 (3 days after Email 2, 2 PM)
   - Email 4: Day 9 (4 days after Email 3, 11 AM)
5. Never blast all contacts on the same day — stagger over 5 days
6. Set reply tracking and auto-stop on positive reply

**Claude action:**
Assist with sequence logic if needed.

**Claude prompt:**
"Help me configure this sequence in [tool name]. I want to stagger 250 accounts over 5 days, 50 per day. Should I randomize within each day or use a fixed time? What's the best auto-stop logic: reply received, calendar meeting booked, or both?"

**Claude output:**
- Configuration checklist
- Recommended stagger strategy
- Auto-stop conditions

**Decision point:**
Is the sequence live and contacts flowing through? Verify 2-3 contacts received Email 1 before proceeding.

---

### Step 7 — Performance Review Gate (after 7 days)

**Claude action:**
Analyze 7-day metrics and recommend optimizations.

**Claude prompt:**
"Here are the metrics for this sequence after 7 days: Open Rate [X]%, Reply Rate [Y]%, Click Rate [Z]%, Unsubscribe Rate [W]%. Comparison: Company average is [A]% open, [B]% reply. Signal quality (Tier 1 vs Tier 2): [breakdown]. Framework performance: [framework] vs [alternative]. What should we change and why? Prioritize the top 3 tweaks."

**Claude output:**
- Benchmark comparison (vs your baseline)
- Root cause analysis (message, list quality, timing, or targeting)
- Top 3 optimization recommendations:
  1. Email copy tweak (specific line or hook)
  2. Timing or cadence adjustment
  3. Targeting or list refinement
- Decision: Continue as-is, pause + revise, or expand to new segment?

**Decision point:**
Does the performance justify scaling to more accounts? If metrics are weak, implement Claude's recommended tweaks and re-test in a new micro-segment before broad rollout.

---

## Output

A production-ready outbound sequence consisting of:
1. **Segment definition document** — ICP filters, tier breakdown, addressable market
2. **Scored account list** — 250-500 accounts ranked by fit and signal recency
3. **4-email sequence (8 variations)** — 2 A/B versions per email, 4 send cadences, messaging framework clearly stated
4. **QA report** — All emails pass quality checklist, no spam flags, personalization confirmed
5. **Sequence configuration** — Live in CRM/outreach tool, staggered over 5 days, auto-stop rules configured
6. **7-day performance snapshot** — Metrics, benchmarks, and top 3 optimization recommendations

---

## Example

**Scenario:** You're an Account Executive at a B2B SaaS company selling data infrastructure. You want to target mid-market companies (Tier 1: $10-50M) in FinTech that recently adopted a competing data tool.

### Step 1 — Define Segment
- **ICP:** FinTech, $10-50M ARR, founded 2015+, technical co-founder still in company
- **Signal:** Installed Databricks or Snowflake in last 30 days (trigger-based)
- **Seniority:** VP Engineering, VP Data
- **Claude output:** "Add filter: Must have 50+ engineering headcount. Exclude pure-play traders (they don't own infrastructure). Target 8 key metros: NYC, SF, LA, Boston, Austin, Chicago, London, Singapore."

### Step 2 — Build and Score
- **Inputs:** 300 FinTech companies from G2/Crunchbase + Salesforce install data
- **Claude output:** 
  - 45 Tier 1 accounts (strong ICP, $20-50M, >50 engineers)
  - 15 of those 45 with Snowflake/Databricks signal in last 14 days (warm)
  - 30 without signal but strong ICP fit (cold)

### Step 3 — Select Framework
- **Segment:** Tier 1, VP Engineering, trigger-based (recent Databricks install)
- **Claude recommendation:** "**Do the Math** — best fit. These VPs are evaluating infrastructure costs. Hook on the ROI gap between Databricks + your tool vs. legacy stacks. Open with the trigger (we see you installed Databricks) + immediate value (30% lower compute costs)."

### Step 4 — Write Sequence
**Example account:** Prism Analytics, NYC, VP Eng named Sarah Chen, installed Databricks 8 days ago.

**Email 1 (Hook + Signal):**
> Subject: One thing the Databricks install at Prism is missing
> 
> Sarah,
> 
> Noticed your team deployed Databricks last week. Smart move—queries are 10x faster out of the box.
> 
> Here's what we usually see next: infrastructure costs balloon when query volume scales. Curious if that's on your roadmap to solve?
> 
> Worth a 10-min call?
> 
> [Name]

**Email 2 (Pain + KPI):**
> Subject: Re: One thing the Databricks install...
> 
> Sarah,
> 
> Data teams running Databricks typically hit a cost wall at ~3M daily queries. At that scale, compute bills often double quarter-over-quarter.
> 
> Most teams we talk to weren't prepared for that. Few have a cost governance strategy built in from day one.
> 
> This is something we've solved for teams like Ramp and Stripe—both cut their Databricks costs 35% in Q1 without losing query speed.
> 
> If cost optimization is on your roadmap, happy to walk through what that looked like for them.
> 
> [Name]

**Email 3 (Delegation + Ask):**
> Subject: Spotted your VP Data on LinkedIn—figured they'd care about this
> 
> Sarah,
> 
> Just published a 1-pager on "Databricks Cost Patterns at Scale" based on 200+ deployments. Your VP Data might find it useful for planning.
> 
> I'll send it over if it's helpful.
> 
> [Name]

**Email 4 (Break-up):**
> Subject: Last note—Prism's Databricks opportunity
> 
> Sarah,
> 
> I'll step back, but one last resource: our ROI calculator shows companies similar to Prism save ~$2.1M annually with smart cost controls.
> 
> If that changes your thinking, I'm here.
> 
> [Name]

### Step 5 — QA Check
- **Email 1:** ✓ 47 words, ✓ specific signal (deployed Databricks last week), ✓ no product pitch, ✓ clear CTA (10-min call), ✓ no spam words. **PASS**
- **Email 2:** ✓ 91 words, ✓ specific KPI (3M queries, 35% savings), ✓ social proof (Ramp, Stripe), ✓ clear ask, ✓ no spam. **PASS**
- **Email 3:** ✓ 43 words, ✓ personalized delegation, ✓ clear CTA, ✓ no spam. **PASS**
- **Email 4:** ✓ 44 words, ✓ calculator reference is value-add not pitch, ✓ clean break-up, ✓ door open. **PASS**

### Step 6 — CRM Load
- Tagged 45 Tier 1 FinTech accounts: `Databricks-Sequence-2024Q2`, `Tier1`, `VP-Eng`
- Created sequence in Outreach
- Cadence: Email 1 (Day 0, 9 AM PT), Email 2 (Day 2, 10 AM PT), Email 3 (Day 5, 2 PM PT), Email 4 (Day 9, 11 AM PT)
- Staggered 45 contacts over 5 days: 9 per day, randomized within each day
- Auto-stop: Reply received or calendar meeting booked

### Step 7 — Performance (7-day snapshot)
- **Metrics:** 34% open rate, 8.2% reply rate, 1.1% unsubscribe
- **Benchmark:** Company avg 28% open, 6% reply
- **Tier 1 vs Tier 2:** Tier 1 accounts: 41% open, 12% reply (signal = quality)
- **Claude recommendation:** "You're beating benchmarks. 12% reply on warm Tier 1 is excellent. Expand this to the 30 cold Tier 1 accounts (no recent signal) and A/B test the hook—try 'We helped [competitor] cut Databricks costs' vs current 'one thing missing' version on the next 50 accounts."
- **Decision:** Scale to cold Tier 1 cohort and test hook variation.

---

**Created:** 2026-06-02
**Last updated:** 2026-06-02
