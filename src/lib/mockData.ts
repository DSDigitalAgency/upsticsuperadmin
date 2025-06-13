import { DashboardMetrics, AgencyRevenueMetrics, AdminMetrics } from './types'

export const mockDashboardMetrics: DashboardMetrics = {
  active_agencies: 47,
  monthly_revenue: 128450,
  total_users: 2341,
  system_uptime: 99.9,
  active_agencies_change: 2.1,
  monthly_revenue_change: 12.5,
  total_users_change: 5.4,
  system_uptime_status: 'Excellent'
}

export const mockRevenueMetrics: AgencyRevenueMetrics = {
  total_revenue: 1284500,
  monthly_revenue: 128450,
  quarterly_revenue: 385350,
  yearly_revenue: 1540800,
  revenue_by_agency: [
    {
      agency_id: '1',
      agency_name: 'NHS Trust London',
      revenue: 45000
    },
    {
      agency_id: '2',
      agency_name: 'Healthcare Solutions UK',
      revenue: 38000
    },
    {
      agency_id: '3',
      agency_name: 'MedStaff Pro',
      revenue: 32000
    },
    {
      agency_id: '4',
      agency_name: 'Care Recruitment Ltd',
      revenue: 28000
    },
    {
      agency_id: '5',
      agency_name: 'Health Partners',
      revenue: 25000
    },
    {
      agency_id: '6',
      agency_name: 'Premier Medical',
      revenue: 22000
    },
    {
      agency_id: '7',
      agency_name: 'Elite Healthcare',
      revenue: 18000
    }
  ]
}

export const mockAdminMetrics: AdminMetrics = {
  activeUsers: 2,
  newUsers: 2,
  usersByDate: [
    { date: "2025-01-06", active: 0, new: 0 },
    { date: "2025-01-07", active: 1, new: 1 },
    { date: "2025-01-08", active: 0, new: 0 },
    { date: "2025-01-09", active: 0, new: 0 },
    { date: "2025-01-10", active: 1, new: 0 },
    { date: "2025-01-11", active: 2, new: 1 },
    { date: "2025-01-12", active: 2, new: 2 }
  ],
  usersByRole: {
    client: 1,
    worker: 2,
    superadmin: 1
  },
  engagementRate: 50
} 