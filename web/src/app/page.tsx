import Link from 'next/link'
import { getAllSkills, getAllAgents, getAllGuides, CATEGORY_LABELS, CATEGORY_COLORS, SKILL_CATEGORIES_LIST } from '@/lib/content'

export default async function HomePage() {
  const skills = getAllSkills()
  const agents = getAllAgents()
  const guides = getAllGuides()

  const categoryStats = SKILL_CATEGORIES_LIST.map(cat => ({
    id: cat,
    label: CATEGORY_LABELS[cat],
    color: CATEGORY_COLORS[cat],
    count: skills.filter(s => s.category === cat).length,
  }))

  return (
    <div>
      {/* Hero */}
      <section className="border-b-2 border-black bg-orange-500 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block neo-card px-4 py-1 text-sm font-bold mb-6 bg-black text-orange-100">
              v0.1.0 — Open Source
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
              The Claude Code<br />Knowledge System
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-800 mb-8 max-w-2xl">
              Skills, agents, hooks, rules, and workflows that multiply your Claude Code output.
              Drop in any skill. Zero install friction.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/skills" className="neo-btn px-6 py-3 bg-black text-orange-100 text-base">
                Browse Skills
              </Link>
              <a
                href="https://github.com/Claudient/Claudient"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn px-6 py-3 bg-white text-black text-base"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-y-2 md:divide-y-0 divide-black">
            {[
              { label: 'Skills', value: skills.length.toString() },
              { label: 'Agents', value: agents.length.toString() },
              { label: 'Guides', value: guides.length.toString() },
              { label: 'Languages', value: '5' },
            ].map(stat => (
              <div key={stat.label} className="py-6 px-6 text-center">
                <div className="text-4xl font-black">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick install */}
      <section className="border-b-2 border-black bg-black text-orange-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-black mb-1">Install in seconds</h2>
              <p className="text-orange-200 text-sm">Add all skills to Claude Code with one command</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <code className="neo-card bg-orange-950 border-orange-600 text-orange-100 px-4 py-3 font-mono text-sm flex-1 md:w-80">
                npx claudient add all
              </code>
              <code className="neo-card bg-orange-950 border-orange-600 text-orange-100 px-4 py-3 font-mono text-sm flex-1 md:w-64">
                npx claudient add backend
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Skill categories */}
      <section className="py-16 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black">Skill Categories</h2>
              <p className="text-gray-600 mt-1">{skills.length} skills across {categoryStats.length} categories</p>
            </div>
            <Link href="/skills" className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categoryStats.map(cat => (
              <Link
                key={cat.id}
                href={`/skills?category=${cat.id}`}
                className="neo-card neo-card-hover p-5 group"
              >
                <div className={`w-10 h-10 ${cat.color} border-2 border-black mb-3 flex items-center justify-center font-black text-lg`}>
                  {cat.label.charAt(0)}
                </div>
                <h3 className="font-black text-base group-hover:underline">{cat.label}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{cat.count} skills</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features comparison */}
      <section className="py-16 border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-8">Why Claudient?</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-black">
              <thead>
                <tr className="bg-black text-orange-100">
                  <th className="px-4 py-3 text-left font-black border-r-2 border-orange-600">Feature</th>
                  <th className="px-4 py-3 text-center font-black border-r-2 border-orange-600">Claudient</th>
                  <th className="px-4 py-3 text-center font-black text-gray-400">ECC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Installation', 'npx claudient add all', 'Manual + complex'],
                  ['C#/.NET coverage', 'Full skill', 'Missing'],
                  ['Kubernetes', 'Complete skill', 'Partial'],
                  ['Terraform', 'Complete skill', 'Missing'],
                  ['Multi-language docs', 'EN / FR / DE / NL / ES', 'English only'],
                  ['End-to-end workflows', '5 complete flows', 'None'],
                  ['Skill authoring guide', 'Included', 'Reverse-engineer'],
                  ['npm distribution', 'npx claudient', 'Not available'],
                ].map(([feature, us, them], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                    <td className="px-4 py-3 font-bold border border-black">{feature}</td>
                    <td className="px-4 py-3 text-center border border-black">
                      <span className="inline-block px-2 py-0.5 bg-orange-500 border border-black text-xs font-bold">{us}</span>
                    </td>
                    <td className="px-4 py-3 text-center border border-black text-gray-500 text-sm">{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guides preview */}
      <section className="py-16 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black">Guides</h2>
              <p className="text-gray-600 mt-1">In-depth documentation in 5 languages</p>
            </div>
            <Link href="/guides" className="neo-btn px-4 py-2 bg-orange-500 text-black text-sm">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.slice(0, 6).map(guide => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="neo-card neo-card-hover p-5 group"
              >
                <div className="w-8 h-8 bg-black mb-3"></div>
                <h3 className="font-black text-base group-hover:underline">{guide.title}</h3>
                <p className="text-xs text-gray-400 font-mono mt-2">EN · FR · DE · NL · ES</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-orange-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">Start using Claudient today</h2>
          <p className="text-orange-200 mb-8 text-lg">Open source, zero runtime dependencies. Works with any Claude Code setup.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/Claudient/Claudient"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn px-8 py-4 bg-orange-500 text-black text-base"
            >
              Star on GitHub
            </a>
            <Link href="/skills" className="neo-btn px-8 py-4 border-2 border-orange-500 text-orange-100 text-base">
              Browse Skills
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
