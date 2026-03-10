# CORRAD+ CMS (Vue + Express)

This repository contains a CMS stack:
- `apps/api-server`: Express + Prisma + SQLite API
- `apps/mobile`: React Native (Expo) mobile app — mockup UI
- `apps/admin-web`: Vue 3 + Vite app with two surfaces:
  - Storefront: `/`
  - Admin: `/admin/*`

## URLs (Development)

- Storefront + Admin app: `http://localhost:5173`
- API: `http://localhost:4000`

Examples:
- Storefront frontpage: `http://localhost:5173/`
- Storefront page by slug: `http://localhost:5173/about-us`
- Admin login: `http://localhost:5173/admin/login`

## Quick Start

Run from repo root:

```bash
npm run clean:all
npm run setup:cms
npm run dev:cms
```

## Default Admin Login

From `apps/api-server/.env` defaults:
- `ADMIN_EMAIL=admin@example.com`
- `ADMIN_PASSWORD=admin12345`

## Common Commands

```bash
npm run clean        # remove generated files, keep local DB/uploads/.env
npm run clean:all    # full reset including .env, SQLite DB, uploads
npm run setup:cms    # one-command CMS bootstrap
npm run dev:cms      # run api + admin-web
npm run build:cms    # build api + admin-web
npm run dev:mobile   # run mobile app (Expo)
```

## API Highlights

Private CMS/admin APIs:
- `/api/auth/*`
- `/api/posts/*`
- `/api/pages/*`
- `/api/categories/*`
- `/api/media/*`
- `/api/settings/*`

Public storefront APIs:
- `GET /api/public/site`
- `GET /api/public/pages/frontpage`
- `GET /api/public/pages/:slug`
