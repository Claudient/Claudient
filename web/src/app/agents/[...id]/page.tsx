import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllAgents, readSkillContent } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string[] }> }

export async function generateStaticParams() {
  return getAllAgents().map(a => ({ id: a.id.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const agent = getAllAgents().find(a => a.id === (Array.isArray(id) ? id.join('/') : id))
  return agent ? { title: `${agent.title} Agent` } : { title: 'Not Found' }
}

export default async function AgentPage({ params }: Props) {
  const { id } = await params
  const idStr = Array.isArray(id) ? id.join('/') : id
  const agent = getAllAgents().find(a => a.id === idStr)
  if (!agent) notFound()

  const html = await marked(readSkillContent(agent.filePath))

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/agents" className="font-bold hover:underline text-gray-500">Agents</Link>
        <span className="text-gray-400">/</span>
        <span className="font-bold">{agent.title}</span>
      </div>

      <div className="neo-card p-6 mb-8 bg-orange-500">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">{agent.title}</h1>
            <p className="font-mono text-sm text-gray-700 mt-2">{agent.id}</p>
          </div>
          <span className="neo-btn px-3 py-1 bg-black text-white text-xs shrink-0">
            {agent.category}
          </span>
        </div>
      </div>

      <div className="neo-card p-8 prose-retro" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="mt-8">
        <Link href="/agents" className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
          ← All Agents
        </Link>
      </div>
    </div>
  )
}
