import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ApiResponse } from './types'

interface ErrorResponse {
  message?: string;
  status?: number;
  data?: unknown;
}

class ApiClient {
  private client: ReturnType<typeof axios.create>
  private baseURL: string
  private isDevelopment: boolean

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.upstic.com/api'
    this.isDevelopment = process.env.NODE_ENV === 'development'
    
    if (this.isDevelopment) {
      console.log('API Base URL:', this.baseURL)
    }

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        
        // Only log in development and for non-routine requests
        if (this.isDevelopment && this.shouldLogRequest(config.url || '')) {
          console.log('API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url
          })
        }
        return config
      },
      (error: AxiosError) => {
        if (this.isDevelopment) {
          console.error('API Request Error:', error.message)
        }
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Only log successful responses in development for important endpoints
        if (this.isDevelopment && this.shouldLogRequest(response.config.url || '')) {
          console.log('API Response:', {
            status: response.status,
            url: response.config.url
          })
        }
        return response
      },
      (error: AxiosError) => {
        // Only log actual errors, not timeouts during development
        if (this.isDevelopment && !this.isExpectedError(error)) {
          console.warn('API Error:', {
            status: error.response?.status,
            message: error.message,
            url: error.config?.url
          })
        }
        return Promise.reject(error)
      }
    )
  }

  private shouldLogRequest(url: string): boolean {
    // Don't log routine polling requests to reduce noise
    const routineEndpoints = ['/api/admin/security/dashboard', '/api/admin/security/events']
    return !routineEndpoints.some(endpoint => url.includes(endpoint))
  }

  private isExpectedError(error: AxiosError): boolean {
    // Consider timeouts and connection errors as expected during development
    return error.code === 'ECONNABORTED' || 
           error.code === 'ECONNREFUSED' || 
           error.message.includes('timeout') ||
           error.message.includes('Network Error')
  }

  private handleError(error: AxiosError): ErrorResponse {
    const errorData = error.response?.data as ErrorResponse
    return {
      message: errorData?.message || error.message || 'API request failed',
      status: error.response?.status || 500,
      data: error.response?.data
    }
  }

  async get<T>(url: string, config?: Parameters<typeof axios.get>[1]): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url, config)
      return {
        data: response.data,
        status: response.status,
        success: true
      }
    } catch (error) {
      const axiosError = error as AxiosError
      // Only log unexpected errors in development
      if (this.isDevelopment && !this.isExpectedError(axiosError)) {
        console.error(`GET ${url} failed:`, axiosError.message)
      }
      throw this.handleError(axiosError)
    }
  }

  async post<T>(url: string, data?: unknown, config?: Parameters<typeof axios.post>[2]): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true
      }
    } catch (error) {
      const axiosError = error as AxiosError
      if (this.isDevelopment && !this.isExpectedError(axiosError)) {
        console.error(`POST ${url} failed:`, axiosError.message)
      }
      throw this.handleError(axiosError)
    }
  }

  async put<T>(url: string, data?: unknown, config?: Parameters<typeof axios.put>[2]): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true
      }
    } catch (error) {
      const axiosError = error as AxiosError
      if (this.isDevelopment && !this.isExpectedError(axiosError)) {
        console.error(`PUT ${url} failed:`, axiosError.message)
      }
      throw this.handleError(axiosError)
    }
  }

  async patch<T>(url: string, data?: unknown, config?: Parameters<typeof axios.patch>[2]): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true
      }
    } catch (error) {
      const axiosError = error as AxiosError
      if (this.isDevelopment && !this.isExpectedError(axiosError)) {
        console.error(`PATCH ${url} failed:`, axiosError.message)
      }
      throw this.handleError(axiosError)
    }
  }

  async delete<T>(url: string, config?: Parameters<typeof axios.delete>[1]): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url, config)
      return {
        data: response.data,
        status: response.status,
        success: true
      }
    } catch (error) {
      const axiosError = error as AxiosError
      if (this.isDevelopment && !this.isExpectedError(axiosError)) {
        console.error(`DELETE ${url} failed:`, axiosError.message)
      }
      throw this.handleError(axiosError)
    }
  }
}

export const apiClient = new ApiClient()

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
} 