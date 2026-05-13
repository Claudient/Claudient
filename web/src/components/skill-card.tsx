import Link from 'next/link'
import type { SkillMeta } from '@/lib/content'
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/content'

export function SkillCard({ skill }: { skill: SkillMeta }) {
  const categoryColor = CATEGORY_COLORS[skill.category] ?? 'bg-gray-200'
  const categoryLabel = CATEGORY_LABELS[skill.category] ?? skill.category

  return (
    <Link
      href={`/skills/${skill.category}/${skill.slug.replace(/\//g, '/')}`}
      className="neo-card neo-card-hover block p-5 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-bold text-base leading-tight group-hover:underline">
          {skill.title}
        </h3>
        <span className={`shrink-0 text-xs font-bold px-2 py-0.5 border border-black ${categoryColor}`}>
          {categoryLabel}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-auto">
        <span className="text-xs text-gray-500 font-mono">/{skill.category}/{skill.slug}</span>
      </div>
    </Link>
  )
}
