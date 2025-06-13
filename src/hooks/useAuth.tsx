'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/services/auth.service'
import { User, LoginRequest } from '@/lib/types'
import { ApiError } from '@/lib/api'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkAuthStatus = useCallback(async () => {
    try {
      console.log('Checking auth status...')
      // Check if we have a valid token
      if (!authService.isAuthenticated()) {
        console.log('No valid token found')
        setIsAuthenticated(false)
        setUser(null)
        setIsLoading(false)
        return
      }

      console.log('Token is valid, checking if refresh is needed')
      // Check and refresh token if needed
      const tokenValid = await authService.checkAndRefreshToken()
      if (!tokenValid) {
        console.log('Token refresh failed or token invalid')
        setIsAuthenticated(false)
        setUser(null)
        setIsLoading(false)
        return
      }

      console.log('Token is valid, getting user data')
      // Get current user from storage first (for immediate UI update)
      const storedUser = authService.getStoredUser()
      if (storedUser) {
        console.log('Found stored user data:', storedUser)
        setUser(storedUser)
        setIsAuthenticated(true)
      }

      // Then fetch fresh user data from API
      try {
        console.log('Fetching fresh user data from API')
        const currentUser = await authService.getCurrentUser()
        console.log('Received fresh user data:', currentUser)
        setUser(currentUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        // If fetching user fails, use stored data if available
        if (!storedUser) {
          console.log('No stored user data available, logging out')
          await authService.logout()
          setIsAuthenticated(false)
          setUser(null)
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Starting login process...')
      setIsLoading(true)
      const response = await authService.login(credentials)
      console.log('Login successful, received response:', response)
      
      setIsAuthenticated(true)
      setUser(response.user)
      
      console.log('Redirecting to dashboard...')
      router.push('/')
      return { success: true }
    } catch (error) {
      const apiError = error as ApiError
      console.error('Login error:', apiError)
      
      return { 
        success: false, 
        error: apiError.message || 'Login failed. Please try again.' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)
      router.push('/login')
    }
  }, [router])

  const redirectToLogin = useCallback(() => {
    router.push('/login')
  }, [router])

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await authService.forgotPassword(email)
      return { success: true }
    } catch (error) {
      const apiError = error as ApiError
      return { 
        success: false, 
        error: apiError.message || 'Failed to send password reset email.' 
      }
    }
  }

  const resetPassword = async (
    token: string, 
    password: string, 
    passwordConfirmation: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await authService.resetPassword(token, password, passwordConfirmation)
      return { success: true }
    } catch (error) {
      const apiError = error as ApiError
      return { 
        success: false, 
        error: apiError.message || 'Failed to reset password.' 
      }
    }
  }

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    redirectToLogin,
    checkAuthStatus,
    forgotPassword,
    resetPassword
  }
} 