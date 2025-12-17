# Cinque Terre Travel Magazine — Village Subportal Page Briefing

This document defines the **subportal (village hub) page** for an individual Cinque Terre village (e.g., **Vernazza**, **Manarola**, etc.).  
The page should feel like a **premium editorial destination hub**: emotional, image-led, highly curated, and structurally consistent with the homepage and detail article pages.

---

## Page Goals

- Provide a **beautiful, magazine-grade gateway** into a specific village
- Combine **emotion + practical planning**
- Surface the village’s best content across:
  - **Main attractions / POIs**
  - **Sights & viewpoints**
  - **Accommodations**
  - **Events**
  - **Blog posts / stories**

---

## Global Page Structure

1. Sticky header (global)
2. Village hero (full-width)
3. Overview / “Essence of the Village” summary (emotional)
4. Quick facts + planning sidebars (optional)
5. Curated modules (POIs, Sights, Stays, Events, Stories)
6. Related villages / continue exploring
7. Newsletter CTA
8. Footer

---

# 1) Village Hero (Full Width)

**Purpose:** Immediately evoke the village’s identity.

### Layout
- Full-bleed hero image (cinematic)
- Height: ~60vh desktop, ~45vh mobile
- Gradient overlay for readable text

### Hero Content
- Small caps label: *VILLAGE GUIDE*
- H1: **Vernazza** (example)
- 1–2 line dek: poetic, distinctive (not generic)
- Meta row (optional):
  - “Best for: Views • Romance • Aperitivo”
  - Seasonal highlight chip (e.g., “Spring favorite”)
- CTAs:
  - Primary: *Plan your visit*
  - Secondary: *See top sights*

### Optional: Village Weather Mini Widget
- Same glassmorphism style as homepage
- Current temp + condition + 3-day icons+temps (compact)

---

# 2) Overview Section — “The Essence of Vernazza”

**Purpose:** The emotional centerpiece: elegant typography + storytelling.

### Layout
- Split layout (desktop):
  - Left: editorial text with typographic flourish (drop cap optional)
  - Right: supporting scenic image or collage
- Mobile: stacked, image between paragraphs for rhythm

### Content Requirements
- 2–3 short, evocative paragraphs describing:
  - What it feels like to arrive
  - The signature scene (harbor, pastel houses, cliffs)
  - The ideal tempo of a day here
- “What to expect” micro bullets (quietly styled):
  - Crowds level
  - Ideal visit length
  - Must-do experience (one)
- Optional “Editor’s Tip” callout:
  - one highly specific suggestion (e.g., a viewpoint timing)

---

# 3) Village Navigation / Jump Links

**Purpose:** Make the hub easy to scan without losing magazine feel.

- A slim “On this page” navigation (sticky on desktop or top-of-content on mobile):
  - Top Attractions
  - Sights & Viewpoints
  - Places to Stay
  - Events
  - Latest Stories

---

# 4) Optional Sidebars (Desktop) — Curated Planning Blocks

Sidebars must feel **curated**, not cluttered.

### Sidebar A: Quick Facts
- Best time to visit
- Getting there (train stop, walking notes)
- Local etiquette / rules
- Accessibility note (short)

### Sidebar B: “In a Nutshell” Cards
- “Perfect morning”
- “Perfect sunset”
- “If you have 2 hours”

### Sidebar C: Popular on Cinque Terre (Village-specific)
- 3–5 linked stories related to this village

---

# 5) Section: Top Attractions (POIs)

**Purpose:** The “must-see” list in a premium, editorial card system.

### Layout
- Section header: **Top Attractions in Vernazza**
- 1 lead attraction card (large)
- + 5–8 supporting attraction cards (grid)

### POI Card Fields
- Image
- POI name
- Category badge (Viewpoint / Beach / Church / Trail / Landmark)
- Short editorial blurb (1–2 lines)
- Practical micro-info (optional):
  - “10 min walk from station”
  - “Best at sunset”
- CTA: *View details*

### Optional: Filters (UI only)
- All • Viewpoints • Trails • Beaches • Culture

---

# 6) Section: Sights & Viewpoints (Editorial Grid)

**Purpose:** A slightly different rhythm than POIs: more visual, more “magazine spread”.

### Layout
- Masonry-like grid or mixed-size tiles
- 6–10 items

### Sight Tile Fields
- Image-first
- Title
- One-line caption
- Optional: “Golden hour” badge

---

# 7) Section: Places to Stay (Accommodations)

**Purpose:** Condé Nast Traveler–style curation.

### Layout
- Section header: **Places to Stay in Vernazza**
- 6 cards (grid or scroll rail)

### Stay Card Fields
- Image
- Name
- Type badge (Boutique / Guesthouse / Apartment / Agriturismo nearby)
- Price tier ($ / $$ / $$$)
- One-line “why it’s special”
- CTA: *View stay*

### Extra UX
- “Best for…” micro tags: Romance / Families / Quiet / Views

---

# 8) Section: Events (Village Calendar)

**Purpose:** Structured, practical, seasonal content.

### Layout
- Section header: **Events & Seasonal Moments**
- 4–8 event items as a list or cards

### Event Fields
- Event name
- Date or date range
- Category badge (Festival / Food / Culture / Religion / Outdoor)
- Location (village area)
- Short description
- CTA: *View event*

### Optional: Month Switcher (UI only)
- Tabs: This month • Next month • Summer highlights

---

# 9) Section: Latest Stories (Village Editorial Feed)

**Purpose:** Keep the village page feeling alive and magazine-driven.

### Layout
- Section header: **Latest Stories from Vernazza**
- 1 lead story + 6 supporting cards

### Story Card Fields (same as homepage)
- Headline
- Short intro
- Author avatar + name
- Date
- Reading time
- Category badge
- Image

### Optional: Story Collections
- “Eat & Drink in Vernazza”
- “Hiking routes from Vernazza”

---

# 10) “Plan Your Visit” Utility Band (Recommended)

**Purpose:** Convert inspiration into action without breaking the tone.

### Layout
A refined band with 3–4 planning cards:
- Getting around (train/ferry)
- Best times (crowds + light)
- Packing (shoes, layers)
- Reservations (restaurants, stays)

---

# 11) Cross-Navigation: Explore Other Villages

**Purpose:** Encourage exploration across the site.

- Section: **Continue Exploring**
- Cards for the other 4 villages
- Each card: image + one-line personality (“the quiet cliff village”, etc.)

---

# 12) Newsletter CTA

- Same elegant newsletter band as homepage and detail page
- Headline: *Get the Cinque Terre Dispatch*
- Email input + subscribe button
- Optional village-specific hook: “Vernazza updates, seasonal tips, and new stories.”

---

# 13) Footer

- Same magazine footer as homepage

---

## Visual & Editorial Principles

- Strong typographic hierarchy: big headline, elegant dek, calm body text
- Generous spacing, subtle dividers, premium hover motion
- Curated feel: no “directory” clutter—everything looks selected
- Emotion-first narrative, supported by practical modules

---

## Reusable Components (Astro)

Suggested components:
- `VillageHero.astro`
- `VillageOverview.astro`
- `JumpLinks.astro`
- `SidebarBlock.astro`
- `POIGrid.astro` / `POICard.astro`
- `SightTiles.astro`
- `StayGrid.astro` / `StayCard.astro`
- `EventList.astro` / `EventCard.astro`
- `StoryFeed.astro` / `StoryCard.astro`
- `PlanYourVisitBand.astro`
- `VillageCrossNav.astro`

---

## Sample Content Models

- `village` (name, slug, dek, heroImage, summary, tags)
- `pois[]` (name, category, blurb, image, walkingTime, bestTime)
- `sights[]` (name, caption, image, bestLight)
- `stays[]` (name, type, priceTier, why, image, tags)
- `events[]` (name, dateRange, category, description, location)
- `posts[]` (title, intro, author, date, readTime, category, image)

All copy must be **editorial-quality** (no lorem ipsum). Use emotionally rich, specific wording.

---

## Outcome

This village subportal should feel like:
- A **mini-magazine edition** dedicated to one village
- A **curated travel hub** that’s both inspiring and useful
- A page that naturally funnels visitors into deeper content (POIs, stays, events, stories)

---

*This document is the canonical briefing for all village hub pages in the Cinque Terre Travel Magazine.*
