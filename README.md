# Yeti Jobs:
- Full stack Job Portal Connectina  job sekker to the recruiter with the smart search with build with pern stack sclable job posting resume analysis, real time application managment.



## Overview:
- The Project is a job Portal Platform With All of the Features that needs to build the job portal platofnr, such as all the crud operation, roll back access controll, jobs, companies, apply, withdraw create job, create a new company, admin controler and a cron queue.
- The Project can be build as a production level project with some minor things to do.



## DEmo Url:
https://vercel.com
https://render.com/project/api/v1


## Features:
1. Users:
  - Apply/Withdraw Job, Add/Bookmark
  - Search Jobs
  - Edit Profile And Other Credentials
  - Add a Resume, Profile Picture
  - See All Applied jobs
  - All Companies List
  - Individual Company jobs and Description About Company
  - view Job

2. Employees:
  - Company Dashboard
  - All Applicants
  - See All Jobs
  - See All employees
  - See Profile
  - Create/Delete/Edit a Job
  - Change a Applicant STatus
  - Update Company
  - All followrrs Company
  -

3. Admin:
   - Assign User to companies.
   - edit/delete/create/update Company
  - Company Entire Overview dashboard
  
4. Common:
  - Login
  - Signup
  - Verify Email
  - Reset Password
5. Authenticatoin:
  - JWT
  - Roll Back Access Control


## Tech Stack:
Frontend:
React
TailwindCSS

Backend:
Node.js/Express

Database:
PostgresSQL

Devops:
Docker


## Architecture Overview:
- The Project is buld on the top of the PERN-stack based with teh layered architececturedw where i've used a reacct for the ui staate and Node/Express for backend (API, auth Logic), PostgreSQL (data logic)
- with Rest api connect layers, jwt for the auth and modular services fo the handler jobs, applicatoins, companies, resume parsing, profile picture uploadtion.


## Folder STructure
### Backend:
  -- app.js
  ---  controllers
  ---  Middlewars
  ---  Models
  ---  routes
  ---  services
  ---  utils
### Frontend:
  -- app.jsx
  --- api
  --- assets
  --- auth
  --- components
  --- context
  --- Data
  --- hooks
  --- lib
  --- pages
  --- services
