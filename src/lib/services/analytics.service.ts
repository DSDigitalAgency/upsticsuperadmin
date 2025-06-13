import { apiClient } from '../api'
import { TransactionMetrics, UserActivityMetrics, FeatureAdoptionMetrics, ApiResponse } from '../types'

class AnalyticsService {
  async getTransactionMetrics(): Promise<TransactionMetrics> {
    const response = await apiClient.get<ApiResponse<TransactionMetrics>>('/api/admin/metrics/transactions')
    return response.data
  }

  async getUserActivityMetrics(): Promise<UserActivityMetrics> {
    const response = await apiClient.get<ApiResponse<UserActivityMetrics>>('/api/admin/metrics/user-activity')
    return response.data
  }

  async getFeatureAdoptionMetrics(): Promise<FeatureAdoptionMetrics> {
    const response = await apiClient.get<ApiResponse<FeatureAdoptionMetrics>>('/api/admin/metrics/feature-adoption')
    return response.data
  }
}

export const analyticsService = new AnalyticsService() 