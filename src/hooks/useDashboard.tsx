'use client'

import { useState, useEffect, useCallback } from 'react'
import { dashboardService } from '@/lib/services/dashboard.service'
import { DashboardMetrics, AgencyRevenue } from '@/lib/types'
import { ApiError } from '@/lib/api'

interface UseDashboardReturn {
  metrics: DashboardMetrics | null
  revenueMetrics: AgencyRevenue[] | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useDashboard(): UseDashboardReturn {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [revenueMetrics, setRevenueMetrics] = useState<AgencyRevenue[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('Fetching dashboard data...')

      // Fetch dashboard metrics and revenue data in parallel
      const [metricsData, revenueData] = await Promise.allSettled([
        dashboardService.getMetrics(),
        dashboardService.getAgencyRevenue()
      ])

      // Handle dashboard metrics
      if (metricsData.status === 'fulfilled' && metricsData.value.success) {
        console.log('Dashboard metrics received:', metricsData.value)
        setMetrics(metricsData.value.data)
      } else if (metricsData.status === 'rejected') {
        console.error('Dashboard metrics failed:', metricsData.reason)
      }

      // Handle revenue metrics
      if (revenueData.status === 'fulfilled' && revenueData.value.success) {
        console.log('Revenue metrics received:', revenueData.value)
        setRevenueMetrics(revenueData.value.data)
      } else if (revenueData.status === 'rejected') {
        console.error('Revenue metrics failed:', revenueData.reason)
      }

      // Set error only if all requests failed
      if (metricsData.status === 'rejected' && revenueData.status === 'rejected') {
        setError('Failed to load any dashboard data')
      }

    } catch (err) {
      const apiError = err as ApiError
      console.error('Dashboard data fetch error:', apiError)
      setError(apiError.message || 'Failed to load dashboard data')
      
      // Don't set fallback data - force real API usage
      setMetrics(null)
      setRevenueMetrics(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const refetch = useCallback(async () => {
    await fetchDashboardData()
  }, [fetchDashboardData])

  return {
    metrics,
    revenueMetrics,
    isLoading,
    error,
    refetch
  }
} 