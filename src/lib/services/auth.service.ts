import { apiClient } from '../api'
import { LoginRequest, LoginResponse, User, RefreshTokenResponse } from '../types'

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('Auth service: Making login request to:', '/auth/login')
      console.log('Auth service: Login credentials:', { email: credentials.email })
      
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
      
      console.log('Auth service: Login response received:', response)
      
      // Validate response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format received from server')
      }
      
      // Store the token and user data if available
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token)
        localStorage.setItem('refreshToken', response.data.refresh_token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        // Calculate token expiry (JWT tokens are typically valid for 1 hour, but we'll set 15 minutes for safety)
        const expiryTime = new Date(Date.now() + 15 * 60 * 1000).toISOString()
        localStorage.setItem('tokenExpiry', expiryTime)
        
        console.log('Auth service: Token and user data stored successfully')
      } else {
        console.warn('Auth service: No access_token found in response:', response.data)
      }
      
      return response.data
    } catch (error) {
      console.error('Auth service: Login error:', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error)
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      localStorage.removeItem('tokenExpiry')
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me')
    
    // Update stored user data
    localStorage.setItem('user', JSON.stringify(response.data))
    
    return response.data
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh-token')
    
    // Update stored token
    if (response.data.access_token) {
      localStorage.setItem('authToken', response.data.access_token)
      localStorage.setItem('refreshToken', response.data.refresh_token)
      
      // Calculate new token expiry
      const expiryTime = new Date(Date.now() + 15 * 60 * 1000).toISOString()
      localStorage.setItem('tokenExpiry', expiryTime)
    }
    
    return response.data
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email })
  }

  async resetPassword(token: string, password: string, passwordConfirmation: string): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token,
      password,
      password_confirmation: passwordConfirmation
    })
  }

  // Helper methods for token management
  getStoredToken(): string | null {
    if (typeof window === 'undefined') {
      console.log('getStoredToken: Running on server, returning null')
      return null
    }
    const token = localStorage.getItem('authToken')
    console.log('getStoredToken: Token found:', token ? 'Yes' : 'No')
    return token
  }

  getStoredUser(): User | null {
    if (typeof window === 'undefined') {
      console.log('getStoredUser: Running on server, returning null')
      return null
    }
    const userData = localStorage.getItem('user')
    console.log('getStoredUser: User data found:', userData ? 'Yes' : 'No')
    return userData ? JSON.parse(userData) : null
  }

  isTokenExpired(): boolean {
    if (typeof window === 'undefined') {
      console.log('isTokenExpired: Running on server, returning true')
      return true
    }
    
    const expiry = localStorage.getItem('tokenExpiry')
    console.log('isTokenExpired: Expiry found:', expiry)
    if (!expiry) {
      console.log('isTokenExpired: No expiry found, returning true')
      return true
    }
    
    const isExpired = new Date() >= new Date(expiry)
    console.log('isTokenExpired: Token expired:', isExpired)
    return isExpired
  }

  isAuthenticated(): boolean {
    const token = this.getStoredToken()
    const isExpired = this.isTokenExpired()
    console.log('isAuthenticated:', {
      hasToken: !!token,
      isExpired,
      isAuthenticated: token !== null && !isExpired
    })
    return token !== null && !isExpired
  }

  // Auto-refresh token if it's about to expire
  async checkAndRefreshToken(): Promise<boolean> {
    console.log('checkAndRefreshToken: Starting token check')
    if (!this.getStoredToken()) {
      console.log('checkAndRefreshToken: No token found')
      return false
    }

    const expiry = localStorage.getItem('tokenExpiry')
    if (!expiry) {
      console.log('checkAndRefreshToken: No expiry found')
      return false
    }

    const expiryDate = new Date(expiry)
    const now = new Date()
    const timeUntilExpiry = expiryDate.getTime() - now.getTime()
    console.log('checkAndRefreshToken: Time until expiry:', timeUntilExpiry / 1000, 'seconds')
    
    // Refresh if token expires in less than 5 minutes
    if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
      console.log('checkAndRefreshToken: Token expiring soon, attempting refresh')
      try {
        await this.refreshToken()
        console.log('checkAndRefreshToken: Token refreshed successfully')
        return true
      } catch (error) {
        console.error('checkAndRefreshToken: Token refresh failed:', error)
        this.logout()
        return false
      }
    }

    const isValid = !this.isTokenExpired()
    console.log('checkAndRefreshToken: Token valid:', isValid)
    return isValid
  }
}

export const authService = new AuthService() 