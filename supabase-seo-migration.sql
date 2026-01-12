-- SEO + blog quality guardrails for STRUCTURE
-- Run this in Supabase SQL editor on your production project (and staging if applicable).

-- 1) Post-level indexing controls and canonicalization
alter table if exists public.posts
  add column if not exists noindex boolean not null default false;

alter table if exists public.posts
  add column if not exists canonical_url text;

-- Optional: explicitly attach a post to a pillar (use the pillar route slug)
alter table if exists public.posts
  add column if not exists pillar_slug text;

-- Optional: editorial workflow flags
alter table if exists public.posts
  add column if not exists editorial_reviewed boolean not null default false;

alter table if exists public.posts
  add column if not exists ai_assisted boolean not null default true;

-- Optional: dedicated SEO fields (so titles/descriptions can be tuned per post)
alter table if exists public.posts
  add column if not exists seo_title text;

alter table if exists public.posts
  add column if not exists seo_description text;

-- 2) Helpful indexes for SEO crawling/perf
create index if not exists posts_published_created_at_idx
  on public.posts (published, created_at desc);

create index if not exists posts_published_slug_idx
  on public.posts (slug)
  where published = true;

create index if not exists posts_noindex_idx
  on public.posts (noindex)
  where noindex = true;

-- 3) Suggested defaults for existing content (safe, adjust as needed)
-- Mark syndicated content noindex if external_url is present (prevents duplicate-index risk).
update public.posts
set noindex = true
where external_url is not null
  and external_url <> ''
  and coalesce(noindex, false) = false;


