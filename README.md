# Job Portal project:
## Project Started: 2026/Feb/19i
- Phase 1:
  Backend:

## Project Timeline:
- Basic Routing Setup
- Connecting to the database.
- `gen_random_uuid()` for generate a unique id.
- for define a enum we've to wrap name to single quotes like this: `create type location_type_option as enum ('Remote', 'Onsite', 'Hybrid');`
- add the location type: `alter table jobs add column job_type location_type_option;`
- adding a constraing with alter: `ALTER TABLE jobs ALTER COLUMN job_type SET DEFAULT 'Onsite';`
- remove a commnad wher null: `delete from jobs where job_type is Null;`
- for add a constraitn with name: `ALTER TABLE jobs ADD COLUMN company_name TEXT NOT NULL DEFAULT 'Unknown';`
- showing the tables: `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
- `create type is_job_open as enum ('active', 'closed'); alter table jobs add column job_status is_job_open not null default 'active';` for create a enum and add on is job_open
- change the table name: `ALTER TABLE "public"."jobs" RENAME COLUMN "job_status" TO "is_job_open";`
- All 4 crud operation.

- move `listings` route to `jobs` route.
- i've improve d the validation with rowCount.
- Also now i've try to impemtn the login for testing whether it match or not.



### Created Table Of Users:
- i've also addd a user email which i've not done previously.
- now i've added the email and the password with also teh role what the user is basicallly is user type is.
