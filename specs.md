# Cinque Terre Travel Magazine — Homepage Briefing

This document is a **single-source design & implementation briefing** for building a **luxury editorial travel magazine homepage** inspired by **Condé Nast Traveler**, tailored to a **Cinque Terre travel guide**.

---

## Tech Stack & Constraints

- **Framework:** Astro  
- **Styling:** Tailwind CSS (Tailwind UI blocks allowed)  
- **UI Components:** shadcn/ui (Button, Badge, Card, Separator, Input, Tabs)  
- **Responsive:** Mobile-first, premium desktop experience  
- **Accessibility:** Semantic headings, alt text, focus states, keyboard navigation  
- **Performance:** Optimized images, lazy loading below the fold, minimal JS  

---

# Homepage Module Stack

## 0) Header & Global Navigation

**Purpose:** Premium editorial masthead similar to a high-end travel magazine.

- Sticky header with subtle shadow on scroll
- Left: Logo / site name — **Cinque Terre Dispatch**
- Center (desktop): Primary navigation
- Right: Search icon, Subscribe button, Hamburger menu (mobile)

**Primary Navigation**
- Inspiration  
- Destinations  
- Places to Stay  
- Food & Drink  
- News & Advice  
- Best of Cinque Terre  
- Gear & Packing  

**Optional Enhancements**
- Mega-menu for Destinations (listing the five villages)
- Slim sub-row tagline: *Guides • Reviews • Stories • Practical Advice*

---

## 1) Hero Feature (Full Width)

**Purpose:** Cinematic editorial opener.

- Full-bleed hero image (70vh desktop / 55vh mobile)
- Background: Cinque Terre coastline, golden hour
- Gradient overlay for text readability

**Hero Content**
- Category label: *TRAVEL GUIDE*
- H1: **Cinque Terre**
- 2–3 sentence dek (romantic, informative)
- CTAs:
  - Primary: *Explore the Villages*
  - Secondary: *Plan a 3-Day Trip*

### Weather Widget (Glassmorphism)

- Anchored to the bottom edge of the hero
- Semi-transparent, blurred background
- Rounded corners, soft border, subtle shadow

**Content**
- Current weather: `18°C • Sunny`
- 3-day forecast: icons + temperature only  
  Example: ☀️ 19° | ⛅ 18° | 🌧 16°
- Mock data location: Monterosso

---

## 2) Featured Carousel (Evergreen Editorial Picks)

**Purpose:** Highlight timeless, high-value content.

- Horizontal carousel / swipe rail
- 8 cards with:
  - Image
  - Category badge
  - Headline
  - One-line dek

**Example Topics**
- The Perfect First-Timer Itinerary
- Best Time to Visit (and When to Skip)
- How to Hike the Sentiero Azzurro
- Most Scenic Viewpoints
- Beaches Worth the Detour
- Local Train & Ferry Cheatsheet
- A Food Lover’s Weekend
- Rainy-Day Plans That Still Feel Magical

---

## 3) Trending Now

**Purpose:** Fast-moving editorial highlights.

**Layout**
- Desktop:
  - Left: 1 large lead story
  - Right: 4 stacked secondary stories
- Mobile: vertical stack

**Each Card Includes**
- Image
- Category
- Headline
- Meta line (date + read time)

---

## 4) Village Selector

**Purpose:** Core destination gateway.

- Section title: *The Five Villages*
- Grid of 5 premium cards:
  - Monterosso al Mare
  - Vernazza
  - Corniglia
  - Manarola
  - Riomaggiore

**Each Card**
- Image
- Village name
- 1–2 line personality teaser
- Optional chips: Beaches / Views / Hikes / Food
- CTA: *Explore Village*

---

## 5) Places to Stay Spotlight

**Purpose:** Condé Nast Traveler–style hotel curation.

- 6-card grid
- Each card includes:
  - Image
  - Label: *Places to Stay*
  - Property name
  - One-line “why it’s special”
  - Price tier: $, $$, $$$
  - Village/location pill

**CTA:** *See all stays*

---

## 6) Where to Eat & Drink (Editors’ Picks)

**Purpose:** Curated culinary guidance.

- 6 compact recommendation cards
- Fields:
  - Name
  - Type tag (Seafood, Pesto, Wine Bar, Gelato, Aperitivo)
  - Village
  - Short blurb
- Optional map-pin icon

**CTA:** *See all restaurants*

---

## 7) Cinque Terre Highlights

**Purpose:** Signature experiences.

- 8 highlight cards with icons or images:
  - Coastal hikes & viewpoints
  - Boat tours & coves
  - Beaches & swimming
  - Photography spots
  - Sunset aperitivo
  - Day trip: Portovenere
  - Local festivals
  - Crowd-avoidance tips

---

## 8) Curated Escapes (Collections)

**Purpose:** Editorial collections.

- 2x2 large image tiles (desktop)
- Stacked layout (mobile)

**Collections**
- The Romantic Escape
- Family-Friendly Weekend
- Hikers’ Edition
- Food & Wine Weekend

---

## 9) Latest Stories (Blog Feed)

**Purpose:** Core magazine storytelling.

**Layout**
- 1 lead story
- 6 supporting stories

**Each Story Card**
- Headline
- Short intro (1–2 lines)
- Author avatar
- Author name
- Date
- Reading time
- Category badge

**Optional Filter Pills**
- All
- Guides
- Food
- Hotels
- News & Advice

---

## 10) Audio / Mini Guides

**Purpose:** Modern editorial extension.

- Section title: *Listen: Cinque Terre Stories*
- 3 audio cards with:
  - Cover image
  - Title
  - Short description
  - Duration badge
  - Play button (UI only)

---

## 11) Practical Advice Strip

**Purpose:** High-utility, premium-feeling guidance.

- Compact grid of advice cards:
  - Getting there
  - Getting around (train/ferry passes)
  - Crowd strategy
  - What to pack
  - Weather & safety notes

---

## 12) About Section

**Purpose:** Brand credibility + destination storytelling.

- Split layout: text + scenic image
- Include:
  - Mission statement
  - What readers gain from the site
  - Optional Editor’s Note with small avatar

---

## 13) Newsletter / Subscribe

**Purpose:** Conversion-focused editorial band.

- Background image or subtle gradient
- Headline: *Get the Cinque Terre Dispatch*
- Email input + Subscribe button
- Microcopy: *Weekly tips. No spam.*
- Optional lead magnet: *Free 3-Day Itinerary (PDF)*

---

## 14) Footer

**Purpose:** Magazine-style footer.

- Multi-column layout:
  - Explore
  - Villages
  - Guides
  - About
  - Social
- Newsletter repeat
- Legal links

---

## Visual & UX Principles

- Strong typographic hierarchy (editorial headlines + clean body text)
- Generous spacing and consistent vertical rhythm
- Rounded cards, soft shadows, subtle hover motion
- Minimal UI chrome, focus on imagery and content
- Coastal color palette (sea blues, warm neutrals)

---

## Suggested Content Models (Mock Data)

- `villages[]`
- `featuredStories[]`
- `trending[]`
- `stays[]`
- `eats[]`
- `highlights[]`
- `posts[]`
- `audio[]`

Each model should use realistic, editorial-quality copy (no lorem ipsum).

---

## Deliverables

- Astro components:
  - Header, Hero, WeatherWidget, SectionHeader
  - CardStory, CardVillage, CardStay, CardHighlight
  - Carousel, NewsletterBand, Footer
- Clean component composition
- Consistent Tailwind spacing, typography, and color tokens

---

*This document is intended to be directly usable by design, frontend, and content teams as a shared source of truth.*
