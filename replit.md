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
- **Home page**: Main landing page with game cards
- **Register page**: UID registration form with instructions
- **VIP Prediction page**: Status checking and access control
- Navigation handled through state management, not URL routing

### Backend API Endpoints
- `POST /api/register`: Register new user with UID
- `GET /api/user/:uid`: Check user registration status
- `PATCH /api/approve/:uid`: Admin endpoint to approve users
- `GET /api/admin/users`: Get all registered users (admin only)
- `GET /api/admin/games`: Get all game configurations
- `PATCH /api/admin/games/:gameName`: Enable/disable specific games

### Key Features
1. **Registration Flow**: Users register once with UID, stored in localStorage
2. **Approval System**: Admin approval required before accessing predictions
3. **Status Polling**: VIP prediction page polls for approval status every 5 seconds
4. **Persistent Storage**: UID stored in browser prevents repeated registration
5. **Game Integration**: All game cards trigger registration check
6. **Admin Panel**: Hidden at `/admin` with user management and game controls
7. **Game Management**: Enable/disable games with "Coming Soon" dialog for disabled games
8. **Dynamic UI**: Games show coming soon alert when disabled by admin

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

## Game Names (Frontend)
**Lottery Games**: Win Go, Trx Wingo, K3, Moto Racing
**Mini Games**: Mines Pro, Mines, Boom, Aviator, Limbo

## Next Steps
- Implement actual VIP prediction features
- Add more detailed error handling and user feedback
- Consider adding more admin features like user statistics