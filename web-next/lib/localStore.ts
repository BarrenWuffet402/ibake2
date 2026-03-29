// Simple localStorage persistence for demo mode
import type { Recipe, RecipeComment } from './types'

const RECIPES_KEY = 'ibake_recipes'
const COMMENTS_KEY = 'ibake_comments'
const USERNAME_KEY = 'ibake_username'

export function getUsername(): string {
  if (typeof window === 'undefined') return 'Anonymous'
  return localStorage.getItem(USERNAME_KEY) ?? ''
}
export function setUsername(name: string) {
  localStorage.setItem(USERNAME_KEY, name)
}

export function getLocalRecipes(): Recipe[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(RECIPES_KEY) ?? '[]') } catch { return [] }
}
export function saveRecipe(recipe: Recipe) {
  const all = getLocalRecipes()
  localStorage.setItem(RECIPES_KEY, JSON.stringify([recipe, ...all]))
}

export function getLocalComments(recipeId: string): RecipeComment[] {
  if (typeof window === 'undefined') return []
  try {
    const all = JSON.parse(localStorage.getItem(COMMENTS_KEY) ?? '{}')
    return all[recipeId] ?? []
  } catch { return [] }
}
export function saveComment(comment: RecipeComment) {
  if (typeof window === 'undefined') return
  try {
    const all = JSON.parse(localStorage.getItem(COMMENTS_KEY) ?? '{}')
    all[comment.recipe_id] = [...(all[comment.recipe_id] ?? []), comment]
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all))
  } catch {}
}

export function getLikes(): Record<string, number> {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem('ibake_likes') ?? '{}') } catch { return {} }
}
export function setLike(recipeId: string, count: number) {
  const all = getLikes()
  localStorage.setItem('ibake_likes', JSON.stringify({ ...all, [recipeId]: count }))
}
