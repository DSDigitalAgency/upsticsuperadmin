import { apiClient } from '../api'
import { AgencyUser, ApiResponse } from '../types'

class UserService {
  async getUsers(params?: {
    page?: number
    limit?: number
    search?: string
    role?: string
    status?: string
  }): Promise<ApiResponse<{ users: AgencyUser[], total: number }>> {
    const response = await apiClient.get('/admin/users', { params })
    return response
  }

  async getUserById(id: string): Promise<ApiResponse<AgencyUser>> {
    const response = await apiClient.get(`/admin/users/${id}`)
    return response
  }

  async createUser(userData: Partial<AgencyUser>): Promise<ApiResponse<AgencyUser>> {
    const response = await apiClient.post('/admin/users', userData)
    return response
  }

  async updateUser(id: string, userData: Partial<AgencyUser>): Promise<ApiResponse<AgencyUser>> {
    const response = await apiClient.put(`/admin/users/${id}`, userData)
    return response
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/admin/users/${id}`)
    return response
  }

  async updateUserStatus(id: string, status: 'active' | 'inactive' | 'pending'): Promise<ApiResponse<AgencyUser>> {
    const response = await apiClient.patch(`/admin/users/${id}/status`, { status })
    return response
  }

  async resetUserPassword(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.post(`/admin/users/${id}/reset-password`)
    return response
  }
}

export const userService = new UserService() 