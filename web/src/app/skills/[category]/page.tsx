import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllSkills, getSkillsByCategory, readSkillContent, CATEGORY_LABELS, SKILL_CATEGORIES_LIST } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  return SKILL_CATEGORIES_LIST.map(category => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const label = CATEGORY_LABELS[category]
  if (!label) return { title: 'Not Found' }
  return { title: `${label} Skills` }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  if (!SKILL_CATEGORIES_LIST.includes(category)) notFound()

  const skills = getSkillsByCategory(category)
  const label = CATEGORY_LABELS[category]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-2">
        <Link href="/skills" className="text-sm font-bold hover:underline text-gray-500">
          ← Skills
        </Link>
      </div>
      <h1 className="text-4xl font-black mb-2">{label}</h1>
      <p className="text-gray-600 mb-8">{skills.length} skills</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skills.map(skill => {
          const content = readSkillContent(skill.filePath)
          const preview = content.split('\n').slice(0, 5).join('\n')
          return (
            <Link
              key={skill.id}
              href={`/skills/${category}/${skill.slug}`}
              className="neo-card neo-card-hover p-6 group"
            >
              <h2 className="font-black text-xl mb-2 group-hover:underline">{skill.title}</h2>
              <p className="text-xs font-mono text-gray-400">/{category}/{skill.slug}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
