'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-hot-toast'
import { auditService } from '@/lib/services/audit.service'
import { AuditLog, AuditLogStats, AuditLogFilters, AuditActionType, AuditEntityType, AuditLogsResponse } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { 
  FileText, 
  Filter, 
  Plus, 
  Calendar, 
  BarChart3,
  RefreshCw,
  AlertCircle,
  Search,
  User,
  Settings,
  X
} from 'lucide-react'

export default function AuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLogsResponse | null>(null)
  const [stats, setStats] = useState<AuditLogStats | null>(null)
  const [actions, setActions] = useState<AuditActionType[]>([])
  const [entities, setEntities] = useState<AuditEntityType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<AuditLogFilters>({
    page: 1,
    limit: 20
  })
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newAuditLog, setNewAuditLog] = useState({
    action: '',
    entity: '',
    entityId: '',
    description: '',
    metadata: ''
  })

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [logsRes, statsRes, actionsRes, entitiesRes] = await Promise.all([
        auditService.getAuditLogs(filters),
        auditService.getAuditLogStats(),
        auditService.getAuditActions(),
        auditService.getAuditEntities()
      ])

      setAuditLogs(logsRes.data)
      setStats(statsRes.data)
      setActions(actionsRes.data)
      setEntities(entitiesRes.data)
    } catch (err) {
      console.error('Error fetching audit logs data:', err)
      setError('Failed to fetch audit logs data')
      toast.error('Failed to fetch audit logs data')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleFilterChange = (key: keyof AuditLogFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : (typeof value === 'number' ? value : parseInt(value) || 1) // Reset to page 1 when changing filters
    }))
  }

  const handleCreateAuditLog = async () => {
    try {
      let details: Record<string, unknown> = {}
      if (newAuditLog.metadata) {
        try {
          details = JSON.parse(newAuditLog.metadata)
        } catch {
          toast.error('Invalid JSON in metadata field')
          return
        }
      }

      await auditService.createAuditLog({
        actionType: newAuditLog.action,
        entityType: newAuditLog.entity,
        entityId: newAuditLog.entityId || undefined,
        details: Object.keys(details).length > 0 ? details : undefined,
        timestamp: new Date().toISOString()
      })

      toast.success('Audit log created successfully')
      setIsCreateDialogOpen(false)
      setNewAuditLog({
        action: '',
        entity: '',
        entityId: '',
        description: '',
        metadata: ''
      })
      fetchData()
    } catch (err) {
      console.error('Error creating audit log:', err)
      toast.error('Failed to create audit log')
    }
  }

  const getActionBadgeColor = (action: string) => {
    const actionLower = action.toLowerCase()
    if (actionLower.includes('create')) return 'bg-green-500'
    if (actionLower.includes('update') || actionLower.includes('edit')) return 'bg-blue-500'
    if (actionLower.includes('delete') || actionLower.includes('remove')) return 'bg-red-500'
    if (actionLower.includes('login') || actionLower.includes('access')) return 'bg-purple-500'
    return 'bg-gray-500'
  }

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 20
    })
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
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p className="text-gray-600">{error}</p>
        <Button onClick={fetchData} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <div className="flex space-x-2">
          <Button onClick={fetchData} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Log Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Manual Audit Log</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <Select value={newAuditLog.action} onValueChange={(value) => setNewAuditLog({...newAuditLog, action: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      {actions.map((action, index) => (
                        <SelectItem key={`create-action-${action.value || index}`} value={action.value}>
                          {action.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entity">Entity</Label>
                  <Select value={newAuditLog.entity} onValueChange={(value) => setNewAuditLog({...newAuditLog, entity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity" />
                    </SelectTrigger>
                    <SelectContent>
                      {entities.map((entity, index) => (
                        <SelectItem key={`create-entity-${entity.value || index}`} value={entity.value}>
                          {entity.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entityId">Entity ID (Optional)</Label>
                  <Input
                    id="entityId"
                    value={newAuditLog.entityId}
                    onChange={(e) => setNewAuditLog({...newAuditLog, entityId: e.target.value})}
                    placeholder="Enter entity ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newAuditLog.description}
                    onChange={(e) => setNewAuditLog({...newAuditLog, description: e.target.value})}
                    placeholder="Enter description"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metadata">Metadata (JSON, Optional)</Label>
                  <Textarea
                    id="metadata"
                    value={newAuditLog.metadata}
                    onChange={(e) => setNewAuditLog({...newAuditLog, metadata: e.target.value})}
                    placeholder='{"key": "value"}'
                    className="min-h-[60px]"
                  />
                </div>
                <Button onClick={handleCreateAuditLog} className="w-full">
                  Create Audit Log
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Overview - Updated to match new API structure */}
      {stats ? (
        <div className="space-y-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Statistics Overview</h2>
          </div>
          
          {/* Main Stats Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                Total Audit Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-700 mb-2">
                {(stats.totalLogs || 0).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">
                Total audit log entries in the system
              </p>
            </CardContent>
          </Card>

          {/* Distribution Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Action Types Distribution */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Action Types
                </CardTitle>
                <CardDescription>Distribution by action types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.actionTypeDistribution || {}).map(([action, count]) => (
                    <div key={action} className="flex justify-between items-center p-2 bg-white rounded-lg border border-green-100">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {action.replace('_', ' ')}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-green-100 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(count / stats.totalLogs) * 100}%` }}
                          ></div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                          {count}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Entity Types Distribution */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <User className="mr-2 h-4 w-4" />
                  Entity Types
                </CardTitle>
                <CardDescription>Distribution by entity types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.entityTypeDistribution || {}).map(([entity, count]) => (
                    <div key={entity} className="flex justify-between items-center p-2 bg-white rounded-lg border border-purple-100">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {entity}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-purple-100 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${(count / stats.totalLogs) * 100}%` }}
                          ></div>
                        </div>
                        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                          {count}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Activity Distribution */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <User className="mr-2 h-4 w-4" />
                  User Activity
                </CardTitle>
                <CardDescription>Distribution by user activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.userActivityDistribution || {}).map(([user, count]) => (
                    <div key={user} className="flex justify-between items-center p-2 bg-white rounded-lg border border-orange-100">
                      <span className="text-sm font-medium text-gray-700">
                        {user}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-orange-100 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${(count / stats.totalLogs) * 100}%` }}
                          ></div>
                        </div>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                          {count}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          {stats.recentActivity && stats.recentActivity.length > 0 && (
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest audit log entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {stats.recentActivity.slice(0, 5).map((activity: AuditLog) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <Badge className={getActionBadgeColor(activity.actionType)} variant="outline">
                          {activity.actionType}
                        </Badge>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {activity.userEmail}
                          </div>
                          <div className="text-xs text-gray-500">
                            {activity.entityType} • {formatDistanceToNow(new Date(activity.timestamp))} ago
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {activity.ipAddress}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Statistics Available</h3>
          <p className="text-gray-600 text-center">
            Statistics will appear here once audit log data is available.
          </p>
        </div>
      )}

      {/* Enhanced Filters Section */}
      <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center text-lg font-semibold">
            <Filter className="mr-3 h-5 w-5" />
            Filter & Search Options
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search Filter */}
            <div className="space-y-3">
              <Label htmlFor="search" className="flex items-center text-sm font-semibold text-gray-700">
                <Search className="mr-2 h-4 w-4 text-blue-600" />
                Search Logs
              </Label>
              <div className="relative">
                  <Input
                    id="search"
                  placeholder="Search in logs..."
                    value={filters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50 focus:bg-white transition-all duration-200"
                  />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
                </div>

            {/* Action Filter */}
            <div className="space-y-3">
              <Label htmlFor="action-filter" className="flex items-center text-sm font-semibold text-gray-700">
                <Settings className="mr-2 h-4 w-4 text-green-600" />
                Action Type
              </Label>
              <Select value={filters.actionType || 'all'} onValueChange={(value) => handleFilterChange('actionType', value === 'all' ? '' : value)}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50 hover:bg-white transition-all duration-200">
                      <SelectValue placeholder="All actions" />
                    </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
                  <SelectItem value="all" className="hover:bg-green-50 focus:bg-green-100">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                      All actions
                    </span>
                  </SelectItem>
                      {actions.map((action, index) => (
                    <SelectItem key={`action-${action.value || index}`} value={action.value} className="hover:bg-green-50 focus:bg-green-100">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {action.label}
                      </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

            {/* Entity Filter */}
            <div className="space-y-3">
              <Label htmlFor="entity-filter" className="flex items-center text-sm font-semibold text-gray-700">
                <User className="mr-2 h-4 w-4 text-purple-600" />
                Entity Type
              </Label>
              <Select value={filters.entityType || 'all'} onValueChange={(value) => handleFilterChange('entityType', value === 'all' ? '' : value)}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-gray-50 hover:bg-white transition-all duration-200">
                      <SelectValue placeholder="All entities" />
                    </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
                  <SelectItem value="all" className="hover:bg-purple-50 focus:bg-purple-100">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                      All entities
                    </span>
                  </SelectItem>
                      {entities.map((entity, index) => (
                    <SelectItem key={`entity-${entity.value || index}`} value={entity.value} className="hover:bg-purple-50 focus:bg-purple-100">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                          {entity.label}
                      </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

            {/* Date Filter */}
            <div className="space-y-3">
              <Label htmlFor="start-date" className="flex items-center text-sm font-semibold text-gray-700">
                <Calendar className="mr-2 h-4 w-4 text-orange-600" />
                Start Date
              </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={filters.startDate || ''}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-gray-50 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

          {/* Filter Actions and Results */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 pt-6 border-t border-gray-200 gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex items-center border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
              >
                <X className="mr-2 h-4 w-4" />
                Clear All Filters
                </Button>
              
              {/* Active Filter Indicators */}
              {(filters.search || filters.actionType || filters.entityType || filters.startDate) && (
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-300">
                      Search: &quot;{filters.search}&quot;
                    </Badge>
                  )}
                  {filters.actionType && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border border-green-300">
                      Action: {actions.find(a => a.value === filters.actionType)?.label || filters.actionType}
                    </Badge>
                  )}
                  {filters.entityType && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 border border-purple-300">
                      Entity: {entities.find(e => e.value === filters.entityType)?.label || filters.entityType}
                    </Badge>
                  )}
                  {filters.startDate && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 border border-orange-300">
                      From: {filters.startDate}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full border">
                <span className="text-blue-600 font-semibold">{auditLogs?.total || 0}</span> total logs found
              </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Log Entries</CardTitle>
              <CardDescription>Complete audit trail of system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
              {auditLogs?.logs && auditLogs.logs.length > 0 ? (
                auditLogs.logs.map((log: AuditLog) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">
                      {formatDistanceToNow(new Date(log.timestamp || log.createdAt))} ago
                        </TableCell>
                        <TableCell>
                          <div>
                        <div className="font-medium">{log.userEmail || 'System'}</div>
                        <div className="text-sm text-gray-500">{log.userRole}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                      <Badge className={getActionBadgeColor(log.actionType)}>
                        {log.actionType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                        <div className="font-medium">{log.entityType}</div>
                            {log.entityId && (
                              <div className="text-sm text-gray-500">ID: {log.entityId}</div>
                            )}
                          </div>
                        </TableCell>
                    <TableCell className="max-w-xs">
                      {log.details ? (
                        <div className="truncate" title={JSON.stringify(log.details, null, 2)}>
                          {typeof log.details === 'object' && log.details.action ? 
                            `${log.details.action}${log.details.filterParams ? ' (filtered)' : ''}` 
                            : JSON.stringify(log.details)
                          }
                        </div>
                      ) : (
                        'No details'
                      )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {log.ipAddress || 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No audit logs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
          {auditLogs && auditLogs.total > parseInt(auditLogs.limit) && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                Page {auditLogs.page} of {Math.ceil(auditLogs.total / parseInt(auditLogs.limit))}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                  disabled={parseInt(auditLogs.page) <= 1}
                  onClick={() => handleFilterChange('page', parseInt(auditLogs.page) - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                  disabled={parseInt(auditLogs.page) >= Math.ceil(auditLogs.total / parseInt(auditLogs.limit))}
                  onClick={() => handleFilterChange('page', parseInt(auditLogs.page) + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
    </div>
  )
} 