import Link from 'next/link'
import { getAllPrompts } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Prompts' }

const CATEGORY_LABELS: Record<string, string> = {
  'system-prompts': 'System Prompts',
  'project-starters': 'Project Starters',
  'task-specific': 'Task-Specific',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'system-prompts': 'Full system prompts for AI product, SaaS backend, and data pipeline projects.',
  'project-starters': 'Drop-in prompts to bootstrap a new FastAPI or Next.js project.',
  'task-specific': 'Reusable prompts for common tasks: debugging, PR descriptions, changelogs.',
}

const CATEGORY_COLORS: Record<string, string> = {
  'system-prompts': 'bg-purple-400',
  'project-starters': 'bg-blue-400',
  'task-specific': 'bg-green-400',
}

export default function PromptsPage() {
  const prompts = getAllPrompts()
  const byCategory = prompts.reduce<Record<string, typeof prompts>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Prompts</h1>
        <p className="text-gray-600 mt-1">{prompts.length} reusable prompt templates — copy and adapt for your project</p>
      </div>

      <div className="space-y-12">
        {Object.entries(byCategory).map(([category, categoryPrompts]) => {
          const color = CATEGORY_COLORS[category] ?? 'bg-gray-300'
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-3 h-3 ${color} border-2 border-black`}></span>
                <h2 className="text-2xl font-black">{CATEGORY_LABELS[category] ?? category}</h2>
              </div>
              <p className="text-gray-500 text-sm mb-4 ml-6">{CATEGORY_DESCRIPTIONS[category] ?? ''}</p>
              <div className="border-b-2 border-black mb-5" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryPrompts.map(prompt => (
                  <Link
                    key={prompt.id}
                    href={`/prompts/${prompt.id}`}
                    className="neo-card neo-card-hover p-5 group"
                  >
                    <div className={`w-8 h-2 ${color} border border-black mb-4`}></div>
                    <h3 className="font-black text-base group-hover:underline">{prompt.title}</h3>
                    <p className="text-xs font-mono text-gray-400 mt-1">{prompt.id}</p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
