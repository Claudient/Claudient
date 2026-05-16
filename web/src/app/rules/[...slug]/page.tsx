import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllRules, readSkillContent } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateStaticParams() {
  return getAllRules().map(r => ({ slug: r.id.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const id = Array.isArray(slug) ? slug.join('/') : slug
  const rule = getAllRules().find(r => r.id === id)
  return rule ? { title: `${rule.title} Rule` } : { title: 'Not Found' }
}

const CATEGORY_LABELS: Record<string, string> = {
  common: 'Common',
  'language-specific': 'Language-Specific',
}

export default async function RulePage({ params }: Props) {
  const { slug } = await params
  const id = Array.isArray(slug) ? slug.join('/') : slug
  const rule = getAllRules().find(r => r.id === id)
  if (!rule) notFound()

  const html = await marked(readSkillContent(rule.filePath))

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/rules" className="font-bold hover:underline text-gray-500">Rules</Link>
        <span className="text-gray-400">/</span>
        <span className="font-bold">{rule.title}</span>
      </div>

      <div className="neo-card p-6 mb-8 bg-orange-500">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">{rule.title}</h1>
            <p className="font-mono text-sm text-gray-700 mt-2">{rule.id}</p>
          </div>
          <span className="neo-btn px-3 py-1 bg-black text-white text-xs shrink-0">
            {CATEGORY_LABELS[rule.category] ?? rule.category}
          </span>
        </div>
      </div>

      <div className="neo-card p-4 mb-6 bg-orange-50">
        <p className="text-sm text-gray-700 font-medium">
          Add this rule to your <code className="bg-black text-white px-1.5 py-0.5 text-xs">CLAUDE.md</code> file to apply it to your project.
        </p>
      </div>

      <div className="neo-card p-8 prose-retro" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="mt-8">
        <Link href="/rules" className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
          ← All Rules
        </Link>
      </div>
    </div>
  )
}
