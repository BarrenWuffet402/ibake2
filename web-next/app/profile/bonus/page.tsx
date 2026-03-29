import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

const LEADERBOARD = [
  { rank: 1, name: 'Ingrid B.',  avatar: 'IB', color: '#7B3F2B', points: 847, level: '🏆 Surdeigsmester' },
  { rank: 2, name: 'Sofia K.',   avatar: 'SK', color: '#B87469', points: 612, level: '🏆 Surdeigsmester' },
  { rank: 3, name: 'Lars M.',    avatar: 'LM', color: '#4A6741', points: 445, level: '⭐ Mesterbaker' },
  { rank: 4, name: 'Maja H.',    avatar: 'MH', color: '#B8873A', points: 298, level: '🍞 Baker' },
  { rank: 5, name: 'Tobias N.',  avatar: 'TN', color: '#5C3D2E', points: 201, level: '🍞 Baker' },
  { rank: 6, name: 'deg',        avatar: 'DU', color: '#9B7B6A', points: 120, level: '🍞 Baker', isMe: true },
]

const EVENTS = [
  { icon: '🌾', text: 'Du delte starteren "Bjørn"',      pts: '+50', time: '2t siden' },
  { icon: '📝', text: 'Du publiserte en oppskrift',       pts: '+30', time: '1d siden' },
  { icon: '❤️', text: 'Ingrid likte oppskriften din',     pts: '+5',  time: '1d siden' },
  { icon: '💬', text: 'Du kommenterte en oppskrift',      pts: '+10', time: '2d siden' },
  { icon: '🔥', text: '3 dager aktiv på rad',             pts: '+15', time: '3d siden' },
  { icon: '❤️', text: 'Lars likte oppskriften din',       pts: '+5',  time: '4d siden' },
  { icon: '❤️', text: 'Sofia likte oppskriften din',      pts: '+5',  time: '5d siden' },
]

const EARNING_WAYS = [
  { icon: '🌾', action: 'Del en starter',       pts: '+50' },
  { icon: '📝', action: 'Del en oppskrift',      pts: '+30' },
  { icon: '❤️', action: 'Oppskriften din likes', pts: '+5' },
  { icon: '💬', action: 'Skriv en kommentar',    pts: '+10' },
  { icon: '🔗', action: 'Henvis en venn',        pts: '+100' },
  { icon: '🔥', action: 'Streak: aktiv dag',     pts: '+15' },
]

const LEVELS = [
  { name: 'Nybegynner', min: 0,   max: 99,  emoji: '🌱' },
  { name: 'Baker',      min: 100, max: 299,  emoji: '🍞' },
  { name: 'Mesterbaker',min: 300, max: 699,  emoji: '⭐' },
  { name: 'Surdeigsmester', min: 700, max: Infinity, emoji: '🏆' },
]

export default function BonusPage() {
  const myPoints = 120
  const level = LEVELS[1]
  const next = LEVELS[2]
  const progress = ((myPoints - level.min) / (next.min - level.min)) * 100

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Bonus & Poeng" subtitle="Din aktivitet gir belønning" ornament="✦ Streak" right={
        <Link href="/profile" className="text-xs text-[#9B7B6A] hover:text-[#7B3F2B]">← Profil</Link>
      } />
      <div className="flex-1 overflow-y-auto p-4 max-w-xl mx-auto w-full space-y-5">

        {/* My points card */}
        <div className="bg-[#7B3F2B] rounded-2xl p-5 text-white">
          <div className="text-xs font-bold tracking-widest uppercase opacity-70 mb-1">Dine poeng</div>
          <div className="text-5xl font-black mb-1">{myPoints}</div>
          <div className="font-serif text-lg opacity-90">{level.emoji} {level.name}</div>
          <div className="mt-4">
            <div className="flex justify-between text-xs opacity-70 mb-1.5">
              <span>{level.name}</span>
              <span>{next.emoji} {next.name} om {next.min - myPoints} poeng</span>
            </div>
            <div className="h-2 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#B8873A] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Levels */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DDD0BE]">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#B8873A] rounded" />
              <span className="font-serif font-bold text-[#2A1A0E]">Nivåer</span>
            </div>
          </div>
          {LEVELS.map((l, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 border-b border-[#DDD0BE] last:border-0 ${l.name === level.name ? 'bg-[#7B3F2B08]' : ''}`}>
              <span className="text-2xl">{l.emoji}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#2A1A0E]">{l.name}</div>
                <div className="text-xs text-[#9B7B6A]">{l.max === Infinity ? `${l.min}+ poeng` : `${l.min}–${l.max} poeng`}</div>
              </div>
              {l.name === level.name && <span className="text-xs font-bold text-[#7B3F2B] bg-[#7B3F2B15] px-2 py-0.5 rounded-full">Ditt nivå</span>}
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DDD0BE]">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#B8873A] rounded" />
              <span className="font-serif font-bold text-[#2A1A0E]">Toppliste</span>
            </div>
          </div>
          {LEADERBOARD.map(u => (
            <div key={u.rank} className={`flex items-center gap-3 px-4 py-3 border-b border-[#DDD0BE] last:border-0 ${u.isMe ? 'bg-[#B8873A10]' : ''}`}>
              <div className={`w-7 text-center font-black text-sm ${u.rank <= 3 ? 'text-[#B8873A]' : 'text-[#9B7B6A]'}`}>
                {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : `#${u.rank}`}
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: u.color }}>{u.avatar[0]}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#2A1A0E]">{u.isMe ? 'Du' : u.name}</div>
                <div className="text-[11px] text-[#9B7B6A]">{u.level}</div>
              </div>
              <div className="font-black text-[#7B3F2B] text-sm">{u.points}</div>
            </div>
          ))}
        </div>

        {/* Recent events */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DDD0BE]">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#B8873A] rounded" />
              <span className="font-serif font-bold text-[#2A1A0E]">Siste aktivitet</span>
            </div>
          </div>
          {EVENTS.map((e, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#DDD0BE] last:border-0">
              <span className="text-xl shrink-0">{e.icon}</span>
              <div className="flex-1 text-sm text-[#2A1A0E]">{e.text}</div>
              <div className="shrink-0 text-right">
                <div className="font-black text-[#4A6741] text-sm">{e.pts}</div>
                <div className="text-[10px] text-[#9B7B6A]">{e.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* How to earn */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DDD0BE]">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#B8873A] rounded" />
              <span className="font-serif font-bold text-[#2A1A0E]">Slik tjener du poeng</span>
            </div>
          </div>
          {EARNING_WAYS.map((w, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#DDD0BE] last:border-0">
              <span className="text-xl shrink-0">{w.icon}</span>
              <div className="flex-1 text-sm text-[#5C3D2E]">{w.action}</div>
              <div className="font-black text-[#B8873A] text-sm">{w.pts}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
