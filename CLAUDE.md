# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a luxury editorial travel magazine website for Cinque Terre, built with Astro. The design is inspired by Condé Nast Traveler with a premium, editorial aesthetic.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

### Tech Stack
- **Framework:** Astro 5 with React integration
- **Styling:** Tailwind CSS v4 (via Vite plugin)
- **UI Components:** shadcn/ui primitives (Button, Badge, Card, Sheet, Carousel, Input)
- **Fonts:** Inter (sans) and Playfair Display (serif) via Fontsource
- **Icons:** lucide-react

### Component Patterns

Components use a mix of `.astro` and `.tsx` files:
- **Astro components** (`.astro`): Static or server-rendered content (Hero, VillageSelector, layouts, pages)
- **React components** (`.tsx`): Interactive elements requiring client-side JS (Header, Carousel, AudioGuides)

React components must use `client:load` directive when imported into Astro files for hydration.

### Key Directories
- `src/components/ui/` - shadcn/ui base components (button, card, badge, sheet, carousel, input)
- `src/components/` - Page section components (Hero, Header, FeaturedCarousel, etc.)
- `src/layouts/Layout.astro` - Base layout with Header, global styles, and meta tags
- `src/pages/` - File-based routing (index, village, blog/, itinerary, accommodations, etc.)
- `src/styles/global.css` - Tailwind config with CSS custom properties for theming

### Styling Conventions
- Uses `cn()` utility from `src/lib/utils.ts` for conditional class merging
- Design tokens defined as CSS custom properties in `global.css` (--background, --foreground, --primary, etc.)
- Font families: `font-sans` (Inter) and `font-serif` (Playfair Display)
- Dark mode supported via `.dark` class variant

### External Dependencies
- TailwindPlus Elements loaded via CDN in Layout.astro
- Embla Carousel for carousels
- Radix UI primitives for accessible dialogs/sheets
