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


- as i've make a function for execute a query a commong function
- now i've make commong lboal error handler to handle all these things


- the another things to convert into a number from String is: `Number(value)` convert to the string
- parse to the safe 
- i've implement on both 2 data about the data validation from the zod.
- Now i'm salting and hashing a password

- we've setup the cookie with the httpOnly, and the value for storing a user whehter user is logged in or not.

- as we've setup the cookie but it's on the space format not on the correct format we've to use: `cookie-parser` for getting a cookie on the key value pair

- now companies have a separate table.


- Now i've make entier jwt authetnication only user have access who've logged in.


- we must and should use a jwt route on the cookies which header is not secure.
- i've undestood that i don't need to send a uid on my own way that token will handle everything of the jwt.



- for getting the Object key's: `Object.keys` now for getting a Values: `Object.values(obj)`
- i've make teh routes for patch udpat only necessary fileds update baed on the user input.
- we shouldn't store a lot of values on the array.




- on the zod schema, i've to make sure if regex exist, i can't add a required method.
- also for the min and max value i've to est the nuber to number.





- sample data: 
```js
  {
  "fname": "admin",
  "lname": "admin",
  "password": "Admin@123",
  "education": "Undergraduation",
  "email": "admin@gmail.com"
}
```



- i've make sure that each users have the company_id that connect a foreign ke to the companies by default it can be the null value
- also make sure i add the created_at company when they created 


- for making a better i've move my routes to the controller, with the better scalablity 
- i've add the feature of the created_by which i make relation to the users table;

- now on the jwt query i to send a both company you belong to and also the your uid to track on my database


- also the feature of thw only user allowed who own that id.
- for catching all the routes we can use:  `app.all() or app.get("*")` but better approach is: `app.use()` at last which handle every routes that doesn't match
- i've also add a global error handler which catch the error handler if not catch by any other routes.
- the common function of entire table fetch i've make a eachTablefetch.js on the srvices folder and use everywhere i'm tring to fetch a data from the table


- i've used a json webtoken on the: 2026/02/20 which on the json web token i'm sign a list such as: `user_type whether guest or the admin, and the userid, company_id if exist.
- i've used a mvc model which move wll the model to the database to models fodler which zod is vaidatoin our databas, routes mean v which all routes connect controller all the bussienss logic, also i've make a services folder that are commonly used such as eachTable Fetch,
and i've also create a middlewar with different use case.
- also teh db.js for connecting our database.


## Total api endpoints:
- users: `delete, getAll, getlogin, getParticular, patch, postSignup, put`
- companies: `delete, get, post, put`
- listings/jobs: ` deleteListingController, getAllListingController, getListingController, postListingController, putListingController`

- every list have must have user should be authenticated  and also the authorized for addding a companies only adming can add the companies,, 


- i've make the my `listings.routes.js` to `jobs.routes.js` to make the more relatable..


## applications List:
- created the application database where it've user_id, job_id, status, applied at, with status is enum.
- now i've multiple endpoints for the application such as, allist only admin allow, apply and the withdraw list,
- now i've make the models for verify a datas.
- which i've make all the routes now i want to show a list to the company that how many have they applied to their jobs.


- i'm planning to make`: `route.get` to giving a relelvent name let's see how it goes.


- which i've faced on problme of if user is upda status it creating a new data rather than updating which i've check with condition and update it.
- i've make my controller code to separate fro teh routrer.

- also make sure only owner can view and eidt the request.



- i've to use a dotenv for importing a file, and use it here.
## Upload Resume:
- now i will make the system where user can upload there resume
- with we've to send a form with the: `multipart/form-data`
- during file send we must send with same file name to avoid a error else it'll throw a `unexpected error`
2026/02/23
- now i've change my mind to use the supabase:
  - with the multer: `storage: multer.memoryStorage()`
  which saving the upload fiel on the disk, and send to our server, when it send request it finished.
  - also i use: `file.buffer` for actual file content in the bytes  with raw data.
    - aslo make sure to use: `content-type: `application/pdf` on bucket
  - also make sure to use a same name: `resume` for uploaind a file else it'll throw a unexpected error.
  - we can access `file` that can have input format with can access from: `req.file`
>:warning: we've to enable on the supabase for enable a all file upload with: `create policy "policy_name" ON storage.objects for insert with check (true);`
## access File:
  - for access fiel we can use: `supabase.storage.from('bucketname').getPublicUrl(pathurl)`

### database integration file upload:
- now i've also add one col of the resume url on users table
- which the url will store on the users table that we send.
- with make sure: `isAuthMiddlewaer` for only logged in user can upload a resume
- with now first i'm checking whether already have pdf or if pdf exist i must have to delete that user for overload our database usage
>:fire: the problem that i facing is unable to get the list from a supabase which is a access problem no error throw for that the solution is: 
``` sql 
CREATE POLICY "Allow all" ON storage.objects
FOR ALL TO public USING (bucket_id = 'resume') WITH CHECK (bucket_id = 'resume');
``` 
for allow all teh credentiants now work.
 

>:white_check_mark: when i change my json secret key i must have to again login first.
  - also one mistake that i've done is during sign i hardcorded a sign value which is causign a problem.

### Profile Picture Upload:
- now i've make my same logic of resume to profile picture upload.
- with same logic just change the bucket



## Pagination:
- i've used the logic of both page limit with offset with the page number for not the large query.


## Search Query:
- for search a query i'm trying to use a ts_vector with better searching way:
- with first have to add a tsvector column and have to populate existing content and create a index and every time when something update it must be automatically change.
- with type to: ` ALTER TABLE jobs add COLUMN search_title tsvector;` with tsvector 
>:fire: for existing content update with: `set search_title=to_tsvector('english', title)`

- now we'lll add the index for make a scalable system with:
  - we use called the gin index system:
  - ` create INDEX index_jobs_search_title on jobs using gin (search_title)`
  - we must have to create the trigger with must be the function on the postgres:
  - the function is:
    - `create function title_search_function_update() returns trigger as $$ begin new.search_title:=to_tsvector('english', new.title) return new; $$ language plppgsql`
  - Now i've to create trigger to run every time:
    - ` create trigger full_text_search_trigger before insert or update on jobs for each row execute function title_search_function_update()`
  - the Query we've to do with: `select * from jobs where search_title @@ to_tsquery('developer')`

## ts_vector understanding on the postgres:
  - **`tsvector`** — like it search a any term with the index version
  - tsquery common term are:
    -  `to_tsname('help')` exact match
    - `to_tsname('help:*')`: prefix match anything start with 'help'
    - `to_tsname('help & right')` - both must exist
    - `to_tsname('help | right')` one exist
  - which: `@@` is match operator between: `tsvector and tsquery`

- i can directly add a query like this: `($1:*)` which is not valid instead: `($1), ['${title};*']` for text searching

>:warning: the problem that i've faced is for searching it's not able to iplement a validation.
