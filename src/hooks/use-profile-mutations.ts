import { profileService } from '@/services/profile.service'
import type { UpdateUserProfileRequest } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * Hook for fetching user profile data
 */
export function useUserProfile() {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => profileService.getUserProfile(),
  })
}

/**
 * Hook for updating user profile
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserProfileRequest) => profileService.updateUserProfile(data),
    onSuccess: () => {
      // Invalidate and refetch user profile data
      toast.success('Profile updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
    },
    onError: (error) => {
      toast.error('Failed to update profile. Please try again.')
      console.error('Profile update error:', error)
    },
  })
}

/**
 * Hook for fetching user active tickets
 */
export function useUserActiveTickets() {
  return useQuery({
    queryKey: ['user-active-tickets'],
    queryFn: () => profileService.getUserActiveTickets(),
  })
}

/**
 * Hook for fetching user past tickets
 */
export function useUserPastTickets() {
  return useQuery({
    queryKey: ['user-past-tickets'],
    queryFn: () => profileService.getUserPastTickets(),
  })
}

/**
 * Hook for fetching vendor profile
 */
export function useVendorProfile() {
  return useQuery({
    queryKey: ['vendor-profile'],
    queryFn: () => profileService.getVendorProfile(),
  })
}

/**
 * Hook for fetching organizer profile
 */
export function useOrganizerProfile() {
  return useQuery({
    queryKey: ['organizer-profile'],
    queryFn: () => profileService.getOrganizerProfile(),
  })
}
