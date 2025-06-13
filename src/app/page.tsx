'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building2, 
  Users, 
  DollarSign, 
  Activity,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  AlertCircle,
  PieChart,
  UserCheck,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useDashboard } from '@/hooks/useDashboard'
import { RevenueChart, TopAgenciesChart } from '@/components/charts/RevenueChart'
import { UserActivityChart, UserRoleChart, EngagementChart } from '@/components/charts/AdminMetricsChart'

export default function Dashboard() {
  const { isAuthenticated, isLoading: authLoading, redirectToLogin } = useAuth()
  const { metrics, revenueMetrics, isLoading: dashboardLoading, error, refetch } = useDashboard()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      redirectToLogin()
    }
  }, [isAuthenticated, authLoading, redirectToLogin])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Helper function to format currency
  const formatCurrency = (amount: number | undefined | null) => {
    if (amount === undefined || amount === null) {
      return 'N/A'
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'suspended':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your healthcare recruitment platform performance</p>
        </div>
        <button
          onClick={refetch}
          disabled={dashboardLoading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${dashboardLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {dashboardLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      )}

      {/* Agency Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Agencies</p>
                {metrics ? (
                  <>
                    <p className="text-2xl font-bold text-gray-900">{metrics.totalAgencies}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor('active')}`}>
                        {metrics.activeAgencies} Active
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor('pending')}`}>
                        {metrics.totalAgencies - metrics.activeAgencies} Pending
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">User Activity</p>
                {metrics ? (
                  <>
                    <p className="text-2xl font-bold text-gray-900">{metrics.activeUsers}</p>
                    <p className="text-xs text-gray-500">
                      {metrics.totalUsers} total users
                    </p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                {metrics ? (
                  <>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.monthlyRevenue)}</p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(metrics.totalRevenue)} total
                    </p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                {metrics ? (
                  <>
                    <p className="text-2xl font-bold text-gray-900 capitalize">{metrics.systemHealth.status}</p>
                    <p className="text-xs text-gray-500">
                      {metrics.systemHealth.uptime}% uptime
                    </p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!dashboardLoading && !revenueMetrics ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No revenue data available</p>
                </div>
              </div>
            ) : (
              <RevenueChart revenueMetrics={revenueMetrics} />
            )}
          </CardContent>
        </Card>

        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!dashboardLoading && !metrics ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <UserCheck className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No user activity data available</p>
                </div>
              </div>
            ) : (
              <UserActivityChart metrics={metrics} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-purple-600" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!dashboardLoading && !metrics ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No user distribution data available</p>
                </div>
              </div>
            ) : (
              <UserRoleChart metrics={metrics} />
            )}
          </CardContent>
        </Card>

        {/* Engagement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-orange-600" />
              Engagement Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!dashboardLoading && !metrics ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No engagement data available</p>
                </div>
              </div>
            ) : (
              <EngagementChart metrics={metrics} />
            )}
          </CardContent>
        </Card>

        {/* Agency Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
              Agency Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!dashboardLoading && !revenueMetrics ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Building2 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No agency performance data available</p>
                </div>
              </div>
            ) : (
              <TopAgenciesChart revenueMetrics={revenueMetrics} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Agency Status Table */}
      {revenueMetrics && revenueMetrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-600" />
              Agency Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Agency</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Monthly Revenue</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueMetrics.map((agency) => (
                    <tr key={agency.agencyId} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{agency.agencyName}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(agency.status)}`}>
                          {agency.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">{formatCurrency(agency.monthlyRevenue)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(agency.totalRevenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
