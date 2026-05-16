import Link from 'next/link'
import { getAllRules } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Rules' }

const CATEGORY_LABELS: Record<string, string> = {
  common: 'Common Rules',
  'language-specific': 'Language-Specific Rules',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  common: 'Universal coding, git, security, testing, and performance rules for any project.',
  'language-specific': 'Opinionated rules scoped to Python, TypeScript, and Go.',
}

export default function RulesPage() {
  const rules = getAllRules()
  const byCategory = rules.reduce<Record<string, typeof rules>>((acc, rule) => {
    if (!acc[rule.category]) acc[rule.category] = []
    acc[rule.category].push(rule)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Rules</h1>
        <p className="text-gray-600 mt-1">{rules.length} always-on guidelines — add to your CLAUDE.md</p>
      </div>

      <div className="neo-card p-5 mb-10 bg-orange-50 border-2 border-black">
        <p className="text-sm font-medium text-gray-700 leading-relaxed">
          Rules live in your project's <code className="bg-black text-white px-1.5 py-0.5 text-xs">CLAUDE.md</code> file.
          Copy any rule's content into your CLAUDE.md, or install all at once:
        </p>
        <code className="block mt-3 bg-black text-orange-300 px-4 py-2.5 text-sm font-mono">
          npx claudient add rules --write
        </code>
      </div>

      <div className="space-y-12">
        {Object.entries(byCategory).map(([category, categoryRules]) => (
          <div key={category}>
            <div className="mb-2">
              <h2 className="text-2xl font-black">{CATEGORY_LABELS[category] ?? category}</h2>
              <p className="text-gray-500 text-sm mt-1">{CATEGORY_DESCRIPTIONS[category] ?? ''}</p>
            </div>
            <div className="border-b-2 border-black mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryRules.map(rule => (
                <Link
                  key={rule.id}
                  href={`/rules/${rule.id}`}
                  className="neo-card neo-card-hover p-5 group"
                >
                  <div className="w-6 h-6 bg-black mb-3 group-hover:bg-orange-500 transition-colors"></div>
                  <h3 className="font-black text-base group-hover:underline">{rule.title}</h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">{rule.id}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
