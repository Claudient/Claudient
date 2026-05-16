import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllPrompts, readSkillContent } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateStaticParams() {
  return getAllPrompts().map(p => ({ slug: p.id.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const id = Array.isArray(slug) ? slug.join('/') : slug
  const prompt = getAllPrompts().find(p => p.id === id)
  return prompt ? { title: prompt.title } : { title: 'Not Found' }
}

const CATEGORY_LABELS: Record<string, string> = {
  'system-prompts': 'System Prompt',
  'project-starters': 'Project Starter',
  'task-specific': 'Task-Specific',
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params
  const id = Array.isArray(slug) ? slug.join('/') : slug
  const prompt = getAllPrompts().find(p => p.id === id)
  if (!prompt) notFound()

  const html = await marked(readSkillContent(prompt.filePath))

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/prompts" className="font-bold hover:underline text-gray-500">Prompts</Link>
        <span className="text-gray-400">/</span>
        <span className="font-bold">{prompt.title}</span>
      </div>

      <div className="neo-card p-6 mb-8 bg-orange-500">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">{prompt.title}</h1>
            <p className="font-mono text-sm text-gray-700 mt-2">{prompt.id}</p>
          </div>
          <span className="neo-btn px-3 py-1 bg-black text-white text-xs shrink-0">
            {CATEGORY_LABELS[prompt.category] ?? prompt.category}
          </span>
        </div>
      </div>

      <div className="neo-card p-8 prose-retro" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="mt-8">
        <Link href="/prompts" className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
          ← All Prompts
        </Link>
      </div>
    </div>
  )
}
