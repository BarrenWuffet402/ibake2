'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/map',      label: 'Kart',      icon: '🗺️' },
  { href: '/video',    label: 'Video',     icon: '🎥' },
  { href: '/forum',    label: 'Forum',     icon: '💬' },
  { href: '/recipes',  label: 'Oppskrifter',icon: '🌾' },
  { href: '/messages', label: 'Meldinger', icon: '✉️' },
  { href: '/tools',    label: 'Verktøy',   icon: '🧮' },
  { href: '/profile',  label: 'Profil',    icon: '👤' },
]

export default function Nav({ mobile = false }: { mobile?: boolean }) {
  const path = usePathname()

  if (mobile) {
    // On mobile show only 5 primary tabs
    const primary = [
      { href: '/map',     label: 'Kart',   icon: '🗺️' },
      { href: '/video',   label: 'Video',  icon: '🎥' },
      { href: '/forum',   label: 'Forum',  icon: '💬' },
      { href: '/recipes', label: 'Mat',    icon: '🌾' },
      { href: '/profile', label: 'Profil', icon: '👤' },
    ]
    return (
      <nav className="flex relative">
        {primary.map(l => {
          const active = path.startsWith(l.href)
          return (
            <Link key={l.href} href={l.href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold tracking-wide transition-colors
                ${active ? 'text-[#7B3F2B]' : 'text-[#9B7B6A]'}`}>
              <span className="text-lg leading-none">{l.icon}</span>
              {l.label}
              {active && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#B8873A] rounded-full" />}
            </Link>
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="flex flex-col gap-0.5 p-3 flex-1 overflow-y-auto">
      {links.map(l => {
        const active = path.startsWith(l.href)
        return (
          <Link key={l.href} href={l.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
              ${active
                ? 'bg-[#7B3F2B] text-white'
                : 'text-[#5C3D2E] hover:bg-[#7B3F2B15]'}`}>
            <span className="text-base leading-none">{l.icon}</span>
            {l.label}
          </Link>
        )
      })}

      <div className="mt-auto pt-4 border-t border-[#DDD0BE] mx-1 shrink-0">
        <Link href="/profile/bonus"
          className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#B8873A15] transition-colors">
          <span className="text-sm">⭐</span>
          <div>
            <div className="text-[10px] font-bold text-[#B8873A]">120 poeng</div>
            <div className="text-[9px] text-[#9B7B6A] tracking-widest uppercase">🍞 Baker</div>
          </div>
        </Link>
      </div>
    </nav>
  )
}
