export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  location_lat?: number;
  location_lng?: number;
  created_at: string;
}

export interface Starter {
  id: string;
  owner_id: string;
  name: string;
  age_days?: number;
  hydration_pct?: number;
  description?: string;
  photo_url?: string;
  location_lat: number;
  location_lng: number;
  is_available: boolean;
  created_at: string;
  profiles?: Profile;
  distance?: number;
}

export interface SharingRequest {
  id: string;
  starter_id: string;
  requester_id: string;
  owner_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  starters?: Starter;
  requester?: Profile;
  owner?: Profile;
}

export interface StarterLineage {
  id: string;
  parent_starter_id: string;
  child_starter_id: string;
  shared_by: string;
  shared_to: string;
  shared_at: string;
  parent_starter?: Starter;
  child_starter?: Starter;
}

export interface Message {
  id: string;
  request_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender?: Profile;
}

export interface Ingredient {
  amount: string;
  unit: string;
  item: string;
}

export interface RecipeStep {
  step_number: number;
  instruction: string;
  tip?: string;
}

export interface EnhancedRecipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  tags: string[];
}

export interface Recipe {
  id: string;
  author_id: string;
  title: string;
  original_text?: string;
  enhanced_json?: EnhancedRecipe;
  photo_urls?: string[];
  likes_count: number;
  created_at: string;
  profiles?: Profile;
}

export interface RecipeComment {
  id: string;
  recipe_id: string;
  author_id: string;
  content: string;
  created_at: string;
  profiles?: Profile;
}
