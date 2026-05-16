import { NextResponse } from 'next/server'
import { getAllSkills, getAllGuides, getAllAgents, getAllHooks, getAllRules, getAllPrompts, getAllWorkflows } from '@/lib/content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://claudient.dev'

function url(path: string, priority = '0.8', changefreq = 'weekly') {
  return `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export async function GET() {
  const skills = getAllSkills()
  const guides = getAllGuides()
  const agents = getAllAgents()
  const hooks = getAllHooks()
  const rules = getAllRules()
  const prompts = getAllPrompts()
  const workflows = getAllWorkflows()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${url('/', '1.0', 'daily')}
  ${url('/skills', '0.9', 'weekly')}
  ${url('/agents', '0.8', 'weekly')}
  ${url('/guides', '0.8', 'weekly')}
  ${url('/hooks', '0.8', 'weekly')}
  ${url('/rules', '0.8', 'weekly')}
  ${url('/prompts', '0.8', 'weekly')}
  ${url('/workflows', '0.8', 'weekly')}
  ${skills.map(s => url(`/skills/${s.category}/${s.slug}`, '0.7')).join('')}
  ${guides.map(g => url(`/guides/${g.slug}`, '0.7')).join('')}
  ${agents.map(a => url(`/agents/${a.id}`, '0.6')).join('')}
  ${hooks.map(h => url(`/hooks/${h.slug}`, '0.6')).join('')}
  ${rules.map(r => url(`/rules/${r.id}`, '0.6')).join('')}
  ${prompts.map(p => url(`/prompts/${p.id}`, '0.6')).join('')}
  ${workflows.map(w => url(`/workflows/${w.slug}`, '0.6')).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
