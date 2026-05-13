import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllGuides, readSkillContent } from '@/lib/content'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guides = getAllGuides()
  const guide = guides.find(g => g.slug === slug)
  if (!guide) return { title: 'Not Found' }
  return { title: guide.title }
}

const LANGUAGE_MAP: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  nl: 'Nederlands',
  es: 'Español',
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guides = getAllGuides()
  const guide = guides.find(g => g.slug === slug)
  if (!guide) notFound()

  const content = readSkillContent(guide.filePath)
  const html = await marked(content)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/guides" className="font-bold hover:underline text-gray-500">Guides</Link>
        <span className="text-gray-400">/</span>
        <span className="font-bold">{guide.title}</span>
      </div>

      {/* Header */}
      <div className="neo-card p-6 mb-8 bg-orange-500">
        <h1 className="text-3xl font-black">{guide.title}</h1>
        <div className="flex gap-2 mt-3 flex-wrap">
          {Object.entries(LANGUAGE_MAP).map(([code, label]) => (
            <span key={code} className={`text-xs font-bold px-2 py-1 border border-black ${code === 'en' ? 'bg-black text-orange-100' : 'bg-white text-black'}`}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className="neo-card p-8 prose-retro"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-8">
        <Link href="/guides" className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
          ← All Guides
        </Link>
      </div>
    </div>
  )
}
