'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { THREADS } from '../page'

const REPLIES: Record<string, Array<{ author: string; avatar: string; color: string; content: string; upvotes: number; time: string; best?: boolean }>> = {
  t1: [
    { author: 'Ingrid B.', avatar: 'IB', color: '#7B3F2B', upvotes: 24, time: '1t siden', best: true,
      content: 'Det høres ut som starteren din er overgjæret. Prøv å øke matingshyppigheten til 2x om dagen, eller bruk kaldere vann. Lukten av eddik (etanol) betyr at villdgjæren har spist opp alt melet og begynner å bryte ned seg selv. En 1:2:2 ratio kan også hjelpe — mer mat per gram starter.' },
    { author: 'Lars M.', avatar: 'LM', color: '#4A6741', upvotes: 11, time: '2t siden',
      content: 'Jeg hadde det samme problemet! Løsningen for meg var å bytte til rugmel for matingen. Gir mer næring og balanserer syrenivået.' },
    { author: 'Tobias N.', avatar: 'TN', color: '#5C3D2E', upvotes: 8, time: '3t siden',
      content: 'Husk at litt syrlig er normalt og ønskelig. Men hvis det lukter som aceton eller sprit er det for mye. Prøv å ta opp en liten del og mate den frisk i et rent glass.' },
  ],
  t2: [
    { author: 'Ingrid B.', avatar: 'IB', color: '#7B3F2B', upvotes: 31, time: '4t siden',
      content: 'Perfekt triks: sett en stor bolle med kokende vann i ovnen ved siden av deigen. Lukk ovnen — det lager en varmt og fuktig hevekammer. Bytt ut vannet hvis det kjølner. Holder 24-27°C lett!' },
    { author: 'Maja H.', avatar: 'MH', color: '#B8873A', upvotes: 18, time: '4t siden',
      content: 'Jeg kjøpte en liten varmeplate (aquarium-type) og la under hevekurven med et kjøkkenhåndkle mellom. Konstant 26°C og brød som hever perfekt selv om vinteren.' },
    { author: 'Sofia K.', avatar: 'SK', color: '#B87469', upvotes: 14, time: '5t siden',
      content: 'Kald gjæring er faktisk et alternativ — bare la det heve lenger! 18 timer i 16°C kan gi bedre smak enn 4 timer i 25°C. Prøv det!' },
  ],
  t3: [
    { author: 'Lars M.', avatar: 'LM', color: '#4A6741', upvotes: 45, time: '22t siden',
      content: 'FANTASTISK! Den åpne krummen er utrolig! Kan du dele oppskriften? Hva slags mel og hvor lenge autolyse?' },
    { author: 'Ingrid B.', avatar: 'IB', color: '#7B3F2B', upvotes: 38, time: '23t siden',
      content: 'Nydelig! Det er akkurat den følelsen man baker for! Gratulerer med gjennombruddet 🎉🍞' },
    { author: 'Tobias N.', avatar: 'TN', color: '#5C3D2E', upvotes: 22, time: '1d siden',
      content: 'Surdeigsguden nikker anerkjennende! Etter 6 måneder er dette veldig imponerende resultat!' },
  ],
  t4: [
    { author: 'Ingrid B.', avatar: 'IB', color: '#7B3F2B', upvotes: 28, time: '1d siden',
      content: 'Har brukt Lodge 5.5 qt i 3 år og elsker den. Tung, holder varme perfekt, og tåler svært høy temperatur. Le Creuset er fin men prisen er vanskelig å forsvare — Lodge gjør akkurat det samme for en tredjedel av prisen.' },
    { author: 'Lars M.', avatar: 'LM', color: '#4A6741', upvotes: 19, time: '1d siden',
      content: 'Staub er min favoritt — den emaljerte innsiden er lettere å rengjøre enn Lodge råjern, og lokket sitter tettere. Men som Ingrid sier: Lodge er en vinner om pris er viktig.' },
    { author: 'Sofia K.', avatar: 'SK', color: '#B87469', upvotes: 15, time: '2d siden',
      content: 'Et billig alternativ: Ikea 365+ gryte med lokk. Fungerer overraskende bra og koster 399 kr. Ikke like solid som Lodge men mer enn godt nok for hjemmebakeren.' },
  ],
  t5: [
    { author: 'Ingrid B.', avatar: 'IB', color: '#7B3F2B', upvotes: 67, time: '2d siden',
      content: 'GRATULERER!!! Det første brødet er alltid det mest spesielle ❤️ Ikke vær for streng med deg selv — selv et "imperfekt" surdeigbrød er mye bedre enn butikkbrød. Veldig stolt av deg!' },
    { author: 'Lars M.', avatar: 'LM', color: '#4A6741', upvotes: 41, time: '2d siden',
      content: 'Velkommen til surdeigsfamilien! 🌾 Det første brødet er alltid litt flatt — men neste blir bedre, og det etter det enda bedre. Hold ut!' },
    { author: 'Maja H.', avatar: 'MH', color: '#B8873A', upvotes: 29, time: '3d siden',
      content: 'Jeg husker mitt første brød — det smakte som en murstein men jeg var stolt som en hane 😄 Lykke til videre! Del gjerne bilde av neste!' },
  ],
}

export default function ForumThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const thread = THREADS.find(t => t.id === id)
  if (!thread) notFound()

  const replies = REPLIES[id] ?? []
  const [replyText, setReplyText] = useState('')
  const [localReplies, setLocalReplies] = useState<typeof replies>([])
  const [upvoted, setUpvoted] = useState<Set<number>>(new Set())

  function submitReply(e: React.FormEvent) {
    e.preventDefault()
    if (!replyText.trim()) return
    setLocalReplies(prev => [...prev, {
      author: 'Du', avatar: 'DU', color: '#7B3F2B',
      content: replyText.trim(), upvotes: 0, time: 'Akkurat nå',
    }])
    setReplyText('')
  }

  const allReplies = [...replies, ...localReplies]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
      <Link href="/forum" className="text-xs text-[#9B7B6A] hover:text-[#7B3F2B] mb-4 inline-block transition-colors">
        ← Forum
      </Link>

      {/* Thread header */}
      <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-4 mb-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B8873A15] text-[#B8873A] border border-[#B8873A30] font-semibold">
            {thread.emoji} {thread.category}
          </span>
          {thread.solved && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4A674115] text-[#4A6741] border border-[#4A674130] font-semibold">
              ✅ Løst
            </span>
          )}
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#2A1A0E] mb-2 leading-tight">{thread.title}</h1>
        <p className="text-sm text-[#5C3D2E] leading-relaxed mb-3">{thread.preview}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: thread.color }}>{thread.avatar[0]}</div>
            <span className="text-sm font-semibold text-[#7B3F2B]">{thread.author}</span>
            <span className="text-xs text-[#9B7B6A]">{thread.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#B8873A]">
            <span className="text-sm">▲</span>
            <span className="font-bold text-sm">{thread.upvotes}</span>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="text-xs font-bold tracking-widest uppercase text-[#9B7B6A] mb-3">
        {allReplies.length} svar
      </div>

      <div className="space-y-3 mb-6">
        {allReplies.map((r, i) => (
          <div key={i} className={`bg-[#FBF6EE] rounded-xl border p-4 ${r.best ? 'border-[#4A6741] bg-[#4A674108]' : 'border-[#DDD0BE]'}`}>
            {r.best && (
              <div className="text-[10px] font-bold text-[#4A6741] tracking-wide mb-2">✅ Beste svar</div>
            )}
            <p className="text-sm text-[#2A1A0E] leading-relaxed mb-3">{r.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                  style={{ background: r.color }}>{r.avatar[0]}</div>
                <span className="text-xs font-semibold text-[#7B3F2B]">{r.author}</span>
                <span className="text-xs text-[#9B7B6A]">{r.time}</span>
              </div>
              <button
                onClick={() => setUpvoted(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n })}
                className={`flex items-center gap-1 text-xs font-bold transition-colors ${upvoted.has(i) ? 'text-[#B8873A]' : 'text-[#9B7B6A] hover:text-[#B8873A]'}`}>
                ▲ {r.upvotes + (upvoted.has(i) ? 1 : 0)}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply form */}
      <form onSubmit={submitReply} className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-4">
        <div className="text-xs font-bold tracking-widest uppercase text-[#9B7B6A] mb-3">Skriv et svar</div>
        <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
          placeholder="Del din erfaring eller gi råd..."
          rows={4}
          className="w-full px-3 py-2.5 rounded-xl border border-[#DDD0BE] bg-[#F2E8D9] text-sm text-[#2A1A0E] placeholder:text-[#9B7B6A] focus:outline-none focus:border-[#B8873A] resize-none mb-3" />
        <button type="submit" disabled={!replyText.trim()}
          className="w-full py-2.5 rounded-xl bg-[#7B3F2B] text-white font-bold text-sm hover:bg-[#5C2D1E] transition-colors disabled:opacity-30">
          Publiser svar
        </button>
      </form>
    </div>
  )
}
