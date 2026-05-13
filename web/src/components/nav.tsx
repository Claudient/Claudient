import Link from 'next/link'

const NAV_LINKS = [
  { href: '/skills', label: 'Skills' },
  { href: '/agents', label: 'Agents' },
  { href: '/guides', label: 'Guides' },
  { href: '/workflows', label: 'Workflows' },
  { href: '/hooks', label: 'Hooks' },
]

export function Nav() {
  return (
    <header className="border-b-2 border-black bg-orange-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-black text-xl tracking-tight hover:text-orange-600 transition-colors">
          CLAUDIENT
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 font-bold text-sm border-2 border-transparent hover:border-black hover:bg-white transition-all"
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
            className="neo-btn px-3 py-1.5 bg-black text-orange-100 text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
