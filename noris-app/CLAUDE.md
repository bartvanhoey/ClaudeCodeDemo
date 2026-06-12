# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the "Solid" Next.js SaaS template (Next.js 16, React 19, TypeScript, Tailwind CSS 4), being adapted into a "noris-app" with custom Noris branding/styling. Originally a UI-only template with no backend integrations.

## Commands

```bash
npm install --legacy-peer-deps   # required due to React 19 peer dep conflicts
npm run dev                      # start dev server (localhost:3000)
npm run build                    # production build
npm run start                    # run production build
npm run lint                     # next lint
```

There is no test setup yet (see `z-things-to-do.md` for planned work, including unit tests, i18n, and Appwrite auth).

Formatting uses Prettier with `prettier-plugin-tailwindcss` (`.prettierrc.json`) for automatic Tailwind class sorting.

## Architecture

- **App Router structure**: All routes live under `app/(site)/` (a route group), e.g. `app/(site)/auth/signin`, `app/(site)/blog`, `app/(site)/docs`, `app/(site)/support`. `app/(site)/layout.tsx` sets up fonts/metadata and wraps children in `Provider.tsx`.
- **`app/(site)/Provider.tsx`** is a client component (`"use client"`) that wires up global chrome for every page: `ThemeProvider` (next-themes, light/dark mode), `Lines`, `Header`, `ToasterContext` (react-hot-toast), `Footer`, and `ScrollToTop`.
- **`components/`** is organized by feature/section (About, Auth, Blog, Brands, CTA, Common, Contact, Docs, FAQ, Features, FeaturesTab, Footer, FunFact, Header, Hero, Integration, Lines, Pricing, ScrollToTop, Testimonial). Most section components follow a pattern of `index.tsx` (the section) plus a `*Data.tsx` file holding static content arrays and a `Single*.tsx` presentational component for repeated items (e.g. `components/Features/index.tsx`, `featuresData.tsx`, `SingleFeature.tsx`).
- **`types/`** holds shared TypeScript interfaces for the data-driven sections (Blog, Brand, Doc, FAQ, Feature, FeatureTab, Menu, Testimonial) — `*Data.tsx` files in `components/` are typed against these.
- **Styling**: Tailwind CSS 4 with theme tokens defined via `@theme` in `app/globals.css` (no `tailwind.config.js` — Tailwind 4 CSS-first config). Dark mode uses the `dark:` variant via a custom variant (`@custom-variant dark (&:is(.dark *))`) tied to `next-themes`' `class` attribute strategy.
- **Path alias**: `@/*` maps to the project root (see `tsconfig.json`), e.g. `@/components/Header`.
- **Image config**: `next.config.js` allows remote images from `cdn.sanity.io` and `localhost` (Sanity CMS integration is referenced by the template but not wired up in this app).
- **`markdown/docs/`**: MDX content files used by the docs pages.
- **`noris-styling/`**: Reference assets for the in-progress Noris rebrand — `noris-colors.txt` defines the Noris color palette (green, dark green, fresh green, light green, sky blue, ocean blue, purple, warn orange shades/tints) intended to be merged into `app/globals.css`'s `@theme` block. `noris-styling.png` and `noris-colors.pdf` are visual references; `fonts/` holds custom font files for the rebrand.
