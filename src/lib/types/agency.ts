export type AgencyStatus = 'active' | 'pending' | 'suspended' | 'inactive'
export type AgencyPlan = 'BASIC' | 'PRO' | 'ENTERPRISE' | 'CUSTOM'
export type AgencySize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE'

export interface AgencyAddress {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface AgencyContact {
  name: string
  email: string
  phone: string
  position: string
}

export interface AgencyMetrics {
  userCount: number
  activeUserCount: number
  revenueMonthly: number
  totalPlacements: number
  clientCount: number
  workerCount: number
  jobsPosted: number
  fillRate: number
  satisfactionScore: number
}

export interface AgencyBilling {
  plan: AgencyPlan
  amount: number
  currency: string
  invoices: unknown[] // TODO: Define invoice type
}

export interface AgencyFeatures {
  enabledFeatures: string[]
  integrations: string[]
}

export interface AgencyTrial {
  startDate: string
  endDate: string
  isConverted: boolean
}

export interface Agency {
  id: string
  name: string
  description: string
  industry: string
  size: AgencySize
  status: AgencyStatus
  contactEmail: string
  contactPhone: string
  website: string
  specializations: string[]
  locations: string[]
  created_at: string
  updated_at: string
  address: {
    street?: string
    city: string
    state?: string
    country: string
    postal_code?: string
  }
  primaryContact: {
    name: string
    email: string
    phone?: string
    position?: string
  }
  metrics: {
    userCount: number
    activeUserCount: number
    revenueMonthly: number
    totalPlacements: number
    clientCount: number
    workerCount: number
    jobsPosted: number
    fillRate: number
    satisfactionScore: number
  }
  billing: {
    plan: AgencyPlan
    amount: number
    currency: string
    invoices: unknown[] // TODO: Define invoice type
  }
  features: {
    enabledFeatures: string[]
    integrations: string[]
  }
  trial: {
    startDate: string
    endDate: string
    isConverted: boolean
  }
}

export interface AgencyFilters {
  search?: string
  status?: AgencyStatus
  industry?: string
  specialization?: string
  size?: AgencySize
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  plan?: AgencyPlan
}

export interface AgencyStats {
  total_agencies: number
  active_agencies: number
  pending_agencies: number
  suspended_agencies: number
  total_revenue: number
  revenue_growth: number
  by_industry: Record<string, number>
  by_size: Record<string, number>
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    total_pages: number
    total_items: number
    items_per_page: number
  }
} 