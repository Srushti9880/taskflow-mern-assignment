# TaskFlow - Frontend

React (Vite) client for the TaskFlow Kanban task manager.

## Features
- Register, login, logout with JWT (stored in localStorage) and session restore on refresh
- Protected dashboard route (React Router)
- Three Kanban columns: To Do, In Progress, Done
- Create, edit, delete tasks (modal form, delete confirmation)
- Move tasks by drag and drop or the "Move to" dropdown (works on touch devices), with optimistic updates and rollback on failure
- Search, progress bar, loading skeletons, empty states, error states, toast notifications
- Responsive layout (desktop, tablet, mobile)

## Setup
1. Start the backend first (see backend README), default `http://localhost:8000`.
2. Install and run:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
3. Open `http://localhost:5173`.

## Environment variables
| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |

The backend's `CLIENT_URL` must be `http://localhost:5173` for CORS.

## Scripts
- `npm run dev` start dev server
- `npm run build` production build
- `npm run preview` preview the build

## Structure
```
src/
  api/          axios instance + auth/task API calls
  context/      AuthContext, TaskContext (global state)
  components/   Navbar, TaskColumn, TaskCard, TaskModal, ConfirmDialog, ...
  pages/        Login, Register, Dashboard, NotFound
  utils/        constants and helpers
  styles/       global CSS
```
