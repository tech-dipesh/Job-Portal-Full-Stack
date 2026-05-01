-- Table Definition
create TABLE if not exists ats_scores (
    uid uuid not null default gen_random_uuid(),
    user_id uuid,
    created_at timestamptz default CURRENT_TIMESTAMP,
    score int4,
    feedback jsonb,
    constraint ats_scores_user_id_fkey foreign key (user_id) references users(uid) on delete cascade,
    primary key (uid)
);