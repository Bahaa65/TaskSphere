-- Schema and tables
create extension if not exists "uuid-ossp";

create type user_role as enum ('owner','admin','member');
create type member_role as enum ('admin','member');
create type task_status as enum ('todo','in_progress','review','done','blocked');
create type recommendation_status as enum ('pending','accepted','rejected');

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  avatar_url text,
  role user_role not null default 'member',
  skills jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  owner_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists team_members (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references teams(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role member_role not null default 'member',
  joined_at timestamptz not null default now(),
  unique(team_id, user_id)
);

create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references teams(id) on delete cascade,
  title text not null,
  description text,
  status task_status not null default 'todo',
  priority int not null default 3,
  skill_tags jsonb default '[]'::jsonb,
  estimated_hours float8 default 0,
  due_date timestamptz,
  created_by uuid not null references users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists assignments (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references tasks(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references users(id) on delete set null,
  workload_score float8 default 0
);

create table if not exists activity_logs (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references teams(id) on delete cascade,
  actor_id uuid references users(id) on delete set null,
  action text not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists recommendations (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references tasks(id) on delete cascade,
  suggested_user_ids jsonb default '[]'::jsonb,
  score_map jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  status recommendation_status not null default 'pending'
);

-- Indexes
create index if not exists idx_tasks_team on tasks(team_id);
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_tasks_due on tasks(due_date);
create index if not exists idx_assignments_task on assignments(task_id);
create index if not exists idx_assignments_user on assignments(user_id);

-- RLS policies
alter table users enable row level security;
alter table teams enable row level security;
alter table team_members enable row level security;
alter table tasks enable row level security;
alter table assignments enable row level security;
alter table activity_logs enable row level security;
alter table recommendations enable row level security;

-- Helper function: checks membership
create or replace function is_member(p_user uuid, p_team uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from team_members
    where user_id = p_user and team_id = p_team
  );
$$;

-- Teams: owner can read/write, members can read
create policy teams_owner_rw on teams
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- Team members: members of team read; owner/admin write
create policy team_members_read on team_members
  for select using (is_member(auth.uid(), team_id));
create policy team_members_admin_write on team_members
  for all using (
    exists (
      select 1 from teams t
      join team_members tm on tm.team_id = t.id and tm.user_id = auth.uid()
      where t.id = team_id and (t.owner_id = auth.uid() or tm.role = 'admin')
    )
  ) with check (
    exists (
      select 1 from teams t
      join team_members tm on tm.team_id = t.id and tm.user_id = auth.uid()
      where t.id = team_id and (t.owner_id = auth.uid() or tm.role = 'admin')
    )
  );

-- Tasks: members can read/write for their team
create policy tasks_rw on tasks for all using (is_member(auth.uid(), team_id)) with check (is_member(auth.uid(), team_id));

-- Assignments: members can read team assignments; admins/owner can insert
create policy assignments_read on assignments for select using (
  exists (select 1 from tasks t where t.id = task_id and is_member(auth.uid(), t.team_id))
);
create policy assignments_admin_write on assignments for insert with check (
  exists (
    select 1 from tasks t
    join team_members tm on tm.team_id = t.team_id and tm.user_id = auth.uid()
    where t.id = task_id and (tm.role = 'admin' or exists (select 1 from teams where id = t.team_id and owner_id = auth.uid()))
  )
);

-- Activity logs: members can read own team logs; write via server-side functions only
create policy activity_logs_read on activity_logs for select using (is_member(auth.uid(), team_id));
revoke insert on activity_logs from public;

-- Recommendations: members can read related task; insert/update via functions
create policy recommendations_read on recommendations for select using (
  exists (select 1 from tasks t where t.id = task_id and is_member(auth.uid(), t.team_id))
);
revoke insert, update on recommendations from public;


