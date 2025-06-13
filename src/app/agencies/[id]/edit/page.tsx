'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAgencies } from '@/hooks/useAgencies'
import { UpdateAgencyRequest, AgencySize } from '@/lib/types'

type FormValue = string | number | boolean | undefined;

function EditAgencyContent({ id }: { id: string }) {
  const router = useRouter()
  const { getAgency, updateAgency } = useAgencies()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<UpdateAgencyRequest>({
    name: '',
    description: '',
    industry: '',
    size: 'SMALL' as AgencySize,
    contactEmail: '',
    contactPhone: '',
    website: '',
    status: 'pending',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United Kingdom'
    },
    primaryContact: {
      name: '',
      email: '',
      phone: '',
      position: ''
    },
    specializations: []
  })

  useEffect(() => {
    const loadAgency = async () => {
      try {
        setLoading(true)
        const data = await getAgency(id)
        // Transform the data to match UpdateAgencyRequest type
        const transformedData: UpdateAgencyRequest = {
          name: data.name || '',
          description: data.description || '',
          industry: data.industry || '',
          size: data.size || 'SMALL',
          contactEmail: data.contactEmail || '',
          contactPhone: data.contactPhone || '',
          website: data.website || '',
          status: data.status || 'pending',
          address: {
            street: data.address?.street || '',
            city: data.address?.city || '',
            state: data.address?.state || '',
            postalCode: data.address?.postal_code || '',
            country: data.address?.country || 'United Kingdom'
          },
          primaryContact: {
            name: data.primaryContact?.name || '',
            email: data.primaryContact?.email || '',
            phone: data.primaryContact?.phone || '',
            position: data.primaryContact?.position || ''
          },
          specializations: data.specializations || []
        }
        setFormData(transformedData)
      } catch (err) {
        console.error('Error loading agency:', err)
        setError('Failed to load agency details')
      } finally {
        setLoading(false)
      }
    }

    loadAgency()
  }, [id, getAgency])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.address) {
      setError('Address information is required')
      return
    }
    if (!formData.primaryContact) {
      setError('Primary contact information is required')
      return
    }
    try {
      setSaving(true)
      // Transform the data back to match the API's expected format
      const apiData: UpdateAgencyRequest = {
        ...formData,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          postalCode: formData.address.postalCode,
          country: formData.address.country
        },
        primaryContact: {
          name: formData.primaryContact.name,
          email: formData.primaryContact.email,
          phone: formData.primaryContact.phone,
          position: formData.primaryContact.position
        }
      }
      await updateAgency(id, apiData)
      router.push(`/agencies/${id}`)
    } catch (err) {
      console.error('Error updating agency:', err)
      setError('Failed to update agency')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof UpdateAgencyRequest, value: FormValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedChange = (parent: keyof UpdateAgencyRequest, field: string, value: FormValue) => {
    if (parent === 'address' || parent === 'primaryContact') {
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...((prev[parent] ?? {}) as unknown as Record<string, FormValue>),
          [field]: value
        }
      }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading agency details...</p>
        </div>
      </div>
    )
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
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Agency</h1>
        </div>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Agency Name</label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter agency name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter agency description"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Input
                  value={formData.industry || ''}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  placeholder="Enter industry"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <Select
                  value={formData.size}
                  onValueChange={(value) => handleChange('size', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMALL">Small</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LARGE">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email</label>
                <Input
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  placeholder="Enter contact email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Phone</label>
                <Input
                  type="tel"
                  value={formData.contactPhone || ''}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  placeholder="Enter contact phone"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Website</label>
              <Input
                type="url"
                value={formData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="Enter website URL"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Street Address</label>
              <Input
                value={formData.address?.street || ''}
                onChange={(e) => handleNestedChange('address', 'street', e.target.value)}
                placeholder="Enter street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input
                  value={formData.address?.city || ''}
                  onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State/Province</label>
                <Input
                  value={formData.address?.state || ''}
                  onChange={(e) => handleNestedChange('address', 'state', e.target.value)}
                  placeholder="Enter state/province"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Postal Code</label>
                <Input
                  value={formData.address?.postalCode || ''}
                  onChange={(e) => handleNestedChange('address', 'postalCode', e.target.value)}
                  placeholder="Enter postal code"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Input
                  value={formData.address?.country || ''}
                  onChange={(e) => handleNestedChange('address', 'country', e.target.value)}
                  placeholder="Enter country"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Name</label>
                <Input
                  value={formData.primaryContact?.name || ''}
                  onChange={(e) => handleNestedChange('primaryContact', 'name', e.target.value)}
                  placeholder="Enter contact name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Input
                  value={formData.primaryContact?.position || ''}
                  onChange={(e) => handleNestedChange('primaryContact', 'position', e.target.value)}
                  placeholder="Enter position"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.primaryContact?.email || ''}
                  onChange={(e) => handleNestedChange('primaryContact', 'email', e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  type="tel"
                  value={formData.primaryContact?.phone || ''}
                  onChange={(e) => handleNestedChange('primaryContact', 'phone', e.target.value)}
                  placeholder="Enter phone"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default function EditAgency({ params }: { params: { id: string } }) {
  return <EditAgencyContent id={params.id} />
} 