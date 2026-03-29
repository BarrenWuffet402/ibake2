export default function PageHeader({
  title, subtitle, ornament, right,
}: {
  title: string; subtitle?: string; ornament?: string; right?: React.ReactNode
}) {
  return (
    <div className="shrink-0 bg-[#FBF6EE] border-b border-[#DDD0BE] px-5 pt-4 pb-3">
      <div className="h-0.5 bg-[#B8873A] opacity-40 rounded mb-3 -mx-5" />
      <div className="flex items-end justify-between gap-4">
        <div>
          {ornament && <div className="text-[10px] text-[#B8873A] tracking-[3px] uppercase font-semibold mb-0.5">{ornament}</div>}
          <h1 className="font-serif font-bold text-[#7B3F2B] text-2xl leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-[#9B7B6A] mt-0.5">{subtitle}</p>}
        </div>
        {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
      </div>
    </div>
  )
}
