'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAgencies } from '@/hooks/useAgencies'
import { CreateAgencyRequest } from '@/lib/types'
import { toast } from 'react-hot-toast'

export default function AddAgencyPage() {
  const router = useRouter()
  const { createAgency, loading } = useAgencies()
  const [formData, setFormData] = useState<CreateAgencyRequest>({
    name: '',
    description: '',
    industry: '',
    size: 'Small',
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
    specializations: [],
    plan: 'BASIC',
    planPrice: 0,
    features: []
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Special handling for website/subdomain
    if (name === 'website') {
      // Convert to lowercase and remove any spaces
      const subdomain = value.toLowerCase().trim()
      setFormData(prev => ({
        ...prev,
        website: subdomain
      }))
      return
    }
    
    const keys = name.split('.')
    setFormData(prev => {
      if (keys.length === 1) {
        return { ...prev, [name]: value }
      } else if (keys.length === 2) {
        const [parent, child] = keys
        const parentObj = prev[parent as keyof typeof prev]
        return {
          ...prev,
          [parent]: {
            ...(typeof parentObj === 'object' && parentObj !== null ? parentObj : {}),
            [child]: value
          }
        }
      }
      return prev
    })
  }

  const handleSpecializationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      specializations: value.split(',').map(s => s.trim()).filter(Boolean)
    }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...(prev.features || []), feature]
    }))
  }

  // Available features for selection
  const availableFeatures = [
    { id: 'recruitment', label: 'Recruitment Management', description: 'Candidate sourcing and management' },
    { id: 'jobs', label: 'Job Management', description: 'Job posting and application tracking' },
    { id: 'shifts', label: 'Shift Management', description: 'Schedule and manage work shifts' },
    { id: 'timesheets', label: 'Timesheets', description: 'Time tracking and approval' },
    { id: 'payroll', label: 'Payroll Management', description: 'Payroll processing and calculations' },
    { id: 'compliance', label: 'Compliance Tracking', description: 'Document and certification management' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const newAgency = await createAgency(formData)
      if (newAgency) {
        toast.success('Agency created successfully!')
        router.push('/agencies')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create agency')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Add New Agency</h1>
              <p className="text-blue-200 text-sm">Register a new healthcare recruitment agency</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/agencies')}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                ← Back to Agencies
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Agency Registration Form</h2>
            <p className="text-sm text-gray-600">Complete all fields to register a new agency</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Company Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agency Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Acme Agency"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Brief description of the agency"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Healthcare, Technology"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select company size</option>
                    <option value="Small">Small (1-50 employees)</option>
                    <option value="Medium">Medium (51-200 employees)</option>
                    <option value="Large">Large (201+ employees)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      required
                      placeholder="your-agency"
                      pattern="[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?"
                      title="Use only lowercase letters, numbers, and hyphens. Must start and end with a letter or number."
                      className="w-full border border-gray-300 rounded-r-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 text-sm text-gray-500">
                      .upstic.com
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter your subdomain (e.g., your-agency). Only lowercase letters, numbers, and hyphens allowed.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specializations <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.specializations.join(', ')}
                    onChange={handleSpecializationsChange}
                    required
                    placeholder="e.g., Healthcare, Technology, Finance"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">Enter specializations separated by commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscription Plan
                  </label>
                  <select 
                    name="plan"
                    value={formData.plan || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a plan</option>
                    <option value="BASIC">Basic Plan - Essential features for small agencies</option>
                    <option value="PRO">Pro Plan - Advanced features for growing agencies</option>
                    <option value="ENTERPRISE">Enterprise Plan - Full feature set for large agencies</option>
                    <option value="CUSTOM">Custom Plan - Tailored solution</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Choose the subscription plan for this agency</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Price (Monthly)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">£</span>
                    <input 
                      type="number" 
                      name="planPrice"
                      value={formData.planPrice || ''}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="99.00"
                      className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Enter the monthly subscription price in GBP</p>
                </div>
              </div>
            </div>

            {/* Features Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Features & Modules</h3>
              <p className="text-sm text-gray-600 mb-4">Select the features and modules to enable for this agency</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <input
                      type="checkbox"
                      id={feature.id}
                      checked={formData.features?.includes(feature.id) || false}
                      onChange={() => handleFeatureToggle(feature.id)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label htmlFor={feature.id} className="block text-sm font-medium text-gray-900 cursor-pointer">
                        {feature.label}
                      </label>
                      <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Selected features: {formData.features?.length || 0} of {availableFeatures.length}
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    placeholder="contact@agency.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    placeholder="+44 20 1234 5678"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Primary Contact */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="primaryContact.name"
                    value={formData.primaryContact.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="primaryContact.email"
                    value={formData.primaryContact.email}
                    onChange={handleChange}
                    required
                    placeholder="john@agency.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="primaryContact.phone"
                    value={formData.primaryContact.phone}
                    onChange={handleChange}
                    required
                    placeholder="+44 20 1234 5678"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="primaryContact.position"
                    value={formData.primaryContact.position}
                    onChange={handleChange}
                    required
                    placeholder="Managing Director"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                    placeholder="123 Business Street"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      required
                      placeholder="London"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Province <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      required
                      placeholder="Greater London"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="address.postalCode"
                      value={formData.address.postalCode}
                      onChange={handleChange}
                      required
                      placeholder="SW1A 1AA"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      required
                      placeholder="United Kingdom"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button 
                type="button"
                onClick={() => router.push('/agencies')}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <div className="flex space-x-3">
                <button 
                  type="submit"
                  disabled={loading.creating}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading.creating ? 'Creating...' : 'Create Agency'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 