import { useState, useMemo } from "react";
import { Eyebrow, YellowButton } from "./ui";

interface McpDef {
  name: string;
  id: string;
  icon: string;
  desc: string;
  category: string;
  tools: string[];
  install: string;
}

const configs: McpDef[] = [
  // Developer Tools
  { name: "GitHub", id: "github", icon: "🐙", category: "Developer Tools",
    desc: "Interact with GitHub directly from Claude Code. Read issues, open PRs, review code, search repositories, and manage releases.",
    tools: ["create_or_update_file", "create_issue", "create_pull_request", "get_file_contents", "search_repositories", "fork_repository", "create_branch", "add_issue_comment"],
    install: "npx -y @modelcontextprotocol/server-github" },
  { name: "Docker", id: "docker", icon: "🐳", category: "Developer Tools",
    desc: "Connects Claude Code to Docker for container management, image inspection, and log analysis.",
    tools: ["list_containers", "list_images", "inspect_container", "container_logs", "container_stats"],
    install: "npx -y @modelcontextprotocol/server-docker" },
  { name: "Vercel", id: "vercel", icon: "▲", category: "Developer Tools",
    desc: "Manage Vercel deployments, projects, domains, and environment variables from inside Claude Code.",
    tools: ["get_deployment_logs", "rollback_deployment"],
    install: "npx -y @vercel/mcp-server" },
  { name: "Playwright", id: "playwright-mcp", icon: "🎭", category: "Developer Tools",
    desc: "Control a real browser directly from Claude Code. Navigate pages, click elements, fill forms, take screenshots, and extract content.",
    tools: ["browser_navigate", "browser_click", "browser_type", "browser_screenshot", "browser_scroll", "browser_evaluate", "browser_get_text", "browser_select_option"],
    install: "npx -y @playwright/mcp" },
  { name: "Puppeteer", id: "puppeteer", icon: "🎪", category: "Developer Tools",
    desc: "Control a real browser from Claude Code. Navigate, click, fill forms, take screenshots, and scrape pages.",
    tools: ["puppeteer_navigate", "puppeteer_click", "puppeteer_fill", "puppeteer_screenshot", "puppeteer_evaluate"],
    install: "npx -y @modelcontextprotocol/server-puppeteer" },
  { name: "Excalidraw", id: "excalidraw", icon: "📐", category: "Developer Tools",
    desc: "Generate architecture diagrams, flowcharts, and system maps directly from Claude Code. Describe your system in plain English.",
    tools: ["create_diagram", "add_element", "export_svg"],
    install: "npx -y @anthropic/excalidraw-mcp" },
  { name: "Memory", id: "memory", icon: "🧠", category: "Developer Tools",
    desc: "Give Claude Code memory that persists across sessions. Stores facts, decisions, and context in a local knowledge graph.",
    tools: ["remember", "recall", "forget", "list_memories"],
    install: "npx -y @modelcontextprotocol/server-memory" },
  { name: "Sequential Thinking", id: "sequential-thinking", icon: "🔗", category: "Developer Tools",
    desc: "Structured step-by-step reasoning server that forces Claude to think through complex problems methodically before answering.",
    tools: ["nextThoughtNeeded", "revisesThought", "thoughtNumber", "totalThoughts"],
    install: "npx -y @modelcontextprotocol/server-sequential-thinking" },
  { name: "Context7", id: "context7", icon: "📚", category: "Developer Tools",
    desc: "Give Claude Code access to up-to-date documentation for any library or framework. No more hallucinated APIs or outdated code examples.",
    tools: ["resolve_library_id", "get_library_docs"],
    install: "npx -y @upstash/context7-mcp" },
  { name: "TaskMaster", id: "taskmaster", icon: "📋", category: "Developer Tools",
    desc: "AI-powered task management with context isolation — break down large features into tracked subtasks, maintain progress across sessions.",
    tools: ["create_task", "get_task", "done", "blocked", "add_subtask", "expand_task", "analyze_project_complexity", "generate_task_files"],
    install: "npx -y @eyecuelabs/taskmaster-mcp" },

  // Databases
  { name: "PostgreSQL", id: "postgres", icon: "🐘", category: "Databases",
    desc: "Connects Claude Code to PostgreSQL databases for direct querying, schema inspection, and data management.",
    tools: ["query", "list_tables", "describe_table"],
    install: "npx -y @modelcontextprotocol/server-postgres" },
  { name: "MongoDB", id: "mongodb", icon: "🍃", category: "Databases",
    desc: "Query, insert, update, and manage MongoDB data directly from Claude Code — across local instances, Atlas clusters, and serverless deployments.",
    tools: ["find_documents", "aggregate", "create_index", "describe_collection", "insert_document", "insert_many", "delete_documents", "explain_query"],
    install: "npx -y @modelcontextprotocol/server-mongodb" },
  { name: "Redis", id: "redis", icon: "🔴", category: "Databases",
    desc: "Connects Claude Code to Redis instances for cache inspection, key management, and pub/sub monitoring.",
    tools: ["redis_command", "redis_info", "redis_keys"],
    install: "npx -y @modelcontextprotocol/server-redis" },
  { name: "Supabase", id: "supabase", icon: "⚡", category: "Databases",
    desc: "Give Claude Code direct access to your Supabase project — query Postgres tables, inspect RLS policies, manage auth users, invoke Edge Functions.",
    tools: ["list_auth_users", "get_auth_logs", "get_rls_policies", "invoke_function", "list_buckets", "anon"],
    install: "npx -y @supabase/mcp-server-supabase" },
  { name: "Neon", id: "neon", icon: "💚", category: "Databases",
    desc: "Manage Neon Postgres databases directly from Claude Code — create projects, execute SQL, branch databases for safe migrations.",
    tools: ["execute_sql", "get_connection_string", "create_project", "create_branch", "delete_branch", "get_project"],
    install: "npx -y @neondatabase/mcp-server-neon" },
  { name: "Elasticsearch", id: "elasticsearch", icon: "🔎", category: "Databases",
    desc: "Connects Claude Code to Elasticsearch clusters for search queries, index management, and cluster health monitoring.",
    tools: ["search", "list_indices", "index_mapping", "cluster_health", "cat_indices"],
    install: "npx -y @elastic/mcp-server-elasticsearch" },
  { name: "Kafka", id: "kafka", icon: "📨", category: "Databases",
    desc: "Connects Claude Code to Apache Kafka clusters for topic inspection, consumer group monitoring, and message analysis.",
    tools: ["list_topics", "describe_topic", "consumer_groups", "read_messages", "cluster_info"],
    install: "npx -y @modelcontextprotocol/server-kafka" },

  // Project Management
  { name: "Linear", id: "linear", icon: "🔷", category: "Project Management",
    desc: "Manage Linear issues, projects, and cycles directly from Claude Code — query tickets, update status, create issues, and run triage workflows.",
    tools: ["create_issue", "get_issue", "list_projects", "list_cycles", "list_teams", "list_workflow_states", "create_comment", "get_cycle"],
    install: "npx -y @modelcontextprotocol/server-linear" },
  { name: "Jira", id: "jira", icon: "🔵", category: "Project Management",
    desc: "Connects Claude Code to Jira for issue management, sprint tracking, and project administration.",
    tools: ["create_issue", "get_issue", "list_sprints", "search_issues", "update_issue"],
    install: "npx -y @modelcontextprotocol/server-jira" },
  { name: "Atlassian", id: "atlassian", icon: "🔷", category: "Project Management",
    desc: "Connect Claude Code to Jira and Confluence. Read tickets, update issue status, write documentation, run JQL queries.",
    tools: ["create_issue", "get_issue", "add_comment", "create_page", "get_page", "get_project", "get_sprint", "search_content"],
    install: "npx -y @anthropic/atlassian-mcp" },
  { name: "Notion", id: "notion", icon: "📝", category: "Project Management",
    desc: "Read and write Notion pages, databases, and blocks from Claude Code — search your workspace, create and update content.",
    tools: ["search", "get_page", "get_database", "create_page", "query_database", "append_block_children", "create_database_item", "update_database_item"],
    install: "npx -y @modelcontextprotocol/server-notion" },
  { name: "Airtable", id: "airtable", icon: "📊", category: "Project Management",
    desc: "Connects Claude Code to Airtable bases for record management, data queries, and automation triggers.",
    tools: ["query_records", "create_record", "update_record", "list_bases", "list_tables"],
    install: "npx -y @modelcontextprotocol/server-airtable" },

  // Communication
  { name: "Slack", id: "slack", icon: "💬", category: "Communication",
    desc: "Read Slack channels, search messages, post updates, and manage notifications — bring your team's context into Claude Code.",
    tools: ["list_channels", "post_message", "get_channel_history", "get_thread_replies", "reply_to_thread", "get_user_profile", "list_users", "add_reaction"],
    install: "npx -y @modelcontextprotocol/server-slack" },
  { name: "Discord", id: "discord", icon: "🎮", category: "Communication",
    desc: "Connects Claude Code to Discord for community management, message monitoring, and bot automation.",
    tools: ["read_messages", "send_message", "list_channels", "manage_roles"],
    install: "npx -y @modelcontextprotocol/server-discord" },
  { name: "Ntfy", id: "ntfy", icon: "🔔", category: "Communication",
    desc: "Send push notifications from within Claude Code agent flows. Trigger notifications at specific milestones in your automation.",
    tools: ["default", "high", "urgent"],
    install: "npx -y @modelcontextprotocol/server-ntfy" },

  // Cloud & Infrastructure
  { name: "Cloudflare", id: "cloudflare", icon: "☁️", category: "Cloud & Infrastructure",
    desc: "Manage the full Cloudflare edge stack — Workers, R2, D1, KV, DNS, Pages, AI, and Zero Trust — from Claude Code.",
    tools: ["kv", "dns_records", "workers", "pages_deploy"],
    install: "npx -y @cloudflare/mcp-server-cloudflare" },
  { name: "Datadog", id: "datadog", icon: "🐶", category: "Cloud & Infrastructure",
    desc: "Connect Claude Code to Datadog for real-time observability — query metrics, search logs, inspect APM traces, and manage monitors.",
    tools: ["search_logs", "get_monitors"],
    install: "npx -y @datadog/mcp-server" },
  { name: "PagerDuty", id: "pagerduty", icon: "🚨", category: "Cloud & Infrastructure",
    desc: "Connect Claude Code to PagerDuty for incident management — list active incidents, check on-call schedules, acknowledge and resolve alerts.",
    tools: ["list_incidents", "create_incident", "get_on_call", "list_services", "since", "until", "service_id"],
    install: "npx -y @modelcontextprotocol/server-pagerduty" },
  { name: "Sentry", id: "sentry-remote", icon: "🕵️", category: "Cloud & Infrastructure",
    desc: "Connect Claude Code directly to Sentry for error tracking, issue triage, and release health monitoring — runs as a remote MCP over HTTP.",
    tools: ["search_errors", "get_release"],
    install: "npx -y @anthropic/sentry-remote-mcp" },
  { name: "Google Drive", id: "google-drive", icon: "📁", category: "Cloud & Infrastructure",
    desc: "Connects Claude Code to Google Drive for file search, document reading, and content management.",
    tools: ["search_files", "read_file", "list_folder", "create_doc"],
    install: "npx -y @modelcontextprotocol/server-google-drive" },

  // Security
  { name: "Snyk", id: "snyk", icon: "🛡️", category: "Security",
    desc: "Real-time vulnerability scanning from inside Claude Code. Check dependencies for CVEs, get fix suggestions, and understand severity.",
    tools: ["snyk_test", "snyk_fix", "snyk_monitor", "snyk_iac", "snyk_container"],
    install: "npx -y @anthropic/snyk-mcp" },
  { name: "Auth0", id: "auth0", icon: "🔐", category: "Security",
    desc: "Connect Claude Code to Auth0 for identity and access management — query users, manage roles, inspect login logs.",
    tools: ["get_logs", "block_user", "update_user"],
    install: "npx -y @auth0/mcp-server" },

  // Design & Content
  { name: "Figma", id: "figma", icon: "🎨", category: "Design & Content",
    desc: "Read Figma designs directly inside Claude Code. Extract component specs, color tokens, typography scales, layer structure, and export assets.",
    tools: ["get_file", "get_styles", "get_components", "get_node", "export_node", "get_comments", "get_file_versions"],
    install: "npx -y @modelcontextprotocol/server-figma" },

  // Commerce
  { name: "Stripe", id: "stripe", icon: "💳", category: "Commerce",
    desc: "Query Stripe data, manage customers, products, and subscriptions directly from Claude Code.",
    tools: ["create_customer", "list_customers", "get_customer", "list_charges", "get_subscription", "create_product", "create_price", "create_payment_link"],
    install: "npx -y @anthropic/stripe-mcp" },
  { name: "Shopify", id: "shopify", icon: "🛍️", category: "Commerce",
    desc: "Manage a Shopify store from Claude Code — query products, orders, customers, analytics, and metafields without opening the dashboard.",
    tools: ["get_analytics", "date_preset", "today"],
    install: "npx -y @shopify/mcp-server" },

  // Marketing & Social
  { name: "Meta Ads", id: "meta", icon: "📣", category: "Marketing & Social",
    desc: "Manage Facebook and Instagram ad campaigns from Claude Code — create campaigns, optimize audiences, analyze A/B tests.",
    tools: ["create_lookalike_audience"],
    install: "npx -y @anthropic/meta-ads-mcp" },

  // Legal & Research
  { name: "Thomson Reuters", id: "thomson-reuters", icon: "⚖️", category: "Legal & Research",
    desc: "Direct access to Westlaw and Practical Law from Claude Code — retrieve current case law, statutes, and regulations. Requires active subscription.",
    tools: ["search_cases", "get_case", "get_statute", "get_practical_law", "search_regulations", "format_citation"],
    install: "npx -y @thomsonreuters/mcp-server" },
  { name: "Free Law", id: "free-law", icon: "📜", category: "Legal & Research",
    desc: "Free, open-access US court opinions, docket data, and judge profiles via CourtListener. 8.4M+ opinions updated continuously.",
    tools: ["search_opinions", "get_opinion", "get_docket", "search_judges"],
    install: "npx -y @anthropic/free-law-mcp" },
  { name: "Valyu", id: "valyu", icon: "🔬", category: "Legal & Research",
    desc: "Access paywalled and premium data sources: SEC filings, PubMed research, clinical trial data, academic papers, and financial databases.",
    tools: ["search", "get_document", "list_sources"],
    install: "npx -y @valyu/mcp-server" },
];

const categories = [...new Set(configs.map((c) => c.category))];

const SERVER_ENV_FIELDS: Record<string, string[]> = {
  github: ["GITHUB_PERSONAL_ACCESS_TOKEN"],
  postgres: ["POSTGRES_CONNECTION_STRING"],
  supabase: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
  slack: ["SLACK_BOT_TOKEN", "SLACK_APP_TOKEN"],
  linear: ["LINEAR_API_KEY"],
  jira: ["JIRA_URL", "JIRA_API_TOKEN", "JIRA_USER_EMAIL"]
};

export function McpApp() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState("");
  const [envVars, setEnvVars] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    if (!query.trim()) return configs;
    const q = query.toLowerCase();
    return configs.filter(
      (c) => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [query]);

  const cfg = filtered[active] ?? filtered[0];

  const requiredFields = cfg ? (SERVER_ENV_FIELDS[cfg.id] || []) : [];

  const getEnvConfig = () => {
    if (requiredFields.length === 0) return undefined;
    const env: Record<string, string> = {};
    requiredFields.forEach((field) => {
      env[field] = envVars[field] || `YOUR_${field}_HERE`;
    });
    return env;
  };

  const getFullConfigJson = () => {
    if (!cfg) return "";
    const env = getEnvConfig();
    const serverConfig: any = {
      command: "npx",
      args: ["-y", cfg.install.replace("npx -y ", "")]
    };
    if (env) {
      serverConfig.env = env;
    }
    return JSON.stringify({ mcpServers: { [cfg.id]: serverConfig } }, null, 2);
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(getFullConfigJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnvChange = (field: string, val: string) => {
    setEnvVars((prev) => ({ ...prev, [field]: val }));
  };

  if (!cfg) return <div className="p-6 text-mute text-sm">No MCP configs found.</div>;

  return (
    <div className="h-full flex flex-col sm:flex-row">
      {/* Sidebar */}
      <aside className="sm:w-56 shrink-0 border-r border-hairline bg-cream flex flex-col overflow-hidden">
        <div className="p-3 pb-2">
          <Eyebrow color="#1078a3">MCP Configs</Eyebrow>
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder="Search MCPs..."
            className="mt-2 w-full rounded-lg border border-hairline bg-white px-2.5 py-1.5 text-[12px] text-ink placeholder:text-mute/60 focus:outline-none focus:ring-1 focus:ring-brand-blue/40"
          />
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2 space-y-0.5">
          {categories.map((cat) => {
            const catConfigs = filtered.filter((c) => c.category === cat);
            if (catConfigs.length === 0) return null;
            return (
              <div key={cat} className="mt-2 first:mt-0">
                <div className="text-[10px] font-bold text-mute uppercase tracking-wider px-2.5 py-1">{cat}</div>
                {catConfigs.map((c) => {
                  const idx = filtered.indexOf(c);
                  return (
                    <button
                      key={c.name}
                      onClick={() => setActive(idx)}
                      className={`w-full text-left flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition ${
                        idx === active ? "bg-white border border-hairline text-ink shadow-sm" : "text-body hover:bg-white/60"
                      }`}
                    >
                      <span className="text-sm">{c.icon}</span>
                      <span className="flex-1 truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="px-3 py-2 border-t border-hairline text-[10px] text-mute">
          {configs.length} MCP servers
        </div>
      </aside>

      {/* Detail */}
      <div className="flex-1 min-w-0 overflow-auto p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{cfg.icon}</span>
            <div>
              <h1 className="text-xl font-extrabold text-ink">{cfg.name}</h1>
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-brand-teal bg-brand-teal/10">{cfg.category}</span>
            </div>
          </div>
          <p className="text-[13px] text-body leading-relaxed">{cfg.desc}</p>

          {/* Interactive Environment Config Form */}
          {requiredFields.length > 0 && (
            <div className="rounded-xl border border-hairline bg-zinc-50 p-4 space-y-3">
              <h3 className="text-[12px] font-bold text-ink flex items-center gap-1.5">
                <span>⚙️</span> Configure Environment Variables
              </h3>
              <div className="space-y-2">
                {requiredFields.map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-mute uppercase font-mono">{field}</label>
                    <input
                      type="text"
                      value={envVars[field] || ""}
                      onChange={(e) => handleEnvChange(field, e.target.value)}
                      placeholder={`Enter your ${field.toLowerCase().replace(/_/g, " ")}`}
                      className="w-full text-[12px] bg-white border border-hairline rounded-lg px-3 py-1.5 focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {cfg.tools.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-mute uppercase tracking-wider mb-2">Key Tools ({cfg.tools.length})</div>
              <div className="grid sm:grid-cols-2 gap-1.5">
                {cfg.tools.map((t) => (
                  <div key={t} className="flex items-center gap-2 rounded-lg border border-hairline bg-white px-3 py-1.5 text-[11.5px] font-mono text-ink">
                    <span className="text-brand-teal">&#x25B8;</span> {t}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side config editor/copy block */}
        <div className="w-full lg:w-80 shrink-0 space-y-4">
          <div className="text-[11px] font-bold text-mute uppercase tracking-wider">Config Settings JSON</div>
          <pre className="rounded-xl bg-code-bg text-code-text p-4 text-[11px] font-mono leading-relaxed overflow-x-auto h-[260px] border border-hairline">
            <code>{getFullConfigJson()}</code>
          </pre>
          <div className="flex flex-col gap-2">
            <YellowButton onClick={copyConfig} className="justify-center">
              {copied ? "✓ Copied!" : "Copy Config JSON"}
            </YellowButton>
            <a
              href={`https://github.com/UitbreidenOS/UitKit/blob/main/mcp/${cfg.id}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-olive/60 bg-white px-4 py-2 text-[13px] font-semibold text-ink hover:bg-cream transition"
            >
              View on GitHub &#x2197;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
