import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

const DEMO_USER = {
  username: 'demo_baker',
  bio: 'Surdeigsentusiast siden 2019. Bergen, Norge. Starteren min "Bjørn" er 5 år gammel.',
  points: 120,
  starters: 2, recipes: 3, shares: 7,
  referralCode: 'IBAKE-DEMO-A1B2',
}

const LEVELS = [
  { name: 'Nybegynner', min: 0,   max: 99,  emoji: '🌱' },
  { name: 'Baker',      min: 100, max: 299,  emoji: '🍞' },
  { name: 'Mesterbaker',min: 300, max: 699,  emoji: '⭐' },
  { name: 'Surdeigsmester', min: 700, max: Infinity, emoji: '🏆' },
]

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) ?? LEVELS[0]
}

export default function ProfilePage() {
  const level = getLevel(DEMO_USER.points)
  const next = LEVELS[LEVELS.indexOf(level) + 1]
  const progress = next ? ((DEMO_USER.points - level.min) / (next.min - level.min)) * 100 : 100
  const toNext = next ? next.min - DEMO_USER.points : 0

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Profil" subtitle="Din bakerprofil" ornament="✦ Baker" />
      <div className="flex-1 overflow-y-auto p-4 max-w-xl mx-auto w-full space-y-4">

        {/* Avatar + stats */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-5 text-center">
          <div className="w-20 h-20 rounded-full bg-[#7B3F2B] text-white text-3xl font-bold flex items-center justify-center mx-auto mb-3">
            {DEMO_USER.username[0].toUpperCase()}
          </div>
          <div className="font-serif font-bold text-xl text-[#7B3F2B]">@{DEMO_USER.username}</div>
          <p className="text-sm text-[#5C3D2E] mt-2 leading-relaxed">{DEMO_USER.bio}</p>
          <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-[#D4C4AE]">
            {[
              { label: 'Startere', value: DEMO_USER.starters },
              { label: 'Oppskrifter', value: DEMO_USER.recipes },
              { label: 'Delinger', value: DEMO_USER.shares },
            ].map(s => (
              <div key={s.label}>
                <div className="font-bold text-xl text-[#7B3F2B]">{s.value}</div>
                <div className="text-xs text-[#9B7B6A]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Points summary */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#9B7B6A]">Ditt Nivå</div>
              <div className="font-serif font-bold text-lg text-[#7B3F2B]">{level.emoji} {level.name}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#7B3F2B]">{DEMO_USER.points}</div>
              <div className="text-[10px] text-[#9B7B6A]">poeng</div>
            </div>
          </div>
          {next && (
            <>
              <div className="h-2.5 rounded-full bg-[#EAD9C4] overflow-hidden mb-1">
                <div className="h-full rounded-full bg-[#B8873A] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="text-xs text-[#9B7B6A]">{toNext} poeng til {next.emoji} {next.name}</div>
            </>
          )}
        </div>

        {/* Quick links */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] divide-y divide-[#D4C4AE] overflow-hidden">
          {[
            { href: '/profile/bonus',    icon: '⭐', label: 'Bonus & Poeng',    desc: `${DEMO_USER.points} poeng · Toppliste` },
            { href: '/profile/shop',     icon: '🛒', label: 'iBake Shop',       desc: 'Butikk · Bruk poengene dine' },
            { href: '/profile/referral', icon: '🔗', label: 'Henvis venner',    desc: `Kode: ${DEMO_USER.referralCode}` },
            { href: '/map',              icon: '🗺️', label: 'Mine startere',    desc: 'Se på kartet' },
            { href: '/recipes',          icon: '🌾', label: 'Mine oppskrifter', desc: '3 delte' },
            { href: '/messages',         icon: '💬', label: 'Meldinger',        desc: '3 uleste' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#F2E8D9] transition-colors group">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#2A1A0E]">{item.label}</div>
                <div className="text-xs text-[#9B7B6A]">{item.desc}</div>
              </div>
              <span className="text-[#9B7B6A] group-hover:text-[#7B3F2B] transition-colors">→</span>
            </Link>
          ))}
        </div>

        <div className="bg-[#B8873A15] border border-[#B8873A30] rounded-xl p-4">
          <div className="text-xs font-bold text-[#B8873A] tracking-widest uppercase mb-1">✦ Demo-modus</div>
          <p className="text-sm text-[#5C3D2E]">Koble til Supabase-auth for å aktivere ekte profiler, innlogging og personlig innhold.</p>
        </div>
      </div>
    </div>
  )
}
