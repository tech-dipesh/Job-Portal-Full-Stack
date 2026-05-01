-- Job Indices
create index if not exists index_jobs_search_title on jobs using gin (search_title);
create index if not exists idx_jobs_company_id on jobs(company_id);
create index if not exists idx_jobs_created_by on jobs(created_by);
create index if not exists idx_jobs_is_open on jobs(is_job_open);

-- Users Indices

create index if not exists idx_users_email on users using btree (email);

-- Companies Indices
create index if not exists idx_companies_name on companies using btree (name);
create unique index if not exists unique_user_companies on user_companies_follows using btree (user_id, company_id);
create index if not exists idx_jobs_company_open on jobs(company_id, is_job_open);

-- Application Indices
create index if not exists idx_applications_user_id on applications(user_id);
create index if not exists idx_applications_job_id on applications(job_id);
create index if not exists idx_applications_status on applications(status);


-- saved_jobs Indices
create index if not exists idx_saved_jobs_user_id on saved_jobs(user_id);
create index if not exists idx_saved_jobs_job_id on saved_jobs(job_id);


-- Mine Minor Indices:
create index if not exists idx_verified_code_user_id on email_verified using btree(user_id);
create index if not exists idx_verified_code_user_id on email_verified(verified_code);
create index if not exists idx_user_educations_user_id on user_educations(user_id);
create index if not exists idx_ats_scores_user_id on ats_scores(user_id);






-- More
create unique index if not exists applications_pkey on applications using btree (uid)
create unique index if not exists ats_score_pkey on ats_scores using btree (uid)
create unique index if not exists companies_pkey on companies using btree (uid)
create unique index if not exists email_verified_pkey on email_verified using btree (uid)
create index if not exists idx_verified_code on email_verified using btree (verified_code)
create unique index if not exists jobs_pkey on jobs using btree (uid)
create index if not exists idx_saved_jobs_job_id on saved_jobs using btree (job_id)
create unique index if not exists saved_jobs_pkey on saved_jobs using btree (uid)
create unique index if not exists user_companies_follows_pkey on user_companies_follows using btree (uid)
create unique index if not exists user_educations_pkey on user_educations using btree (uid)
create unique index if not exists users_pkey on users using btree (uid)

-- Comments
COMMENT on table jobs is 'Jobs in Small List';