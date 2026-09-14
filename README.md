# MPAROMA — Maison De Parfum

Full-stack Next.js (App Router) + TypeScript storefront, built from the
MPAROMA reference design. Styled entirely with Tailwind CSS utility
classes (no custom CSS layer) to keep the shipped CSS minimal.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- AOS (scroll animations) — installed and initialized; add `data-aos`
  attributes to elements as you want more entrance animations
- MongoDB (native driver) — connection util ready in `lib/mongodb.ts`;
  `/api/products` and `/api/newsletter` already use it, falling back to
  mock data when `MONGODB_URI` isn't set yet, so the site runs fully
  without a database during frontend work

## Getting started
```bash
npm install
cp .env.local.example .env.local   # fill in MONGODB_URI when ready
npm run dev
```

## Adding your images
Every image is a plain path under `/public/images/...` referenced from
`data/*.ts` — drop matching files in and they appear automatically.
Each folder has a README.txt with the exact filenames and recommended
sizes:
- `public/images/hero/` — homepage hero photo
- `public/images/products/` — best-seller product photos
- `public/images/scent/` — "Discover By Scent" category photos
- `public/images/discovery/` — tester-kit banner photo

Until an image is added, a plain placeholder panel renders instead of a
broken image, so the layout never breaks.

## Project structure
```
app/                 routes (App Router) + API routes
  api/products/       GET products (Mongo, falls back to mock data)
  api/newsletter/      POST email signup (writes to Mongo)
  api/orders/         placeholder for the checkout/cart flow, later
components/          section components (server components by default)
components/ui/       small reusable pieces (buttons, cards, image w/ fallback)
data/                typed mock data — same shape as future Mongo docs
lib/mongodb.ts       MongoDB connection singleton
types/               shared TypeScript interfaces
```

## Responsive design
Layouts are built mobile-first with Tailwind breakpoints (`sm`, `md`,
`lg`) — navbar collapses to a mobile menu, hero and grids restack on
small screens — rather than being a fixed copy of one screen size.

## Backend (next steps)
Cart/checkout and full CRUD on products live in `app/api/*` next, the
same pattern already used in `products` and `newsletter`: read from
`getDb()` in `lib/mongodb.ts`, write typed responses.
