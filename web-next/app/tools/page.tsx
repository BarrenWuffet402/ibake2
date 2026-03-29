'use client'
import { useState } from 'react'
import PageHeader from '@/components/PageHeader'

export default function ToolsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Baker's Tools" subtitle="Calculators & references" ornament="✦ Craft" />
      <div className="flex-1 overflow-y-auto p-4 max-w-3xl mx-auto w-full space-y-4">
        <HydrationCalc />
        <StarterRatio />
        <FermentTimer />
      </div>
    </div>
  )
}

function Card({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#DDD0BE]">
        <div className="w-1 h-5 bg-[#B8873A] rounded" />
        <span className="text-lg">{emoji}</span>
        <h2 className="font-serif font-bold text-[#2A1A0E]">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function Field({ label, value, onChange, unit }: { label: string; value: string; onChange: (v: string) => void; unit?: string }) {
  return (
    <div>
      <label className="text-xs font-bold tracking-wide text-[#9B7B6A] uppercase mb-1 block">{label}</label>
      <div className="flex items-center gap-2">
        <input type="number" value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-[#DDD0BE] bg-[#F2E8D9] text-sm text-[#2A1A0E] focus:outline-none focus:border-[#B8873A]" />
        {unit && <span className="text-sm text-[#9B7B6A] font-semibold whitespace-nowrap">{unit}</span>}
      </div>
    </div>
  )
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-t border-[#D4C4AE]">
      <span className="text-sm text-[#5C3D2E]">{label}</span>
      <span className="font-bold text-[#7B3F2B]">{value}</span>
    </div>
  )
}

function HydrationCalc() {
  const [flour, setFlour] = useState('500')
  const [water, setWater] = useState('375')
  const hyd = flour ? Math.round((parseFloat(water || '0') / parseFloat(flour)) * 100) : 0
  const level = hyd < 65 ? 'Stiff' : hyd < 75 ? 'Medium' : hyd < 85 ? 'Wet' : 'Very Wet'
  return (
    <Card title="Hydration Calculator" emoji="💧">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Field label="Flour" value={flour} onChange={setFlour} unit="g" />
        <Field label="Water" value={water} onChange={setWater} unit="g" />
      </div>
      <Result label="Hydration" value={`${hyd}% — ${level}`} />
      <div className="mt-3 h-3 rounded-full bg-[#EAD9C4] overflow-hidden">
        <div className="h-full rounded-full bg-[#7B3F2B] transition-all duration-300" style={{ width: `${Math.min(hyd, 100)}%` }} />
      </div>
    </Card>
  )
}

function StarterRatio() {
  const [starter, setStarter] = useState('20')
  const [flour, setFlour] = useState('100')
  const [water2, setWater2] = useState('100')
  const total = (parseFloat(starter || '0') + parseFloat(flour || '0') + parseFloat(water2 || '0')).toFixed(0)
  const pct = flour ? Math.round((parseFloat(starter || '0') / parseFloat(flour)) * 100) : 0
  return (
    <Card title="Starter Feeding Ratio" emoji="🌾">
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Field label="Starter" value={starter} onChange={setStarter} unit="g" />
        <Field label="Flour" value={flour} onChange={setFlour} unit="g" />
        <Field label="Water" value={water2} onChange={setWater2} unit="g" />
      </div>
      <Result label="Total" value={`${total}g`} />
      <Result label="Inoculation" value={`${pct}%`} />
      <Result label="Ratio" value={`1:${flour}:${water2}`} />
    </Card>
  )
}

function FermentTimer() {
  const [temp, setTemp] = useState('24')
  const [inoculation, setInoculation] = useState('20')
  const t = parseFloat(temp || '20')
  const i = parseFloat(inoculation || '20')
  const baseHours = 4 + (30 - t) * 0.3 + (20 - i) * 0.1
  const hours = Math.max(2, Math.round(baseHours * 10) / 10)
  const range = `${Math.max(1.5, hours - 1).toFixed(1)}–${(hours + 1.5).toFixed(1)} hrs`
  return (
    <Card title="Bulk Fermentation Guide" emoji="⏱️">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Field label="Dough Temp" value={temp} onChange={setTemp} unit="°C" />
        <Field label="Starter %" value={inoculation} onChange={setInoculation} unit="%" />
      </div>
      <Result label="Estimated Bulk" value={range} />
      <p className="text-xs text-[#9B7B6A] mt-3 leading-relaxed">
        Estimates only — watch for 50–75% rise and a domed, airy surface. Temperature varies significantly by starter strength.
      </p>
    </Card>
  )
}
