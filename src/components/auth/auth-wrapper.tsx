'use client'

import { usePathname } from 'next/navigation'
import SuperAdminLayout from '@/components/layout/super-admin-layout'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const pathname = usePathname()
  
  // Pages that don't need the SuperAdminLayout
  const publicPages = ['/login']
  
  if (publicPages.includes(pathname)) {
    return <>{children}</>
  }
  
  return <SuperAdminLayout>{children}</SuperAdminLayout>
} 