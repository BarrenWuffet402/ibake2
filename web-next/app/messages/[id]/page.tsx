'use client'
import { use, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { DEMO_MESSAGES } from '@/data/seedData'

const META: Record<string, { name: string; starter: string; avatar: string; color: string; online: boolean }> = {
  'demo-msg-1':  { name: 'Ingrid Bakke',     starter: 'Bergen Beauty',       avatar: 'IB', color: '#7B3F2B', online: true  },
  'demo-msg-3':  { name: 'Lars Møllebakken', starter: 'Oslo Sourdough',      avatar: 'LM', color: '#4A6741', online: true  },
  'demo-msg-4':  { name: 'Seo-Yeon Park',    starter: 'Kimchi Starter',      avatar: 'SP', color: '#B8873A', online: true  },
  'demo-msg-7':  { name: 'Emma Lindqvist',   starter: 'Stockholm Rye',       avatar: 'EL', color: '#B87469', online: false },
  'demo-msg-9':  { name: 'Marco Bellini',    starter: 'Toscana Wild',        avatar: 'MB', color: '#5C3D2E', online: false },
  'demo-msg-10': { name: 'Fatima Al-Rashid', starter: 'Dubai Dates Starter', avatar: 'FA', color: '#7B3F2B', online: false },
}

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const meta = META[id] ?? { name: 'Baker', starter: 'Starter', avatar: '??', color: '#7B3F2B', online: false }
  const [messages, setMessages] = useState((DEMO_MESSAGES as any)[id] ?? [])
  const [input, setInput] = useState('')
  const [calling, setCalling] = useState(false)
  const [callState, setCallState] = useState<'calling' | 'connected' | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages((prev: any[]) => [...prev, {
      id: `m-${Date.now()}`, sender_id: 'me', content: text,
      created_at: new Date().toISOString(), profiles: { username: 'You' },
    }])
    setInput('')
  }

  function startCall() {
    setCallState('calling')
    setCalling(true)
    setTimeout(() => setCallState('connected'), 3000)
  }

  if (calling) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#1a1008] text-white relative">
        {/* Pulsing ring */}
        <div className="relative mb-8">
          {callState === 'calling' && (
            <>
              <div className="absolute inset-0 rounded-full bg-[#4A6741] opacity-20 animate-ping scale-150" />
              <div className="absolute inset-0 rounded-full bg-[#4A6741] opacity-10 animate-ping scale-200 animation-delay-300" />
            </>
          )}
          <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold text-white relative z-10 border-4"
            style={{ background: meta.color, borderColor: callState === 'connected' ? '#4A6741' : '#B8873A' }}>
            {meta.avatar}
          </div>
          {callState === 'connected' && (
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#4A6741] border-2 border-[#1a1008] flex items-center justify-center text-sm">
              🟢
            </div>
          )}
        </div>

        <h2 className="font-serif text-2xl font-bold mb-1">{meta.name}</h2>
        <p className="text-[#9B7B6A] text-sm mb-8">
          {callState === 'calling' ? 'Ringer...' : '🎥 Videoanrop tilkoblet'}
        </p>

        {callState === 'connected' && (
          <div className="w-full max-w-sm h-40 bg-[#2a1a0e] rounded-2xl border border-[#B8873A30] mb-8 flex items-center justify-center">
            <div className="text-center text-[#9B7B6A]">
              <div className="text-4xl mb-2">📹</div>
              <p className="text-xs">Kamera deaktivert i demo</p>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          <button onClick={() => { setCalling(false); setCallState(null) }}
            className="w-16 h-16 rounded-full bg-[#B87469] flex items-center justify-center text-2xl hover:bg-red-600 transition-colors">
            📵
          </button>
          {callState === 'connected' && (
            <>
              <button className="w-16 h-16 rounded-full bg-[#2a1a0e] border border-[#DDD0BE30] flex items-center justify-center text-2xl">🎙️</button>
              <button className="w-16 h-16 rounded-full bg-[#2a1a0e] border border-[#DDD0BE30] flex items-center justify-center text-2xl">📹</button>
            </>
          )}
        </div>

        {callState === 'calling' && (
          <div className="flex gap-1 mt-8">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#B8873A] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#FBF6EE] border-b border-[#DDD0BE] shrink-0">
        <Link href="/messages" className="text-[#9B7B6A] hover:text-[#7B3F2B] text-lg transition-colors">←</Link>
        <div className="relative">
          <div className="w-9 h-9 rounded-full text-white text-sm font-bold flex items-center justify-center"
            style={{ background: meta.color }}>
            {meta.avatar}
          </div>
          {meta.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4A6741] border-2 border-[#FBF6EE]" />}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#2A1A0E] text-sm">{meta.name}</div>
          <div className="text-[11px] text-[#B8873A] font-semibold flex items-center gap-1">
            🌾 {meta.starter}
            {meta.online && <span className="text-[#4A6741]">· online</span>}
          </div>
        </div>
        <button onClick={startCall}
          className="w-9 h-9 rounded-full bg-[#4A674120] hover:bg-[#4A674130] text-[#4A6741] flex items-center justify-center text-lg transition-colors"
          title="Start video call">
          📹
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F2E8D9]">
        {messages.map((msg: any, i: number) => {
          const isMe = msg.sender_id === 'me' || msg.profiles?.username === 'You'
          return (
            <div key={msg.id ?? i} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              {!isMe && (
                <div className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 mt-1"
                  style={{ background: meta.color }}>
                  {meta.avatar[0]}
                </div>
              )}
              <div className={`max-w-[72%] px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                ${isMe
                  ? 'bg-[#7B3F2B] text-white rounded-tr-sm'
                  : 'bg-[#FBF6EE] text-[#2A1A0E] border border-[#DDD0BE] rounded-tl-sm'}`}>
                {msg.content}
              </div>
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 p-3 border-t border-[#DDD0BE] bg-[#FBF6EE] shrink-0">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Skriv en melding..."
          className="flex-1 px-3 py-2 rounded-xl border border-[#DDD0BE] bg-[#F2E8D9] text-sm text-[#2A1A0E] placeholder:text-[#9B7B6A] focus:outline-none focus:border-[#B8873A]" />
        <button onClick={send}
          className="w-9 h-9 rounded-full bg-[#7B3F2B] text-white flex items-center justify-center hover:bg-[#5C2D1E] transition-colors text-sm font-bold">
          ↑
        </button>
      </div>
    </div>
  )
}
