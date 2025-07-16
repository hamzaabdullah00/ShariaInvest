# replit.md

## Overview

Barakah is a Shariah-compliant communal investment and social platform designed for the Indian Muslim middle-class community. This is a full-stack web application built with modern technologies that provides investment management, community features, prayer times, and NGO project support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme (olive, charcoal, gold, sand)
- **State Management**: TanStack Query (React Query) for server state management
- **Mobile-First Design**: Responsive design optimized for mobile devices

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API endpoints under `/api` prefix
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database serverless PostgreSQL
- **Migration Tool**: Drizzle Kit for schema migrations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Core Features
1. **Investment Management**: Investment tracking, NAV monitoring, portfolio overview
2. **Community Forums**: Room-based discussion forums with categorized topics
3. **Prayer Times**: Location-based Islamic prayer time display
4. **NGO Projects**: Zakat and donation project listings
5. **Multi-language Support**: English, Urdu, Hindi, Tamil, Telugu, Bengali

### UI Components
- **Bottom Navigation**: Five-tab navigation (Home, Invest, Dashboard, Community, Profile)
- **Investment Slider**: Interactive amount selection for investments
- **NAV Chart**: Performance visualization for investment funds
- **Prayer Times Card**: Daily prayer schedule display
- **Forum Room Cards**: Community discussion group listings

### Data Models
- **Users**: Authentication, KYC status, language preferences
- **Investments**: Fund investments with NAV tracking
- **Transactions**: Investment history and Zakat donations
- **Forum System**: Rooms and threaded discussions
- **NGO Projects**: Community donation targets
- **Prayer Times**: Location-based Islamic prayer schedules

## Data Flow

### Client-Server Communication
1. **API Requests**: TanStack Query manages all server communication
2. **Real-time Updates**: Automatic query invalidation and refetching
3. **Error Handling**: Centralized error management with toast notifications
4. **Loading States**: Built-in loading and skeleton states

### Authentication Flow
- Mock authentication system (user ID 1) for development
- Prepared for future JWT or session-based authentication
- KYC verification status tracking

### Investment Flow
1. User selects investment amount via slider
2. Current NAV price applied to calculate units
3. Investment record created with transaction history
4. Portfolio values updated in real-time

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TypeScript
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, Class Variance Authority
- **State Management**: TanStack React Query
- **Forms**: React Hook Form with Zod validation

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM, Neon Database serverless
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint, Prettier (implicit)
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **API Development**: Express server with TypeScript compilation via tsx
- **Database**: Neon Database with connection pooling

### Production Build
- **Frontend**: Vite production build to `/dist/public`
- **Backend**: esbuild bundle to `/dist/index.js`
- **Static Assets**: Served by Express in production mode
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Replit Integration
- **Runtime Error Overlay**: Development error modal integration
- **Cartographer Plugin**: Replit-specific development tools
- **Banner Integration**: Development environment identification
- **Migration Status**: Successfully migrated from Replit Agent to Replit environment (July 16, 2025)
- **Security**: Client-server separation implemented with robust security practices

### Scalability Considerations
- **Database**: Serverless PostgreSQL with connection pooling
- **Session Storage**: PostgreSQL-based session management
- **API Design**: RESTful with prepared endpoints for mobile app integration
- **Caching Strategy**: TanStack Query provides client-side caching with configurable TTL