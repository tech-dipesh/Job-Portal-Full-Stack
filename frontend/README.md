# Frontend Project:
- the proejct is started on: 2026/02/26


## frontend projects:
- when using teh children property i must use the: `outlet` on the app.
- as it's another concnetp that i''ve learn is for accessing a .env content i must start with: `vite` then i only can access a vite cotnte. with also must be the: `VITE` capital
- i make sreut that it only rerender when the jobid is changed.
- now i've change on the backend of validate a uid.
- now i also start for login signup flow.
- get method doesn't send anything on the body so for login i've to make the post rotues.
- i make sure that with: `withCredentiasls` store the token from the backend.
- i've also setup all teh signup feature here.

- i make sure to create a new separate page for each data validation on the frontend.
- the one major issue that i'm sendina  requeest to the: `login instead of verify`  

- axiosi instance that i'll be usin ght `services` fodler.



<!-- all backend route -->:
- applications: `lists, id/apply, id/withdraw, `
- companies: `/, id/dashbaord, id/employees, id/jobs, id/applications, id: get company all, id: post new company, / delete company, /id put new company`
- jobs: `saved_jobs/list, id/bookmark_job, id/remove_from_bookmar, /: all listing, /search, id/ particular listing jobs, id: new jobs, id/ deelete, /id update`
- users: `/logout, /login, /signup, /: all user, /:id individual user details, /skills add the user skills, /id, delete a user, /put, update user, /patch, update particular list, /forget-password, /forget-password-verify, /verify, /verify/resend, /upload-resume, /upload-profile-picture`

## Libraries Used:
1. axios: for data fetching:
2. tailwindcss: for styling