# Cinque Terre Travel Magazine — Detail Page Briefing

This document defines the **editorial, layout, and component briefing** for a **sample detail page** (article / guide / destination page) within the Cinque Terre travel magazine.  
The page must feel **sophisticated, emotional, and magazine-grade**, inspired by long-form articles and destination guides on **Condé Nast Traveler**.

---

## Page Goals

- Deliver a **luxury long‑read experience**
- Strong emotional storytelling supported by photography
- Clear editorial hierarchy and elegant typography
- High usability through **contextual sidebars**
- Seamless integration of structured content (events, hotels, POIs)

---

## Global Page Structure

1. Sticky header (same as homepage)
2. Hero / Article opener
3. Article body (multi-column rhythm on desktop)
4. Contextual sidebars (right + inline)
5. Embedded structured sections (events, hotels, POIs)
6. Related content & navigation
7. Newsletter CTA
8. Footer

---

## 1) Article Hero / Opener

**Purpose:** Set mood and emotional tone immediately.

### Layout
- Full-width hero image or cinematic image strip
- Height: ~50–60vh desktop, ~40vh mobile
- Subtle gradient overlay for text contrast

### Hero Content
- Category label (small caps): *DESTINATION GUIDE* / *EVENTS* / *FEATURE*
- H1 article title (large, elegant serif or high-contrast display font)
- Optional subtitle / dek (1–2 poetic sentences)
- Meta row:
  - Author avatar + name
  - Publication date
  - Reading time
  - Optional location pill (e.g. “Vernazza”)

---

## 2) Article Layout & Typography

**Purpose:** Premium reading experience.

### Desktop Layout
- Centered main column (ideal width ~65–75ch)
- Right sidebar column
- Occasional full-width breakouts (images, pull quotes)

### Mobile Layout
- Single column
- Sidebar content injected inline after logical sections

### Typography Rules
- Headlines: elegant editorial font (serif or modern display)
- Body text: highly readable sans or serif
- Comfortable line-height, generous paragraph spacing
- Use drop caps on first paragraph (optional)
- Emphasize storytelling and rhythm

---

## 3) Article Body Content Types

### Standard Paragraphs
- Narrative, emotional, descriptive tone
- Avoid dense blocks; favor short, flowing paragraphs

### Section Headings
- Clear H2 / H3 hierarchy
- Editorial spacing before/after

### Inline Images
- Full-width image breakouts
- Caption below image (small, muted text)

### Pull Quotes
- Large typographic quote blocks
- Used to highlight emotion or insight

### Info Callouts
- Light background panels for tips or facts
- Example: *“Local Tip”*, *“Editor’s Note”*

---

## 4) Contextual Sidebars (Key Feature)

Sidebars should feel **curated, not intrusive**.

### Sidebar A: Quick Facts
Sticky (desktop only)

- Location
- Best time to visit
- Ideal stay length
- Getting there
- Crowd level indicator

---

### Sidebar B: Weather & Seasons
Reusable widget (same design language as homepage)

- Current weather
- Seasonal notes (e.g. “Spring: hiking & flowers”)

---

### Sidebar C: Popular on Cinque Terre
Editorial recommendations

- 3–5 linked articles
- Small image + headline

---

### Sidebar D: Practical Tips
Compact advice list

- What to pack
- Booking tips
- Local etiquette

---

## 5) Events List Section (Embedded)

**Purpose:** Showcase upcoming or seasonal events.

### Section Title
**Events in Vernazza** (example)

### Layout
- Vertical list or card grid (3–6 items)

### Event Card Fields
- Event name
- Date range
- Location (village)
- Short description
- Category badge (Festival / Food / Culture)
- CTA: *View event*

---

## 6) Hotels / Places to Stay Section

**Purpose:** Structured recommendations inside editorial flow.

### Section Title
**Where to Stay in Vernazza**

### Layout
- 3–6 hotel cards (grid or list)

### Hotel Card Fields
- Image
- Hotel name
- Short editorial description
- Price tier ($ / $$ / $$$)
- Type badge (Boutique / Guesthouse / Agriturismo)
- CTA: *View details*

---

## 7) Points of Interest (POIs) Section

**Purpose:** Practical discovery inside narrative content.

### Section Title
**Points of Interest**

### Layout
- Compact card grid or list
- Optional mini-map (future enhancement)

### POI Card Fields
- Name
- Category (Viewpoint / Beach / Church / Museum)
- Village
- Short description
- Optional walking time indicator

---

## 8) Inline Collection Blocks

**Purpose:** Cross-link editorial content.

Examples:
- “Related Guides”
- “Part of the collection: *Best of Cinque Terre*”
- “Continue reading”

Displayed as:
- Horizontal card strip
- Or boxed editorial panel

---

## 9) Author & Editorial Signature

**Purpose:** Magazine credibility.

- Author block at article end:
  - Avatar
  - Name
  - Short bio
- Optional editor signature or “From the editors” note

---

## 10) Newsletter CTA (End of Article)

**Purpose:** Conversion without breaking mood.

- Elegant band after article
- Headline: *Get the Cinque Terre Dispatch*
- Short line of value
- Email input + subscribe button

---

## 11) Related Stories

**Purpose:** Retention.

- 3–6 editorial cards
- Same card style as homepage
- Context-aware (same village / theme)

---

## 12) Footer

- Same magazine-style footer as homepage
- Clear visual separation from content

---

## Design & UX Principles

- Calm, confident editorial tone
- Strong typographic contrast
- Large imagery with breathing room
- Sidebars that enhance, never distract
- Seamless blend of storytelling + structured data

---

## Reusable Components (Astro)

Suggested components:
- `ArticleHero.astro`
- `ArticleMeta.astro`
- `ArticleBody.astro`
- `SidebarBlock.astro`
- `EventList.astro`
- `HotelList.astro`
- `POIList.astro`
- `PullQuote.astro`
- `InlineCollection.astro`
- `AuthorBio.astro`

---

## Sample Content Models

- `article`
- `events[]`
- `hotels[]`
- `pois[]`
- `relatedStories[]`
- `author`

All content should use **editorial-quality copy** (no lorem ipsum).

---

## Outcome

This page should feel like:
- A premium travel magazine feature
- A trustworthy guide
- A beautifully designed long read
- A practical planning tool

The reader should feel **inspired, informed, and confident** after finishing the page.

---

*This document serves as the canonical briefing for all editorial detail pages within the Cinque Terre Travel Magazine.*
