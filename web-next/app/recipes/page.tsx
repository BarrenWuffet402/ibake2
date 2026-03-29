'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SAMPLE_RECIPES } from '@/data/seedData'
import type { Recipe } from '@/lib/types'
import PageHeader from '@/components/PageHeader'
import { getLocalRecipes, getLikes, setLike } from '@/lib/localStore'

export default function RecipesPage() {
  const [localRecipes, setLocalRecipes] = useState<Recipe[]>([])
  const [likes, setLikes] = useState<Record<string, number>>({})

  useEffect(() => {
    setLocalRecipes(getLocalRecipes())
    setLikes(getLikes())
  }, [])

  const seed = SAMPLE_RECIPES as unknown as Recipe[]
  const all  = [...localRecipes, ...seed]

  function handleLike(id: string, current: number) {
    const next = current + 1
    setLike(id, next)
    setLikes(prev => ({ ...prev, [id]: next }))
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Community Recipes"
        subtitle="Crafted & shared by bakers"
        ornament="✦ Discover"
        right={
          <Link href="/recipes/submit"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7B3F2B] text-white text-xs font-semibold hover:bg-[#5C2D1E] transition-colors">
            + Share Recipe
          </Link>
        }
      />
      <div className="flex-1 overflow-y-auto p-4">
        {localRecipes.length > 0 && (
          <>
            <SectionDivider label="Your Recipes" />
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mb-4">
              {localRecipes.map(r => (
                <RecipeCard key={r.id} recipe={r} likeOverride={likes[r.id]} onLike={handleLike} />
              ))}
            </div>
          </>
        )}

        <SectionDivider label="Featured Recipe" />
        <RecipeCard recipe={seed[0]} featured likeOverride={likes[seed[0].id]} onLike={handleLike} />

        <SectionDivider label="Community Recipes" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {seed.slice(1).map(r => (
            <RecipeCard key={r.id} recipe={r} likeOverride={likes[r.id]} onLike={handleLike} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-[#B8873A] opacity-30" />
      <span className="text-xs font-bold tracking-widest uppercase text-[#7B3F2B]">{label}</span>
      <div className="flex-1 h-px bg-[#B8873A] opacity-30" />
    </div>
  )
}

function RecipeCard({ recipe, featured = false, likeOverride, onLike }: {
  recipe: Recipe; featured?: boolean
  likeOverride?: number; onLike: (id: string, current: number) => void
}) {
  const enhanced = recipe.enhanced_json
  const photo    = recipe.photo_urls?.[0]
  const count    = likeOverride ?? recipe.likes_count
  const isLocal  = recipe.id.startsWith('local-')

  return (
    <div className={`bg-[#FBF6EE] rounded-xl border border-[#DDD0BE] overflow-hidden hover:border-[#B8873A] hover:shadow-md transition-all group ${featured ? 'mb-4' : ''}`}>
      <Link href={`/recipes/${recipe.id}`} className="block">
        {photo ? (
          <div className={`relative overflow-hidden ${featured ? 'h-52' : 'h-36'}`}>
            <img src={photo} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7B3F2B88] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="text-white font-serif font-bold text-base leading-tight drop-shadow">{recipe.title}</div>
              <div className="text-white/80 text-xs mt-0.5">by {recipe.profiles?.username ?? 'Unknown'}</div>
            </div>
          </div>
        ) : (
          <div className={`flex items-center justify-center bg-[#EAD9C4] ${featured ? 'h-40' : 'h-24'}`}>
            <span className="text-5xl">{featured ? '🍞' : '🌾'}</span>
          </div>
        )}

        <div className="p-3">
          {!photo && (
            <div className="font-serif font-bold text-[#7B3F2B] text-base mb-1 leading-tight">{recipe.title}</div>
          )}
          {enhanced?.description && (
            <p className="text-[#5C3D2E] text-xs leading-relaxed line-clamp-2">{enhanced.description}</p>
          )}
          {enhanced?.tags && enhanced.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {enhanced.tags.slice(0, 3).map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-[#7B3F2B15] text-[#7B3F2B] font-semibold">{t}</span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-center justify-between px-3 pb-3 pt-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#9B7B6A] italic">by {recipe.profiles?.username ?? 'Unknown'}</span>
          {isLocal && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4A674115] text-[#4A6741] font-bold border border-[#4A674130]">yours</span>}
        </div>
        <button
          onClick={() => onLike(recipe.id, count)}
          className="flex items-center gap-1 text-[#B87469] hover:scale-110 transition-transform active:scale-95">
          <span className="text-sm">♥</span>
          <span className="text-xs font-bold">{count}</span>
        </button>
      </div>
    </div>
  )
}
