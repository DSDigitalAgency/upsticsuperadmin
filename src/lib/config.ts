export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.upstic.com/api/',
  appName: 'Super Admin Portal',
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  enableMockApi: process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true',
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Upstic Healthcare Recruitment',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@upsticrecruit.com',
} as const

export default config 