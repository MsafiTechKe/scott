# Scot E-commerce — Fullstack Deployable Project

This repository contains a complete, deployable full‑stack e‑commerce site for **Scot E-commerce** (laptops, robots, coding lessons).
It includes a React frontend (Vite) with 3D hero, an Express + Node backend, PostgreSQL schema, authentication (JWT), Stripe Checkout integration, admin & customer dashboards, and production-ready Dockerfiles suitable for Render.

## Quick start (development with Docker Compose)

1. Copy `.env.example` to `.env` in `backend/` and fill values.
2. Run: `docker-compose up --build`
3. Frontend served on `http://localhost:5173` (nginx container) and backend on `http://localhost:8080`.

## Files included
- `frontend/` — Vite + React app with Tailwind, react-three-fiber, pages/components, Stripe client integration.
- `backend/` — Express API with auth, products, orders, admin routes, PostgreSQL migrations and Stripe webhook handler.
- `docker-compose.yml` — local development with Postgres.
- `render.yaml` — example Render services (optional).
- `README.md` — this file

Security notes: Replace secrets, enable HTTPS, set proper CORS origins, add rate limits, and secure admin endpoints before production use.
