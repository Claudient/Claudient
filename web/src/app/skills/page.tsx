import Link from 'next/link'
import { SkillCard } from '@/components/skill-card'
import { getAllSkills, CATEGORY_LABELS, CATEGORY_COLORS, SKILL_CATEGORIES_LIST } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Skills' }

type Props = { searchParams: Promise<{ category?: string }> }

export default async function SkillsPage({ searchParams }: Props) {
  const { category } = await searchParams
  const allSkills = getAllSkills()
  const filtered = category ? allSkills.filter(s => s.category === category) : allSkills

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Skills</h1>
        <p className="text-gray-600 mt-1">{allSkills.length} skills — slash commands for Claude Code</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/skills"
          className={`neo-btn px-4 py-2 text-sm ${!category ? 'bg-black text-orange-100' : 'bg-white text-black'}`}
        >
          All ({allSkills.length})
        </Link>
        {SKILL_CATEGORIES_LIST.map(cat => {
          const count = allSkills.filter(s => s.category === cat).length
          const isActive = category === cat
          return (
            <Link
              key={cat}
              href={`/skills?category=${cat}`}
              className={`neo-btn px-4 py-2 text-sm ${isActive ? 'bg-black text-orange-100' : 'bg-white text-black'}`}
            >
              <span className={`inline-block w-2.5 h-2.5 ${CATEGORY_COLORS[cat]} border border-black`}></span>
              {CATEGORY_LABELS[cat]} ({count})
            </Link>
          )
        })}
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="neo-card p-10 text-center">
          <p className="font-bold text-gray-500">No skills found for this category.</p>
        </div>
      )}
    </div>
  )
}
