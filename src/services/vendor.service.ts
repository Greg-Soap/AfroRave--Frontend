import type { VendorAvailableEventsResponse } from '@/types'
import api from './http.service'

// Vendor service class
class VendorService {
  /**
   * Get available events for vendors
   */
  async getAvailableEvents(): Promise<VendorAvailableEventsResponse> {
    const response = await api.get('/api/Event/vendor/available-events')
    return response.data
  }
}

// Export service instance
export const vendorService = new VendorService()
