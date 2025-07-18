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
- **Migration Status**: Successfully migrated from Replit Agent to Replit environment (July 17, 2025)
- **Security**: Client-server separation implemented with robust security practices

## Recent Changes (July 18, 2025)

### Minimal Color Scheme Update
- **Accent Green Updated**: Changed accent green from multiple green variables to single strategic color #B2D2A4
- **Quick Action Buttons**: Removed green hover styling, now use black/white theme with hover:bg-black hover:text-white
- **Manual Investment Input**: Updated "Enter" button from green styling to black/white (bg-black text-white hover:bg-white hover:text-black)
- **Forum Room Cards**: Removed colored icons, standardized to text-black bg-gray-100 for all room types
- **Prayer Reminders Card**: Updated to use #B2D2A4 background with black text for better contrast
- **Investment Confirmation Button**: Updated to use #B2D2A4 background with black text for visibility
- **Strategic Accent Use**: Maintained #B2D2A4 for dashboard gain indicators and portfolio highlights on black backgrounds
- **CSS Cleanup**: Removed --accent-green-light and --accent-green-subtle variables, kept only strategic --accent-green

### Previous Changes (July 17, 2025)

### Enhanced NAV Performance Chart
- **Interactive Line Chart**: Replaced basic mock chart with fully interactive line chart
- **Time Horizon Selection**: Added 1W, 1M, 3M, 1Y period selection with backend support
- **Movable Guide Line**: Implemented vertical guide line that follows mouse movement
- **Real-time Tooltips**: Shows exact NAV value and formatted date on hover
- **Expanded Layout**: Increased card height to 240px with 120px chart area for better proportions
- **Visual Improvements**: Grey-toned color scheme (#666, #999, #333), subtle grid lines, area fill
- **Data Generation**: Enhanced backend with realistic NAV data generation (365 days with volatility)
- **Responsive Design**: Proper scaling and positioning for mobile-first approach

### Dashboard Card Layout Improvements
- **Increased Vertical Padding**: Enhanced all dashboard cards with improved padding (pt-6, pb-6)
- **Portfolio Overview**: Expanded height from 140px to 180px with increased padding (p-8) and proper enclosure of gain text
- **Asset Allocation**: Increased height from 180px to 200px with better spacing
- **Recent Transactions**: Enhanced height to 240px with improved content area (200px max-height)
- **Fund Summary**: Expanded to 180px min-height with proper padding
- **Vertical Scrolling**: Enhanced screen-content with proper overflow handling and extended bottom padding (100px)
- **Enhanced Card Spacing**: Increased spacing between cards from 8px to 24px (mt-6 mb-6) for better visual separation

### Scalability Considerations
- **Database**: Serverless PostgreSQL with connection pooling
- **Session Storage**: PostgreSQL-based session management
- **API Design**: RESTful with prepared endpoints for mobile app integration
- **Caching Strategy**: TanStack Query provides client-side caching with configurable TTL