import type { Starter } from '@/lib/types'

export default function StarterCard({ starter, onRequest }: { starter: Starter; onRequest: () => void }) {
  return (
    <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden hover:border-[#B8873A] hover:shadow-md transition-all">
      {starter.photo_url ? (
        <img src={starter.photo_url} alt={starter.name} className="w-full h-32 object-cover" />
      ) : (
        <div className="w-full h-24 bg-[#EAD9C4] flex items-center justify-center">
          <span className="text-4xl">🍞</span>
        </div>
      )}
      <div className="p-3">
        <div className="font-serif font-bold text-[#7B3F2B] text-base">{starter.name}</div>
        <div className="text-xs text-[#9B7B6A] italic mt-0.5">by {starter.profiles?.username ?? 'Unknown'}</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {starter.age_days && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B8873A15] text-[#B8873A] font-semibold border border-[#B8873A30]">
              {starter.age_days}d old
            </span>
          )}
          {starter.hydration_pct && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4A674115] text-[#4A6741] font-semibold border border-[#4A674130]">
              {starter.hydration_pct}% hydration
            </span>
          )}
          {starter.distance !== undefined && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7B3F2B15] text-[#7B3F2B] font-semibold border border-[#7B3F2B30]">
              {starter.distance.toFixed(1)} km
            </span>
          )}
        </div>
        {starter.description && (
          <p className="text-xs text-[#5C3D2E] mt-2 leading-relaxed line-clamp-2">{starter.description}</p>
        )}
        <button onClick={onRequest}
          className="mt-3 w-full py-1.5 rounded-lg bg-[#7B3F2B] text-white text-xs font-bold tracking-wide hover:bg-[#5C2D1E] transition-colors">
          Request Starter
        </button>
      </div>
    </div>
  )
}
