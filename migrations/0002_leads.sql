create table if not exists leads (
  id text primary key,
  name text not null,
  email text not null,
  company text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);
