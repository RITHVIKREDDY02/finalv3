# TASHANWIN VIP Prediction App

## Overview

TASHANWIN is a web-based VIP prediction application focused on lottery gaming entertainment. The app provides prediction games including Win Go and Trx Wingo games, built as a modern single-page application with a React frontend and Express backend. The application follows a full-stack architecture with PostgreSQL database integration and is designed for mobile-first gaming experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom gaming theme colors and CSS variables
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with ESM module support and hot module replacement

### Backend Architecture
- **Runtime**: Node.js with TypeScript and ESM modules
- **Framework**: Express.js with RESTful API design
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Built-in storage interface with memory storage implementation
- **API Structure**: RESTful endpoints with `/api` prefix and standardized error handling

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless database connection
- **ORM**: Drizzle ORM with type-safe schema definitions and migrations
- **Schema Management**: Centralized schema definitions in `shared/schema.ts`
- **Database Migrations**: Drizzle Kit for schema migrations and database synchronization

### Authentication and Authorization
- **User Schema**: Basic user model with username/password authentication
- **Session Storage**: Cookie-based sessions with PostgreSQL session store
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
- **User Management**: CRUD operations for user creation and retrieval

### Development and Build Process
- **Development**: Concurrent frontend (Vite) and backend (tsx) development servers
- **Build Process**: Vite for frontend bundling and esbuild for backend compilation
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Hot Reload**: Vite HMR for frontend and tsx watch mode for backend

### UI/UX Design Patterns
- **Design System**: Consistent component library with variant-based styling
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities
- **Gaming Theme**: Custom color scheme with gold accents and dark backgrounds
- **Component Architecture**: Composable UI components with proper TypeScript typing

## External Dependencies

### Database Services
- **@neondatabase/serverless**: Neon PostgreSQL serverless database connection
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Database migration and schema management tool
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **clsx**: Utility for constructing className strings conditionally

### Frontend Framework Dependencies
- **react**: Core React library for UI development
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Form validation resolvers

### Development Tools
- **vite**: Frontend build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for backend compilation
- **@replit/vite-plugin-***: Replit-specific development plugins

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **zod**: Runtime type validation and schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **lucide-react**: Icon library with React components