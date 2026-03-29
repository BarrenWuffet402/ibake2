'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

const LIVE_STREAM = {
  id: 'live-sofia', user: 'Sofia K.', avatar: 'SK', color: '#B87469',
  title: 'Baking sesjon: Høyhydrasjon focaccia 🍕', viewers: 23,
  thumbnail: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
}

const LIVE_CHAT_MESSAGES = [
  'Wow ser så godt ut! 😍',
  'Hvilken mel bruker du?',
  '❤️❤️❤️',
  'Kan du dele oppskriften?',
  'Første gang jeg ser dette, elsker det!',
  'Hvor lenge i ovnen?',
  '🍞🍞🍞',
  'Surdeigen ser perfekt ut!',
]

const VIDEOS = [
  {
    id: 'v1', user: 'Ingrid B.', avatar: 'IB', color: '#7B3F2B',
    title: 'Perfekt surdeig på 48 timer 🍞',
    views: '1.2k', likes: 89, duration: '4:32',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  },
  {
    id: 'v2', user: 'Maja H.', avatar: 'MH', color: '#B8873A',
    title: 'Min første focaccia! 🎉',
    views: '847', likes: 62, duration: '2:18',
    thumbnail: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
  },
  {
    id: 'v3', user: 'Lars M.', avatar: 'LM', color: '#4A6741',
    title: 'Rugbrød time-lapse 🎬',
    views: '2.1k', likes: 134, duration: '1:45',
    thumbnail: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80',
  },
  {
    id: 'v4', user: 'Sofia K.', avatar: 'SK', color: '#B87469',
    title: 'Surdeigsmukbang 😋',
    views: '3.4k', likes: 201, duration: '8:12',
    thumbnail: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80',
  },
]

export default function VideoPage() {
  const [watching, setWatching] = useState<typeof VIDEOS[0] | null>(null)
  const [watchingLive, setWatchingLive] = useState(false)
  const [liveChat, setLiveChat] = useState<string[]>([
    'Hei alle sammen! 👋',
    'Ser frem til å se dette!',
  ])
  const [viewers, setViewers] = useState(23)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const msgIndex = useRef(0)

  useEffect(() => {
    if (!watchingLive) return
    const interval = setInterval(() => {
      const msg = LIVE_CHAT_MESSAGES[msgIndex.current % LIVE_CHAT_MESSAGES.length]
      msgIndex.current++
      setLiveChat(prev => [...prev.slice(-20), msg])
      if (Math.random() > 0.6) setViewers(v => v + Math.floor(Math.random() * 3 - 1))
    }, 2500)
    return () => clearInterval(interval)
  }, [watchingLive])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [liveChat])

  // Live stream viewer
  if (watchingLive) {
    return (
      <div className="flex flex-col h-full bg-[#1a1008]">
        <div className="flex items-center gap-3 px-4 py-3 shrink-0">
          <button onClick={() => setWatchingLive(false)} className="text-[#9B7B6A] hover:text-white text-lg">←</button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: LIVE_STREAM.color }}>{LIVE_STREAM.avatar}</div>
          <div className="flex-1">
            <div className="text-white text-sm font-semibold">{LIVE_STREAM.user}</div>
            <div className="text-[#9B7B6A] text-xs">{LIVE_STREAM.title}</div>
          </div>
          <div className="flex items-center gap-1.5 bg-red-600 rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>
        </div>

        {/* Video area */}
        <div className="relative flex-1 max-h-64 shrink-0">
          <img src={LIVE_STREAM.thumbnail} alt="live" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008] to-transparent" />
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 rounded-full px-2.5 py-1">
            <span className="text-white text-xs">👁 {viewers} seere</span>
          </div>
        </div>

        {/* Live chat */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 min-h-0">
          {liveChat.map((msg, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-[#7B3F2B] shrink-0 mt-0.5" />
              <span className="text-[#D4C4AE] text-xs leading-relaxed">{msg}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* React button */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-[#ffffff15] shrink-0">
          <input placeholder="Skriv en kommentar..." className="flex-1 px-3 py-2 rounded-xl bg-[#2a1a0e] text-white text-xs placeholder:text-[#9B7B6A] border border-[#ffffff15] focus:outline-none" />
          <button className="text-2xl hover:scale-125 transition-transform active:scale-95">❤️</button>
        </div>
      </div>
    )
  }

  // Video player
  if (watching) {
    return (
      <div className="flex flex-col h-full bg-[#1a1008]">
        <button onClick={() => setWatching(null)} className="absolute top-4 left-4 z-10 text-white text-xl bg-black/40 rounded-full w-9 h-9 flex items-center justify-center">←</button>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <img src={watching.thumbnail} alt={watching.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl border border-white/40">▶</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full bg-[#B8873A] w-1/3 rounded-full" />
          </div>
        </div>
        <div className="flex-1 p-4 text-white">
          <h2 className="font-serif text-lg font-bold mb-1">{watching.title}</h2>
          <div className="flex items-center gap-3 text-[#9B7B6A] text-xs">
            <span>👁 {watching.views} visninger</span>
            <span>♥ {watching.likes}</span>
            <span>{watching.duration}</span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: watching.color }}>
              {watching.avatar}
            </div>
            <span className="font-semibold text-sm">{watching.user}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Video" subtitle="Baking stories & live" ornament="✦ Watch" right={
        <Link href="/profile" className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold flex items-center gap-1">
          🔴 Gå live
        </Link>
      } />

      <div className="flex-1 overflow-y-auto">
        {/* Live now */}
        <div className="px-4 pt-4 pb-2">
          <div className="text-[10px] font-bold tracking-widest uppercase text-[#9B7B6A] mb-2">🔴 Live nå</div>
          <button onClick={() => setWatchingLive(true)}
            className="w-full relative rounded-2xl overflow-hidden group">
            <img src={LIVE_STREAM.thumbnail} alt="live" className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 rounded-full px-2.5 py-1 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-white text-xs font-bold">LIVE</span>
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
              <span className="text-white text-xs">👁 {viewers}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: LIVE_STREAM.color }}>
                {LIVE_STREAM.avatar}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{LIVE_STREAM.user}</div>
                <div className="text-white/70 text-xs">{LIVE_STREAM.title}</div>
              </div>
            </div>
          </button>
        </div>

        {/* Video feed */}
        <div className="px-4 pt-2 pb-4">
          <div className="text-[10px] font-bold tracking-widest uppercase text-[#9B7B6A] mb-2 mt-2">Siste videoer</div>
          <div className="grid grid-cols-2 gap-3">
            {VIDEOS.map(v => (
              <button key={v.id} onClick={() => setWatching(v)}
                className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden hover:border-[#B8873A] hover:shadow-md transition-all text-left group">
                <div className="relative">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">▶</div>
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {v.duration}
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-[#2A1A0E] text-xs font-semibold leading-tight line-clamp-2">{v.title}</div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold" style={{ background: v.color }}>{v.avatar[0]}</div>
                      <span className="text-[10px] text-[#9B7B6A]">{v.user}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#9B7B6A]">
                      <span>👁 {v.views}</span>
                      <span>♥ {v.likes}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
