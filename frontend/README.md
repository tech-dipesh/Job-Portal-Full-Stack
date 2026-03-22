## Frontend Project:
- The project started on: **2026/02/26**

### Frontend Setup:
- When using the children property, I must use the `Outlet` component in App.
- Another concept I learned: to access `.env` content, it must start with `VITE` (capitalized).
- I made sure it only re-renders when the job ID changes.
- I started implementing the login/signup flow.
- GET methods don't send a body, so for login I used POST routes.
- I used `withCredentials` to store the token from the backend.
- I set up all signup features.
- One major issue: I was sending a request to `login` instead of `verify`.

- I used an Axios instance in the `services` folder.
- I created all user-related API routes.
- I moved App.jsx homepage content to another page.
- Created separate pages like profile picture upload.
- Added user skills setup.

---

## Backend Routes:
- **Applications:** list, `/:id/apply`, `/:id/withdraw`
- **Companies:** `/:id/dashboard`, `/:id/employees`, `/:id/jobs`, `/:id/applications`, `/:id` (GET, POST, DELETE, PUT)
- **Jobs:** saved jobs list, `/:id/bookmark`, `/:id/remove-bookmark`, all listings, search, single job, create, delete, update
- **Users:** logout, login, signup, all users, individual user, add skills, delete user, update user, patch, forget-password, forget-password-verify, verify, resend-verify, upload-resume, upload-profile-picture

---

## 2026/02/28:
- Created a `lib` folder with an Axios instance to use everywhere.
- Created custom `useFetchData` hook for Axios.
- Used `AbortController` to cancel requests.
  - Pass `{ signal: controller.signal }` to request.
  - Check with `!axios.isCancel(error)` for cleanup.
- For IIFE functions, used `;` to separate.

---

## 02/29:
- For page navigation backward: `navigate(-1)`
- For resume upload, sent content via `FormData` (Axios didn't handle it properly initially).
- On the API, had to wrap in object to avoid errors.
- After creating resume upload, I added a link tag.

- Used custom hooks for both each job and all jobs.
- Fixed minor spelling error: `bookmars` → `bookmarks`.

- Added `isUserLoggedIn` and `isOwner` middleware.
- **Note:** Should not set initial values directly; use `useEffect` to avoid too many re-renders.
- Used spread operator `...` to receive data properly.
- Implemented update job with skills feature.
- Implemented delete and new job features.

---

## Input Component:
- If sending as group, I included name prop; otherwise omitted.
- Implemented debounce/throttle.
- In React 19, don't need `Auth.Provider` — directly use `Auth`.

- Navigation logic: track where user left off to return later.
- Used custom hook with useContext (for auth data fetching).
- Added all 4 application features: apply, withdraw, see all applications.

---

## Login System:
- Better approach: store output data but can't update instantly; redirect to homepage and refresh.

- Used Link and iframe for resume and profile photo upload.
- For company dashboard, removed explicit ID — direct navigation.

---

## Election Day:
- Added FontAwesome icons with `@fortawesome/react-fontawesome` and `@fortawesome/free-solid-svg-icons`.
- Added 2 extra fields for companies: location and founded_year.
- Added loading feature across all pages.
- Altered PostgreSQL table: added `recruiter` role type.

---

## More:
- For text truncation: used `line-clamp-2`.
- Added pagination and debounce for search.
- Implemented `assignUserToCompanies` with 3 API interactions.
- Added middleware for route protection: `isAdmin`, `isOwner`, `isLoggedInUser`.
- Basic responsive design — mobile-friendly.

- Next features planned:
  1. Company can change applicant status
  2. Socket.io for real-time notifications

- Added route for admin dashboard.

---

## Card Styling:
```html
<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <div class="rounded-lg bg-slate-700 p-6">
    <h2 class="mb-2 text-xl font-semibold text-gray-800">Value</h2>
  </div>
</div>
```

- `mx-auto` or `self-center` centers content in flex.
- Confirmation dialog: `fixed inset-0 top-0 flex`.

---

## UI Upgrades:
- Role `recruiter` must have `company_id` not null.
- Improved UI for all owned jobs.
- Centered dashboard content.
- Applicant list navigation fixed.
- Header shows correct options based on role.
- Added "Go Back" button to dashboard pages.
- Applicant status update implemented.
- Responsive applications page.
- Fixed company employees page and empty components.
- Added missing fields: experience years, job type in new job form.
- New job form has complete UI.
- All applied jobs page: improved top bar, empty component.
- Added admin icons from react-icons.
- Fixed card width from `w-82` to `w-full` to respect grid gaps.
- Profile popup closes when clicking Homepage or profile.
- Fixed login/signup buttons when user not logged in.
- Fixed spelling error: `jaon` → `json`.
- Empty components now responsive for mobile.
- Added pagination with limit and offset.
- Added back button on reset password page.
- Improved each jobs page UI.
- Apply/withdraw logic fully working.
- Implemented user search with better UI.
- Added portal for new skill popup.
- Profile page now shows email, skills popup, education.
- Used `revokeObjectURL` for image cleanup.
- Fixed minor link errors on resume/profile.
- Fixed signup page missing name field.
- Removed problematic trigger that auto-set recruiter.
- Fixed header to show appropriate options for unverified users.
- Added route protection: only recruiters can visit employee pages.
- New company form made responsive.
- Edit company UI improved.
- Added confirmation popup for delete actions.
- Added verified/unverified status in header.
- Fixed skills overflow on all users page.
- Added toast messages for all errors/successes.
- Auto-focus on search input.
- Load more/less on job description fixed.
- Fixed applicant list link to correct ID.
- Added missing "Visit Company" page link.
- Fixed input layout on companies page.
- Added `expired_at` to client side.
- Conditional check for `isEmployee`.
- Followers shown only for users, not companies.
- Fixed hard refresh on application status update.
- Added dollar sign for salary.
- Added modal for job application.
- Added share feature for companies.
- Redirect user after login back to original page.
- Fixed 204 status on withdraw (no data response).
- Added new logo created in Canva.

---

## Portal:
- For popup positioning issues, used Portal.
- Steps: `createPortal(<div/>, document.getElementById("portal"))`
- HTML: `<div id="portal"></div>`

---

## More Features:
- For profile picture: used `URL.revokeObjectURL` to clean old image, `URL.createObjectURL` for new.
- Added Vercel Analytics for frontend stats.

## Libraries Used:
1. **axios** – data fetching
2. **tailwindcss** – styling
3. **fontawesome** – icons
4. **react-spinners** – loading indicators
5. **react-icons** – additional icons
6. **react-toastify** – toast alerts
7. **date-fns** – date operations (to be removed)
8. **@vercel/analytics** – frontend stats and visitor count
