'use client'
import { useState } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

const CATEGORIES = [
  { id: 'all',       label: 'Alle',        emoji: '' },
  { id: 'spørsmål',  label: 'Spørsmål',    emoji: '❓' },
  { id: 'tips',      label: 'Tips & Triks', emoji: '💡' },
  { id: 'visfrem',   label: 'Vis frem',    emoji: '🍞' },
  { id: 'utstyr',    label: 'Utstyr',      emoji: '🔧' },
  { id: 'nybegynner',label: 'Nybegynner',  emoji: '🌱' },
]

export const THREADS = [
  {
    id: 't1', category: 'spørsmål', emoji: '❓',
    title: 'Surdeigen min lukter for surt — hva gjør jeg?',
    author: 'Anders L.', avatar: 'AL', color: '#7B3F2B',
    replies: 8, upvotes: 34, solved: true, time: '2t siden',
    preview: 'Starteren min har blitt veldig sur de siste dagene. Mater den daglig med 1:1:1 men noe er galt...',
  },
  {
    id: 't2', category: 'tips', emoji: '💡',
    title: 'Tips for å heve deig i kaldt kjøkken 🥶',
    author: 'Tobias N.', avatar: 'TN', color: '#4A6741',
    replies: 12, upvotes: 67, solved: false, time: '5t siden',
    preview: 'Kjøkkenet mitt holder bare 16°C om vinteren. Har prøvd ovnen med lyset på men det blir for varmt...',
  },
  {
    id: 't3', category: 'visfrem', emoji: '🍞',
    title: 'Mitt beste brød noensinne!! 🎉',
    author: 'Maja H.', avatar: 'MH', color: '#B8873A',
    replies: 6, upvotes: 89, solved: false, time: '1d siden',
    preview: 'Etter 6 måneder med surdeig har jeg endelig fått det til! Åpen krumme, sprø skorpe...',
  },
  {
    id: 't4', category: 'utstyr', emoji: '🔧',
    title: 'Hvilken nederlandsk ovn anbefaler dere?',
    author: 'Hanne K.', avatar: 'HK', color: '#B87469',
    replies: 15, upvotes: 42, solved: false, time: '2d siden',
    preview: 'Ser på å investere i en Dutch oven. Vurderer Lodge vs Staub vs Le Creuset. Hva bruker dere?',
  },
  {
    id: 't5', category: 'nybegynner', emoji: '🌱',
    title: 'Første surdeig noensinne — klarte det! 🌱',
    author: 'Emma R.', avatar: 'ER', color: '#5C3D2E',
    replies: 9, upvotes: 112, solved: false, time: '3d siden',
    preview: 'Har fulgt guiden her i 2 uker og i dag kom det ut et faktisk brød! Ikke perfekt men...',
  },
]

export default function ForumPage() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? THREADS : THREADS.filter(t => t.category === active)

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Forum" subtitle="Spørsmål, tips og baking" ornament="✦ Samfunn" right={
        <button className="px-3 py-1.5 rounded-lg bg-[#7B3F2B] text-white text-xs font-semibold">+ Ny tråd</button>
      } />

      {/* Category filter */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0 bg-[#FBF6EE] border-b border-[#DDD0BE]">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border
              ${active === c.id
                ? 'bg-[#7B3F2B] text-white border-[#7B3F2B]'
                : 'bg-[#F2E8D9] text-[#5C3D2E] border-[#DDD0BE] hover:border-[#7B3F2B]'}`}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        <div className="space-y-3">
          {filtered.map(t => (
            <Link key={t.id} href={`/forum/${t.id}`}
              className="block bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] hover:border-[#B8873A] transition-colors p-4 group">
              <div className="flex items-start gap-3">
                {/* Upvote */}
                <div className="flex flex-col items-center shrink-0 mt-0.5">
                  <div className="text-[#B8873A] text-xs group-hover:scale-110 transition-transform">▲</div>
                  <div className="font-bold text-sm text-[#7B3F2B]">{t.upvotes}</div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B8873A15] text-[#B8873A] border border-[#B8873A30] font-semibold">
                      {t.emoji} {t.category}
                    </span>
                    {t.solved && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4A674115] text-[#4A6741] border border-[#4A674130] font-semibold">
                        ✅ Løst
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-[#2A1A0E] text-base leading-tight group-hover:text-[#7B3F2B] transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-[#9B7B6A] mt-1 line-clamp-1">{t.preview}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                        style={{ background: t.color }}>{t.avatar[0]}</div>
                      <span className="text-[11px] text-[#9B7B6A]">{t.author}</span>
                    </div>
                    <span className="text-[11px] text-[#9B7B6A]">💬 {t.replies} svar</span>
                    <span className="text-[11px] text-[#9B7B6A]">{t.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
