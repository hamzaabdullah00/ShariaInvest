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

## Recent Changes (July 20, 2025)

### Donation Popup UI Enhancement (Latest Update)
- **Dialog Component Migration**: Updated donation popups to use shadcn Dialog component instead of custom overlay
- **Consistent Styling**: Applied same darkened transparent overlay (30% opacity) as hamburger menu and notifications
- **Improved Accessibility**: Added proper aria-describedby attributes and screen reader descriptions
- **Enhanced UX**: Background tap to close, proper centering, and smooth animation transitions
- **Scrollable Content**: Max height constraints with overflow handling for long lists
- **Fixed Data Access**: Corrected NGO data property references for funding percentage calculations

### My Causes 4-Tab Structure Implementation (Previous Update)
- **4-Tab Layout**: Implemented complete tab structure with My Causes, Explore All, Zakat Causes, and NGOs
- **My Causes Tab**: Shows user's supported causes with "Supporting" badges and impact tracking
- **Explore All Tab**: Links to Investment page Zakat section with "View All Donation Options" button
- **Zakat Causes Tab**: Lists Zakat-eligible causes with "View Supported Causes" button linking to investment impact
- **NGOs Tab**: Features NGO cards with donation and monthly SIP options
- **NGO Cards**: Display organization info, impact stats, categories, and dual action buttons (Donate Now/Start SIP)
- **Consistent Styling**: Applied black/white theme with proper card layouts and button styling
- **Navigation Integration**: Connected to investment page sections via URL parameters for seamless flow

### Navigation Structure Overhaul (Previous Update)
- **Bottom Navigation Update**: Changed from 5 to 4 icons (Invest → Home → Community → Causes)
- **Top Navigation Addition**: Added fixed top navigation bar with hamburger menu, logo, notifications, and profile
- **Removed Dashboard**: Eliminated dashboard page and navigation icon entirely  
- **Profile Relocation**: Moved profile icon from bottom nav to top right
- **Investment Navigation**: Invest icon now opens My Investments page instead of fund listing
- **Notifications System**: Added bell icon with unread count badge and sample notifications popup
- **Hamburger Menu**: Added three-bar menu with Technical Documentation, Disclaimer, Privacy Policy links
- **Dynamic Styling**: Top nav adapts colors (white on black backgrounds, black on white backgrounds)
- **Consistent Black/White Theme**: Applied minimalist styling throughout navigation elements

### My Communities Complete Redesign (Previous Update)
- **Removed "Register Your Cause" Button**: Eliminated the registration button from community page for cleaner interface
- **Comprehensive Community System**: Created full community management with user's joined communities list
- **Individual Forum Pages**: Clicking any community opens dedicated forum page with discussion threads
- **Member Panel System**: Added right sidebar showing online members with status indicators (black for online, gray for offline)
- **Member Management Dialog**: "View All" button opens popup showing complete member list with last seen times
- **Featured Communities Section**: Added curated community suggestions between Search and Trending sections
- **Consistent Black/White Styling**: Applied app-wide design standards with black headers, white content areas
- **Community Status Indicators**: Shows "Active now" for online communities, unread message counts in black badges
- **Three-Section Layout**: Your Communities → Search Communities → Featured Communities → Trending Discussions
- **Forum Thread Interface**: Discussion threads with pinned posts, reply counts, and last activity timestamps
- **Back Navigation**: Clean return flow from forum pages to main community list

### Zakat Donation Flow Refinement (Previous Update)
- **Button Activation Logic**: "Donate Now" button activates (turns black) when amount is entered, validates selections on click
- **Payment Screen Enhancement**: Full-page payment interface with UPI/Banking/Wallet options and transaction summary
- **Selection Validation**: Proper error handling requiring both amount entry and cause/NGO selection before payment
- **Form Reset on Completion**: Payment completion clears form fields for clean next donation experience
- **Amount Distribution Display**: Shows per-recipient amount calculation for transparent fund splitting

## Previous Changes (July 19, 2025)

### Home Page Dashboard Cards Redesign (Latest Update)
- **Uniform Dark Grey Background**: All cards (My Investments, My Mosque, My Communities, My Causes) now use consistent #1C1C1C background
- **Single-Line Layout Fix**: Ensured "Total Investment" label and value display on single line with whitespace-nowrap
- **Enhanced Vertical Balance**: Improved My Investment card spacing with better vertical distribution (pt-2, mt-1, mb-4, mt-3) for optimal breathing room
- **Perfect Left Alignment**: Removed icons from titles to ensure perfect left alignment between card titles and content text below
- **Dynamic Prayer Times**: Integrated real-time next prayer display in My Mosque card using actual prayer times API
- **Overlapping Circular Icons**: Implemented Google-style overlapping circular icons for communities and causes
  - My Communities: Shows FQ (Finance Q&A), UM (Urban Muslims), II (Islamic Investing), YM (Young Muslims), +2 more
  - My Causes: Shows CE (Children's Education), CR (Clean Water), WS (Water Sanitation), +3 more
- **Enhanced Card Content**: Added descriptive statistics (47 forum posts, ₹12,500 contributions) for better user engagement
- **Consistent Spacing**: Applied uniform padding (px-6) and gap spacing (gap-3) across all card elements
- **Mobile-Optimized**: Touch-friendly design with proper spacing and hover effects

### Consistent Black Header Styling Implementation (Previous Update)
- **Black Title Bars Only**: Applied black background exclusively to CardHeader sections (title bars) across all pages except main dashboard
- **Title Color Scheme**: Used #B2D2A4 for main titles and white for subtitles/descriptions within black headers
- **Card Body Preservation**: All card bodies remain white unless they were originally designed as full black cards
- **Original Black Cards Preserved**: Portfolio summary, dashboard overview, and profile header maintain their full black styling as intended
- **Complete Coverage**: Applied consistent styling to investments, causes, community, mosque, profile, and fund detail pages
- **Surgical Approach**: Only CardHeader components receive black styling, preserving the minimalist black/white design philosophy

### My Investments Three-Tab Layout Implementation (Previous)
- **Tab Structure**: Implemented three-tab layout matching My Causes design pattern with consistent styling
- **Tab 1: My Portfolio**: Shows Barakah Halal Fund heading, restored black portfolio summary card with Total Invested/Current Value/CAGR, NAV Performance chart, Fund Summary card, and expandable investment section with slider, manual input, and confirmation flow
- **Tab 2: Zakat**: Clean vertical flow with Calculate Zakat, Start Zakat SIP, impact summary, and donation options by NGO/Cause
- **Tab 3: Explore Funds (Phase 2)**: List of halal fund options with consistent card padding and design
- **Investment Flow**: Full-width black 'Invest Now' button opens investment section with auto-scroll to confirmation
- **Design Consistency**: Black/white minimalism with strategic #B2D2A4 accent for gains, matching overall app theme

### Halal Investment Portfolio Restructure (Previous)
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