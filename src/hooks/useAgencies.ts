import { useState, useEffect, useCallback } from 'react'
import { 
  Agency, 
  AgencyStats, 
  AgencyFilters, 
  CreateAgencyRequest, 
  UpdateAgencyRequest,
} from '@/lib/types'
import { agencyService } from '@/lib/services/agency.service'

interface UseAgenciesState {
  agencies: Agency[]
  stats: AgencyStats | null
  selectedAgencies: string[]
  loading: {
    agencies: boolean
    stats: boolean
    creating: boolean
    updating: boolean
    deleting: boolean
    bulk: boolean
  }
  error: string | null
  filters: AgencyFilters
  pagination: {
    current_page: number
    total_pages: number
    total_items: number
    items_per_page: number
  }
}

export const useAgencies = () => {
  const [state, setState] = useState<UseAgenciesState>({
    agencies: [],
    stats: null,
    selectedAgencies: [],
    loading: {
      agencies: false,
      stats: false,
      creating: false,
      updating: false,
      deleting: false,
      bulk: false,
    },
    error: null,
    filters: {
      page: 1,
      limit: 10,
      sort_by: 'created_at',
      sort_order: 'desc',
    },
    pagination: {
      current_page: 1,
      total_pages: 1,
      total_items: 0,
      items_per_page: 10,
    },
  })

  // Update loading state
  const updateLoading = useCallback((key: keyof UseAgenciesState['loading'], value: boolean) => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, [key]: value }
    }))
  }, [])

  // Update error state
  const updateError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }))
  }, [])

  // Load agencies - simplified version
  const loadAgencies = useCallback(async (newFilters?: AgencyFilters) => {
    updateLoading('agencies', true)
    updateError(null)
    
    try {
      // Use provided filters or current state filters
      const filtersToUse = newFilters || state.filters
      
      // Update filters in state
      if (newFilters) {
        setState(prev => ({ ...prev, filters: filtersToUse }))
      }
      
      const response = await agencyService.getAgencies(filtersToUse)
      
      setState(prev => ({
        ...prev,
        agencies: response.data,
        pagination: response.meta,
      }))
    } catch (error) {
      console.error('Error loading agencies:', error)
      updateError(error instanceof Error ? error.message : 'Failed to load agencies')
    } finally {
      updateLoading('agencies', false)
    }
  }, [state.filters, updateLoading, updateError])

  // Load agency statistics
  const loadStats = useCallback(async () => {
    updateLoading('stats', true)
    updateError(null)
    
    try {
      const stats = await agencyService.getAgencyStats()
      setState(prev => ({ ...prev, stats }))
    } catch (error) {
      console.error('Error loading agency stats:', error)
      updateError(error instanceof Error ? error.message : 'Failed to load agency statistics')
    } finally {
      updateLoading('stats', false)
    }
  }, [updateLoading, updateError])

  // Get single agency
  const getAgency = useCallback(async (id: string): Promise<Agency> => {
    try {
      return await agencyService.getAgency(id)
    } catch (error) {
      console.error('Error getting agency:', error)
      updateError(error instanceof Error ? error.message : 'Failed to get agency')
      throw error
    }
  }, [updateError])

  // Create agency
  const createAgency = useCallback(async (agencyData: CreateAgencyRequest): Promise<Agency | null> => {
    updateLoading('creating', true)
    updateError(null)
    
    try {
      const newAgency = await agencyService.createAgency(agencyData)
      
      // Refresh agencies list
      loadAgencies()
      loadStats()
      
      return newAgency
    } catch (error) {
      console.error('Error creating agency:', error)
      updateError(error instanceof Error ? error.message : 'Failed to create agency')
      return null
    } finally {
      updateLoading('creating', false)
    }
  }, [loadAgencies, loadStats, updateLoading, updateError])

  // Update agency
  const updateAgency = useCallback(async (id: string, updateData: UpdateAgencyRequest): Promise<Agency | null> => {
    updateLoading('updating', true)
    updateError(null)
    
    try {
      const updatedAgency = await agencyService.updateAgency(id, updateData)
      
      // Update agencies list
      setState(prev => ({
        ...prev,
        agencies: prev.agencies.map(agency => 
          agency._id === id ? updatedAgency : agency
        )
      }))
      
      // Refresh stats if status changed
      if (updateData.status) {
        loadStats()
      }
      
      return updatedAgency
    } catch (error) {
      console.error('Error updating agency:', error)
      updateError(error instanceof Error ? error.message : 'Failed to update agency')
      return null
    } finally {
      updateLoading('updating', false)
    }
  }, [loadStats, updateLoading, updateError])

  // Delete agency
  const deleteAgency = useCallback(async (id: string): Promise<boolean> => {
    updateLoading('deleting', true)
    updateError(null)
    
    try {
      await agencyService.deleteAgency(id)
      
      // Remove from agencies list
      setState(prev => ({
        ...prev,
        agencies: prev.agencies.filter(agency => agency._id !== id),
        selectedAgencies: prev.selectedAgencies.filter(agencyId => agencyId !== id)
      }))
      
      // Refresh stats
      loadStats()
      
      return true
    } catch (error) {
      console.error('Error deleting agency:', error)
      updateError(error instanceof Error ? error.message : 'Failed to delete agency')
      return false
    } finally {
      updateLoading('deleting', false)
    }
  }, [loadStats, updateLoading, updateError])

  // Suspend agency
  const suspendAgency = useCallback(async (id: string, reason?: string): Promise<boolean> => {
    updateLoading('updating', true)
    updateError(null)
    
    try {
      const updatedAgency = await agencyService.suspendAgency(id, reason)
      
      setState(prev => ({
        ...prev,
        agencies: prev.agencies.map(agency => 
          agency._id === id ? updatedAgency : agency
        )
      }))
      
      loadStats()
      return true
    } catch (error) {
      console.error('Error suspending agency:', error)
      updateError(error instanceof Error ? error.message : 'Failed to suspend agency')
      return false
    } finally {
      updateLoading('updating', false)
    }
  }, [loadStats, updateLoading, updateError])

  // Activate agency
  const activateAgency = useCallback(async (id: string): Promise<boolean> => {
    updateLoading('updating', true)
    updateError(null)
    
    try {
      const updatedAgency = await agencyService.activateAgency(id)
      
      setState(prev => ({
        ...prev,
        agencies: prev.agencies.map(agency => 
          agency._id === id ? updatedAgency : agency
        )
      }))
      
      loadStats()
      return true
    } catch (error) {
      console.error('Error activating agency:', error)
      updateError(error instanceof Error ? error.message : 'Failed to activate agency')
      return false
    } finally {
      updateLoading('updating', false)
    }
  }, [loadStats, updateLoading, updateError])

  // Verify agency
  const verifyAgency = useCallback(async (id: string): Promise<boolean> => {
    updateLoading('updating', true)
    updateError(null)
    
    try {
      const updatedAgency = await agencyService.verifyAgency(id)
      
      setState(prev => ({
        ...prev,
        agencies: prev.agencies.map(agency => 
          agency._id === id ? updatedAgency : agency
        )
      }))
      
      return true
    } catch (error) {
      console.error('Error verifying agency:', error)
      updateError(error instanceof Error ? error.message : 'Failed to verify agency')
      return false
    } finally {
      updateLoading('updating', false)
    }
  }, [updateLoading, updateError])

  // Bulk operations
  const bulkUpdateAgencies = useCallback(async (agencyIds: string[], updateData: Partial<UpdateAgencyRequest>): Promise<boolean> => {
    updateLoading('bulk', true)
    updateError(null)
    
    try {
      await agencyService.bulkUpdateAgencies(agencyIds, updateData)
      
      // Refresh agencies list
      loadAgencies()
      loadStats()
      
      return true
    } catch (error) {
      console.error('Error in bulk update:', error)
      updateError(error instanceof Error ? error.message : 'Failed to update agencies')
      return false
    } finally {
      updateLoading('bulk', false)
    }
  }, [loadAgencies, loadStats, updateLoading, updateError])

  // Export agencies
  const exportAgencies = useCallback(async (format: 'csv' | 'xlsx' = 'csv'): Promise<boolean> => {
    try {
      // Get all agencies data first (without pagination)
      const allAgencies = await agencyService.getAgencies({
        ...state.filters,
        page: 1,
        limit: 1000 // Get more agencies at once for export
      })

      // Prepare the data for export
      const exportData = allAgencies.data.map(agency => ({
        "Agency Name": agency.name,
        "Contact Email": agency.contactEmail,
        "Industry": agency.industry,
        "Plan": agency.billing?.plan || 'Basic',
        "Size": agency.size,
        "Status": agency.status,
        "Last Active": agency.updated_at || 'N/A'
      }))

      if (format === 'csv') {
        // Generate CSV
        const headers = Object.keys(exportData[0]).join(',')
        const rows = exportData.map(row => 
          Object.values(row).map(value => 
            typeof value === 'string' && value.includes(',') ? `"${value}"` : value
          ).join(',')
        )
        const csv = [headers, ...rows].join('\n')
        
        // Create and download file
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `agencies-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        // For XLSX, we'll need to implement XLSX generation
        // For now, fallback to CSV
        console.warn('XLSX export not implemented yet, falling back to CSV')
        exportAgencies('csv')
      }
      
      return true
    } catch (error) {
      console.error('Error exporting agencies:', error)
      updateError(error instanceof Error ? error.message : 'Failed to export agencies')
      return false
    }
  }, [state.filters, updateError])

  // Selection management
  const toggleAgencySelection = useCallback((agencyId: string) => {
    setState(prev => ({
      ...prev,
      selectedAgencies: prev.selectedAgencies.includes(agencyId)
        ? prev.selectedAgencies.filter(id => id !== agencyId)
        : [...prev.selectedAgencies, agencyId]
    }))
  }, [])

  const selectAllAgencies = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedAgencies: prev.agencies.map(agency => agency._id)
    }))
  }, [])

  const clearSelection = useCallback(() => {
    setState(prev => ({ ...prev, selectedAgencies: [] }))
  }, [])

  // Filter management - simplified
  const updateFilters = useCallback((newFilters: Partial<AgencyFilters>) => {
    setState(prev => {
      const updatedFilters = { ...prev.filters, ...newFilters, page: 1 }
      // Load agencies with new filters asynchronously to avoid state update conflicts
      Promise.resolve().then(() => loadAgencies(updatedFilters))
      return prev // Return previous state, loadAgencies will update it
    })
  }, [loadAgencies])

  const resetFilters = useCallback(() => {
    const defaultFilters: AgencyFilters = {
      page: 1,
      limit: 10,
      sort_by: 'created_at',
      sort_order: 'desc',
    }
    loadAgencies(defaultFilters)
  }, [loadAgencies])

  // Initial load - only run once
  useEffect(() => {
    loadAgencies()
    loadStats()
  }, [loadAgencies, loadStats])

  return {
    // State
    agencies: state.agencies,
    stats: state.stats,
    selectedAgencies: state.selectedAgencies,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,
    
    // Actions
    loadAgencies,
    loadStats,
    getAgency,
    createAgency,
    updateAgency,
    deleteAgency,
    suspendAgency,
    activateAgency,
    verifyAgency,
    bulkUpdateAgencies,
    exportAgencies,
    
    // Selection
    toggleAgencySelection,
    selectAllAgencies,
    clearSelection,
    
    // Filters
    updateFilters,
    resetFilters,
  }
} 