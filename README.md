# TaskFlow - Mini Task Management System

A Kanban-style task manager built with the MERN stack. Users can register, log in and manage their own tasks across three columns: **To Do**, **In Progress** and **Done**.

## Tech Stack
- **Frontend:** React 18, Vite, React Router, Axios, react-hot-toast
- **Backend:** Node.js, Express 5, MongoDB, Mongoose
- **Auth and security:** JWT, bcrypt password hashing, Joi validation

## Features
- JWT registration and login, protected routes, session restore on refresh
- Task CRUD where each user can only access their own tasks
- Kanban board with drag and drop, plus a "Move to" dropdown for touch devices
- Search, loading skeletons, empty and error states, toast notifications
- Global error-handling middleware with consistent API responses
- Responsive layout

## Project Structure
```
Assignment/
  backend/
    config/        database connection
    controllers/   auth and task logic
    middleware/    auth, validation, error handling
    models/        User and Task schemas
    routes/        auth and task routes
    validators/    Joi schemas
    utils/         ApiError, token helper
    server.js
  frontend/
    src/
      api/         axios instance and API calls
      context/     AuthContext, TaskContext
      components/  UI components
      pages/       Login, Register, Dashboard
      utils/       constants and helpers
```

## Prerequisites
- Node.js 18 or higher
- MongoDB running locally (or a MongoDB Atlas connection string)

## Getting Started

### 1. Backend
```bash
cd backend
npm install
```

Create a file named `.env` inside `backend/` (copy `.env.example`) and fill in the values:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the API runs on | `8000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/taskflow` |
| `JWT_SECRET` | Secret used to sign tokens (use a long random string) | `replace_with_a_long_random_string` |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `CLIENT_URL` | Frontend URL allowed by CORS | `http://localhost:5173` |

Start the server:
```bash
npm run server
```
You should see `MongoDB connected` and `Server running on PORT : 8000`.

### 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
```

Create a file named `.env` inside `frontend/` (copy `.env.example`):

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |

Start the app:
```bash
npm run dev
```
Open **http://localhost:5173**, register an account and start adding tasks.

## API Reference
Base URL: `http://localhost:8000/api`. Protected routes need the header `Authorization: Bearer <token>`.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register (`name`, `email`, `password`) |
| POST | `/auth/login` | No | Login, returns a token |
| GET | `/auth/me` | Yes | Current user |
| GET | `/tasks` | Yes | List your tasks (optional `?status=`) |
| POST | `/tasks` | Yes | Create a task |
| GET | `/tasks/:id` | Yes | Get one task |
| PUT | `/tasks/:id` | Yes | Update title, description or status |
| PATCH | `/tasks/:id/status` | Yes | Move a task between columns |
| DELETE | `/tasks/:id` | Yes | Delete a task |

Task status values: `To-Do`, `In-Progress`, `Done`.

Response format:
```json
{ "success": true, "message": "...", "data": { } }
```
Errors:
```json
{ "success": false, "message": "Validation failed", "errors": [{ "field": "email", "message": "..." }] }
```

## Scripts
| Location | Command | Purpose |
|---|---|---|
| backend | `npm run server` | Start API with nodemon |
| backend | `npm start` | Start API with node |
| frontend | `npm run dev` | Start dev server |
| frontend | `npm run build` | Production build |
