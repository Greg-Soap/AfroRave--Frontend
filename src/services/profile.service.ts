import type { UpdateUserProfileRequest } from '@/types'
import api from './http.service'

// Profile service class
class ProfileService {
  /**
   * Get user profile
   */
  async getUserProfile(): Promise<unknown> {
    const response = await api.get('/api/Profile/user')
    return response.data
  }

  /**
   * Update user profile
   */
  async updateUserProfile(data: UpdateUserProfileRequest): Promise<unknown> {
    const response = await api.patch('/api/Profile/user', data)
    return response.data
  }

  /**
   * Get user active tickets
   */
  async getUserActiveTickets(): Promise<unknown> {
    const response = await api.get('/api/Profile/user/ticket/active')
    return response.data
  }

  /**
   * Get user past tickets
   */
  async getUserPastTickets(): Promise<unknown> {
    const response = await api.get('/api/Profile/user/ticket/past')
    return response.data
  }

  /**
   * Get vendor profile
   */
  async getVendorProfile(): Promise<unknown> {
    const response = await api.get('/api/Profile/vendor')
    return response.data
  }

  /**
   * Get organizer profile
   */
  async getOrganizerProfile(): Promise<unknown> {
    const response = await api.get('/api/Profile/organizer')
    return response.data
  }
}

// Export service instance
export const profileService = new ProfileService()
