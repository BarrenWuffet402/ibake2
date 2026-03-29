'use client'
import { useState } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

const CODE = 'IBAKE-DEMO-A1B2'
const REFERRED = [
  { name: 'Bjørn H.',  avatar: 'BH', color: '#4A6741', joined: '3d siden', pts: 100 },
  { name: 'Yuki T.',   avatar: 'YT', color: '#B8873A', joined: '1u siden', pts: 100 },
  { name: 'Priya S.',  avatar: 'PS', color: '#7B3F2B', joined: '2u siden', pts: 100 },
]

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://ibake.no/join/${CODE}`

  function copy(text: string) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Henvis venner" subtitle="Del iBake og tjen poeng" ornament="✦ Vekst" right={
        <Link href="/profile" className="text-xs text-[#9B7B6A] hover:text-[#7B3F2B]">← Profil</Link>
      } />
      <div className="flex-1 overflow-y-auto p-4 max-w-xl mx-auto w-full space-y-5">

        {/* Stats banner */}
        <div className="bg-[#7B3F2B] rounded-2xl p-5 text-white">
          <div className="text-xs font-bold tracking-widest uppercase opacity-70 mb-3">Din henvisningsstatus</div>
          <div className="flex gap-8">
            <div>
              <div className="text-4xl font-black">{REFERRED.length}</div>
              <div className="text-xs opacity-70">venner henvist</div>
            </div>
            <div>
              <div className="text-4xl font-black">{REFERRED.length * 100}</div>
              <div className="text-xs opacity-70">poeng tjent</div>
            </div>
          </div>
        </div>

        {/* Referral code */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-4">
          <div className="text-[10px] font-bold tracking-widest uppercase text-[#9B7B6A] mb-2">Din kode</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono font-black text-xl text-[#7B3F2B] tracking-widest bg-[#F2E8D9] rounded-lg px-4 py-3 border border-[#DDD0BE]">
              {CODE}
            </div>
            <button onClick={() => copy(CODE)}
              className={`px-4 py-3 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-[#4A6741] text-white' : 'bg-[#7B3F2B] text-white hover:bg-[#5C2D1E]'}`}>
              {copied ? '✓' : 'Kopier'}
            </button>
          </div>
        </div>

        {/* Share link */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-4">
          <div className="text-[10px] font-bold tracking-widest uppercase text-[#9B7B6A] mb-2">Del lenke</div>
          <div className="text-xs font-mono text-[#5C3D2E] bg-[#F2E8D9] rounded-lg px-3 py-2.5 border border-[#DDD0BE] mb-3 break-all">
            {shareUrl}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => copy(shareUrl)}
              className="py-2.5 rounded-xl border border-[#DDD0BE] text-sm font-semibold text-[#7B3F2B] hover:bg-[#F2E8D9] transition-colors">
              📋 Kopier lenke
            </button>
            <button onClick={() => {
              const text = `Bli med meg på iBake! Norges beste surdeig-community 🍞\n\n${shareUrl}`
              if (navigator.share) {
                navigator.share({ title: 'iBake', text, url: shareUrl })
              } else {
                copy(text)
              }
            }} className="py-2.5 rounded-xl bg-[#7B3F2B] text-white text-sm font-semibold hover:bg-[#5C2D1E] transition-colors">
              📤 Del nå
            </button>
          </div>
          <div className="mt-3 p-3 bg-[#EAD9C4] rounded-lg">
            <p className="text-xs text-[#5C3D2E] italic leading-relaxed">
              "Bli med meg på iBake! Norges beste surdeig-community 🍞 Bruk koden min og vi begge får bonuspoeng!"
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-4">
          <div className="font-serif font-bold text-[#2A1A0E] mb-3">Slik fungerer det</div>
          {[
            { step: '1', text: 'Del koden din eller lenken med en venn' },
            { step: '2', text: 'Vennen registrerer seg med koden din' },
            { step: '3', text: 'Du får automatisk +100 poeng! 🎉' },
          ].map(s => (
            <div key={s.step} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-6 h-6 rounded-full bg-[#7B3F2B] text-white text-xs font-black flex items-center justify-center shrink-0">
                {s.step}
              </div>
              <p className="text-sm text-[#5C3D2E] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Referred users */}
        <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DDD0BE]">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#B8873A] rounded" />
              <span className="font-serif font-bold text-[#2A1A0E]">Dine henvinste venner</span>
            </div>
          </div>
          {REFERRED.map((u, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#DDD0BE] last:border-0">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ background: u.color }}>{u.avatar[0]}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#2A1A0E]">{u.name}</div>
                <div className="text-xs text-[#9B7B6A]">Ble med {u.joined}</div>
              </div>
              <div className="font-black text-[#4A6741] text-sm">+{u.pts} poeng</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
