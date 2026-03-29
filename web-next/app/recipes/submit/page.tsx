'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
import { saveRecipe, getUsername, setUsername } from '@/lib/localStore'
import type { Recipe } from '@/lib/types'

const TAGS = ['sourdough', 'rye', 'whole wheat', 'enriched', 'overnight', 'beginner', 'advanced', 'Scandinavian', 'Korean', 'focaccia']

export default function SubmitRecipePage() {
  const router = useRouter()
  const [title, setTitle]           = useState('')
  const [username, setUsernameState] = useState('')
  const [text, setText]             = useState('')
  const [photoUrl, setPhotoUrl]     = useState('')
  const [selectedTags, setTags]     = useState<string[]>([])
  const [submitted, setSubmitted]   = useState(false)

  useEffect(() => { setUsernameState(getUsername()) }, [])

  function toggleTag(t: string) {
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !text.trim()) return

    const name = username.trim() || 'Anonymous'
    setUsername(name)

    const recipe: Recipe = {
      id:         `local-${Date.now()}`,
      author_id:  'local',
      title:      title.trim(),
      original_text: text.trim(),
      photo_urls: photoUrl.trim() ? [photoUrl.trim()] : [],
      likes_count: 0,
      created_at: new Date().toISOString(),
      profiles:   { id: 'local', username: name, created_at: '' },
      enhanced_json: selectedTags.length > 0 ? {
        title: title.trim(),
        description: text.trim().slice(0, 200),
        ingredients: [],
        steps: [],
        tags: selectedTags,
      } : undefined,
    }

    saveRecipe(recipe)
    setSubmitted(true)
    setTimeout(() => router.push('/recipes'), 1800)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <span className="text-6xl">🍞</span>
        <h2 className="font-serif text-2xl font-bold text-[#7B3F2B]">Recipe shared!</h2>
        <p className="text-[#9B7B6A] text-sm">Redirecting to recipes…</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Share a Recipe" subtitle="Contribute to the community" ornament="✦ Bake" />
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto px-4 py-6 space-y-5">

          {/* Name */}
          <Field label="Your Baker Name">
            <input
              value={username} onChange={e => setUsernameState(e.target.value)}
              placeholder="e.g. Lars_M, SeoYeonBakes…"
              className={input}
            />
          </Field>

          {/* Title */}
          <Field label="Recipe Title *">
            <input
              required value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. My Grandmother's Rugbrød"
              className={input}
            />
          </Field>

          {/* Photo URL */}
          <Field label="Photo URL (optional)">
            <input
              value={photoUrl} onChange={e => setPhotoUrl(e.target.value)}
              placeholder="https://… (paste an image link)"
              className={input}
              type="url"
            />
            {photoUrl && (
              <img src={photoUrl} alt="preview" className="mt-2 w-full h-40 object-cover rounded-lg border border-[#DDD0BE]"
                onError={e => (e.currentTarget.style.display = 'none')} />
            )}
          </Field>

          {/* Tags */}
          <Field label="Tags">
            <div className="flex flex-wrap gap-2 mt-1">
              {TAGS.map(t => (
                <button key={t} type="button" onClick={() => toggleTag(t)}
                  className={`text-xs px-3 py-1 rounded-full border font-semibold transition-colors
                    ${selectedTags.includes(t)
                      ? 'bg-[#7B3F2B] text-white border-[#7B3F2B]'
                      : 'bg-[#F2E8D9] text-[#7B3F2B] border-[#DDD0BE] hover:border-[#7B3F2B]'}`}>
                  {t}
                </button>
              ))}
            </div>
          </Field>

          {/* Recipe text */}
          <Field label="Recipe *" hint="Paste or write your full recipe — ingredients, steps, tips, everything.">
            <textarea
              required value={text} onChange={e => setText(e.target.value)}
              placeholder={`500g bread flour\n375g water\n100g active starter\n10g salt\n\n1. Mix flour and water, autolyse 30 min…`}
              rows={12}
              className={`${input} resize-none font-mono text-xs leading-relaxed`}
            />
          </Field>

          <div className="flex gap-3 pb-6">
            <button type="button" onClick={() => router.back()}
              className="flex-1 py-3 rounded-xl border border-[#DDD0BE] text-[#9B7B6A] font-semibold text-sm hover:bg-[#EAD9C4] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={!title.trim() || !text.trim()}
              className="flex-1 py-3 rounded-xl bg-[#7B3F2B] text-white font-bold text-sm hover:bg-[#5C2D1E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Share Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const input = 'w-full px-3 py-2.5 rounded-xl border border-[#DDD0BE] bg-[#FBF6EE] text-sm text-[#2A1A0E] placeholder:text-[#9B7B6A] focus:outline-none focus:border-[#B8873A] transition-colors'

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold tracking-widest uppercase text-[#9B7B6A] mb-1.5 block">{label}</label>
      {hint && <p className="text-xs text-[#9B7B6A] mb-1.5 leading-relaxed">{hint}</p>}
      {children}
    </div>
  )
}
