'use client'
import { useState } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

const ONLINE_USERS = [
  { id: 'demo-msg-1',  name: 'Ingrid',  initials: 'IB', color: '#7B3F2B' },
  { id: 'demo-msg-3',  name: 'Lars',    initials: 'LM', color: '#4A6741' },
  { id: 'demo-msg-4',  name: 'Seo-Yeon',initials: 'SP', color: '#B8873A' },
  { id: 'demo-msg-7',  name: 'Emma',    initials: 'EL', color: '#B87469' },
  { id: 'demo-msg-9',  name: 'Marco',   initials: 'MB', color: '#5C3D2E' },
]

const CONVERSATIONS = [
  { id: 'demo-msg-1',  name: 'Ingrid Bakke',     starter: 'Bergen Beauty',       status: 'accepted', preview: 'Hei! Er starteren din fortsatt tilgjengelig?', time: '2m',  avatar: 'IB', online: true,  unread: 2 },
  { id: 'demo-msg-3',  name: 'Lars Møllebakken', starter: 'Oslo Sourdough',      status: 'accepted', preview: 'Jeg kan møte deg ved Mathallen på lørdag.',   time: '1h',  avatar: 'LM', online: true,  unread: 0 },
  { id: 'demo-msg-4',  name: 'Seo-Yeon Park',    starter: 'Kimchi Starter',      status: 'accepted', preview: 'Thank you so much! My bread turned out amazing 🍞', time: '3h', avatar: 'SP', online: true,  unread: 1 },
  { id: 'demo-msg-7',  name: 'Emma Lindqvist',   starter: 'Stockholm Rye',       status: 'accepted', preview: 'Do you have tips for maintaining high hydration?', time: '1d', avatar: 'EL', online: false, unread: 0 },
  { id: 'demo-msg-9',  name: 'Marco Bellini',    starter: 'Toscana Wild',        status: 'accepted', preview: 'Posso passare domani mattina?',                time: '2d',  avatar: 'MB', online: false, unread: 0 },
  { id: 'demo-msg-10', name: 'Fatima Al-Rashid', starter: 'Dubai Dates Starter', status: 'accepted', preview: 'This starter makes the most incredible flatbreads!', time: '3d', avatar: 'FA', online: false, unread: 0 },
  { id: 'demo-pending-1', name: 'Bjørn Haugen',  starter: 'Nordmarka Levain',   status: 'pending',  preview: 'Would love to try your starter!', time: '5h', avatar: 'BH', online: false, unread: 0 },
  { id: 'demo-pending-2', name: 'Yuki Tanaka',   starter: 'Kyoto Koji',          status: 'pending',  preview: 'Your starter sounds amazing!',    time: '8h', avatar: 'YT', online: false, unread: 0 },
  { id: 'demo-pending-3', name: 'Priya Sharma',  starter: 'Mumbai Masala',       status: 'pending',  preview: 'I have been baking for 5 years.',  time: '1d', avatar: 'PS', online: false, unread: 0 },
  { id: 'demo-declined-1',name: 'Hans Mueller',  starter: 'Bayern Sauerteig',    status: 'declined', preview: 'Request declined',                 time: '5d', avatar: 'HM', online: false, unread: 0 },
]

const statusStyle: Record<string, string> = {
  accepted: 'bg-[#4A674115] text-[#4A6741] border-[#4A674130]',
  pending:  'bg-[#B8873A15] text-[#B8873A] border-[#B8873A30]',
  declined: 'bg-[#B8746915] text-[#B87469] border-[#B8746930]',
}

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Messages" subtitle="Starter sharing requests" ornament="✦ Inbox" />

      {/* Online now */}
      <div className="bg-[#FBF6EE] border-b border-[#DDD0BE] px-4 py-3 shrink-0">
        <div className="text-[10px] font-bold tracking-widest uppercase text-[#9B7B6A] mb-2">🟢 Online Now</div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {ONLINE_USERS.map(u => (
            <Link key={u.id} href={`/messages/${u.id}`} className="flex flex-col items-center gap-1 shrink-0 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:ring-2 ring-[#B8873A] transition-all"
                  style={{ background: u.color }}>
                  {u.initials}
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#4A6741] border-2 border-[#FBF6EE] animate-pulse" />
              </div>
              <span className="text-[10px] text-[#5C3D2E] font-semibold">{u.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        <div className="space-y-2">
          {CONVERSATIONS.map(r => (
            r.status === 'accepted' ? (
              <Link key={r.id} href={`/messages/${r.id}`}
                className="flex items-center gap-3 p-3 bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] hover:border-[#B8873A] transition-colors group">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#7B3F2B] text-white text-sm font-bold flex items-center justify-center">
                    {r.avatar}
                  </div>
                  {r.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#4A6741] border-2 border-[#FBF6EE]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A1A0E] text-sm">{r.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#9B7B6A]">{r.time}</span>
                      {r.unread > 0 && (
                        <div className="w-4 h-4 rounded-full bg-[#7B3F2B] text-white text-[9px] font-bold flex items-center justify-center">
                          {r.unread}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-[11px] text-[#B8873A] font-semibold">🌾 {r.starter}</div>
                  <div className="text-xs text-[#9B7B6A] truncate mt-0.5">{r.preview}</div>
                </div>
              </Link>
            ) : (
              <div key={r.id}
                className="flex items-center gap-3 p-3 bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] opacity-60">
                <div className="w-11 h-11 rounded-full bg-[#9B7B6A] text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2A1A0E] text-sm">{r.name}</span>
                    <span className="text-[10px] text-[#9B7B6A]">{r.time}</span>
                  </div>
                  <div className="text-[11px] text-[#B8873A] font-semibold">🌾 {r.starter}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${statusStyle[r.status]}`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}
