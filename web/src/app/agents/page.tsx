import Link from 'next/link'
import { getAllAgents } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Agents' }

const AGENT_CATEGORY_LABELS: Record<string, string> = {
  core: 'Core Agents',
  'build-resolvers': 'Build Resolvers',
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
        <p className="text-gray-600 mt-1">{agents.length} subagent definitions for specialized tasks</p>
      </div>

      <div className="space-y-10">
        {Object.entries(byCategory).map(([category, categoryAgents]) => (
          <div key={category}>
            <h2 className="text-xl font-black mb-4 border-b-2 border-black pb-2">
              {AGENT_CATEGORY_LABELS[category] ?? category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAgents.map(agent => (
                <div key={agent.id} className="neo-card p-6">
                  <div className="w-8 h-8 bg-black mb-3"></div>
                  <h3 className="font-black text-base">{agent.title}</h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">{agent.id}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
