-- Migration 002: Push tokens and accept-sharing RPC

-- Add push_token to profiles for push notifications
alter table profiles add column if not exists push_token text;

-- Allow owners to create starters on behalf of recipients (for the auto-share flow)
drop policy if exists "Users can insert own starters" on starters;
create policy "Users can insert own starters or on behalf of requester" on starters
  for insert with check (
    auth.uid() = owner_id
    or exists (
      select 1 from sharing_requests sr
      where sr.owner_id = auth.uid()
        and sr.requester_id = starters.owner_id
        and sr.status = 'accepted'
    )
  );

-- Allow both shared_by and shared_to to insert lineage records
drop policy if exists "Users can insert lineage" on starter_lineage;
create policy "Participants can insert lineage" on starter_lineage
  for insert with check (
    auth.uid() = shared_by or auth.uid() = shared_to
  );

-- RPC: accept a sharing request — updates status, creates child starter and lineage
-- Uses SECURITY DEFINER to bypass RLS for cross-user starter creation
create or replace function accept_sharing_request(p_request_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_req sharing_requests;
  v_parent starters;
  v_requester_profile profiles;
  v_child_id uuid;
begin
  -- Load and validate request
  select * into v_req from sharing_requests where id = p_request_id;
  if not found then
    raise exception 'Request not found';
  end if;
  if v_req.owner_id != auth.uid() then
    raise exception 'Not authorized — only the owner can accept';
  end if;
  if v_req.status != 'pending' then
    raise exception 'Request is not pending';
  end if;

  -- Accept the request
  update sharing_requests set status = 'accepted' where id = p_request_id;

  -- Load parent starter
  select * into v_parent from starters where id = v_req.starter_id;

  -- Load requester profile for location fallback
  select * into v_requester_profile from profiles where id = v_req.requester_id;

  -- Create child starter for the requester
  insert into starters (
    owner_id, name, age_days, hydration_pct, description, photo_url,
    location_lat, location_lng, is_available
  ) values (
    v_req.requester_id,
    v_parent.name,
    0,
    v_parent.hydration_pct,
    v_parent.description,
    v_parent.photo_url,
    coalesce(v_requester_profile.location_lat, v_parent.location_lat),
    coalesce(v_requester_profile.location_lng, v_parent.location_lng),
    false
  )
  returning id into v_child_id;

  -- Create lineage record
  insert into starter_lineage (parent_starter_id, child_starter_id, shared_by, shared_to)
  values (v_parent.id, v_child_id, v_req.owner_id, v_req.requester_id);
end;
$$;

-- Grant execute to authenticated users
grant execute on function accept_sharing_request(uuid) to authenticated;
