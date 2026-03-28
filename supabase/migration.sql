-- Users profile (extends Supabase auth.users)
create table if not exists profiles (
  id uuid references auth.users primary key,
  username text unique not null,
  avatar_url text,
  location_lat float,
  location_lng float,
  created_at timestamptz default now()
);

-- Sourdough starters
create table if not exists starters (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id),
  name text not null,
  age_days int,
  hydration_pct int,
  description text,
  photo_url text,
  location_lat float not null,
  location_lng float not null,
  is_available boolean default true,
  created_at timestamptz default now()
);

-- Sharing requests
create table if not exists sharing_requests (
  id uuid primary key default gen_random_uuid(),
  starter_id uuid references starters(id),
  requester_id uuid references profiles(id),
  owner_id uuid references profiles(id),
  status text default 'pending',
  created_at timestamptz default now()
);

-- Family tree
create table if not exists starter_lineage (
  id uuid primary key default gen_random_uuid(),
  parent_starter_id uuid references starters(id),
  child_starter_id uuid references starters(id),
  shared_by uuid references profiles(id),
  shared_to uuid references profiles(id),
  shared_at timestamptz default now()
);

-- Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references sharing_requests(id),
  sender_id uuid references profiles(id),
  content text not null,
  created_at timestamptz default now()
);

-- Recipes
create table if not exists recipes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id),
  title text not null,
  original_text text,
  enhanced_json jsonb,
  photo_urls text[],
  likes_count int default 0,
  created_at timestamptz default now()
);

-- Recipe comments
create table if not exists recipe_comments (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid references recipes(id),
  author_id uuid references profiles(id),
  content text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table starters enable row level security;
alter table sharing_requests enable row level security;
alter table starter_lineage enable row level security;
alter table messages enable row level security;
alter table recipes enable row level security;
alter table recipe_comments enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Starters policies
create policy "Starters are viewable by everyone" on starters for select using (true);
create policy "Users can insert own starters" on starters for insert with check (auth.uid() = owner_id);
create policy "Users can update own starters" on starters for update using (auth.uid() = owner_id);

-- Sharing requests policies
create policy "Users can view own requests" on sharing_requests for select using (auth.uid() = requester_id or auth.uid() = owner_id);
create policy "Users can create requests" on sharing_requests for insert with check (auth.uid() = requester_id);
create policy "Owners can update requests" on sharing_requests for update using (auth.uid() = owner_id or auth.uid() = requester_id);

-- Lineage policies
create policy "Lineage viewable by everyone" on starter_lineage for select using (true);
create policy "Users can insert lineage" on starter_lineage for insert with check (auth.uid() = shared_by);

-- Messages policies
create policy "Chat participants can view messages" on messages for select using (
  auth.uid() in (
    select requester_id from sharing_requests where id = request_id
    union
    select owner_id from sharing_requests where id = request_id
  )
);
create policy "Chat participants can send messages" on messages for insert with check (
  auth.uid() = sender_id and auth.uid() in (
    select requester_id from sharing_requests where id = request_id
    union
    select owner_id from sharing_requests where id = request_id
  )
);

-- Recipes policies
create policy "Recipes viewable by everyone" on recipes for select using (true);
create policy "Users can insert own recipes" on recipes for insert with check (auth.uid() = author_id);
create policy "Users can update own recipes" on recipes for update using (auth.uid() = author_id);
create policy "Anyone can increment likes" on recipes for update using (true) with check (true);

-- Recipe comments policies
create policy "Comments viewable by everyone" on recipe_comments for select using (true);
create policy "Users can insert own comments" on recipe_comments for insert with check (auth.uid() = author_id);

-- Storage buckets (run in Supabase dashboard Storage section or via API)
-- insert into storage.buckets (id, name, public) values ('starter-photos', 'starter-photos', true);
-- insert into storage.buckets (id, name, public) values ('recipe-photos', 'recipe-photos', true);
