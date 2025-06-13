'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users, DollarSign, Building2, MapPin, Mail, Phone,
  Globe, Calendar, TrendingUp, ArrowLeft, Edit, Ban,
  CheckCircle, Trash2, AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAgencies } from '@/hooks/useAgencies'
import { Agency } from '@/lib/types'

function AgencyDetailsContent({ id }: { id: string }) {
  const router = useRouter()
  const {
    getAgency,
    suspendAgency,
    activateAgency,
    deleteAgency,
  } = useAgencies()

  const [agency, setAgency] = useState<Agency | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAgency = async () => {
      try {
        setLoading(true)
        const data = await getAgency(id)
        setAgency(data)
      } catch (err) {
        console.error('Error loading agency:', err)
        setError('Failed to load agency details')
      } finally {
        setLoading(false)
      }
    }

    loadAgency()
  }, [id, getAgency])

  const handleSuspend = async () => {
    try {
      if (!agency) return
      if (confirm('Are you sure you want to suspend this agency?')) {
        await suspendAgency(agency._id)
        // Refresh agency data
        const updated = await getAgency(id)
        setAgency(updated)
      }
    } catch (err) {
      console.error('Error suspending agency:', err)
    }
  }

  const handleActivate = async () => {
    try {
      if (!agency) return
      await activateAgency(agency._id)
      // Refresh agency data
      const updated = await getAgency(id)
      setAgency(updated)
    } catch (err) {
      console.error('Error activating agency:', err)
    }
  }

  const handleDelete = async () => {
    try {
      if (!agency) return
      if (confirm('Are you sure you want to delete this agency? This action cannot be undone.')) {
        await deleteAgency(agency._id)
        router.push('/agencies')
      }
    } catch (err) {
      console.error('Error deleting agency:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agency details...</p>
        </div>
      </div>
    )
  }

  if (error || !agency) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700 mt-1">
                {error || 'Agency not found'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      suspended: { color: 'bg-red-100 text-red-800', label: 'Suspended' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agencies
          </Button>
          <h1 className="text-2xl font-bold">{agency.name}</h1>
          <Badge className={getStatusBadge(agency.status).color}>
            {getStatusBadge(agency.status).label}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/agencies/${agency._id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Agency
          </Button>
          {agency.status === 'active' ? (
            <Button variant="outline" onClick={handleSuspend}>
              <Ban className="h-4 w-4 mr-2" />
              Suspend
            </Button>
          ) : (
            <Button variant="outline" onClick={handleActivate}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Activate
            </Button>
          )}
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Description</h4>
                <p>{agency.description}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Industry</h4>
                <p>{agency.industry}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Size</h4>
                <p>{agency.size}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {agency.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Primary Contact</h4>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {agency.primaryContact.name}
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {agency.primaryContact.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {agency.primaryContact.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Website</h4>
                  <p className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {agency.website}
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Address</h4>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    {agency.address.street}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {agency.address.city}, {agency.address.state} {agency.address.postalCode}
                  </p>
                  <p className="ml-6">{agency.address.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Total Users</h4>
                <p className="text-2xl font-semibold">{agency.metrics.userCount}</p>
                <p className="text-sm text-gray-500">
                  {agency.metrics.activeUserCount} active
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Monthly Revenue</h4>
                <p className="text-2xl font-semibold">
                  {agency.billing.currency}{agency.metrics.revenueMonthly.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{agency.metrics.fillRate}% fill rate
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Total Placements</h4>
                <p className="text-2xl font-semibold">{agency.metrics.totalPlacements}</p>
                <p className="text-sm text-gray-500">
                  {agency.metrics.jobsPosted} jobs posted
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-500 mb-1">Client Base</h4>
                <p className="text-2xl font-semibold">{agency.metrics.clientCount}</p>
                <p className="text-sm text-gray-500">
                  {agency.metrics.workerCount} workers
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          {/* Users tab content */}
          <Card>
            <CardHeader>
              <CardTitle>Users Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">User management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          {/* Billing tab content */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Current Plan</h4>
                  <p className="text-2xl font-semibold">{agency.billing.plan}</p>
                  <p className="text-sm text-gray-500">
                    {agency.billing.currency}{agency.billing.amount}/month
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Trial Status</h4>
                  <p className="text-2xl font-semibold">
                    {agency.trialDetails.isConverted ? 'Converted' : 'Trial'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Until {new Date(agency.trialDetails.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-500 mb-4">Recent Invoices</h4>
                {agency.billing.invoices.length > 0 ? (
                  <div className="space-y-2">
                    {agency.billing.invoices.map((invoice: any) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{invoice.description}</p>
                          <p className="text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{agency.billing.currency}{invoice.amount}</p>
                          <Badge variant={invoice.status === 'paid' ? 'success' : 'warning'}>
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No invoices yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          {/* Settings tab content */}
          <Card>
            <CardHeader>
              <CardTitle>Agency Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-500 mb-4">Features</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {agency.features.enabledFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-4">Integrations</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {agency.features.integrations.map((integration) => (
                      <div key={integration} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{integration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AgencyDetails({ params }: { params: { id: string } }) {
  return <AgencyDetailsContent id={params.id} />
} 