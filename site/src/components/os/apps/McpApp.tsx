import { useState } from "react";
import { Eyebrow, YellowButton } from "./ui";

const configs = [
  { name: "GitHub", icon: "🐙", desc: "Issues, PRs, repos, and code search", tools: ["search_repositories", "create_issue", "list_pull_requests", "get_file_contents"] },
  { name: "PostgreSQL", icon: "🐘", desc: "Query, schema, and migration management", tools: ["execute_query", "list_tables", "describe_table", "create_migration"] },
  { name: "Redis", icon: "🔴", desc: "Cache operations and pub/sub", tools: ["get_key", "set_key", "list_keys", "publish_message"] },
  { name: "Stripe", icon: "💳", desc: "Payments, subscriptions, and invoices", tools: ["create_customer", "list_subscriptions", "create_payment_intent"] },
  { name: "Notion", icon: "📝", desc: "Pages, databases, and content", tools: ["search_pages", "create_page", "update_database", "query_database"] },
  { name: "Linear", icon: "🔷", desc: "Issues, projects, and workflows", tools: ["create_issue", "list_issues", "update_issue", "list_projects"] },
  { name: "Supabase", icon: "⚡", desc: "Database, auth, and storage", tools: ["execute_sql", "list_tables", "manage_auth", "manage_storage"] },
  { name: "MongoDB", icon: "🍃", desc: "Documents, aggregations, and indexes", tools: ["find_documents", "aggregate", "create_index", "list_databases"] },
  { name: "Slack", icon: "💬", desc: "Messages, channels, and threads", tools: ["send_message", "list_channels", "search_messages"] },
  { name: "AWS", icon: "☁️", desc: "S3, Lambda, DynamoDB, and more", tools: ["list_buckets", "invoke_lambda", "query_dynamodb"] },
  { name: "Docker", icon: "🐳", desc: "Containers, images, and volumes", tools: ["list_containers", "build_image", "inspect_container"] },
  { name: "Figma", icon: "🎨", desc: "Design files and components", tools: ["get_file", "get_styles", "get_components"] },
];

export function McpApp() {
  const [active, setActive] = useState(0);
  const cfg = configs[active];
  const [copied, setCopied] = useState(false);

  const copyConfig = () => {
    const json = JSON.stringify({
      mcpServers: { [cfg.name.toLowerCase()]: { command: "npx", args: [`mcp-${cfg.name.toLowerCase()}-server`] } }
    }, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col sm:flex-row">
      <aside className="sm:w-52 shrink-0 border-r border-hairline bg-cream p-3 overflow-auto">
        <Eyebrow color="#1078a3">MCP Configs</Eyebrow>
        <div className="mt-2 space-y-0.5">
          {configs.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className={`w-full text-left flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition ${
                i === active ? "bg-white border border-hairline text-ink" : "text-body hover:bg-white/60"
              }`}
            >
              <span>{c.icon}</span>
              {c.name}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto p-7">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{cfg.icon}</span>
          <div>
            <h1 className="text-2xl font-extrabold text-ink">{cfg.name}</h1>
            <div className="text-[13px] text-mute">{cfg.desc}</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[12px] font-bold text-mute uppercase tracking-wider mb-2">Key Tools</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {cfg.tools.map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-lg border border-hairline bg-white px-3 py-2.5 text-[12px] font-mono text-ink">
                <span className="text-brand-teal">▸</span> {t}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[12px] font-bold text-mute uppercase tracking-wider mb-2">Quick Install</div>
          <pre className="rounded-xl bg-[#1d1f27] text-[#e6e6e6] p-4 text-[12px] font-mono leading-relaxed overflow-auto">
            <code>{`{
  "mcpServers": {
    "${cfg.name.toLowerCase()}": {
      "command": "npx",
      "args": ["mcp-${cfg.name.toLowerCase()}-server"]
    }
  }
}`}</code>
          </pre>
          <div className="mt-3">
            <YellowButton onClick={copyConfig}>
              {copied ? "✓ Copied!" : "Copy Config JSON"}
            </YellowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
