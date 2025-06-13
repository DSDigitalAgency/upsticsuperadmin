'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { DashboardMetrics } from '@/lib/types'

interface MetricsChartProps {
  metrics: DashboardMetrics | null
}

export function MetricsChart({ metrics }: MetricsChartProps) {
  if (!metrics) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>No metrics data available for chart</p>
      </div>
    )
  }

  // Prepare data for the chart
  const chartData = [
    {
      name: 'Active Agencies',
      value: metrics.active_agencies,
      change: metrics.active_agencies_change,
      color: '#3B82F6' // Blue
    },
    {
      name: 'Monthly Revenue',
      value: Math.round(metrics.monthly_revenue / 1000), // Convert to thousands
      change: metrics.monthly_revenue_change,
      color: '#10B981', // Green
      unit: 'k'
    },
    {
      name: 'Total Users',
      value: metrics.total_users,
      change: metrics.total_users_change,
      color: '#8B5CF6' // Purple
    },
    {
      name: 'System Uptime',
      value: Math.round(metrics.system_uptime * 10) / 10, // Round to 1 decimal
      change: 0, // Uptime doesn't have a change metric
      color: '#059669', // Emerald
      unit: '%'
    }
  ]

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: unknown[]; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-blue-600">
            Value: {data.value.toLocaleString()}{data.unit || ''}
          </p>
          {data.change !== 0 && (
            <p className={`text-sm ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Change: {data.change >= 0 ? '+' : ''}{data.change.toFixed(1)}%
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 