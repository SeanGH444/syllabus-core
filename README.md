# Syllabus CMS Plus

A comprehensive syllabus content management system for institutional undergraduate programs. Built with React + Vite, Node.js + Express, and MySQL.

## Features

- **Role-based access** — Faculty and Admin roles with different views
- **Session authentication** — Secure login with MySQL-backed sessions and show/hide password toggle
- **Syllabus Builder** — 7-step guided wizard with file upload drag-drop (Faculty only)
- **My Syllabi** — Faculty view for managing own submissions (edit, delete, version history, messaging)
- **Review & Approval** — Admin queue with approve/reject/revision workflow
- **AI Syllabus Checker** — Simulated compliance scoring with recommendations
- **CO-PO Mapping** — Interactive curriculum outcome matrix using I (Introduced), R (Reinforced), M (Mastered) alignment levels
- **Repository** — Search and filter (Faculty sees own, Admin sees all)
- **Compliance Monitoring** — Per-faculty compliance tracking
- **Analytics** — Hand-rolled charts and quality metrics with animations (role-scoped: Faculty sees own, Admin sees all)
- **Reports** — Faculty compliance (role-scoped), accreditation, and historical exports
- **Messaging** — Per-syllabus threaded chat with unread badges and read receipts
- **Version History** — Timeline of submission versions with feedback
- **Activity Logging** — Audit trail of all actions with clear logs
- **RESTful API** — Express.js backend with MySQL database persistence

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin (Dean) | admin@university.edu.ph | admin123 |
| Faculty | faculty@university.edu.ph | faculty123 |

## Run

**Backend (requires XAMPP MySQL running):**
```bash
cd server
npm install
npm run init-db    # first time only — creates DB + seeds data
npm run dev        # starts API on http://localhost:3001
```

**Frontend:**
```bash
npm install
npm run dev        # starts UI on http://localhost:5173
```

## Build

```bash
npm run build
```

---

## Changelog

### v1.0.0 — Initial Setup
**By:** Raymond  
**Date:** September 12, 2026

- Copied base project from `syllabus-cms-react`
- Added `vite.config.js` with React plugin
- Updated `package.json` to `syllabus-cms-plus`

---

### v1.1.0 — Port Features from Syllabus Core
**By:** Raymond  
**Date:** September 12, 2026

**Authentication & Access:**
- Added two-role system (Admin + Faculty) with credential validation
- Added session persistence via localStorage
- Added demo account hints on login page
- Added role-gated navigation (Faculty vs Admin views)

**Faculty Features:**
- Added My Syllabi page — card grid with edit, delete, version history, messaging
- Added file upload drag-drop zone in Syllabus Builder
- Added Syllabus Builder restricted to Faculty only

**Admin Features:**
- Added Review & Approval queue with approve/reject/revision workflow
- Added Compliance Monitoring — per-faculty compliance cards with progress bars
- Added Reports page — faculty compliance report with download, accreditation summary, historical exports

**Messaging:**
- Added per-syllabus threaded chat modal with unread badges
- Added messages dropdown in topbar with thread preview
- Added read receipts (Read/Sent) in chat

**Version Control:**
- Added Version History modal with reverse-chronological timeline
- Added version tracking on all status changes

**Activity Logging:**
- Added dynamic activity log from all actions
- Added Clear Logs with role-scoped deletion (Admin clears all, Faculty clears own)

**Other:**
- Added Reject status support
- Added delete confirmation modals
- Added Toast notification system
- Added live stats in Dashboard and Repository

---

### v1.2.0 — Animations
**By:** Raymond  
**Date:** September 13, 2026

- Added fadeInUp animation for stat cards with staggered delays
- Added donutSpin animation for pie/donut charts
- Added ringGrow animation for compliance and quality rings
- Added growBar animation for progress bars
- Added drawLine animation for SVG line chart
- Added growBar animation for bar chart columns with stagger
- Added slideInRight animation for check rows and queue items
- Added fadeInUp animation for activity items, workflow steps, comments, insights
- Added hover lift effects on cards
- Added hover slide effects on buttons and queue items
- Added scaleIn animation for modals
- Added pulse shimmer on toast notifications

---

### v1.3.0 — Project Reorganization
**By:** Raymond  
**Date:** September 13, 2026

**Restructured from single-file (526 lines) to modular architecture (22 files):**

```
src/
├── App.jsx              ← slim orchestrator (~130 lines)
├── main.jsx
├── styles.css
├── components/
│   ├── ui.jsx           ← Card, Legend, Progress, Field, Toggle, etc.
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   ├── Login.jsx
│   ├── ChatModal.jsx
│   ├── ConfirmModal.jsx
│   └── VersionHistoryModal.jsx
├── data/
│   └── initialData.js   ← all constants & seed data
├── lib/
│   └── utils.js         ← load(), fmt(), bumpVer()
└── views/
    ├── DashboardView.jsx
    ├── SyllabusBuilder.jsx
    ├── AIChecker.jsx
    ├── COPOMapping.jsx
    ├── ReviewApproval.jsx
    ├── MySyllabi.jsx
    ├── Repository.jsx
    ├── Compliance.jsx
    ├── Analytics.jsx
    ├── Reports.jsx
    ├── UsersRoles.jsx
    └── Settings.jsx
```

---

### v1.4.0 — Bug Fixes & UI Tweaks
**By:** Raymond  
**Date:** September 15, 2026

- Fixed `ReferenceError: m is not defined` in threads useMemo (variable scope bug)
- Fixed priority badge text centering (changed to inline-flex)
- Fixed report-row alignment (changed to grid layout)
- Fixed report-row text alignment (left-aligned with proper spacing)
- Removed Syllabus Builder from Admin nav (Faculty-only)
- Updated Repository to show only Faculty's own syllabi when logged in as Faculty
- Updated Reports to show only Faculty's own compliance data when logged in as Faculty
- Updated Analytics to show only Faculty's own data (compliance, submissions, quality scores) when logged in as Faculty
- Confirmed CO–PO Mapping uses correct I/R/M terminology (Introduced, Reinforced, Mastered)

---

### v1.5.0 — Font Size Increase
**By:** Raymond  
**Date:** September 17, 2026

- Increased all font sizes by 2–3px for better readability
- 8px → 10px, 9px → 11px, 10px → 12px, 11px → 13px, 12px → 14px, 13px → 15px, 15px → 17px, 16px → 18px, 17px → 20px, 28px → 30px

---

### v1.6.0 — Backend API Integration
**By:** Raymond  
**Date:** September 17, 2026

**Backend Setup:**
- Created Express.js server with MySQL (mysql2 driver)
- Implemented three-tier architecture: React.js → Node.js/Express → MySQL
- Created database schema: users, syllabi, curriculum, submission_logs, comments, messages, co_po_mapping
- Added session-based authentication with express-session
- Added file upload with multer (syllabus documents)
- Added CORS configuration for frontend–backend communication

**API Routes:**
- POST /api/auth/login — authenticate user, create session
- POST /api/auth/logout — destroy session
- GET /api/auth/me — check current session
- GET /api/syllabi — list syllabi (faculty: own, admin: all)
- POST /api/syllabi — create syllabus with file upload
- PUT /api/syllabi/:id — update syllabus status/details
- DELETE /api/syllabi/:id — delete syllabus
- GET /api/curriculum — list curriculum programs
- GET /api/logs — list submission logs
- GET /api/messages/:syllabusId — get messages for syllabus
- POST /api/messages/:syllabusId — send message
- PUT /api/messages/read/:syllabusId — mark messages as read
- GET /api/users — list users (admin only)
- POST /api/users — create user (admin only)
- DELETE /api/users/:id — delete user (admin only)
- GET /api/mapping/:curriculumId — get CO–PO mapping
- PUT /api/mapping/:curriculumId — save CO–PO mapping

**Frontend Changes:**
- Created src/lib/api.js — fetch helpers for all API endpoints
- Updated App.jsx — removed localStorage/mock data, now uses real API calls
- Added loading screen with spinner while checking session
- All CRUD operations now persist to MySQL database

---

### v1.7.0 — Login Improvements
**By:** Raymond  
**Date:** September 17, 2026

- Added show/hide password toggle button (eye icon) on login form
- Added CSS styling for password field and eye button

---

### v1.8.0 — Mock Data Cleanup & DB Status Fix
**By:** Raymond  
**Date:** September 17, 2026

- Removed all mock data from frontend (USERS, INITIAL_SYLLABI, INITIAL_LOGS, INITIAL_MESSAGES, complianceSeed)
- Removed `pending` status from database ENUM and all frontend references
- Database status values now: submitted, under_review, approved, rejected, for_revision
- Fixed ChatModal to derive partner from messages instead of hardcoded USERS
- Fixed MySyllabi to use `userId` instead of `ownerId`
- Fixed Repository to use `courseCode` instead of `code`, lowercase status filters
- Fixed ReviewApproval to use lowercase status values
- Fixed Compliance to use lowercase status values

---

### v1.9.0 — CO–PO Mapping Persistence
**By:** Raymond  
**Date:** September 17, 2026

- Added `co_po_mapping` table to MySQL schema
- Added GET/PUT `/api/mapping/:curriculumId` routes
- Added `mapping.get()` and `mapping.save()` to frontend API
- Updated COPOMapping component to load/save from database
- Added curriculum selector dropdown

---

### v1.10.0 — Dynamic AI Checker & Dashboard
**By:** Raymond  
**Date:** September 17, 2026

- AI Checker now computes compliance scores from actual syllabi data
- Recommendations are dynamic based on which checks are weak
- Dashboard stats computed from real syllabi (no hardcoded 128/72/24/18/8/6)
- Dashboard Program Compliance computed from syllabi grouped by program
- AI Quality Snapshot derived from compliance rate
- Fixed all NaN% issues (division by zero when no syllabi)
- Fixed negative compliance scores (clamped to 0 minimum)

---

### v1.11.0 — UI Fixes
**By:** Raymond  
**Date:** September 17, 2026

- Changed department name from "College of Information and Communications Technology" to "CITE"
- Fixed AI Recommendations priority badges to circular 44px shape with 8px uppercase text
- Fixed AI Checker to show 0% for all scores when no syllabi exist

---

### v1.12.0 — Users & Roles from Database
**By:** Raymond  
**Date:** September 17, 2026

- Users & Roles page now fetches real users from MySQL database via API
- Added "+ Add User" form with email, password, name, and role fields
- Added delete button per user
- Removed all hardcoded mock user data
