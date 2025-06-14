'use client'

import { useState, useEffect } from 'react'
import { Settings, Shield, Zap, RefreshCw, Save, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { platformService, type PlatformMetrics, type PlatformSettings } from '@/lib/services/platform.service'
import { SecuritySystem } from '@/lib/types'

export default function PlatformSettingsPage() {
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null)
  const [settings, setSettings] = useState<PlatformSettings | null>(null)
  const [security, setSecurity] = useState<SecuritySystem | null>({
    twoFactorEnabled: false,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      maxAge: 90
    },
    sessionPolicy: {
      maxConcurrentSessions: 3,
      sessionTimeout: 30,
      requireReauth: false
    },
    ipWhitelist: [],
    lastSecurityAudit: new Date().toISOString()
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      console.log('Fetching platform metrics...')
      const metricsRes = await platformService.getPlatformMetrics()
      console.log('Metrics response:', metricsRes)
      setMetrics(metricsRes.data)

      console.log('Fetching platform settings...')
      const settingsRes = await platformService.getPlatformSettings()
      console.log('Settings response:', settingsRes)
      setSettings(settingsRes.data)

      console.log('Fetching security system...')
      const securityRes = await platformService.getSecuritySystem()
      console.log('Security response:', securityRes)
      setSecurity(securityRes.data ? {
        twoFactorEnabled: securityRes.data.twoFactorEnabled ?? false,
        passwordPolicy: {
          minLength: securityRes.data.passwordPolicy?.minLength ?? 8,
          requireUppercase: securityRes.data.passwordPolicy?.requireUppercase ?? true,
          requireLowercase: securityRes.data.passwordPolicy?.requireLowercase ?? true,
          requireNumbers: securityRes.data.passwordPolicy?.requireNumbers ?? true,
          requireSpecialChars: securityRes.data.passwordPolicy?.requireSpecialChars ?? true,
          maxAge: securityRes.data.passwordPolicy?.maxAge ?? 90
        },
        sessionPolicy: {
          maxConcurrentSessions: securityRes.data.sessionPolicy?.maxConcurrentSessions ?? 3,
          sessionTimeout: securityRes.data.sessionPolicy?.sessionTimeout ?? 30,
          requireReauth: securityRes.data.sessionPolicy?.requireReauth ?? false
        },
        ipWhitelist: securityRes.data.ipWhitelist ?? [],
        lastSecurityAudit: securityRes.data.lastSecurityAudit ?? new Date().toISOString()
      } : {
        twoFactorEnabled: false,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          maxAge: 90
        },
        sessionPolicy: {
          maxConcurrentSessions: 3,
          sessionTimeout: 30,
          requireReauth: false
        },
        ipWhitelist: [],
        lastSecurityAudit: new Date().toISOString()
      })
    } catch (err) {
      console.error('Error fetching platform data:', err)
      if (err instanceof Error) {
        console.error('Error details:', {
          message: err.message,
          name: err.name,
          stack: err.stack
        })
      }
      setError('Failed to load platform settings. Please check the console for details.')
      toast.error('Failed to load platform settings')
      setSecurity({
        twoFactorEnabled: false,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          maxAge: 90
        },
        sessionPolicy: {
          maxConcurrentSessions: 3,
          sessionTimeout: 30,
          requireReauth: false
        },
        ipWhitelist: [],
        lastSecurityAudit: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!settings) return

    try {
      await platformService.updatePlatformSettings(settings)
      toast.success('Settings saved successfully')
    } catch (err) {
      console.error('Error saving settings:', err)
      toast.error('Failed to save settings')
    }
  }

  const handleSaveSecurity = async () => {
    if (!security) return

    try {
      await platformService.updateSecuritySystem(security)
      toast.success('Security settings saved successfully')
    } catch (err) {
      console.error('Error saving security settings:', err)
      toast.error('Failed to save security settings')
    }
  }



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
            <p className="text-gray-600">System configuration and feature management</p>
          </div>
          <Button 
            className="flex items-center space-x-2"
            onClick={handleSaveSettings}
          >
            <Save className="h-4 w-4" />
            <span>Save All Changes</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        
        {/* Configuration Overview */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-4">
                    <Settings className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Active Features</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.activeFeatures}/{metrics.totalFeatures}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {Math.round((metrics.activeFeatures / metrics.totalFeatures) * 100)}% enabled
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="text-green-600 mr-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Security Score</p>
                    <p className="text-2xl font-semibold text-green-600">{metrics.securityScore}/100</p>
                    <p className="text-xs text-green-600 mt-1">
                      {metrics.securityScore >= 80 ? 'High' : metrics.securityScore >= 60 ? 'Medium' : 'Low'} security
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-4">
                    <RefreshCw className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Last Backup</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {new Date(metrics.lastBackup).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-green-600 mt-1">Automated daily</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="text-yellow-600 mr-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">API Usage</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.apiUsage.percentage}%</p>
                    <p className="text-xs text-yellow-600 mt-1">
                      {metrics.apiUsage.current}/{metrics.apiUsage.limit} requests
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          


          {/* Global Settings */}
          {settings && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Global Settings</CardTitle>
                <p className="text-sm text-gray-600">Platform-wide configuration options</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                    <input 
                      type="text" 
                      value={settings.platformName}
                      onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                    <select 
                      value={settings.defaultCurrency}
                      onChange={(e) => setSettings({ ...settings, defaultCurrency: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="GBP">GBP (£)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select 
                      value={settings.timeZone}
                      onChange={(e) => setSettings({ ...settings, timeZone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="UTC+00:00">UTC+00:00 (London)</option>
                      <option value="UTC+01:00">UTC+01:00 (Central Europe)</option>
                      <option value="UTC-05:00">UTC-05:00 (Eastern US)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                    <input 
                      type="email" 
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input 
                      type="number" 
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (requests/hour)</label>
                    <input 
                      type="number" 
                      value={settings.apiRateLimit}
                      onChange={(e) => setSettings({ ...settings, apiRateLimit: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Version</label>
                    <select 
                      value={settings.apiVersion}
                      onChange={(e) => setSettings({ ...settings, apiVersion: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="v2.1">v2.1 (Current)</option>
                      <option value="v2.0">v2.0 (Legacy)</option>
                      <option value="v1.9">v1.9 (Deprecated)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {security && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Security Settings</CardTitle>
                <p className="text-sm text-gray-600">Configure platform security options</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Require 2FA for all users</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={security.twoFactorEnabled}
                        onChange={(e) => setSecurity({ ...security, twoFactorEnabled: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <p className="font-medium text-gray-900 mb-3">Password Policy</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Minimum Length</label>
                        <input 
                          type="number" 
                          value={security.passwordPolicy.minLength}
                          onChange={(e) => setSecurity({
                            ...security,
                            passwordPolicy: {
                              ...security.passwordPolicy,
                              minLength: parseInt(e.target.value)
                            }
                          })}
                          className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Require Numbers</label>
                        <input 
                          type="checkbox" 
                          checked={security.passwordPolicy.requireNumbers}
                          onChange={(e) => setSecurity({
                            ...security,
                            passwordPolicy: {
                              ...security.passwordPolicy,
                              requireNumbers: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Require Special Characters</label>
                        <input 
                          type="checkbox" 
                          checked={security.passwordPolicy.requireSpecialChars}
                          onChange={(e) => setSecurity({
                            ...security,
                            passwordPolicy: {
                              ...security.passwordPolicy,
                              requireSpecialChars: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Require Uppercase</label>
                        <input 
                          type="checkbox" 
                          checked={security.passwordPolicy.requireUppercase}
                          onChange={(e) => setSecurity({
                            ...security,
                            passwordPolicy: {
                              ...security.passwordPolicy,
                              requireUppercase: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Require Lowercase</label>
                        <input 
                          type="checkbox" 
                          checked={security.passwordPolicy.requireLowercase}
                          onChange={(e) => setSecurity({
                            ...security,
                            passwordPolicy: {
                              ...security.passwordPolicy,
                              requireLowercase: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input 
                      type="number" 
                      value={security.sessionPolicy.sessionTimeout}
                      onChange={(e) => setSecurity({ 
                        ...security, 
                        sessionPolicy: {
                          ...security.sessionPolicy,
                          sessionTimeout: parseInt(e.target.value)
                        }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist (one per line)</label>
                    <textarea 
                      value={security.ipWhitelist.join('\n')}
                      onChange={(e) => setSecurity({ ...security, ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim()) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24" 
                      placeholder="Enter IP addresses..."
                    />
                  </div>

                  <Button 
                    className="w-full"
                    onClick={handleSaveSecurity}
                  >
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
} 