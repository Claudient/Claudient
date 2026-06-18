import { useState } from "react";
import { Eyebrow } from "./ui";

interface Tier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  color: string;
  highlighted: boolean;
  features: string[];
  cta: { label: string; href: string };
}

const TIERS: Tier[] = [
  {
    id: "community",
    name: "Community",
    price: "Free",
    priceNote: "Forever open source",
    tagline: "Everything you need to supercharge Claude Code",
    color: "#3fb950",
    highlighted: false,
    features: [
      "400+ public skills & agents",
      "50 workspace stacks",
      "41 MCP configurations",
      "100+ slash commands",
      "48 hooks & 32 rules",
      "5-language localization",
      "Community support via GitHub",
      "AGPL-3.0 + CC-BY-SA-4.0 license",
    ],
    cta: { label: "Get Started →", href: "#install" },
  },
  {
    id: "team",
    name: "Team",
    price: "$15–25",
    priceNote: "per seat / month",
    tagline: "Private stacks and priority support for growing teams",
    color: "#1d4aff",
    highlighted: false,
    features: [
      "Everything in Community",
      "Private stack hosting & sharing",
      "Priority feature requests",
      "Localized skill packs (EN/FR/DE/NL/ES)",
      "Team usage analytics dashboard",
      "Shared team CLAUDE.md templates",
      "Slack/Discord integration hooks",
      "Email support (48h SLA)",
    ],
    cta: { label: "Start Free Trial", href: "mailto:ceo@uitbreiden.com?subject=Team%20Plan%20Trial" },
  },
  {
    id: "business",
    name: "Business",
    price: "Custom",
    priceNote: "tailored to your org",
    tagline: "Governance, compliance, and certified marketplace access",
    color: "#b62ad9",
    highlighted: false,
    features: [
      "Everything in Team",
      "Certified marketplace access",
      "Governance hooks & audit trails",
      "SSO / SAML integration",
      "Custom compliance stacks (SOC2, GDPR)",
      "Advanced analytics & reporting",
      "Dedicated account manager",
      "Onboarding & training sessions",
    ],
    cta: { label: "Contact Sales", href: "mailto:ceo@uitbreiden.com?subject=Business%20Plan%20Inquiry" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Annual",
    priceNote: "contract · custom SLA",
    tagline: "Self-hosted, air-gapped, with a dedicated stack engineer",
    color: "#f54e00",
    highlighted: true,
    features: [
      "Everything in Business",
      "Self-hosted / VPC deployment",
      "Air-gapped environment support",
      "Custom compliance stacks",
      "SLA-backed uptime guarantee",
      "Dedicated stack engineer",
      "White-glove onboarding",
      "Priority incident response",
    ],
    cta: { label: "Book a Demo", href: "mailto:ceo@uitbreiden.com?subject=Enterprise%20Demo%20Request" },
  },
];

export function PricingApp() {
  const [selected, setSelected] = useState("enterprise");

  return (
    <div className="px-6 py-6 overflow-y-auto h-full">
      <Eyebrow color="#f54e00">Pricing</Eyebrow>
      <h2 className="mt-2 text-2xl font-extrabold text-ink">
        From open source to enterprise-grade
      </h2>
      <p className="mt-2 text-[13.5px] text-body leading-relaxed max-w-2xl">
        Start free with 400+ skills, 182+ agents, and 50 workspace stacks.
        Scale to private hosting, governance hooks, and dedicated engineering support.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {TIERS.map((tier) => {
          const isActive = selected === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setSelected(tier.id)}
              className={`text-left rounded-xl border p-5 transition hover:-translate-y-0.5 ${
                tier.highlighted
                  ? "border-2 border-brand-orange bg-gradient-to-br from-orange-50 to-white win-shadow"
                  : isActive
                    ? "border-olive/70 bg-white shadow-sm"
                    : "border-hairline bg-white hover:border-olive/70"
              }`}
            >
              {tier.highlighted && (
                <span className="inline-block mb-2 rounded-full bg-brand-orange/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                  Most Popular
                </span>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-[15px] font-bold text-ink">{tier.name}</span>
                <span className="text-2xl font-extrabold" style={{ color: tier.color }}>{tier.price}</span>
              </div>
              <div className="text-[11px] text-mute mt-0.5">{tier.priceNote}</div>
              <p className="mt-2 text-[12.5px] text-body leading-relaxed">{tier.tagline}</p>
              <ul className="mt-3 space-y-1.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px] text-body">
                    <span className="shrink-0 mt-0.5" style={{ color: tier.color }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={tier.cta.href}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[12px] font-bold transition"
                style={{
                  backgroundColor: tier.highlighted ? tier.color : tier.color + "15",
                  color: tier.highlighted ? "#fff" : tier.color,
                  borderBottom: tier.highlighted ? `2px solid ${tier.color}99` : "none",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {tier.cta.label}
              </a>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-hairline bg-cream p-5">
        <div className="flex items-start gap-4">
          <span className="text-4xl shrink-0">🏢</span>
          <div>
            <div className="text-[14px] font-bold text-ink">Not sure which tier fits?</div>
            <p className="mt-1 text-[12.5px] text-body leading-relaxed">
              Run <code className="rounded bg-white px-1.5 py-0.5 text-[11px] font-mono text-brand-purple">claudient score</code> to
              get your AI-Readiness Score (0–100 across 8 dimensions). We'll recommend the right tier based on your results.
            </p>
            <a
              href="mailto:ceo@uitbreiden.com?subject=Pricing%20Question"
              className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-orange hover:underline"
            >
              Talk to us →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
