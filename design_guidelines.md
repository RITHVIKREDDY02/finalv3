# Gaming VIP Prediction App - Design Guidelines

## Design Approach
**Reference-Based:** Drawing from premium gaming platforms (CS:GO marketplace aesthetics, Valorant UI, esports betting interfaces) combined with modern dark web app standards. Focus on credibility and premium feel with gaming edge.

## Core Design Elements

### Typography
- **Primary Font:** Inter or Poppins (Google Fonts) - clean, modern, excellent readability
- **Hierarchy:**
  - Page Titles: 3xl-4xl, font-bold, tracking-tight
  - Section Headers: xl-2xl, font-semibold
  - Body Text: base-lg, font-normal, leading-relaxed (critical for legal text)
  - Labels/Meta: sm, font-medium, uppercase tracking-wide
  - Accents: Use gold/orange for VIP badges, warnings, key terms

### Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 24 (p-4, mb-8, py-16, etc.)
- Mobile: py-8 to py-12 section spacing
- Desktop: py-16 to py-24 section spacing
- Container: max-w-4xl for content pages (optimal reading width)
- Grid: Single column for legal text, 2-column for feature breakdowns

### Component Library

**Navigation Bar:**
- Fixed top, dark background with subtle border-b
- Logo left, page links center/right
- Gold/orange hover state on links
- Mobile: Hamburger menu with slide-in panel

**Hero Sections:**
- 60-70vh height (not full viewport)
- Dark gradient background with gaming texture overlay
- Large hero image: Abstract gaming elements (glowing geometric patterns, VIP badges, prediction graphs) - semi-transparent overlay
- Centered content: Page title + subtitle + optional accent decoration
- Buttons on image: backdrop-blur-md with gold/orange glow

**Content Sections:**
- Dark card containers (bg-gray-900/50 with border)
- Subtle gold/orange left border accent on important blocks
- Generous padding: p-8 to p-12
- Section dividers: thin horizontal lines with gradient

**Warning/Disclaimer Boxes:**
- Prominent gold/orange border-l-4
- Icon left (warning triangle, info circle)
- Dark background with slight transparency
- Bold heading, clear body text
- mb-6 spacing between boxes

**Footer:**
- Multi-column (3-4 columns desktop, stack mobile)
- Quick links, legal links, social icons, contact
- Dark with subtle top border
- Copyright with gold accent color

### Images

**Hero Images Required:**
1. **About Us:** Premium gaming dashboard visualization - glowing charts, VIP emblems, abstract data streams (dark with gold/orange highlights)
2. **Disclaimer:** Legal scales balanced with gaming controller/elements - professional yet gaming-themed (muted with gold accents)
3. **Warning:** Alert symbol with prediction graphs - serious tone with gaming aesthetic (dark red-orange glow)

All hero images: 1920x800px minimum, dark-themed with gold/orange color grading, semi-transparent overlay (bg-black/40) for text readability.

### Visual Treatments

**Dark Theme Palette:**
- Backgrounds: Gray-950, Gray-900, Gray-800 layers
- Text: White, Gray-100, Gray-300 hierarchy
- Accents: Gold (#FFB800) and Orange (#FF6B35) for CTAs, highlights, borders
- Borders: Gray-700/50 for subtle separation

**Depth & Elevation:**
- Subtle box shadows on cards: shadow-xl with gold tint
- Hero sections: Layered with gradient overlays
- Buttons: Slight elevation with glow effect on gold/orange

**Animations:** Minimal - subtle fade-in on scroll, smooth transitions (200-300ms) on hover states only.

## Page-Specific Structures

**About Us:**
- Hero with mission statement
- Company story (2-column: text + image/stats)
- Team/values cards (if applicable)
- VIP benefits showcase
- CTA section

**Disclaimer:**
- Hero with clear "Legal Information" messaging
- Organized sections with numbered headers
- Warning boxes for critical terms
- Table of contents (sticky sidebar optional)
- Last updated date prominently displayed

**Warning:**
- Attention-grabbing hero
- Bulleted risk factors in cards
- Responsible gaming resources
- Age verification statement
- Acceptance checkbox area styling

## Quality Standards
- Consistent 8px grid alignment
- Professional legal readability (18-20px body text minimum)
- High contrast for accessibility on dark backgrounds
- Premium gaming aesthetic without sacrificing credibility
- Mobile-first responsive breakpoints (sm, md, lg, xl)