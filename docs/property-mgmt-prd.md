# Product Requirements Document (PRD)

## Property Management SaaS

## **React (JavaScript) / Chakra UI v2 / Express JS**

---

## 1\) Executive Summary

A web app for tenants and property managers to handle onboarding, rent visibility, maintenance requests, and viewing lease details. MVP emphasizes: simple auth, guided onboarding, a clear tenant dashboard, basic maintenance ticketing, fake payment history (no live gateway), and a lightweight admin view.

**Primary Users**

- Tenants  
- Property Managers/Admins

**MVP Goals**

- Reduce email/paper churn with a single login and guided onboarding  
- Give tenants a 1‑screen snapshot of rent status \+ maintenance  
- Give admins a simple overview \+ ability to manage requests

---

## 2\) MVP Scope & Non‑Goals

### 2.1 MVP Features

1. **Authentication & Session**  
   - Email/password login, register, logout  
   - Forgot password (client UI \+ API hook)  
2. **Tenant Onboarding (Multi‑step)**  
   - Steps: Account → Personal Info → Lease Details → Payment Pref (UI only) → Review  
   - Progress indicator \+ validation  
3. **Tenant Dashboard**  
   - Next rent due (date/amount), payment status summary  
   - Recent maintenance requests (3–5 most recent)  
   - Notices/announcements block  
4. **Maintenance Requests**  
   - Submit new request (issue type \+ description)  
   - View list with status (Pending, In Progress, Completed)  
5. **Payments (History Only)**  
   - List historical payments with status (Paid/Pending/Overdue)  
   - Highlight overdue  
   - Calc total due \= overdue \+ upcoming (simple client calc from API fields)  
6. **Lease Viewer**  
   - Tabs: Summary (key fields) / Full Terms (scrollable) / Download (link)  
7. **Admin: Basics**  
   - Overview stats (tenants, occupancy%, monthly paid total — can be mock from API)  
   - Maintenance table (filter by status, update status)

---

## 3\) Roles & Permissions

* **Tenant**: read own records, submit maintenance requests, view payments/lease  
* **Admin/Manager**: read/write maintenance, read tenant/lease summaries, update statuses, read payment summaries

RBAC is enforced in UI routing and conditional rendering, assuming the API provides the role in the session response.

---

## 4\) Technical Requirements (Front‑End)

* **Framework**: React 18 (JavaScript)  
* **UI Library**: Chakra UI v2 (`@chakra-ui/react`, `@chakra-ui/icons`)  
* **Routing**: React Router v6  
* **Forms**: React Hook Form  
* **HTTP**: Axios (or fetch)  
* **State**: React Context  
* **Build**: Vite  
* **Theming**: Extend Chakra theme (brand colors, semantic tokens, component variants)

---

## 5\) Technical Requirements (Backend)

- Express JS  
- 

---

## 5\) Milestones

### Milestone 0 \- Project Scaffold & Theme

**Tasks (Paul)**

* [x] Scaffold Vite/React 18 frontend code  
* [x] Add Chakra UI V2, React Router, and React Hook Form  
* [x] Add `ChakraProvider` \+ custom theme; set up color mode toggle  
* [x] Create `AppLayout` & `PublicLayout` shells with top nav/sidebar  
* [x] API client stub (`axios` baseURL \+ interceptors)

**Tasks (Meko)**

* [x] Scaffold ExpressJS backend code  
* [x] Setup Basic Auth endpoints  
* [x] Create models for Lease, Maintenance, Onboarding, Payments

### Milestone 1 \- Auth \+ Session

**Tasks (Paul)**

* Build Login/Register forms with validation \+ error toasts  
* Wire to `/auth/*` endpoints; store token in memory  
* Protected routes HOC/Wrapper; role from session  
* Forgot Password screen (submit \+ confirmation)

### Milestone 2 \- Onboarding

**Tasks (Paul)**

* Multi‑step flow (5 steps) with `Progress` or `Stepper`; next/back persist  
* Client validation per step; server draft save per step   
* Review & Submit screen; success route to Dashboard

**Tasks (Meko)**

* Create endpoint for onboarding save
* Flesh out complete user model

### Milestone 3 \- Tenant Dashboard

**Tasks**

* Stat cards for next due \+ balance (computed from API fields)  
* Notices list component  
* Recent maintenance table (link to full list)

### Milestone 4 \- Maintenance

**Tasks**

* New Request form (select \+ textarea); toast on success  
* Tenant list table (status badges, filters)  
* Admin list table (status update via select \+ optimistic UI)

### Milestone 5 — Payments (History Only) \+ Lease Viewer (2–3 days)

**Tasks**

* Payment history table, overdue alert, computed total due  
* Lease viewer tabs: Summary/Full Terms/Download

### Milestone 6 — Admin Overview

**Tasks**

* Admin stat cards (tenants, occupancy%, monthly paid)

**Optional (Post‑MVP)**

* Calendar for maintenance; e‑signature; Stripe checkout; messaging

---

## 7\) Routing Map (MVP)

* `/login`, `/register`, `/forgot-password`  
* `/onboarding` → `/onboarding/step-1..5`  
* `/tenant/dashboard`  
* `/tenant/maintenance` (list \+ create)  
* `/tenant/payments`  
* `/tenant/lease`  
* `/admin/dashboard`  
* `/admin/maintenance`

---

## 8\) Minimal Data Contracts (example)

**Auth**

* `POST /auth/login` → `{ token, user: { id, role: 'tenant'|'admin', name } }`

**Onboarding Draft**

* `POST /onboarding` (step payload) → `{ draftId, stepCompleted }`

**Dashboard**

* `GET /tenant/summary` → `{ nextDueDate, nextDueAmount, overdueAmount, notices: [{id,title,body}] }`

**Maintenance**

* `POST /maintenance` → `{ id, status: 'pending' }`  
* `GET /maintenance?role=tenant|admin` → `[ { id, issueType, description, createdAt, status } ]`  
* `PATCH /maintenance/:id` → `{ id, status }`

**Payments**

* `GET /payments` → `[ { id, date, amount, status } ]`

**Lease**

* `GET /lease` → `{ summary: {...}, termsUrl }`

---

## 13\) Post‑MVP Roadmap (Phase 2+)

* Stripe integration; recurring payments; e‑signature  
* Maintenance calendar \+ staff assignment  
* Messaging; document uploads; reporting dashboard; mobile apps

