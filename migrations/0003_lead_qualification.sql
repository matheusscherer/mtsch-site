alter table leads add column if not exists score integer not null default 0;
alter table leads add column if not exists temperature text not null default 'frio';
alter table leads add column if not exists reason text not null default '';
alter table leads add column if not exists next_action text not null default '';

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_temperature_idx on leads (temperature);
