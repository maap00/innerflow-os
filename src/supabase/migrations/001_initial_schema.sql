-- =============================================
-- INNERFLOW
-- Initial Database Schema
-- =============================================


-- =============================================
-- HABITS
-- =============================================

create table public.habits (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  name text not null,

  validation_type text not null
    check (
      validation_type in ('manual', 'time')
    ),

  category text,

  target_seconds integer,

  current_day integer not null default 0,

  stage integer not null default 1,

  total_days integer not null default 30,

  stage_config jsonb not null
    default '{"stage1":30,"stage2":30,"stage3":30}'::jsonb,

  streak integer not null default 0,

  milestones jsonb not null default '[]'::jsonb,

  last_completed_at timestamptz,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);


-- =============================================
-- SESSIONS
-- =============================================

create table public.sessions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  habit_id uuid not null
    references public.habits(id)
    on delete cascade,

  started_at timestamptz not null,

  ended_at timestamptz not null,

  duration_seconds integer not null default 0,

  is_valid boolean not null default true,

  created_at timestamptz not null default now()
);


-- =============================================
-- ACHIEVEMENTS
-- =============================================

create table public.achievements (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  achievement_id text not null,

  unlocked_at timestamptz not null default now(),

  created_at timestamptz not null default now(),

  unique(user_id, achievement_id)
);


-- =============================================
-- INDEXES
-- =============================================

create index habits_user_id_idx
on public.habits(user_id);

create index sessions_user_id_idx
on public.sessions(user_id);

create index sessions_habit_id_idx
on public.sessions(habit_id);

create index achievements_user_id_idx
on public.achievements(user_id);


-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

alter table public.habits
enable row level security;

alter table public.sessions
enable row level security;

alter table public.achievements
enable row level security;


-- =============================================
-- HABITS POLICIES
-- =============================================

create policy "Users can read own habits"
on public.habits
for select
to authenticated
using (
  (select auth.uid()) = user_id
);

create policy "Users can create own habits"
on public.habits
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
);

create policy "Users can update own habits"
on public.habits
for update
to authenticated
using (
  (select auth.uid()) = user_id
)
with check (
  (select auth.uid()) = user_id
);

create policy "Users can delete own habits"
on public.habits
for delete
to authenticated
using (
  (select auth.uid()) = user_id
);


-- =============================================
-- SESSIONS POLICIES
-- =============================================

create policy "Users can read own sessions"
on public.sessions
for select
to authenticated
using (
  (select auth.uid()) = user_id
);

create policy "Users can create own sessions"
on public.sessions
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
);

create policy "Users can update own sessions"
on public.sessions
for update
to authenticated
using (
  (select auth.uid()) = user_id
)
with check (
  (select auth.uid()) = user_id
);

create policy "Users can delete own sessions"
on public.sessions
for delete
to authenticated
using (
  (select auth.uid()) = user_id
);


-- =============================================
-- ACHIEVEMENTS POLICIES
-- =============================================

create policy "Users can read own achievements"
on public.achievements
for select
to authenticated
using (
  (select auth.uid()) = user_id
);

create policy "Users can create own achievements"
on public.achievements
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
);

create policy "Users can delete own achievements"
on public.achievements
for delete
to authenticated
using (
  (select auth.uid()) = user_id
);