'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Settings, 
  Shield, 
  Menu,
  LogOut,
  User,
  ChevronLeft,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const pathname = usePathname()
  const { isAuthenticated, user, isLoading, logout, redirectToLogin } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false) // Mobile sidebar state
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true) // Desktop sidebar expanded state

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirectToLogin()
    }
  }, [isAuthenticated, isLoading, redirectToLogin])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Agency Management', href: '/agencies', icon: Building2 },
    { name: 'User Management', href: '/users', icon: Users },
    { name: 'Platform Settings', href: '/settings', icon: Settings },
    { name: 'Security & Monitoring', href: '/security', icon: Shield },
    { name: 'Audit Logs', href: '/audit-logs', icon: FileText },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 bg-white shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col ${
        isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
      } ${isSidebarExpanded ? 'lg:w-64' : 'lg:w-16'}`}>
        
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 bg-blue-600 flex-shrink-0 relative ${
          isSidebarExpanded ? 'justify-center lg:justify-center' : 'justify-center'
        }`}>
          <Shield className="h-8 w-8 text-white flex-shrink-0" />
          <span className={`text-white font-bold text-lg ml-2 transition-opacity duration-300 ${
            isSidebarExpanded ? 'opacity-100' : 'lg:opacity-0 lg:hidden'
          }`}>
            Super Admin
          </span>
          
          {/* Enhanced Toggle Button - Positioned on the blue header */}
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className={`hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-blue-600 rounded-full items-center justify-center hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg ${
              isSidebarExpanded ? '' : 'rotate-180'
            }`}
            title={isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronLeft className="h-3 w-3 text-blue-600" />
          </button>
        </div>

        {/* User Info */}
        <div className={`p-4 border-b border-gray-200 flex-shrink-0 ${
          isSidebarExpanded ? '' : 'lg:px-2'
        }`}>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className={`ml-3 transition-opacity duration-300 ${
              isSidebarExpanded ? 'opacity-100' : 'lg:opacity-0 lg:hidden'
            }`}>
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 mt-4 overflow-y-auto ${
          isSidebarExpanded ? 'px-2' : 'lg:px-1'
        }`}>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center py-2 text-sm font-medium rounded-md mb-1 transition-all duration-200 ${
                  isSidebarExpanded ? 'px-2' : 'lg:px-2 lg:justify-center px-2'
                } ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsSidebarOpen(false)}
                title={!isSidebarExpanded ? item.name : undefined}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                } ${isSidebarExpanded ? 'mr-3' : 'lg:mr-0'}`} />
                <span className={`transition-opacity duration-300 ${
                  isSidebarExpanded ? 'opacity-100' : 'lg:opacity-0 lg:hidden'
                }`}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className={`p-4 border-t border-gray-200 flex-shrink-0 ${
          isSidebarExpanded ? '' : 'lg:px-2'
        }`}>
          <button
            onClick={logout}
            className={`w-full flex items-center py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors ${
              isSidebarExpanded ? 'px-2' : 'lg:px-2 lg:justify-center px-2'
            }`}
            title={!isSidebarExpanded ? 'Sign out' : undefined}
          >
            <LogOut className={`h-5 w-5 ${isSidebarExpanded ? 'mr-3' : 'lg:mr-0'}`} />
            <span className={`transition-opacity duration-300 ${
              isSidebarExpanded ? 'opacity-100' : 'lg:opacity-0 lg:hidden'
            }`}>
              Sign out
            </span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-gray-500 hover:text-gray-600 lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
                
                <h1 className="ml-4 text-lg font-semibold text-gray-900 lg:ml-0">
                  Healthcare Recruitment Platform
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 hidden sm:block">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-gray-500 lg:hidden"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 