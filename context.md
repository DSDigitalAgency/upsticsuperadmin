# Healthcare Recruitment SaaS Platform - Development Context

## Project Overview
Building a white-labelled healthcare recruitment SaaS platform with multiple user roles and comprehensive functionality for managing healthcare staffing across the UK market.

## Core User Roles
1. **Super Admin** - Platform owner with global controls
2. **Admin** - Agency/organization management (includes recruiter functions)
3. **Client** - Hospitals/clinics posting job requests
4. **Worker** - Healthcare professionals seeking work

## Development Steps

### Step 1: Public Pages (SaaS Website)
- [ ] **Task 1.1**: Project setup and basic structure
  - Initialize Next.js project with TypeScript
  - Configure Tailwind CSS with blue color scheme
  - Setup basic folder structure
  - Install necessary dependencies (shadcn/ui, etc.)

- [ ] **Task 1.2**: Public website layout
  - Header with navigation and CTA buttons
  - Footer with links and contact info
  - Responsive layout components

- [ ] **Task 1.3**: Landing page
  - Hero section with value proposition
  - Features overview section
  - Benefits for different user types
  - Testimonials/social proof section
  - Pricing plans section
  - CTA sections

- [ ] **Task 1.4**: Additional public pages
  - About Us page
  - Features detailed page
  - Pricing page
  - Contact Us page
  - Terms & Conditions
  - Privacy Policy

- [ ] **Task 1.5**: Authentication pages
  - Login page (multi-role)
  - Sign up pages for different user types
  - Password reset functionality
  - Email verification mockup

### Step 2: Super Admin Portal
- [ ] **Task 2.1**: Super Admin dashboard
  - Platform overview with KPIs
  - Agency management interface
  - User analytics and metrics
  - Revenue and subscription tracking

- [ ] **Task 2.2**: Agency management
  - List/grid view of all agencies
  - Add/edit agency functionality
  - White labelling controls per agency
  - Agency status monitoring
  - Subscription and billing management

- [ ] **Task 2.3**: Platform settings
  - Global platform configuration
  - Feature toggles per agency
  - System-wide defaults
  - Compliance and audit logs

### Step 3: Admin (Agency) Portal
- [ ] **Task 3.1**: Admin dashboard
  - Agency-specific KPIs and metrics
  - Quick actions (post job, add candidate, add client)
  - Recent activity feed
  - Team performance overview

- [ ] **Task 3.2**: Staff and user management
  - Add/edit staff users (compliance officers, managers)
  - Role assignment and permissions
  - Branch management (if multi-branch)
  - Activity monitoring

- [ ] **Task 3.3**: Candidate management (Recruiter functions)
  - Candidate profiles and database
  - Document management and compliance tracking
  - Candidate search and filtering
  - Pipeline management (shortlisted → interview → offer → placed)
  - Interview scheduling and coordination

- [ ] **Task 3.4**: Job and shift management
  - Create/edit job postings
  - Job templates for recurring positions
  - Calendar view for shifts
  - Job matching and candidate suggestions
  - Bulk operations

- [ ] **Task 3.5**: Client relationship management
  - Client profiles and contracts
  - Rate cards and pricing
  - Communication and notes
  - Client portal access management

- [ ] **Task 3.6**: Timesheet and invoicing
  - Timesheet approval workflow
  - Invoice generation and management
  - Payment tracking
  - Financial reporting

### Step 4: Client Portal
- [ ] **Task 4.1**: Client dashboard
  - Job request overview
  - Active placements tracking
  - Upcoming shifts calendar
  - Quick actions

- [ ] **Task 4.2**: Job request system
  - Raise new job request form
  - Request templates functionality
  - Request status tracking
  - Bulk requests

- [ ] **Task 4.3**: Candidate review and selection
  - Candidate profile preview
  - Shortlist/reject functionality
  - Interview scheduling
  - Feedback and ratings

- [ ] **Task 4.4**: Timesheet approval
  - Pending timesheets review
  - Digital approval workflow
  - Timesheet history and reports

- [ ] **Task 4.5**: Communication and support
  - Chat with agency staff
  - Notification preferences
  - Help and support system

### Step 5: Worker Portal
- [ ] **Task 5.1**: Worker dashboard
  - Personal overview (upcoming shifts, applications)
  - Compliance status display
  - Quick actions (apply, update availability)
  - Earnings summary

- [ ] **Task 5.2**: Pre-onboarding and profile setup
  - Registration and role selection
  - Document upload interface
  - Compliance checklist
  - Professional registration validation
  - Skills assessment

- [ ] **Task 5.3**: Job search and applications
  - Job search with smart filters
  - One-click application system
  - Application status tracking
  - Job matching notifications

- [ ] **Task 5.4**: Availability and scheduling
  - Weekly availability calendar
  - Preferred locations setup
  - Shift management
  - Unavailable dates blocking

- [ ] **Task 5.5**: Timesheet and payments
  - Digital timesheet submission
  - Photo upload for evidence
  - Payment history and tracking
  - Expense management

## Design Guidelines
- **Primary Color**: Blue (#0066CC or similar professional blue)
- **Secondary Colors**: Light blue, gray, white
- **Style**: Clean, professional, healthcare-focused
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance

## Mock Data Requirements

### Healthcare-Specific Data
- NHS grades and bands (FY1/FY2, ST1-ST8, Band 2-9)
- Professional registration bodies (NMC, GMC, HCPC, etc.)
- Healthcare roles (Nurses, Doctors, HCAs, Allied Health)
- UK NHS Trusts and private healthcare facilities
- Compliance documents (DBS, Right to Work, etc.)
- Sample agencies with different branding
- Mock candidates with various specialties
- Job postings across different healthcare settings

## Technical Stack
- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand
- **Mock Data**: JSON files and local storage
- **Charts**: Recharts
- **Calendar**: react-big-calendar
- **File Upload**: react-dropzone
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Development Priority
1. **Step 1**: Public Pages (Start here)
2. **Step 2**: Super Admin Portal
3. **Step 3**: Admin Portal (includes recruiter functions)
4. **Step 4**: Client Portal
5. **Step 5**: Worker Portal

## Next Steps
Start with Task 1.1 - Project setup and basic structure, then build the public SaaS website pages with professional blue design theme. 