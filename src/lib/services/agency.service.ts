import { 
  Agency, 
  AgencyStats, 
  CreateAgencyRequest, 
  UpdateAgencyRequest, 
  AgencyFilters,
  ApiResponse,
  PaginatedResponse,
  AgencyUser,
  AgencyBranding,
  AgencyFeature
} from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.upstic.com/api'

class AgencyService {
  private getAuthHeaders(): HeadersInit {
    // Check if we're in the browser environment
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  // Get all agencies with filtering and pagination
  async getAgencies(filters?: AgencyFilters): Promise<PaginatedResponse<Agency>> {
    try {
      const searchParams = new URLSearchParams()
      
      if (filters) {
        // Add search term if provided
        if (filters.search) {
          searchParams.append('search', filters.search)
        }

        // Add status filter if provided
        if (filters.status) {
          searchParams.append('status', filters.status)
        }

        // Add industry filter if provided
        if (filters.industry) {
          searchParams.append('industry', filters.industry)
        }

        // Add specialization filter if provided
        if (filters.specialization) {
          searchParams.append('specialization', filters.specialization)
        }

        // Add size filter if provided
        if (filters.size) {
          searchParams.append('size', filters.size)
        }

        // Add pagination parameters
        if (filters.page) {
          searchParams.append('page', filters.page.toString())
        }
        if (filters.limit) {
          searchParams.append('limit', filters.limit.toString())
        }
      }

      const url = `${API_BASE_URL}/admin/agencies${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
      
      console.log('🔍 Fetching agencies with filters:', {
        search: filters?.search,
        status: filters?.status,
        industry: filters?.industry,
        specialization: filters?.specialization,
        size: filters?.size,
        page: filters?.page,
        limit: filters?.limit
      })
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch agencies: ${response.status} ${response.statusText}`)
      }

      const responseData = await response.json()
      
      // Handle the actual API response format
      const paginatedResponse: PaginatedResponse<Agency> = {
        data: responseData.agencies || [],
        meta: {
          current_page: filters?.page || 1,
          total_pages: Math.ceil((responseData.total || 0) / (filters?.limit || 10)),
          total_items: responseData.total || 0,
          items_per_page: filters?.limit || 10
        }
      }

      console.log('✅ Agencies data received:', {
        total: paginatedResponse.meta.total_items,
        page: paginatedResponse.meta.current_page,
        totalPages: paginatedResponse.meta.total_pages,
        itemsPerPage: paginatedResponse.meta.items_per_page,
        agenciesCount: paginatedResponse.data.length
      })
      
      return paginatedResponse
    } catch (error) {
      console.error('❌ Error fetching agencies:', error)
      throw error
    }
  }

  // Get agency statistics
  async getAgencyStats(): Promise<AgencyStats> {
    try {
      console.log('🔍 Fetching agency statistics...')
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/stats`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch agency stats: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      // Transform the response to match our AgencyStats interface
      const stats: AgencyStats = {
        total_agencies: data.totalAgencies || 0,
        active_agencies: data.activeAgencies || 0,
        pending_agencies: data.pendingAgencies || 0,
        suspended_agencies: data.suspendedAgencies || 0,
        total_revenue: data.totalRevenue || 0,
        revenue_growth: data.revenueGrowth || 0,
        by_industry: data.byIndustry || {},
        by_size: data.bySize || {}
      }

      console.log('✅ Agency stats received:', stats)
      
      return stats
    } catch (error) {
      console.error('❌ Error fetching agency stats:', error)
      throw error
    }
  }

  // Get single agency by ID
  async getAgency(id: string): Promise<Agency> {
    try {
      console.log(`🔍 Fetching agency with ID: ${id}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch agency: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency data received:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error fetching agency ${id}:`, error)
      throw error
    }
  }

  // POST /api/admin/agencies
  async createAgency(agencyData: CreateAgencyRequest): Promise<Agency> {
    try {
      // Validate required fields
      const requiredFields = [
        'name',
        'description',
        'industry',
        'size',
        'contactEmail',
        'contactPhone',
        'website',
        'status',
        'address',
        'primaryContact',
        'specializations'
      ] as const

      const missingFields = requiredFields.filter(field => !agencyData[field])
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(agencyData.contactEmail)) {
        throw new Error('Invalid contact email format')
      }
      if (!emailRegex.test(agencyData.primaryContact.email)) {
        throw new Error('Invalid primary contact email format')
      }

      // Validate phone format (basic validation)
      const phoneRegex = /^\+?[\d\s-()]{10,}$/
      if (!phoneRegex.test(agencyData.contactPhone)) {
        throw new Error('Invalid contact phone format')
      }
      if (!phoneRegex.test(agencyData.primaryContact.phone)) {
        throw new Error('Invalid primary contact phone format')
      }

      // Validate website format (subdomain)
      const subdomainRegex = /^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?$/
      if (!subdomainRegex.test(agencyData.website)) {
        throw new Error('Invalid subdomain format. Use only lowercase letters, numbers, and hyphens. Must start and end with a letter or number.')
      }

      // Construct the full URL from the subdomain
      const websiteUrl = `https://${agencyData.website}.upstic.com`

      // Create a copy of the data with the full URL
      const apiData = {
        ...agencyData,
        website: websiteUrl
      }

      console.log('🔍 Creating new agency:', {
        name: apiData.name,
        industry: apiData.industry,
        size: apiData.size,
        status: apiData.status,
        website: apiData.website
      })
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to create agency: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency created successfully:', {
        id: data.data?.id,
        name: data.data?.name,
        status: data.data?.status
      })
      
      return data.data || data
    } catch (error) {
      console.error('❌ Error creating agency:', error)
      throw error
    }
  }

  // Update agency
  async updateAgency(id: string, updateData: UpdateAgencyRequest): Promise<Agency> {
    try {
      console.log(`🔍 Updating agency ${id}:`, updateData)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to update agency: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency updated successfully:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error updating agency ${id}:`, error)
      throw error
    }
  }

  // Delete agency
  async deleteAgency(id: string): Promise<void> {
    try {
      console.log(`🔍 Deleting agency ${id}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to delete agency: ${response.status} ${response.statusText}`)
      }

      console.log('✅ Agency deleted successfully')
    } catch (error) {
      console.error(`❌ Error deleting agency ${id}:`, error)
      throw error
    }
  }

  // Suspend agency
  async suspendAgency(id: string, reason?: string): Promise<Agency> {
    try {
      console.log(`🔍 Suspending agency ${id}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ 
          status: 'suspended',
          suspension_reason: reason 
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to suspend agency: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency suspended successfully:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error suspending agency ${id}:`, error)
      throw error
    }
  }

  // Activate agency
  async activateAgency(id: string): Promise<Agency> {
    try {
      console.log(`🔍 Activating agency ${id}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status: 'active' }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to activate agency: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency activated successfully:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error activating agency ${id}:`, error)
      throw error
    }
  }

  // Verify agency
  async verifyAgency(id: string): Promise<Agency> {
    try {
      console.log(`🔍 Verifying agency ${id}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}/verify`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to verify agency: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency verified successfully:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error verifying agency ${id}:`, error)
      throw error
    }
  }

  // Get agency revenue data
  async getAgencyRevenue(id: string, period: 'month' | 'quarter' | 'year' = 'month'): Promise<any> {
    try {
      console.log(`🔍 Fetching revenue data for agency ${id} (${period})`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}/revenue?period=${period}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch agency revenue: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency revenue data received:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error fetching agency revenue ${id}:`, error)
      throw error
    }
  }

  // Bulk operations
  async bulkUpdateAgencies(agencyIds: string[], updateData: Partial<UpdateAgencyRequest>): Promise<void> {
    try {
      console.log(`🔍 Bulk updating ${agencyIds.length} agencies`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/bulk-update`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          agency_ids: agencyIds,
          update_data: updateData
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to bulk update agencies: ${response.status} ${response.statusText}`)
      }

      console.log('✅ Bulk update completed successfully')
    } catch (error) {
      console.error('❌ Error in bulk update:', error)
      throw error
    }
  }

  // Export agencies data
  async exportAgencies(filters?: AgencyFilters, format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
    try {
      const searchParams = new URLSearchParams()
      searchParams.append('format', format)
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value.toString())
          }
        })
      }

      console.log(`🔍 Exporting agencies data as ${format}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/export?${searchParams.toString()}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to export agencies: ${response.status} ${response.statusText}`)
      }

      const blob = await response.blob()
      console.log('✅ Agencies data exported successfully')
      
      return blob
    } catch (error) {
      console.error('❌ Error exporting agencies:', error)
      throw error
    }
  }

  // GET /api/admin/agencies/{id}/users
  async getAgencyUsers(id: string): Promise<AgencyUser[]> {
    try {
      console.log(`🔍 Fetching users for agency ${id}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}/users`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch agency users: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency users received:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error fetching agency ${id} users:`, error)
      throw error
    }
  }

  // PUT /api/admin/agencies/{id}/branding
  async updateAgencyBranding(id: string, branding: AgencyBranding): Promise<Agency> {
    try {
      console.log(`🔍 Updating branding for agency ${id}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}/branding`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(branding),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to update agency branding: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency branding updated successfully:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error updating agency ${id} branding:`, error)
      throw error
    }
  }

  // PUT /api/admin/agencies/{id}/features
  async toggleAgencyFeature(id: string, feature: AgencyFeature, enabled: boolean): Promise<Agency> {
    try {
      console.log(`🔍 Toggling feature ${feature} for agency ${id} to ${enabled}`)
      
      const response = await fetch(`${API_BASE_URL}/admin/agencies/${id}/features`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ feature, enabled }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to toggle agency feature: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Agency feature toggled successfully:', data)
      
      return data.data || data
    } catch (error) {
      console.error(`❌ Error toggling agency ${id} feature:`, error)
      throw error
    }
  }
}

export const agencyService = new AgencyService() 