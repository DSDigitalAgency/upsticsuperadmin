import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { ApiResponse } from './types'

interface ErrorResponse {
  message?: string;
  status?: number;
  data?: any;
}

class ApiClient {
  private client: ReturnType<typeof axios.create>
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.upstic.com/api'
    console.log('API Base URL:', this.baseURL)

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
        console.log('API Request:', {
          method: config.method,
          url: config.url,
          headers: config.headers,
          data: config.data
        })
        return config
      },
      (error: AxiosError) => {
        console.error('API Request Error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log('API Response:', {
          status: response.status,
          data: response.data,
          headers: response.headers
        })
        return response
      },
      (error: AxiosError) => {
        console.error('API Response Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        })
        return Promise.reject(error)
      }
    )
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
      console.error(`GET ${url} failed:`, axiosError)
      throw this.handleError(axiosError)
    }
  }

  async post<T>(url: string, data?: any, config?: Parameters<typeof axios.post>[2]): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(`POST ${url} failed:`, axiosError)
      throw this.handleError(axiosError)
    }
  }

  async put<T>(url: string, data?: any, config?: Parameters<typeof axios.put>[2]): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(`PUT ${url} failed:`, axiosError)
      throw this.handleError(axiosError)
    }
  }

  async patch<T>(url: string, data?: any, config?: Parameters<typeof axios.patch>[2]): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(`PATCH ${url} failed:`, axiosError)
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
      console.error(`DELETE ${url} failed:`, axiosError)
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