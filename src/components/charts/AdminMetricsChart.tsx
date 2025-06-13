'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { DashboardMetrics } from '@/lib/types'

interface MetricsChartProps {
  metrics: DashboardMetrics | null
}

// User Activity Over Time Chart
export function UserActivityChart({ metrics }: MetricsChartProps) {
  if (!metrics) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>No user activity data available</p>
      </div>
    )
  }

  // Since we don't have historical data, we'll just show current values
  const data = [
    {
      date: new Date().toISOString(),
      active: metrics.activeUsers,
      total: metrics.totalUsers
    }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">Current Status</p>
          <p className="text-blue-600">Active Users: {payload[0]?.value || 0}</p>
          <p className="text-green-600">Total Users: {payload[1]?.value || 0}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={() => 'Current'}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="active" 
            fill="#3B82F6" 
            name="Active Users"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="total" 
            fill="#10B981" 
            name="Total Users"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// User Role Distribution Pie Chart
export function UserRoleChart({ metrics }: MetricsChartProps) {
  if (!metrics) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>No user role data available</p>
      </div>
    )
  }

  // Since we don't have role distribution in our metrics, we'll show active vs total users
  const data = [
    { name: 'Active Users', value: metrics.activeUsers, color: '#3B82F6' },
    { name: 'Inactive Users', value: metrics.totalUsers - metrics.activeUsers, color: '#9CA3AF' }
  ]

  const COLORS = ['#3B82F6', '#9CA3AF']

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p style={{ color: data.payload.color }}>
            Count: {data.value}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// Engagement Overview Chart
export function EngagementChart({ metrics }: MetricsChartProps) {
  if (!metrics) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>No engagement data available</p>
      </div>
    )
  }

  const data = [
    {
      metric: 'Active Agencies',
      value: metrics.activeAgencies,
      color: '#3B82F6'
    },
    {
      metric: 'Active Users',
      value: metrics.activeUsers,
      color: '#10B981'
    },
    {
      metric: 'Total Agencies',
      value: metrics.totalAgencies,
      color: '#8B5CF6'
    }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p style={{ color: data.payload.color }}>
            Value: {data.value}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="metric" 
            tick={{ fontSize: 12 }}
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