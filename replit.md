# TASHAN WIN VIP PREDICTION

## Project Overview
A dynamic prediction/lottery gaming platform with user registration and approval system. Users must register with their UID and get admin approval before accessing VIP prediction features.

## Recent Changes
- **2025-02-02**: Implemented UID-based registration system with PostgreSQL database
- **2025-02-02**: Created registration flow that stores UID in browser localStorage
- **2025-02-02**: Added approval workflow where admin can approve users via API
- **2025-02-02**: Integrated registration check into game card click handlers

## User Preferences
- Store UID in browser localStorage to avoid repeated registration
- Show registration page on first card click
- Once registered and approved, allow direct access to VIP prediction features
- Provide clear status indicators for approval process

## Project Architecture

### Database Schema
- **users table**: id (UUID), uid (unique text), approved (boolean), createdAt (timestamp)
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

### Key Features
1. **Registration Flow**: Users register once with UID, stored in localStorage
2. **Approval System**: Admin approval required before accessing predictions
3. **Status Polling**: VIP prediction page polls for approval status every 5 seconds
4. **Persistent Storage**: UID stored in browser prevents repeated registration
5. **Game Integration**: All game cards trigger registration check

### Technical Stack
- Frontend: React, TypeScript, Wouter routing, TanStack Query, shadcn/ui
- Backend: Express.js, TypeScript
- Database: PostgreSQL with Drizzle ORM
- Authentication: UID-based with admin approval workflow

## Current Status
- Registration system fully implemented
- Database schema deployed
- Frontend components created with proper state management
- API endpoints functional
- Game card integration complete

## Next Steps
- Fix LSP diagnostics in frontend components
- Add admin panel for user approval management
- Implement actual VIP prediction features
- Add more detailed error handling and user feedback