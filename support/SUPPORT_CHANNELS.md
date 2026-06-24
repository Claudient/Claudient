# Support Channels

## Overview

UitKit provides multiple support channels to address different types of inquiries. Use the appropriate channel below to ensure your request reaches the right team and receives timely support.

---

## Channel Reference

### GitHub Issues
**Primary use:** Bug reports, technical issues, feature requests  
**URL:** https://github.com/tushar2704/UitKit/issues  
**Response time SLA:** 24-48 hours for initial triage  
**Resolution target:** Critical bugs: 48 hours | High priority: 1 week | Normal: 2 weeks

**When to use:**
- Report reproducible bugs with clear steps
- Technical issues with error messages or logs
- Feature requests with use-case context
- Problems with documentation accuracy

**What to include:**
- Clear title and description
- Environment details (Claude Code version, OS, Node version)
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Logs or screenshots if applicable

---

### GitHub Discussions
**Primary use:** Questions, general guidance, best practices  
**URL:** https://github.com/tushar2704/UitKit/discussions  
**Response time SLA:** 48-72 hours for initial response  
**Resolution target:** 1 week

**When to use:**
- How-to questions ("How do I set up...?")
- Best practices and architectural guidance
- Skill or workflow design discussion
- Sharing solutions and community knowledge
- Debugging help when root cause is unclear

**What to include:**
- Descriptive subject line
- Context about what you're trying to achieve
- Relevant code snippets or configuration
- What you've already tried

---

### Discord (#dont-stop)
**Primary use:** Real-time chat, community support, urgent issues  
**Server:** UitKit Community Discord  
**Channel:** `#dont-stop`  
**Response time SLA:** 2-4 hours during business hours (EST)  
**Resolution target:** Quick answers for immediate blockers

**When to use:**
- Time-sensitive production issues
- Quick questions needing immediate clarification
- Sharing ideas and getting community feedback
- Collaborative debugging sessions
- Integration help and use-case discussion

**Channel norms:**
- Keep messages focused and searchable
- Use threads to avoid chat noise
- Provide context upfront to speed resolution
- Reference GitHub issues when applicable

---

### Email Support
**Primary use:** Sales inquiries, enterprise support, confidential issues  
**Email:** support@uitkit.io  
**Response time SLA:** 
- Enterprise plans: 4 business hours
- Standard plans: 1 business day
- Sales inquiries: 2 business days

**When to use:**
- Licensing and billing questions
- Enterprise support contracts
- Security or compliance issues
- Confidential bug reports
- Business development inquiries

**What to include:**
- Your name and organization
- Contact information and timezone
- Clear subject line indicating category (Bug, Enterprise, Sales, etc.)
- Detailed description and any attachments

---

## Response Time SLA Matrix

| Channel | Initial Response | Investigation | Resolution |
|---------|------------------|---|---|
| **GitHub Issues** (Critical) | 4-8 hours | 24 hours | 48 hours |
| **GitHub Issues** (High) | 24 hours | 48 hours | 1 week |
| **GitHub Issues** (Normal) | 48 hours | 1 week | 2 weeks |
| **GitHub Discussions** | 48-72 hours | Ongoing | 1 week typical |
| **Discord** (Business hours) | 2-4 hours | 4-24 hours | Case-by-case |
| **Discord** (After hours) | Next business day | 1-2 business days | Case-by-case |
| **Email (Enterprise)** | 4 business hours | 8-16 hours | 1-2 business days |
| **Email (Standard)** | 1 business day | 2-3 business days | 3-5 business days |

---

## Priority Levels

### Critical (P0)
- Production systems completely unavailable
- Complete feature loss
- Security vulnerability
- Data loss risk

**SLA:** 4-8 hour initial response, 48-hour target resolution

### High (P1)
- Core functionality degraded
- Significant feature broken
- Workaround exists but cumbersome
- Blocking multiple users

**SLA:** 24-hour initial response, 1-week target resolution

### Normal (P2)
- Minor feature issue
- Cosmetic problems
- Single-user impact
- Easy workaround available

**SLA:** 48-hour initial response, 2-week target resolution

### Low (P3)
- Enhancement requests
- Documentation improvements
- Nice-to-have features

**SLA:** Best effort, typically reviewed monthly

---

## Routing Guidelines

```
Is it a bug?
├─ Yes, clear reproduction steps? → GitHub Issues
├─ Yes, unsure of root cause? → GitHub Discussions or Discord
└─ No

Is it a question about usage?
├─ How-to question? → GitHub Discussions
├─ Need quick answer? → Discord (#dont-stop)
└─ Complex guidance? → GitHub Discussions

Is it a feature request?
├─ With clear use case? → GitHub Issues
├─ Exploring feasibility? → GitHub Discussions
└─ Discussion/brainstorm? → Discord

Is it sales/enterprise/confidential?
└─ Email support@uitkit.io

Is it urgent/blocking production?
├─ During business hours? → Discord (#dont-stop)
└─ Critical bug? → GitHub Issues (Priority: Critical)
```

---

## Best Practices

### Before Contacting Support

1. **Check documentation:** Review CLAUDE.md, README.md, and relevant guides
2. **Search existing issues:** Use GitHub Issues/Discussions search to find similar problems
3. **Gather information:**
   - Claude Code version: `claude --version`
   - Node.js version: `node --version`
   - OS and architecture
   - Relevant logs and error messages
   - Steps to reproduce (for bugs)

### When Creating an Issue/Discussion

- **Be specific:** Avoid vague descriptions like "it doesn't work"
- **Include environment details:** Version numbers, OS, configuration
- **Provide reproducible examples:** Exact steps, minimal code samples
- **Share context:** What were you trying to do? Why?
- **Mention what you've tried:** Shows effort and helps narrow scope

### In Discord Conversations

- Use threads to keep conversations organized
- @mention team members only when necessary
- Avoid reposting the same question; wait for responses
- Provide additional details in follow-ups rather than new messages
- Link to related GitHub issues for context

---

## Escalation Path

If your issue is not being resolved:

1. **Initial attempt:** Post in appropriate channel with full context
2. **No response after SLA:** Add a follow-up comment or message
3. **Still unresolved:** Escalate via email to support@uitkit.io with:
   - Original GitHub issue/discussion link or Discord message timestamp
   - Summary of attempts so far
   - Business impact and urgency
   - Requested timeline

---

## Status Page

For service status and incident updates, check:  
**https://status.uitkit.io**

Subscribe to status updates to be notified of:
- Planned maintenance windows
- Service incidents and outages
- Performance degradations
- Resolution and post-incident reports

---

## Community Guidelines

All support channels follow the [Code of Conduct](../CODE_OF_CONDUCT.md). Members are expected to:
- Be respectful and constructive
- Search before asking duplicate questions
- Share knowledge and help others
- Report security issues privately (security@uitkit.io)
- Keep commercial pitches out of community channels

---

## Enterprise Support

For organizations using UitKit at scale:

- **Dedicated support contact:** Named point person
- **Faster response times:** SLA-based escalation path
- **Priority issue queue:** Critical issues prioritized
- **Custom integrations:** Support for custom skill development
- **Training:** Onboarding and team training available

**Contact:** sales@uitkit.io or visit [Enterprise Plans](../PRICING.md#enterprise)

---

## Additional Resources

- **Documentation:** https://uitkit.io/docs
- **Guides:** See `guides/` directory in repository
- **API Reference:** https://uitkit.io/api
- **Changelog:** https://github.com/tushar2704/UitKit/releases
- **Security Policy:** [SECURITY.md](../SECURITY.md)
- **Contributing:** [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**Last updated:** 2026-06-22  
**Maintained by:** UitKit Community Team
