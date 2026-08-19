alter table leads add column if not exists meeting_at timestamptz;

create index if not exists leads_meeting_at_idx on leads (meeting_at);
