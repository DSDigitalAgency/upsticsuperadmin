'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { securityService } from '@/lib/services/security.service'
import { SecurityDashboard, SecurityEvent, SecuritySystem } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { Shield, AlertTriangle, Clock, Settings, Activity } from 'lucide-react'

export default function SecurityPage() {
  const { toast } = useToast()
  const [dashboard, setDashboard] = useState<SecurityDashboard | null>(null)
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [system, setSystem] = useState<SecuritySystem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [dashboardRes, eventsRes, systemRes] = await Promise.all([
        securityService.getDashboard(),
        securityService.getEvents(),
        securityService.getSecuritySystem()
      ])

      setDashboard(dashboardRes.data)
      setEvents(eventsRes.data)
      setSystem(systemRes.data)
    } catch (err) {
      console.error('Error fetching security data:', err)
      setError('Failed to fetch security data')
      toast({
        title: 'Error',
        description: 'Failed to fetch security data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCalculateScore = async () => {
    try {
      const response = await securityService.calculateSecurityScore()
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Security score recalculated successfully'
        })
        fetchData()
      }
    } catch (err) {
      console.error('Error calculating security score:', err)
      toast({
        title: 'Error',
        description: 'Failed to calculate security score',
        variant: 'destructive'
      })
    }
  }

  const getSeverityColor = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (loading) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p className="text-gray-600">{error}</p>
        <Button onClick={fetchData} className="mt-4">
          Retry
          </Button>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Security Management</h1>
        <Button onClick={handleCalculateScore} variant="outline">
          <Activity className="mr-2 h-4 w-4" />
          Recalculate Score
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">
            <Shield className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="events">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {dashboard && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboard.securityScore.overall}%</div>
                    <p className="text-xs text-muted-foreground">
                      Last updated {formatDistanceToNow(new Date(dashboard.securityScore.lastUpdated))} ago
                    </p>
            </CardContent>
          </Card>
          <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboard.severityDistribution.critical}</div>
                    <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>
          <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">High Severity</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboard.severityDistribution.high}</div>
                    <p className="text-xs text-muted-foreground">Needs prompt action</p>
            </CardContent>
          </Card>
          <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboard.activeEvents}</div>
                    <p className="text-xs text-muted-foreground">Current security events</p>
            </CardContent>
          </Card>
        </div>

              {/* Security Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Score Breakdown</CardTitle>
                  <CardDescription>Detailed security metrics across different areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Authentication</span>
                        <span className="text-sm">{dashboard.securityScore.authentication}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${dashboard.securityScore.authentication}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Data Protection</span>
                        <span className="text-sm">{dashboard.securityScore.dataProtection}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${dashboard.securityScore.dataProtection}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">API Security</span>
                        <span className="text-sm">{dashboard.securityScore.apiSecurity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${dashboard.securityScore.apiSecurity}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">User Security</span>
                        <span className="text-sm">{dashboard.securityScore.userSecurity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${dashboard.securityScore.userSecurity}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">System Security</span>
                        <span className="text-sm">{dashboard.securityScore.systemSecurity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${dashboard.securityScore.systemSecurity}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Type Distribution</CardTitle>
                  <CardDescription>Breakdown of security events by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
                    {Object.entries(dashboard.typeDistribution).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium capitalize">{type.replace('_', ' ')}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
          <CardHeader>
                  <CardTitle>Recent Security Events</CardTitle>
                  <CardDescription>Latest security events that require attention</CardDescription>
          </CardHeader>
          <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboard.recentEvents && Array.isArray(dashboard.recentEvents) && dashboard.recentEvents.length > 0 ? (
                        dashboard.recentEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.type}</TableCell>
                            <TableCell>
                              <Badge className={getSeverityColor(event.severity)}>
                                {event.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>{event.description}</TableCell>
                            <TableCell>{event.userEmail || 'System'}</TableCell>
                            <TableCell>
                              {formatDistanceToNow(new Date(event.createdAt))} ago
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground">
                            No recent security events found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
          </CardContent>
        </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>All security events in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events && Array.isArray(events) && events.length > 0 ? (
                    events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.type}</TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>{event.userEmail || 'System'}</TableCell>
                        <TableCell>{event.ipAddress || 'N/A'}</TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(event.createdAt))} ago
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No security events found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          {system && system.passwordPolicy && system.sessionPolicy ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Password Policy</CardTitle>
                  <CardDescription>Configure password requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Minimum Length</span>
                    <Badge variant="outline">{system.passwordPolicy?.minLength || 8} characters</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Require Uppercase</span>
                    <Badge variant={system.passwordPolicy?.requireUppercase ? 'default' : 'outline'}>
                      {system.passwordPolicy?.requireUppercase ? 'Required' : 'Optional'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Require Lowercase</span>
                    <Badge variant={system.passwordPolicy?.requireLowercase ? 'default' : 'outline'}>
                      {system.passwordPolicy?.requireLowercase ? 'Required' : 'Optional'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Require Numbers</span>
                    <Badge variant={system.passwordPolicy?.requireNumbers ? 'default' : 'outline'}>
                      {system.passwordPolicy?.requireNumbers ? 'Required' : 'Optional'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Require Special Characters</span>
                    <Badge variant={system.passwordPolicy?.requireSpecialChars ? 'default' : 'outline'}>
                      {system.passwordPolicy?.requireSpecialChars ? 'Required' : 'Optional'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Password Max Age</span>
                    <Badge variant="outline">{system.passwordPolicy?.maxAge || 90} days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Policy</CardTitle>
                  <CardDescription>Configure session settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Max Concurrent Sessions</span>
                    <Badge variant="outline">{system.sessionPolicy?.maxConcurrentSessions || 3}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session Timeout</span>
                    <Badge variant="outline">{system.sessionPolicy?.sessionTimeout || 30} minutes</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Require Re-authentication</span>
                    <Badge variant={system.sessionPolicy?.requireReauth ? 'default' : 'outline'}>
                      {system.sessionPolicy?.requireReauth ? 'Required' : 'Optional'}
                    </Badge>
              </div>
            </CardContent>
          </Card>

              <Card className="md:col-span-2">
            <CardHeader>
                  <CardTitle>System Security</CardTitle>
                  <CardDescription>Overall system security settings</CardDescription>
            </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <Badge variant={system.twoFactorEnabled ? 'default' : 'outline'}>
                      {system.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>IP Whitelist</span>
                    <div className="flex gap-2">
                      {system.ipWhitelist && system.ipWhitelist.length > 0 ? (
                        system.ipWhitelist.map((ip) => (
                          <Badge key={ip} variant="outline">
                            {ip}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline">No IPs whitelisted</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Security Audit</span>
                    <Badge variant="outline">
                      {system.lastSecurityAudit 
                        ? `${formatDistanceToNow(new Date(system.lastSecurityAudit))} ago`
                        : 'No audit data'
                      }
                    </Badge>
              </div>
            </CardContent>
          </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No system security data available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 