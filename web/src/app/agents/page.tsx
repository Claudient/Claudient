import Link from 'next/link'
import { getAllAgents } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Agents' }

const CATEGORY_LABELS: Record<string, string> = {
  core: 'Core Agents',
  'build-resolvers': 'Build Resolvers',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  core: 'General-purpose subagents for planning, architecture, review, and security.',
  'build-resolvers': 'Specialists for diagnosing and fixing build failures.',
}

export default function AgentsPage() {
  const agents = getAllAgents()
  const byCategory = agents.reduce<Record<string, typeof agents>>((acc, agent) => {
    if (!acc[agent.category]) acc[agent.category] = []
    acc[agent.category].push(agent)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Agents</h1>
        <p className="text-gray-600 mt-1">{agents.length} subagent definitions — spawn specialists for bounded tasks</p>
      </div>

      <div className="neo-card p-5 mb-10 bg-black text-white">
        <p className="text-sm leading-relaxed text-gray-300">
          Agents are spawned via the <code className="bg-gray-800 px-1.5 py-0.5 text-orange-300 text-xs">Agent</code> tool with a <code className="bg-gray-800 px-1.5 py-0.5 text-orange-300 text-xs">subagent_type</code> parameter.
          Each agent gets a fresh context window, a specific tool subset, and a model recommendation.
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(byCategory).map(([category, categoryAgents]) => (
          <div key={category}>
            <div className="mb-2">
              <h2 className="text-2xl font-black">{CATEGORY_LABELS[category] ?? category}</h2>
              <p className="text-gray-500 text-sm mt-1">{CATEGORY_DESCRIPTIONS[category] ?? ''}</p>
            </div>
            <div className="border-b-2 border-black mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAgents.map(agent => (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.id}`}
                  className="neo-card neo-card-hover p-6 group"
                >
                  <div className="w-8 h-8 bg-black mb-3 group-hover:bg-orange-500 transition-colors"></div>
                  <h3 className="font-black text-base group-hover:underline">{agent.title}</h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">{agent.id}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
