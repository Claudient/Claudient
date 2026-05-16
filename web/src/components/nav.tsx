'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/skills', label: 'Skills' },
  { href: '/agents', label: 'Agents' },
  { href: '/guides', label: 'Guides' },
  { href: '/workflows', label: 'Workflows' },
  { href: '/hooks', label: 'Hooks' },
  { href: '/rules', label: 'Rules' },
  { href: '/prompts', label: 'Prompts' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="border-b-2 border-black bg-orange-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-black text-xl tracking-tight" onClick={() => setOpen(false)}>
          CLAUDIENT
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 font-bold text-sm border-2 transition-all ${
                isActive(link.href)
                  ? 'border-black bg-black text-white'
                  : 'border-transparent hover:border-black hover:bg-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Claudient/Claudient"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn px-3 py-1.5 bg-black text-white text-sm hidden sm:flex"
          >
            GitHub
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden neo-btn px-2 py-1.5 bg-black text-white text-sm"
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden border-t-2 border-black bg-white">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 font-bold text-sm border-b border-gray-200 ${
                isActive(link.href) ? 'bg-black text-white' : 'hover:bg-orange-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/Claudient/Claudient"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 font-bold text-sm hover:bg-orange-50"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  )
}
