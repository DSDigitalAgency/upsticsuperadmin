# Healthcare Recruitment SaaS - Super Admin Portal

A modern, professional Next.js application for managing healthcare recruitment agencies on a SaaS platform. Built with TypeScript, Tailwind CSS, and a focus on clean, accessible design.

## Features

### 🏥 Healthcare-Focused Design
- Professional blue color scheme (#0066CC)
- Healthcare recruitment specific UI components
- NHS-compliant design patterns
- Responsive, mobile-first approach

### 📊 Super Admin Dashboard
- **Platform Overview**: Real-time KPIs and metrics
- **Revenue Analytics**: Monthly revenue trends and performance
- **Agency Performance**: Top-performing agencies ranking
- **System Monitoring**: Uptime, API usage, and system health
- **Activity Feed**: Recent platform activities and alerts

### 🏢 Agency Management
- **Agency Onboarding**: Add and configure new agencies
- **Status Management**: Active, pending, suspended agencies
- **Subscription Control**: Manage plans and billing
- **Performance Tracking**: Revenue and user metrics per agency
- **Quick Actions**: Approve, review, suspend agencies

### 👥 User Management
- Multi-role user management (Admin, Recruiter, Compliance, etc.)
- Permission matrix and access control
- Activity monitoring and audit trails
- Bulk operations for user management

### ⚙️ Platform Settings
- White-labeling configuration
- Feature toggles per agency
- Global platform settings
- Compliance and regulatory controls

### 🔒 Security & Monitoring
- Real-time security alerts
- System performance monitoring
- Audit logs and compliance tracking
- API usage and rate limiting

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks (Zustand integration ready)
- **Development**: ESLint, TypeScript compiler

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── page.tsx         # Super Admin Dashboard
│   ├── agencies/        # Agency Management
│   ├── users/           # User Management
│   ├── settings/        # Platform Settings
│   └── security/        # Security & Monitoring
├── components/
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout components
└── lib/
    └── utils.ts         # Utility functions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd upsticsuperadmin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## Healthcare Recruitment Context

This platform is specifically designed for UK healthcare recruitment, supporting:

### NHS Grades and Bands
- **Doctor Grades**: FY1/FY2, SHO, ST1-ST8, SPR, SAS, Consultant
- **Nursing Bands**: Band 2-9 (NHS Agenda for Change)
- **Allied Health Professionals**: Various speciality bands
- **Support Staff**: Healthcare assistants and administrative roles

### Compliance Requirements
- Right to Work documentation
- DBS (Disclosure and Barring Service) checks
- Professional registration validation (NMC, GMC, HCPC)
- Mandatory training certificates
- Insurance and indemnity coverage

### UK Healthcare Facilities
- NHS Trusts and Foundation Trusts
- Private healthcare providers
- Care homes and nursing facilities
- Community healthcare services
- Mental health services

## Design System

### Colors
- **Primary**: Blue #0066CC (Professional healthcare blue)
- **Secondary**: Light blue, gray variations
- **Success**: Green #059669
- **Warning**: Yellow #D97706  
- **Error**: Red #DC2626

### Typography
- Clean, professional font stack
- Accessible contrast ratios (WCAG 2.1 AA)
- Consistent spacing and hierarchy

### Components
- Card-based layouts for information grouping
- Status badges for quick visual identification
- Progressive disclosure for complex data
- Accessible form controls and interactions

## Future Enhancements

- [ ] **Real-time Data**: WebSocket integration for live updates
- [ ] **Advanced Analytics**: Chart.js/Recharts integration
- [ ] **Multi-tenant Architecture**: Database per tenant support
- [ ] **API Integration**: RESTful API with authentication
- [ ] **Mobile App**: React Native companion app
- [ ] **Reporting**: PDF generation and export capabilities
- [ ] **Notifications**: Email, SMS, and in-app notifications
- [ ] **Audit System**: Comprehensive activity logging

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for healthcare recruitment professionals**
