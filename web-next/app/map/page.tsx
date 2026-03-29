'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { DEMO_STARTERS } from '@/data/seedData'
import type { Starter } from '@/lib/types'
import PageHeader from '@/components/PageHeader'
import StarterCard from '@/components/StarterCard'

const Map = dynamic(() => import('@/components/StarterMap'), { ssr: false })

export default function MapPage() {
  const starters: Starter[] = DEMO_STARTERS as unknown as Starter[]
  const [view, setView] = useState<'map' | 'list'>('map')
  const [selected, setSelected] = useState<Starter | null>(null)

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Starters Nearby"
        subtitle={`Within 10 km · ${starters.length} available`}
        ornament="✦ Discover"
        right={
          <div className="flex gap-2">
            <button onClick={() => setView(v => v === 'map' ? 'list' : 'map')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7B3F2B] text-white text-xs font-semibold">
              {view === 'map' ? '☰ List' : '🗺 Map'}
            </button>
            <a href="/starter-map.html" target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B8873A] text-white text-xs font-semibold">
              ✦ Interactive Map
            </a>
          </div>
        }
      />

      {view === 'map' ? (
        <div className="flex flex-1 min-h-0">
          <div className="flex-1 relative">
            <Map starters={starters} onSelect={setSelected} />
          </div>
          {selected && (
            <div className="w-80 shrink-0 border-l border-[#DDD0BE] overflow-y-auto bg-[#FBF6EE] p-4">
              <button onClick={() => setSelected(null)} className="text-xs text-[#9B7B6A] mb-3">← Back to map</button>
              <StarterCard starter={selected} onRequest={() => {}} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 content-start">
          {starters.map(s => <StarterCard key={s.id} starter={s} onRequest={() => {}} />)}
        </div>
      )}
    </div>
  )
}
