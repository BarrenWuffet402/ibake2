'use client'
import { use, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SAMPLE_RECIPES, DEMO_COMMENTS } from '@/data/seedData'
import type { Recipe, RecipeComment } from '@/lib/types'
import { getLocalRecipes, getLocalComments, saveComment, getUsername, setUsername, getLikes, setLike } from '@/lib/localStore'

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [comments, setComments]     = useState<RecipeComment[]>([])
  const [likeCount, setLikeCount]   = useState(0)
  const [liked, setLiked]           = useState(false)
  const [commentText, setCommentText] = useState('')
  const [authorName, setAuthorName]   = useState('')
  const [showOriginal, setShowOriginal] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const seed = SAMPLE_RECIPES as unknown as Recipe[]

  useEffect(() => {
    const local = getLocalRecipes()
    setAllRecipes([...local, ...seed])
    setAuthorName(getUsername())
  }, [])

  const recipe = allRecipes.find(r => r.id === id) ?? seed.find(r => r.id === id)
  const isLocal = id.startsWith('local-')

  useEffect(() => {
    if (!recipe) return
    const base = recipe.likes_count
    const stored = getLikes()[id]
    setLikeCount(stored ?? base)

    // Merge demo comments + local comments
    const demo: RecipeComment[] = (DEMO_COMMENTS as any)[id] ?? []
    const local = getLocalComments(id)
    setComments([...demo, ...local])
  }, [recipe?.id])

  if (allRecipes.length === 0 && !seed.find(r => r.id === id)) {
    return <div className="flex items-center justify-center h-full text-[#9B7B6A]">Loading…</div>
  }
  if (!recipe) notFound()

  const enhanced = recipe.enhanced_json

  function handleLike() {
    if (liked) return
    const next = likeCount + 1
    setLikeCount(next)
    setLike(id, next)
    setLiked(true)
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault()
    if (!commentText.trim()) return
    const name = authorName.trim() || 'Anonymous'
    setUsername(name)

    const comment: RecipeComment = {
      id:         `c-${Date.now()}`,
      recipe_id:  id,
      author_id:  'local',
      content:    commentText.trim(),
      created_at: new Date().toISOString(),
      profiles:   { id: 'local', username: name, created_at: '' },
    }
    saveComment(comment)
    setComments(prev => [...prev, comment])
    setCommentText('')
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
      <Link href="/recipes" className="text-xs text-[#9B7B6A] hover:text-[#7B3F2B] mb-4 inline-block transition-colors">
        ← All Recipes
      </Link>

      {recipe.photo_urls?.[0] ? (
        <img src={recipe.photo_urls[0]} alt={recipe.title} className="w-full h-72 object-cover rounded-xl" />
      ) : (
        <div className="w-full h-48 bg-[#EAD9C4] rounded-xl flex items-center justify-center">
          <span className="text-7xl">🍞</span>
        </div>
      )}
      <div className="h-1 bg-[#B8873A] opacity-50 rounded-b-sm mb-5" />

      {/* Title */}
      <div className="mb-5">
        <h1 className="font-serif text-3xl font-bold text-[#7B3F2B] leading-tight">{recipe.title}</h1>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-[#9B7B6A] italic">by {recipe.profiles?.username ?? 'Unknown Baker'}</span>
          <button onClick={handleLike}
            className={`flex items-center gap-1.5 transition-transform ${liked ? 'scale-110' : 'hover:scale-110'} active:scale-95`}>
            <span className={`text-xl transition-all ${liked ? 'text-[#B87469] drop-shadow' : 'text-[#D4C4AE] hover:text-[#B87469]'}`}>♥</span>
            <span className="font-bold text-[#B87469] text-sm">{likeCount}</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {enhanced && (
            <span className="text-xs px-2 py-1 rounded bg-[#B8873A18] text-[#B8873A] font-bold border border-[#B8873A30]">
              ✨ AI Enhanced
            </span>
          )}
          {isLocal && (
            <span className="text-xs px-2 py-1 rounded bg-[#4A674115] text-[#4A6741] font-bold border border-[#4A674130]">
              ✓ Your Recipe
            </span>
          )}
        </div>
      </div>

      <div className="h-px bg-[#D4C4AE] mb-5" />

      {enhanced?.description && <p className="text-[#5C3D2E] leading-relaxed mb-4">{enhanced.description}</p>}

      {enhanced?.tags && enhanced.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {enhanced.tags.map((t, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded bg-[#7B3F2B15] text-[#7B3F2B] font-semibold">{t}</span>
          ))}
        </div>
      )}

      {enhanced?.ingredients && enhanced.ingredients.length > 0 ? (
        <>
          <Section title="Ingredients">
            <ul className="space-y-2">
              {enhanced.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8873A] mt-2 shrink-0" />
                  <span className="text-[#5C3D2E] text-sm">
                    <strong className="text-[#7B3F2B]">{ing.amount} {ing.unit}</strong> {ing.item}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Method">
            <ol className="space-y-4">
              {enhanced.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#7B3F2B] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {step.step_number}
                  </div>
                  <div>
                    <p className="text-[#2A1A0E] text-sm leading-relaxed">{step.instruction}</p>
                    {step.tip && (
                      <div className="mt-2 flex gap-2 bg-[#B8873A15] border-l-2 border-[#B8873A] rounded px-3 py-2">
                        <span className="text-[#B8873A]">💡</span>
                        <p className="text-xs text-[#5C3D2E] leading-relaxed">{step.tip}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {recipe.original_text && (
            <div className="mt-4">
              <button onClick={() => setShowOriginal(v => !v)}
                className="text-xs text-[#9B7B6A] hover:text-[#7B3F2B] transition-colors">
                {showOriginal ? '▲ Hide' : '▼ Show'} original recipe text
              </button>
              {showOriginal && (
                <div className="mt-2 bg-[#FBF6EE] rounded-xl p-4 border border-[#DDD0BE]">
                  <p className="text-xs text-[#5C3D2E] leading-relaxed whitespace-pre-wrap font-mono">{recipe.original_text}</p>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        /* User-submitted recipe without AI parsing */
        <Section title="Recipe">
          <div className="bg-[#FBF6EE] rounded-xl p-4 border border-[#DDD0BE]">
            <p className="text-sm text-[#5C3D2E] leading-relaxed whitespace-pre-wrap">{recipe.original_text}</p>
          </div>
        </Section>
      )}

      {/* Comments */}
      <Section title={`Comments (${comments.length})`}>
        {comments.length === 0 ? (
          <div className="text-center py-8 bg-[#FBF6EE] rounded-xl border border-[#DDD0BE]">
            <div className="text-3xl mb-2">💬</div>
            <p className="text-sm text-[#9B7B6A] italic">Be the first to comment</p>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            {comments.map((c: any, i) => (
              <div key={c.id ?? i} className="flex gap-3 bg-[#FBF6EE] rounded-xl p-3 border border-[#DDD0BE]">
                <div className="w-8 h-8 rounded-full bg-[#7B3F2B] text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {c.profiles?.username?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#7B3F2B]">{c.profiles?.username ?? 'Unknown'}</div>
                  <div className="text-sm text-[#2A1A0E] mt-0.5 leading-relaxed">{c.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comment form */}
        <form onSubmit={handleComment} className="bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] p-3 space-y-2">
          <input
            value={authorName} onChange={e => setAuthorName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 rounded-lg border border-[#DDD0BE] bg-[#F2E8D9] text-sm text-[#2A1A0E] placeholder:text-[#9B7B6A] focus:outline-none focus:border-[#B8873A]"
          />
          <div className="flex gap-2">
            <textarea
              value={commentText} onChange={e => setCommentText(e.target.value)}
              placeholder="Share your thoughts, tips, or questions…"
              rows={2}
              className="flex-1 px-3 py-2 rounded-lg border border-[#DDD0BE] bg-[#F2E8D9] text-sm text-[#2A1A0E] placeholder:text-[#9B7B6A] focus:outline-none focus:border-[#B8873A] resize-none"
            />
            <button type="submit" disabled={!commentText.trim()}
              className="w-10 h-10 self-end rounded-xl bg-[#7B3F2B] text-white flex items-center justify-center hover:bg-[#5C2D1E] transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg">
              ↑
            </button>
          </div>
        </form>
        <div ref={endRef} />
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-5 bg-[#B8873A] rounded" />
        <h2 className="font-serif text-xl font-bold text-[#2A1A0E]">{title}</h2>
      </div>
      {children}
    </div>
  )
}
