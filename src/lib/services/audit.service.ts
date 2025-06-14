import { apiClient } from '../api'
import { ApiResponse, AuditLog, AuditLogStats, AuditLogFilters, AuditActionType, AuditEntityType, AuditLogsResponse } from '../types'

export class AuditService {
  async getAuditLogs(filters?: AuditLogFilters): Promise<ApiResponse<AuditLogsResponse>> {
    try {
      const params = new URLSearchParams()
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString())
          }
        })
      }

      const url = `/audit-logs${params.toString() ? `?${params.toString()}` : ''}`
      return await apiClient.get<AuditLogsResponse>(url)
    } catch (error) {
      console.error('Error fetching audit logs:', error)
      throw error
    }
  }

  async createAuditLog(auditLog: Omit<AuditLog, 'id' | 'createdAt' | 'updatedAt' | 'before' | 'after'>): Promise<ApiResponse<AuditLog>> {
    try {
      return await apiClient.post<AuditLog>('/audit-logs', auditLog)
    } catch (error) {
      console.error('Error creating audit log:', error)
      throw error
    }
  }

  async getAuditLogStats(): Promise<ApiResponse<AuditLogStats>> {
    try {
      return await apiClient.get<AuditLogStats>('/audit-logs/stats')
    } catch (error) {
      console.error('Error fetching audit log stats:', error)
      throw error
    }
  }

  async getUserAuditLogs(userId: string, filters?: Omit<AuditLogFilters, 'userId'>): Promise<ApiResponse<AuditLogsResponse>> {
    try {
      const params = new URLSearchParams()
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString())
          }
        })
      }

      const url = `/audit-logs/users/${userId}${params.toString() ? `?${params.toString()}` : ''}`
      return await apiClient.get<AuditLogsResponse>(url)
    } catch (error) {
      console.error(`Error fetching audit logs for user ${userId}:`, error)
      throw error
    }
  }

  async getAuditActions(): Promise<ApiResponse<AuditActionType[]>> {
    try {
      return await apiClient.get<AuditActionType[]>('/audit-logs/actions')
    } catch (error) {
      console.error('Error fetching audit actions:', error)
      throw error
    }
  }

  async getAuditEntities(): Promise<ApiResponse<AuditEntityType[]>> {
    try {
      return await apiClient.get<AuditEntityType[]>('/audit-logs/entities')
    } catch (error) {
      console.error('Error fetching audit entities:', error)
      throw error
    }
  }
}

export const auditService = new AuditService() 