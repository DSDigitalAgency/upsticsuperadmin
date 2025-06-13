'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  CheckCircle,
  AlertCircle,
  Calendar,
  Download,
  RefreshCw,
  MoreHorizontal,
  Ban,
  Eye,
  Edit,
  Plus,
  Search,
  DollarSign,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAgencies } from '@/hooks/useAgencies'
import { AgencyStatus, AgencyPlan, AgencySize, AgencyFilters } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

// Helper function to get status variant
function getStatusVariant(status: AgencyStatus) {
  switch (status) {
    case 'active':
      return 'success'
    case 'pending':
      return 'warning'
    case 'suspended':
      return 'destructive'
    default:
      return 'secondary'
  }
}

// Error Boundary Component
function AgencyPageContent() {
  const [isClient, setIsClient] = useState(false)
  
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Agency Management...</p>
          </div>
        </div>
      </div>
    )
  }

  return <AgencyManagementContent />
}

function AgencyManagementContent() {
  const router = useRouter()
  const {
    agencies,
    stats,
    loading,
    filters,
    pagination,
    loadAgencies,
    loadStats,
    updateFilters,
    resetFilters,
    suspendAgency,
    activateAgency,
    exportAgencies,
  } = useAgencies()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | AgencyStatus>('all')
  const [planFilter, setPlanFilter] = useState<'all' | AgencyPlan>('all')
  const [sizeFilter, setSizeFilter] = useState<'all' | AgencySize>('all')

  // Load agencies when filters change
  useEffect(() => {
    loadAgencies()
  }, [filters, loadAgencies])

  // Refresh stats periodically
  useEffect(() => {
    loadStats() // Initial load
    const interval = setInterval(loadStats, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [loadStats])

  // Filter handling
  useEffect(() => {
    const filters: Partial<AgencyFilters> = {
      search: searchTerm,
      status: statusFilter === 'all' ? undefined : statusFilter,
      size: sizeFilter === 'all' ? undefined : sizeFilter,
    }

    if (planFilter !== 'all') {
      filters.plan = planFilter
    }

    updateFilters(filters)
  }, [searchTerm, statusFilter, planFilter, sizeFilter, updateFilters])

  const handleSuspendAgency = async (id: string) => {
    await suspendAgency(id)
    loadStats() // Refresh stats after suspension
  }

  const handleActivateAgency = async (id: string) => {
    await activateAgency(id)
    loadStats() // Refresh stats after activation
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agency Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor all agencies in your platform
          </p>
        </div>
        <Button onClick={() => router.push('/agencies/add')} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Agency
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Agencies</p>
                <h2 className="text-2xl font-bold">{loading.stats ? '...' : stats?.total_agencies || 0}</h2>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <h2 className="text-2xl font-bold">{loading.stats ? '...' : stats?.active_agencies || 0}</h2>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <h2 className="text-2xl font-bold">{loading.stats ? '...' : stats?.pending_agencies || 0}</h2>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <h2 className="text-2xl font-bold">
                  ${loading.stats ? '...' : ((stats?.total_revenue || 0) / 1000).toFixed(1)}k
                </h2>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <div className="p-4 border-b">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-4">
              <div className="w-full md:w-[300px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search agencies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Select 
                  value={statusFilter} 
                  onValueChange={(value: 'all' | AgencyStatus) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

                <Select 
                  value={planFilter} 
                  onValueChange={(value: 'all' | AgencyPlan) => setPlanFilter(value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Plans" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="BASIC">Basic</SelectItem>
                    <SelectItem value="PRO">Pro</SelectItem>
                    <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                    <SelectItem value="CUSTOM">Custom</SelectItem>
                  </SelectContent>
                </Select>

                <Select 
                  value={sizeFilter} 
                  onValueChange={(value: 'all' | AgencySize) => setSizeFilter(value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Sizes" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="SMALL">Small</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LARGE">Large</SelectItem>
                    <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={resetFilters}
                  className="h-9 w-9"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px] bg-white">
                  <DropdownMenuItem onClick={() => exportAgencies('csv')}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportAgencies('xlsx')}>
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>

      {/* Agencies Table */}
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">Agency</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading.agencies ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-muted-foreground">Loading agencies...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : agencies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                    <span className="text-muted-foreground">No agencies found</span>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/agencies/add')}
                      className="mt-2"
                    >
                      Add New Agency
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              agencies.map((agency) => (
                <TableRow key={agency._id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{agency.name}</div>
                        <div className="text-sm text-muted-foreground">{agency.contactEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {agency.industry}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {agency.billing?.plan?.toLowerCase() || 'Basic'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {agency.size.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusVariant(agency.status)}
                      className={cn(
                        "capitalize",
                        agency.status === 'active' && "bg-green-50 text-green-700 hover:bg-green-100",
                        agency.status === 'pending' && "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
                        agency.status === 'suspended' && "bg-red-50 text-red-700 hover:bg-red-100"
                      )}
                    >
                      {agency.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(agency.updated_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px] bg-white">
                        <DropdownMenuItem onClick={() => router.push(`/agencies/${agency._id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/agencies/${agency._id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Agency
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {agency.status === 'active' ? (
                          <DropdownMenuItem 
                            onClick={() => handleSuspendAgency(agency._id)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        ) : agency.status === 'suspended' ? (
                          <DropdownMenuItem 
                            onClick={() => handleActivateAgency(agency._id)}
                            className="text-green-600 focus:text-green-600 focus:bg-green-50"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Reactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onClick={() => handleActivateAgency(agency._id)}
                            className="text-green-600 focus:text-green-600 focus:bg-green-50"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {((pagination.current_page - 1) * pagination.items_per_page) + 1} to{' '}
            {Math.min(pagination.current_page * pagination.items_per_page, pagination.total_items)} of{' '}
            {pagination.total_items} agencies
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilters({ page: pagination.current_page - 1 })}
              disabled={pagination.current_page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilters({ page: pagination.current_page + 1 })}
              disabled={pagination.current_page === pagination.total_pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AgencyManagement() {
  return <AgencyPageContent />
} 