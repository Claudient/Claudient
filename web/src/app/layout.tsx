import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Claudient — The Claude Code Knowledge System',
    template: '%s | Claudient',
  },
  description:
    'Skills, agents, hooks, rules, and workflows for Claude Code. The modular knowledge base that multiplies your output.',
  keywords: ['claude-code', 'claude', 'anthropic', 'ai-tools', 'developer-productivity'],
  openGraph: {
    title: 'Claudient — The Claude Code Knowledge System',
    description: 'Skills, agents, hooks, rules, and workflows for Claude Code.',
    url: 'https://claudient.dev',
    siteName: 'Claudient',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fff7f0]">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t-2 border-black bg-black text-orange-100 py-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-black text-lg">CLAUDIENT</p>
              <p className="text-xs text-orange-200 mt-0.5">The definitive Claude Code knowledge system</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="https://github.com/Claudient/Claudient" className="hover:underline font-bold" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://uitbreiden.com" className="hover:underline font-bold" target="_blank" rel="noopener noreferrer">Uitbreiden</a>
              <span className="text-orange-400">MIT License</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
