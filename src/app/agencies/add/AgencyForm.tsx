'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAgencies } from '@/hooks/useAgencies'
import { CreateAgencyRequest } from '@/lib/types'
import { toast } from 'react-hot-toast'

export default function AgencyForm() {
  const router = useRouter()
  const { createAgency, loading } = useAgencies()
  const [formData, setFormData] = useState<CreateAgencyRequest>({
    name: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'United Kingdom'
    },
    contact_person: {
      name: '',
      email: '',
      phone: '',
      position: ''
    },
    subscription_plan: 'starter',
    commission_rate: 15
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!formData.name) newErrors.name = 'Agency name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.contact_person.name) newErrors['contact_person.name'] = 'Contact person name is required'
    if (!formData.contact_person.email) newErrors['contact_person.email'] = 'Contact person email is required'
    if (!formData.address.city) newErrors['address.city'] = 'City is required'
    if (!formData.address.country) newErrors['address.country'] = 'Country is required'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (formData.contact_person.email && !emailRegex.test(formData.contact_person.email)) {
      newErrors['contact_person.email'] = 'Invalid contact person email format'
    }

    // Phone validation (optional but if provided, must be valid)
    const phoneRegex = /^\+?[\d\s-]{10,}$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format'
    }
    if (formData.contact_person.phone && !phoneRegex.test(formData.contact_person.phone)) {
      newErrors['contact_person.phone'] = 'Invalid contact person phone format'
    }

    // Website validation (optional but if provided, must be valid)
    if (formData.website) {
      try {
        new URL(formData.website)
      } catch {
        newErrors.website = 'Invalid website URL'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const keys = name.split('.')
    
    setFormData(prev => {
      if (keys.length === 1) {
        return { ...prev, [name]: value }
      } else if (keys.length === 2) {
        const [parent, child] = keys
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev],
            [child]: value
          }
        }
      }
      return prev
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
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
              placeholder="e.g., MediStaff Solutions"
              className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input 
              type="url" 
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://www.example.com"
              className={`w-full border ${errors.website ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Plan <span className="text-red-500">*</span>
            </label>
            <select 
              name="subscription_plan"
              value={formData.subscription_plan}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commission Rate (%) <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              name="commission_rate"
              value={formData.commission_rate}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.1"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Email <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@agency.com"
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+44 20 1234 5678"
              className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="contact_person.name"
              value={formData.contact_person.name}
              onChange={handleChange}
              required
              placeholder="John Smith"
              className={`w-full border ${errors['contact_person.name'] ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors['contact_person.name'] && <p className="mt-1 text-sm text-red-600">{errors['contact_person.name']}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Email <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              name="contact_person.email"
              value={formData.contact_person.email}
              onChange={handleChange}
              required
              placeholder="john@agency.com"
              className={`w-full border ${errors['contact_person.email'] ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors['contact_person.email'] && <p className="mt-1 text-sm text-red-600">{errors['contact_person.email']}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Phone
            </label>
            <input 
              type="tel" 
              name="contact_person.phone"
              value={formData.contact_person.phone}
              onChange={handleChange}
              placeholder="+44 20 1234 5678"
              className={`w-full border ${errors['contact_person.phone'] ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors['contact_person.phone'] && <p className="mt-1 text-sm text-red-600">{errors['contact_person.phone']}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Position
            </label>
            <input 
              type="text" 
              name="contact_person.position"
              value={formData.contact_person.position}
              onChange={handleChange}
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
              Street Address
            </label>
            <input 
              type="text" 
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="123 Healthcare Street"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className={`w-full border ${errors['address.city'] ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors['address.city'] && <p className="mt-1 text-sm text-red-600">{errors['address.city']}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postcode
              </label>
              <input 
                type="text" 
                name="address.postal_code"
                value={formData.address.postal_code}
                onChange={handleChange}
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
                className={`w-full border ${errors['address.country'] ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors['address.country'] && <p className="mt-1 text-sm text-red-600">{errors['address.country']}</p>}
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
  )
} 