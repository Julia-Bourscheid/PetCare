create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  -- Hash scrypt no formato "<salt>:<hash>" (ver src/lib/password.ts).
  password text not null
);

create table if not exists sessions (
  token text primary key,
  user_id uuid not null references users (id) on delete cascade,
  expires_at timestamptz not null
);

create table if not exists pets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  name text not null,
  type text not null,
  breed text not null default '',
  age text not null default '',
  weight text not null default '',
  next_vaccine date,
  icon text not null default '🐾',
  description text not null default ''
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references pets (id) on delete cascade,
  title text not null,
  category text not null,
  date date not null,
  time time not null,
  notes text not null default '',
  completed boolean not null default false
);

create index if not exists sessions_user_id_idx on sessions (user_id);
create index if not exists pets_user_id_idx on pets (user_id);
create index if not exists appointments_pet_id_idx on appointments (pet_id);

-- A aplicação acessa o banco direto pelo dono das tabelas. Com RLS ligado e
-- sem políticas, a API REST pública do Supabase não consegue ler os dados.
alter table users enable row level security;
alter table sessions enable row level security;
alter table pets enable row level security;
alter table appointments enable row level security;
