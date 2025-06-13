'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts'
import { AgencyRevenue } from '@/lib/types'

interface RevenueChartProps {
  revenueMetrics: AgencyRevenue[] | null
}

export function RevenueChart({ revenueMetrics }: RevenueChartProps) {
  if (!revenueMetrics || revenueMetrics.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>No revenue data available for chart</p>
      </div>
    )
  }

  // Calculate total revenue metrics
  const totalRevenue = revenueMetrics.reduce((sum, agency) => sum + agency.totalRevenue, 0)
  const monthlyRevenue = revenueMetrics.reduce((sum, agency) => sum + agency.monthlyRevenue, 0)
  const quarterlyRevenue = monthlyRevenue * 3
  const yearlyRevenue = monthlyRevenue * 12

  // Prepare data for revenue trends
  const revenueData = [
    {
      period: 'Monthly',
      value: monthlyRevenue,
      color: '#3B82F6'
    },
    {
      period: 'Quarterly',
      value: quarterlyRevenue,
      color: '#10B981'
    },
    {
      period: 'Yearly',
      value: yearlyRevenue,
      color: '#8B5CF6'
    }
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label} Revenue</p>
          <p className="text-blue-600">
            {formatCurrency(data.value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#3B82F6" 
            fillOpacity={0.6} 
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// Component for Top Agencies Revenue Chart
export function TopAgenciesChart({ revenueMetrics }: RevenueChartProps) {
  if (!revenueMetrics || revenueMetrics.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>No agency revenue data available</p>
      </div>
    )
  }

  // Take top 5 agencies by revenue
  const topAgencies = [...revenueMetrics]
    .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
    .slice(0, 5)
    .map(agency => ({
      name: agency.agencyName,
      revenue: agency.monthlyRevenue
    }))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-green-600">
            Revenue: {formatCurrency(data.value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={topAgencies} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorAgency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10B981" 
            fillOpacity={0.6} 
            fill="url(#colorAgency)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 