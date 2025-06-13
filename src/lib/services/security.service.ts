import { apiClient } from '../api'
import { ApiResponse, SecurityDashboard, SecurityEvent, SecuritySystem } from '../types'

export class SecurityService {
  async getDashboard(): Promise<ApiResponse<SecurityDashboard>> {
    try {
      const response = await apiClient.get<SecurityDashboard>('/admin/security/dashboard')
      if (!response || !response.data) {
        // Return mock data when API is not available
        return {
          data: {
            score: 85,
            totalEvents: 0,
            criticalEvents: 0,
            highSeverityEvents: 0,
            mediumSeverityEvents: 0,
            lowSeverityEvents: 0,
            recentEvents: [],
            systemStatus: {
              twoFactorEnabled: false,
              passwordPolicy: {
                minLength: 8,
                requireUppercase: true,
                requireLowercase: true,
                requireNumbers: true,
                requireSpecialChars: true,
                maxAge: 90
              },
              sessionPolicy: {
                maxConcurrentSessions: 3,
                sessionTimeout: 30,
                requireReauth: false
              },
              ipWhitelist: [],
              lastSecurityAudit: new Date().toISOString()
            }
          },
          status: 200,
          success: true
        }
      }
      return response
    } catch (error) {
      console.error('Error fetching security dashboard:', error)
      throw error
    }
  }

  async getEvents(): Promise<ApiResponse<SecurityEvent[]>> {
    try {
      const response = await apiClient.get<SecurityEvent[]>('/admin/security/events')
      if (!response || !response.data) {
        return {
          data: [],
          status: 200,
          success: true
        }
      }
      return response
    } catch (error) {
      console.error('Error fetching security events:', error)
      throw error
    }
  }

  async getEventById(id: string): Promise<ApiResponse<SecurityEvent>> {
    try {
      return await apiClient.get<SecurityEvent>(`/admin/security/events/${id}`)
    } catch (error) {
      console.error(`Error fetching security event ${id}:`, error)
      throw error
    }
  }

  async createEvent(event: Omit<SecurityEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<SecurityEvent>> {
    try {
      return await apiClient.post<SecurityEvent>('/admin/security/events', event)
    } catch (error) {
      console.error('Error creating security event:', error)
      throw error
    }
  }

  async updateEvent(id: string, event: Partial<SecurityEvent>): Promise<ApiResponse<SecurityEvent>> {
    try {
      return await apiClient.put<SecurityEvent>(`/admin/security/events/${id}`, event)
    } catch (error) {
      console.error(`Error updating security event ${id}:`, error)
      throw error
    }
  }

  async getSecurityScore(): Promise<ApiResponse<number>> {
    try {
      const response = await apiClient.get<number>('/admin/security/score')
      if (!response || typeof response.data !== 'number') {
        return {
          data: 85,
          status: 200,
          success: true
        }
      }
      return response
    } catch (error) {
      console.error('Error fetching security score:', error)
      throw error
    }
  }

  async calculateSecurityScore(): Promise<ApiResponse<number>> {
    try {
      return await apiClient.post<number>('/admin/security/score/calculate')
    } catch (error) {
      console.error('Error calculating security score:', error)
      throw error
    }
  }

  async getSecuritySystem(): Promise<ApiResponse<SecuritySystem>> {
    try {
      const response = await apiClient.get<SecuritySystem>('/admin/security/system')
      if (!response || !response.data) {
        // Return mock data when API is not available
        return {
          data: {
            twoFactorEnabled: false,
            passwordPolicy: {
              minLength: 8,
              requireUppercase: true,
              requireLowercase: true,
              requireNumbers: true,
              requireSpecialChars: true,
              maxAge: 90
            },
            sessionPolicy: {
              maxConcurrentSessions: 3,
              sessionTimeout: 30,
              requireReauth: false
            },
            ipWhitelist: [],
            lastSecurityAudit: new Date().toISOString()
          },
          status: 200,
          success: true
        }
      }
      return response
    } catch (error) {
      console.error('Error fetching security system:', error)
      throw error
    }
  }

  async updateSecuritySystem(system: Partial<SecuritySystem>): Promise<ApiResponse<SecuritySystem>> {
    try {
      return await apiClient.put<SecuritySystem>('/admin/security/system', system)
    } catch (error) {
      console.error('Error updating security system:', error)
      throw error
    }
  }
}

export const securityService = new SecurityService() 