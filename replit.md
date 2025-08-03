# TASHAN WIN VIP PREDICTION

## Overview
TASHAN WIN VIP PREDICTION is a dynamic prediction/lottery gaming platform designed to offer VIP prediction features to approved users. The platform incorporates a user registration and approval system, ensuring that only registered users with admin approval can access premium content. The project aims to provide real-time, authentic predictions for various lottery games, particularly Wingo and TRX Wingo, leveraging live data sources.

## User Preferences
- Store UID in browser localStorage to avoid repeated registration
- Show registration page on first card click
- Once registered and approved, allow direct access to VIP prediction features
- Provide clear status indicators for approval process

## System Architecture

### UI/UX Decisions
The platform features a clean, card-based layout for games. Disabled games display a "Coming Soon" dialog with a distinctive #FED358 background. The game history design uses a refined color scheme of rgb(56, 46, 53) backgrounds and #ffd05a accents, presented in a compact table-style layout with WIN/LOSS result badges. Approved users see their UID in the navbar, replacing the "JOIN VIP" prompt. User IDs in live player displays are masked (first 2 + xxxx + last 2 digits) for privacy.

### Technical Implementation
The frontend is built with React, TypeScript, Wouter for routing, and TanStack Query for data fetching. The backend uses Express.js with TypeScript. Data storage is in-memory using JavaScript Maps for users and game configurations, eliminating the need for a traditional database and enabling instant startup. Authentication is UID-based with an admin approval workflow. Performance is optimized through memoized API calls, fast polling with caching, rate limiting, and PM2 for process management with memory limits. The application is designed for deployment on a VPS (e.g., Ubuntu 24.04 LTS).

### Feature Specifications
- **Registration & Approval**: Users register with a unique UID, which is stored in browser localStorage. Access to VIP features requires admin approval.
- **Admin Panel**: Located at `/admin`, it allows administrators to manage users (approve/deny) and control game availability (enable/disable specific games). It is secured with token-based authentication and a login form.
- **Game Management**: Games can be individually enabled or disabled by the admin, displaying a "Coming Soon" message when disabled.
- **Wingo Prediction System**: Offers real-time BIG/SMALL predictions across four variants (30sec, 1min, 3min, 5min), integrated with live external APIs. Predictions are generated using a balanced, randomized algorithm.
- **TRX Wingo System**: Similar to Wingo, with four variants (1Min, 3Min, 5Min, 10Min), using external APIs with timestamp parameters.
- **Live Data & Timing**: All game data, including period numbers, results, and countdowns, are synchronized with live external API sources and displayed in IST. Timers are synchronized across all variants based on minute/hour boundaries.
- **Game History**: Displays pending predictions, authentic WIN/LOSS results, and comparative views of predicted vs. actual outcomes.
- **Performance Optimization**: Utilizes memoized fetching with caching for API calls (5s), user status polling (2s intervals with 10s caching), and automatic cache cleanup. Server generates initial predictions on startup and processes requests on-demand.

### System Design Choices
The system leverages an in-memory storage approach for lightweight operation and simplified deployment, suitable for session-based data. It prioritizes direct integration with live external lottery APIs to ensure data authenticity. The architecture is modular, separating frontend, backend, and API integrations for maintainability.

## External Dependencies
- **ar-lottery01.com APIs**: The primary external dependency for fetching live game data, including predictions, results, and period information for Wingo and TRX Wingo variants.
  - `draw.ar-lottery01.com/WinGo/WinGo_30S.json` and `WinGo_30S/GetHistoryIssuePage.json`
  - `draw.ar-lottery01.com/WinGo/WinGo_1M.json` and `WinGo_1M/GetHistoryIssuePage.json`
  - `draw.ar-lottery01.com/WinGo/WinGo_3M.json` and `WinGo_3M/GetHistoryIssuePage.json`
  - `draw.ar-lottery01.com/WinGo/WinGo_5M.json` and `WinGo_5M/GetHistoryIssuePage.json`

## Recent Changes
### August 3, 2025 - VPS Deployment Error Fix
**Issue**: VPS deployment failing with `ERR_MODULE_NOT_FOUND` errors due to ES module import issues.

**Solution Applied**:
- Updated `ecosystem.config.cjs` with ES module support (`--experimental-modules` flag)
- Created `package-production.json` with minimal production dependencies
- Fixed build process to properly handle ES module imports
- Increased memory limits from 256MB to 512MB
- Added comprehensive deployment documentation

**Files Modified**:
- `ecosystem.config.cjs` - PM2 configuration for ES modules
- `package-production.json` - Production-only dependencies
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `VPS_DEPLOYMENT_COMMANDS.txt` - Exact VPS commands
- `FIXED_DEPLOYMENT_SUMMARY.md` - Summary of fixes applied

**Result**: Deployment now works successfully without module import errors on VPS environments.