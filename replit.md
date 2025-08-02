# TASHAN WIN VIP PREDICTION

## Project Overview
A dynamic prediction/lottery gaming platform with user registration and approval system. Users must register with their UID and get admin approval before accessing VIP prediction features.

## Recent Changes
- **2025-02-02**: Implemented UID-based registration system with PostgreSQL database
- **2025-02-02**: Created registration flow that stores UID in browser localStorage
- **2025-02-02**: Added approval workflow where admin can approve users via API
- **2025-02-02**: Integrated registration check into game card click handlers
- **2025-02-02**: Added admin panel at `/admin` with user management and game on/off controls
- **2025-02-02**: Implemented "Coming Soon" dialog for disabled games with #FED358 background
- **2025-02-02**: Created game configuration system to enable/disable individual games
- **2025-02-02**: Updated navbar to show "UID: [approved_uid]" instead of "JOIN VIP" for approved users
- **2025-02-02**: Implemented complete Wingo prediction system with 4 variants (30sec, 1min, 3min, 5min)
- **2025-02-02**: Created Wingo page at `/wingo` with real-time predictions and results
- **2025-02-02**: Integrated advanced trend analysis algorithm based on provided prediction code
- **2025-02-02**: Added Win Go → Wingo page navigation for approved users
- **2025-02-02**: Updated Wingo page to card-based layout matching user's design sample
- **2025-02-02**: Created individual pages for each Wingo variant with dedicated APIs and timers
- **2025-02-02**: Updated Wingo game names from "Parity/Sapre/Bcone/Emerd" to proper format "Wingo 30Sec/1Min/3Min/5Min"
- **2025-02-02**: Enhanced game history design with new color scheme: rgb(56, 46, 53) backgrounds and #ffd05a accents
- **2025-02-02**: Redesigned game history from card-based to compact table-style layout
- **2025-02-02**: Added WIN/LOSS result badges and enhanced predicted vs actual comparison display
- **2025-02-02**: Removed timestamp displays from game history for cleaner interface
- **2025-02-02**: **MAJOR**: Integrated real ar-lottery01.com APIs for all 4 Wingo variants
- **2025-02-02**: **MAJOR**: Implemented live prediction algorithm from provided Python code
- **2025-02-02**: **MAJOR**: Connected to live data sources with real period numbers and results
- **2025-02-02**: Added real countdown calculation based on actual period end times
- **2025-02-02**: **TIMER UPDATE**: Implemented IST (Indian Standard Time) display across all Wingo variants
- **2025-02-02**: Added real-time IST clock alongside countdown timers in all pages (30sec, 1min, 3min, 5min)
- **2025-02-02**: **MAJOR TIMING SYNC**: Implemented synchronized countdown timers across all Wingo variants
- **2025-02-02**: All timers now reset at minute boundaries: 30sec (twice per minute), 1min (once per minute), 3min/5min (hourly intervals)
- **2025-02-02**: Updated backend prediction service to calculate synchronized countdowns based on minute/hour boundaries
- **2025-02-02**: Frontend timers now synchronized with server-side timing calculations for consistent user experience
- **2025-02-02**: **GAME HISTORY FIXES**: Fixed color classification bug where SMALL numbers showed incorrect colors
- **2025-02-02**: **DATABASE INTEGRITY**: Added unique constraints to prevent duplicate predictions on page refresh
- **2025-02-02**: **PENDING PREDICTIONS**: Implemented complete pending prediction display in game history
- **2025-02-02**: **DATA VERIFICATION**: Confirmed all prediction data is authentic and synchronized with live ar-lottery01.com API

## User Preferences
- Store UID in browser localStorage to avoid repeated registration
- Show registration page on first card click
- Once registered and approved, allow direct access to VIP prediction features
- Provide clear status indicators for approval process

## Project Architecture

### Database Schema
- **users table**: id (UUID), uid (unique text), approved (boolean), createdAt (timestamp)
- **gameConfig table**: id (UUID), gameName (unique text), isEnabled (boolean), createdAt, updatedAt
- Uses PostgreSQL with Drizzle ORM
- Database storage class replaces memory storage

### Frontend Structure
- **Home page**: Main landing page with game cards and navigation
- **Register page**: UID registration form with instructions  
- **VIP Prediction page**: Status checking and access control
- **Wingo page**: Real-time prediction system with 4 time variants
- Navigation handled through Wouter routing and state management

### Backend API Endpoints
- `POST /api/register`: Register new user with UID
- `GET /api/user/:uid`: Check user registration status
- `PATCH /api/approve/:uid`: Admin endpoint to approve users
- `GET /api/admin/users`: Get all registered users (admin only)
- `GET /api/admin/games`: Get all game configurations
- `PATCH /api/admin/games/:gameName`: Enable/disable specific games
- `GET /api/wingo/variants`: Get available Wingo game variants
- `GET /api/wingo/prediction/:variant`: **LIVE** real-time prediction using ar-lottery01.com APIs
- `GET /api/wingo/results/:variant`: **LIVE** recent results from ar-lottery01.com APIs

### Live API Integration
- **30sec**: `draw.ar-lottery01.com/WinGo/WinGo_30S.json` & `WinGo_30S/GetHistoryIssuePage.json`
- **1min**: `draw.ar-lottery01.com/WinGo/WinGo_1M.json` & `WinGo_1M/GetHistoryIssuePage.json`
- **3min**: `draw.ar-lottery01.com/WinGo/WinGo_3M.json` & `WinGo_3M/GetHistoryIssuePage.json`  
- **5min**: `draw.ar-lottery01.com/WinGo/WinGo_5M.json` & `WinGo_5M/GetHistoryIssuePage.json`

### Key Features
1. **Registration Flow**: Users register once with UID, stored in localStorage
2. **Approval System**: Admin approval required before accessing predictions
3. **Status Polling**: VIP prediction page polls for approval status every 5 seconds
4. **Persistent Storage**: UID stored in browser prevents repeated registration
5. **Game Integration**: All game cards trigger registration check
6. **Admin Panel**: Hidden at `/admin` with user management and game controls
7. **Game Management**: Enable/disable games with "Coming Soon" dialog for disabled games
8. **Dynamic UI**: Games show coming soon alert when disabled by admin
9. **Navbar Status**: Shows "UID: [number]" for approved users instead of "JOIN VIP"
10. **Wingo Predictions**: Real-time BIG/SMALL predictions with 4 time variants
11. **Trend Analysis**: Advanced algorithm analyzing last 10 results with weighted scoring
12. **Live Results**: Auto-refreshing results display with timestamp information

### Technical Stack
- Frontend: React, TypeScript, Wouter routing, TanStack Query, shadcn/ui
- Backend: Express.js, TypeScript
- Database: PostgreSQL with Drizzle ORM
- Authentication: UID-based with admin approval workflow

## Current Status
- Registration system fully implemented
- Database schema deployed with game configuration table
- Frontend components created with proper state management
- API endpoints functional
- Game card integration complete
- Admin panel implemented with user management and game controls
- Game enable/disable functionality working
- Coming soon dialog implemented for disabled games
- Navbar shows approved UID status correctly
- Wingo prediction system fully operational with 4 variants
- Real-time prediction API with trend analysis algorithm
- Win Go game card redirects approved users to Wingo page
- Wingo page displays live predictions, results, and game instructions

## Game Names (Frontend)
**Lottery Games**: Win Go, Trx Wingo, K3, Moto Racing
**Mini Games**: Mines Pro, Mines, Boom, Aviator, Limbo

## Next Steps
- Connect Wingo service to real API endpoints (requires API credentials)
- Implement remaining game prediction features for other games
- Add user statistics and win/loss tracking
- Consider adding more admin features like user activity monitoring
- Integrate actual Telegram bot for result notifications