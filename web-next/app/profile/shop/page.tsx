'use client'
import { useState } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

const MY_POINTS = 120
const KR_PER_500 = 50

const PRODUCTS = [
  {
    id: 'p1', name: 'iBake Brødform', emoji: '🍞',
    desc: 'Støpejern loafform. Perfekt varmefordeling for sprø skorpe og saftig innside.',
    price: 299, pointsCost: 2990,
    badge: 'Bestselger',
  },
  {
    id: 'p2', name: 'iBake Surdeigskrukke', emoji: '🫙',
    desc: 'Glasskrukke med skala og lokk. Gjør det enkelt å se aktiviteten til starteren.',
    price: 149, pointsCost: 1490,
  },
  {
    id: 'p3', name: 'iBake Starter Kit', emoji: '🌾',
    desc: 'Alt du trenger: brødform, krukke, deigskraper, håndkle og oppskriftsbok.',
    price: 499, pointsCost: 4990,
    badge: 'Populær',
  },
  {
    id: 'p4', name: 'iBake Premium', emoji: '⭐',
    desc: 'Månedlig abonnement. Eksklusivt innhold, AI-forbedrede oppskrifter og ingen reklame.',
    price: 49, monthly: true, pointsCost: 490,
  },
  {
    id: 'p5', name: 'iBake Deigskraper', emoji: '🔪',
    desc: 'Rustfritt stål. Presist og holdbart. Skarpt nok til å kutte deig med strak kant.',
    price: 89, pointsCost: 890,
  },
]

export default function ShopPage() {
  const [added, setAdded] = useState<string | null>(null)
  const discount = Math.floor((MY_POINTS / 500) * KR_PER_500)

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="iBake Shop" subtitle="Produkter for bakeren i deg" ornament="✦ Butikk" right={
        <Link href="/profile" className="text-xs text-[#9B7B6A] hover:text-[#7B3F2B]">← Profil</Link>
      } />
      <div className="flex-1 overflow-y-auto p-4 max-w-xl mx-auto w-full space-y-4">

        {/* Points balance banner */}
        <div className="bg-[#7B3F2B] rounded-2xl p-4 text-white flex items-center justify-between">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase opacity-70 mb-0.5">Din poengbalanse</div>
            <div className="text-3xl font-black">{MY_POINTS} <span className="text-lg font-normal opacity-80">poeng</span></div>
            <div className="text-xs opacity-70 mt-1">= {discount} kr i rabatt · 500 poeng = {KR_PER_500} kr</div>
          </div>
          <div className="text-4xl">⭐</div>
        </div>

        {/* Referral promo */}
        <div className="bg-[#B8873A15] border border-[#B8873A40] rounded-xl p-3 flex items-center gap-3">
          <div className="text-2xl">🔗</div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[#7B3F2B]">Henvis venner, tjen mer!</div>
            <div className="text-xs text-[#9B7B6A]">+100 poeng per venn · Kode: IBAKE-DEMO-A1B2</div>
          </div>
          <Link href="/profile/referral" className="text-xs font-bold text-[#B8873A] whitespace-nowrap">Del →</Link>
        </div>

        {/* Products */}
        <div className="grid gap-3">
          {PRODUCTS.map(p => (
            <div key={p.id} className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EAD9C4] flex items-center justify-center text-2xl shrink-0">
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif font-bold text-[#2A1A0E]">{p.name}</span>
                    {p.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B8873A] text-white font-bold">{p.badge}</span>
                    )}
                  </div>
                  <p className="text-xs text-[#9B7B6A] mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D4C4AE]">
                <div>
                  <div className="font-black text-[#7B3F2B] text-lg">
                    {p.price} kr{p.monthly ? '/mnd' : ''}
                  </div>
                  {discount > 0 && (
                    <div className="text-xs text-[#4A6741] font-semibold">
                      Med poeng: {Math.max(0, p.price - discount)} kr
                    </div>
                  )}
                  <div className="text-[10px] text-[#9B7B6A]">eller {p.pointsCost} poeng</div>
                </div>
                <button
                  onClick={() => { setAdded(p.id); setTimeout(() => setAdded(null), 2000) }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    added === p.id
                      ? 'bg-[#4A6741] text-white scale-95'
                      : 'bg-[#7B3F2B] text-white hover:bg-[#5C2D1E]'
                  }`}>
                  {added === p.id ? '✓ Lagt til' : 'Kjøp'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#9B7B6A] text-center italic pb-4">
          Demo-modus: Ingen ekte betalinger behandles
        </p>
      </div>
    </div>
  )
}
