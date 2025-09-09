# GRP Tasker

A full‑stack Task & Team Management hub built with Next.js (App Router), Tailwind CSS, Prisma (SQLite), and JWT auth.

## ✨ Features
- Next.js 14 App Router (React + server route handlers)
- Tailwind CSS design system and dark‑mode friendly theme
- Prisma ORM with SQLite: Users, Groups, Tasks, Checklist, Comments, Notifications
- JWT auth via httpOnly cookie; middleware‑protected routes
- Admin dashboard: create tasks/users/groups, manage group membership
- Task details: checklist toggles, comments, progress and due dates
- Analytics dashboard (server API + page)

## 🧱 Tech Stack
- Frontend: Next.js (React), Tailwind CSS, TypeScript
- Backend: Next.js Route Handlers (REST)
- DB/ORM: Prisma + SQLite

## 🗂️ Project Structure
```
src/
	app/
		admin/            # Admin dashboard + analytics
		api/              # Route handlers (REST APIs)
		dashboard/        # User dashboard
		login/            # Auth page
		tasks/[id]/       # Task details page
	components/         # Reusable UI components
	lib/                # Auth/Prisma helpers
prisma/
	schema.prisma       # Data models
	seed.ts             # Demo data seeding
```

## 🧾 Data Models (Prisma)
Key models: `User`, `Group`, `Task`, `ChecklistItem`, `Comment`, `Notification`.

## 🔌 API Overview
- `POST /api/auth/login` – login
- `POST /api/auth/register` – register (if enabled)
- `GET/POST /api/groups` – list/create groups
- `PUT /api/groups/:id/users` – update group membership
- `GET/POST/DELETE /api/tasks` and `/api/tasks/:id` – CRUD tasks
- `PATCH /api/tasks/:id/checklist` – toggle checklist item
- `POST /api/tasks/:id/comments` – add comment
- `GET /api/analytics/summary` – analytics data

## 🚀 Getting started

1) Copy env template and set values
```bash
cp .env.example .env
# on Windows PowerShell:
copy .env.example .env
```
Edit `.env` and set:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="replace-with-strong-secret"
NEXT_PUBLIC_BASE_URL="http://localhost:3000" # for Analytics fetch
```

2) Install dependencies
```bash
npm install
```

3) Setup database and seed sample data
```bash
npm run db:push
npm run db:seed
```

4) Run the dev server
```bash
npm run dev
```
Open http://localhost:3000

### ✅ Demo credentials
- Admin: `admin@example.com` / `admin123`
- Employee: `jane@example.com` / `password`

Login at `/login`, go to `/dashboard`, and admins can access `/admin`.

## 🧪 Scripts
- `npm run dev` – start dev server on port 3000
- `npm run build` – production build
- `npm run start` – start production server
- `npm run db:push` – sync Prisma schema to DB
- `npm run db:seed` – seed demo data

## 🛣️ Main Routes
- `/login` – authenticate
- `/dashboard` – tasks overview for user
- `/admin` – admin hub (create tasks/groups/users, manage groups)
- `/admin/analytics` – analytics dashboard
- `/tasks/:id` – task details (checklist + comments)

## ☁️ Deploy
- Vercel: set env vars (`DATABASE_URL`, `JWT_SECRET`, optionally `NEXT_PUBLIC_BASE_URL`), then connect repo
- Self‑host: `npm run build` then `npm run start -p 3000`

## 🧰 Troubleshooting
- Missing env var: copy `.env.example` to `.env`
- SQLite locked: stop running dev server and retry `npm run db:push`
- Port 3000 in use: kill the process or run `next dev -p 3001`

## 📦 Push to GitHub
Ensure repo hygiene:
- `.gitignore` excludes build artifacts, node_modules, and `.env`
- `.env.example` documents env vars (do NOT commit real secrets)
- `LICENSE` included (MIT)

Initialize and push:
```bash
git init
git add .
git commit -m "feat: initial app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 📄 License
MIT – see `LICENSE`.
