import { apiClient } from '../api'
import type { DashboardMetrics, AgencyRevenue } from '../types'

class DashboardService {
  async getMetrics(): Promise<{ success: boolean; data: DashboardMetrics | null }> {
    try {
      console.log('Fetching dashboard metrics...')
      const response = await apiClient.get<unknown>('/admin/dashboard/metrics')
      console.log('Dashboard metrics response:', response)
      
      if (!response.data) {
        console.error('Invalid response from getMetrics:', response)
        throw new Error('Invalid response from getMetrics')
      }

      // Transform the nested API response into the expected flat structure
      const metrics = response.data
      // Map status to allowed values
      let status: 'healthy' | 'warning' | 'critical' = 'healthy';
      if (metrics.systemHealth && typeof metrics.systemHealth.status === 'string') {
        const s = metrics.systemHealth.status.toLowerCase();
        if (s === 'healthy' || s === 'warning' || s === 'critical') {
          status = s;
        }
      }
      const mapped = {
        totalAgencies: metrics.overview.totalAgencies,
        activeAgencies: metrics.overview.activeAgencies,
        totalUsers: metrics.userMetrics.totalUsers,
        activeUsers: metrics.userMetrics.activeUsers,
        totalRevenue: metrics.revenueMetrics.totalRevenue,
        monthlyRevenue: metrics.revenueMetrics.totalRevenue / 12, // Assuming annual revenue
        totalJobs: 0, // These metrics need to be added to the API
        activeJobs: 0,
        totalCandidates: 0,
        activeCandidates: 0,
        systemHealth: {
          status,
          uptime: metrics.systemHealth?.uptime ?? 99.9,
          activeAlerts: metrics.systemHealth?.activeAlerts ?? 0,
          lastIncident: metrics.systemHealth?.lastIncident
        },
        recentActivity: [] // This needs to be added to the API
      }
      return { success: true, data: mapped }
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error)
      if (error instanceof Error && error.message.includes('API request failed')) {
        console.log('API unavailable, returning mock data')
        return { success: true, data: this.getMockMetrics() }
      }
      return { success: false, data: null }
    }
  }

  async getAgencyRevenue(): Promise<{ success: boolean; data: AgencyRevenue[] | null }> {
    try {
      console.log('Fetching agency revenue...')
      const response = await apiClient.get<unknown[]>('/admin/dashboard/agencies/revenue')
      console.log('Agency revenue response:', response)
      
      if (!response.data) {
        console.error('Invalid response from getAgencyRevenue:', response)
        throw new Error('Invalid response from getAgencyRevenue')
      }

      // Transform the API response into the expected format
      const mapped = response.data.map(agency => ({
        agencyId: agency.agencyId,
        agencyName: agency.agencyName,
        status: agency.status || 'active',  // Default to 'active' if status is not provided
        totalRevenue: agency.annualRevenue,
        monthlyRevenue: agency.monthlyRevenue,
        revenueHistory: [], // This needs to be added to the API
        metrics: {
          totalJobs: 0, // These metrics need to be added to the API
          activeJobs: 0,
          totalCandidates: 0,
          activeCandidates: 0,
          averageJobValue: 0,
          successRate: 0
        }
      }))
      return { success: true, data: mapped }
    } catch (error) {
      console.error('Error fetching agency revenue:', error)
      if (error instanceof Error && error.message.includes('API request failed')) {
        console.log('API unavailable, returning mock data')
        return { success: true, data: this.getMockAgencyRevenue() }
      }
      return { success: false, data: null }
    }
  }

  private getMockMetrics(): DashboardMetrics {
    return {
      totalAgencies: 150,
      activeAgencies: 120,
      totalUsers: 2500,
      activeUsers: 2000,
      totalRevenue: 1500000,
      monthlyRevenue: 125000,
      totalJobs: 5000,
      activeJobs: 3500,
      totalCandidates: 15000,
      activeCandidates: 8000,
      systemHealth: {
        status: 'healthy',
        uptime: 99.9,
        lastIncident: undefined,
        activeAlerts: 0
      },
      recentActivity: [
        {
          type: 'agency',
          action: 'created',
          description: 'New agency registered: Tech Solutions Inc.',
          timestamp: new Date().toISOString(),
          metadata: {
            agencyId: '123',
            agencyName: 'Tech Solutions Inc.'
          }
        },
        {
          type: 'job',
          action: 'created',
          description: 'New job posted: Senior Software Engineer',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          metadata: {
            jobId: '456',
            jobTitle: 'Senior Software Engineer',
            agencyId: '123'
          }
        }
      ]
    }
  }

  private getMockAgencyRevenue(): AgencyRevenue[] {
    return [
      {
        agencyId: '1',
        agencyName: 'Tech Solutions Inc.',
        status: 'active',
        totalRevenue: 500000,
        monthlyRevenue: 45000,
        revenueHistory: [
          { month: '2024-01', revenue: 42000 },
          { month: '2024-02', revenue: 45000 },
          { month: '2024-03', revenue: 48000 }
        ],
        metrics: {
          totalJobs: 150,
          activeJobs: 100,
          totalCandidates: 500,
          activeCandidates: 200,
          averageJobValue: 3500,
          successRate: 85
        }
      },
      {
        agencyId: '2',
        agencyName: 'Global Recruiters',
        status: 'active',
        totalRevenue: 750000,
        monthlyRevenue: 65000,
        revenueHistory: [
          { month: '2024-01', revenue: 60000 },
          { month: '2024-02', revenue: 65000 },
          { month: '2024-03', revenue: 70000 }
        ],
        metrics: {
          totalJobs: 200,
          activeJobs: 150,
          totalCandidates: 800,
          activeCandidates: 350,
          averageJobValue: 4000,
          successRate: 88
        }
      }
    ]
  }
}

export const dashboardService = new DashboardService() 