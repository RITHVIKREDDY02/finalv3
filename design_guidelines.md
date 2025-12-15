# Gaming VIP Prediction App - Design Guidelines

## Design Approach
**Reference-Based:** Premium gaming platforms (CS:GO marketplace, Valorant UI, esports betting) with modern dark web app standards. Focus on credibility, premium feel with gaming edge.

## Core Design Elements

### Typography
- **Primary Font:** Inter via Google Fonts CDN
- **Hierarchy:**
  - Page Titles: 3xl-4xl, font-bold, tracking-tight
  - Promo Headlines: 2xl-3xl, font-bold with gold gradient effect
  - Section Headers: xl-2xl, font-semibold
  - Body Text: base-lg, font-normal, leading-relaxed
  - Form Labels: sm-base, font-medium
  - Legal/Fine Print: xs-sm, font-normal, text-gray-400

### Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 24
- Mobile section spacing: py-8 to py-12
- Desktop section spacing: py-16 to py-24
- Container widths: max-w-md for forms, max-w-4xl for content pages

### Component Library

**Navigation Bar:**
- Fixed top, dark background (bg-gray-900) with border-b border-gray-800
- Logo left, links right
- Gold (#FFB800) hover states
- Mobile: Hamburger with slide-in panel

**Hero Sections:**
- Height: 60-70vh (not full viewport)
- Dark gradient backgrounds with gaming texture overlays
- Buttons on images: Use backdrop-blur-md with gold glow, no additional hover states

**Form Components:**
- Input fields: Dark backgrounds (bg-gray-800), border-gray-700, rounded-lg, p-3-4
- Focus state: Gold border (border-gold-500), subtle glow
- Labels: Above inputs, mb-2, font-medium
- Error states: Red border with error text below
- Submit buttons: Large, full-width on mobile, gold/orange gradient background

**Promotional Banners:**
- Dark card with gold left border (border-l-4)
- Icon left (gift box, rupee symbol via Heroicons)
- Bold reward amount in larger text with gold color
- Background: Subtle geometric pattern overlay

**Warning/Legal Boxes:**
- Gold border-l-4
- Dark background (bg-gray-900/80)
- Icon left (Heroicons info circle)
- mb-6 spacing

**Footer:**
- 3-4 columns desktop, stack mobile
- Dark with border-t border-gray-800
- Quick links, legal, social icons, contact
- Copyright with gold accent

### Icons
**Library:** Heroicons via CDN
- Use outline style for navigation and forms
- Solid style for promotional badges and warnings

## Page-Specific Structures

### Registration Page

**Layout:**
- Split screen on desktop (lg:grid-cols-2)
- Left: Hero image with promotional messaging overlay
- Right: Registration form
- Mobile: Stack vertically (image top, form bottom)

**Hero Section (Left Panel):**
- Full-height image: Abstract gaming VIP dashboard with glowing prediction charts, VIP badges, gold geometric patterns
- Dark overlay (bg-gradient-to-br from-black/60 to-black/40)
- Centered content overlay with:
  - App logo/branding
  - Tagline about VIP predictions
  - Floating promotional card highlighting "500 rupees reward"
  - Trust indicators (user count, success rate badges)

**Form Section (Right Panel):**
- Centered vertically, max-w-md container, px-8
- Promotional banner at top:
  - Gift icon + "Register Now and Get Upto 500 rupees Sign Up Reward"
  - Gold text for amount, subtle pulse animation on icon
  - Dark card background with gold border-l-4
- Registration form fields:
  - Full Name (single input)
  - Email Address (with validation icon)
  - Phone Number (with country code dropdown)
  - Password (with strength indicator)
  - Confirm Password
  - Referral Code (with "Have a code?" expandable section)
  - Terms checkbox with gold checkmark
- Submit button: "Create Account" - gold gradient, full-width, py-3, font-semibold
- Social registration divider: "or continue with"
- Social buttons: Google, Facebook icons (2-column grid)
- Login link: "Already have an account? Sign in" centered below
- Legal disclaimer text at bottom (xs text, gray-400)

**About Us, Disclaimer, Warning Pages:**
- Hero with mission/legal messaging (60-70vh)
- Single column content, max-w-4xl
- Dark cards for sections with p-8-12
- Gold left border on important blocks
- Footer on all pages

### Images Required

1. **Registration Hero (1200x1600px):** Premium VIP gaming interface with glowing charts, prediction graphs, gold VIP emblems, abstract data visualization - dark theme with gold/orange highlights
2. **About Us Hero (1920x800px):** Gaming dashboard with VIP elements, data streams
3. **Disclaimer Hero (1920x800px):** Legal scales with gaming controller, professional gaming theme
4. **Warning Hero (1920x800px):** Alert symbol with prediction graphs, dark red-orange glow

All images: Dark-themed, gold (#FFB800) and orange (#FF6B35) color grading, semi-transparent overlays for text readability.

## Visual Standards
- **Backgrounds:** Gray-950, Gray-900, Gray-800 layers
- **Text:** White, Gray-100, Gray-300 hierarchy  
- **Accents:** Gold (#FFB800), Orange (#FF6B35) for CTAs, highlights
- **Borders:** Gray-700/50 for separation
- **Shadows:** shadow-xl with subtle gold tint on cards
- **Animations:** Minimal - subtle fade-in on scroll, 200-300ms transitions on hover only
- **Accessibility:** High contrast on dark backgrounds, 18px+ body text
- **Grid:** 8px alignment, mobile-first responsive (sm, md, lg, xl)