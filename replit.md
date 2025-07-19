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

## Recent Changes (July 19, 2025)

### Halal Investment Portfolio Restructure (Latest)
- **Investment Listing Page**: Replaced single-fund layout with comprehensive list of 5 halal fund options
- **Fund Options Added**: Sukuk Income Fund, Islamic Equity Fund, Shariah-compliant ETF, Halal Balanced Fund, Islamic Money-Market Fund
- **Fund Detail Pages**: Individual pages for each fund with investment slider, manual input, NAV charts, asset allocation
- **Enhanced My Investments Card**: Updated home page card with black background, white text, displaying Current Value, Total Investment, and CAGR
- **Portfolio Metrics**: Real-time calculation of portfolio performance with 8.5% annual growth simulation
- **Explore More Funds Section**: Added separate section for additional fund discovery
- **Investment Slider Fix**: Resolved component interface issues causing JavaScript errors
- **Routing Updates**: Added `/fund/:id` routes for individual fund detail pages
- **Performance Highlights**: Used #B2D2A4 green for positive CAGR displays, maintaining black/white theme elsewhere

### Migration Success
- **Replit Environment**: Successfully migrated from Replit Agent to standard Replit environment with all functionality preserved
- **Database Integration**: Halal funds data structure added to schema with proper API endpoints
- **Component Architecture**: Fixed investment slider component interface for proper fund detail page functionality

## Previous Changes (July 18, 2025)

### Home Page Redesign as Main Dashboard (Latest)
- **Complete UI Overhaul**: Redesigned home page as main dashboard with 4 equally-sized cards
- **New Page Structure**: 
  - My Investments (/investments) - Contains all previous dashboard content: NAV chart, asset allocation, recent transactions, fund summary
  - My Mosque (/mosque) - Prayer times, live Azaan, fundraising tracker, announcements, dua requests, mosque finder
  - My Communities (/community) - Links to existing discussion forums page
  - My Causes (/causes) - User's supported causes with explore all causes functionality
- **Clean Design**: Black/white minimalist cards with consistent 120px height, proper spacing, and hover effects
- **Removed Elements**: Eliminated prayer times card, quick actions block, and recent activity from home page
- **Navigation Update**: Added new routes to App.tsx for seamless navigation between sections
- **Mobile Optimized**: Cards are touch-friendly with proper padding and responsive layout

### Interactive Mosque Finder Implementation
- **Prayer Times Integration**: Moved mosque finder functionality to Prayer Times card only
- **Dynamic Map Integration**: Added expandable mosque finder with OpenStreetMap integration using React Leaflet
- **Geolocation Services**: Automatic user location detection with fallback to Mumbai coordinates
- **Nearby Mosque Discovery**: Mock API implementation for finding mosques within radius (ready for real Places API)
- **Interactive Map Features**: Clickable markers, popup information, and real-time mosque selection
- **Route Directions**: Direct integration with Google Maps for turn-by-turn navigation
- **Responsive Layout**: Map expands below Prayer Times card, pushing subsequent content downward
- **Quick Actions Update**: Replaced mosque button with Dashboard button linking to /dashboard
- **Community Button Update**: Changed "Create New Room" to "Register Your Cause"
- **Error Handling**: Graceful fallbacks for location access denied and network errors
- **Mobile Optimized**: Touch-friendly interface with appropriate sizing for mobile screens

### Minimal Color Scheme Update
- **Green Color Restriction**: Removed green from all UI elements except gain percentage displays
- **Gain Indicators Only**: Applied #18A558 exclusively to +7.40% and +2.48% gain displays
- **Quick Action Buttons**: Use pure black/white theme with hover:bg-black hover:text-white  
- **Manual Investment Input**: Black/white styling (bg-black text-white hover:bg-white hover:text-black)
- **Forum Room Cards**: Standardized to text-black bg-gray-100 for all room types
- **Prayer Reminders Card**: Changed from green to neutral bg-gray-100
- **Investment Confirmation Button**: Changed from green to black/white styling
- **CSS Update**: Replaced --accent-green with --gain-green: #18A558 for specific gain displays only
- **Pure Minimal Design**: Dominant black/white theme with green restricted to financial gains only

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