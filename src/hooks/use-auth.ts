import { getRoutePath } from '@/config/get-route-path'
import { useAuth } from '@/contexts/auth-context'
import { authToasts } from '@/lib/toast'
import authService from '@/services/auth.service'
import { useAfroStore } from '@/stores'
import type {
  LoginData,
  OrganizerRegisterData,
  UserRegisterData,
  VendorRegisterData,
} from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

// Helper function to extract error messages from API responses
function extractErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as AxiosError
    const responseData = axiosError.response?.data as Record<string, unknown>

    // Handle validation errors from the API
    if (responseData?.errors && typeof responseData.errors === 'object') {
      const errorMessages: string[] = []

      // Extract all error messages from the errors object
      for (const [, messages] of Object.entries(responseData.errors)) {
        if (Array.isArray(messages)) {
          errorMessages.push(...messages)
        } else if (typeof messages === 'string') {
          errorMessages.push(messages)
        }
      }

      if (errorMessages.length > 0) {
        return errorMessages.join(', ')
      }
    }

    // Handle other error messages
    if (responseData?.message) {
      return responseData.message as string
    }

    if (responseData?.title) {
      return responseData.title as string
    }
  }

  // Fallback to generic error message
  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

// Query keys for authentication
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  login: () => [...authKeys.all, 'login'] as const,
  register: () => [...authKeys.all, 'register'] as const,
}

// User Registration Hook
export function useRegisterUser() {
  const queryClient = useQueryClient()
  const setAuth = useAfroStore((state) => state.setAuth)
  const navigate = useNavigate()
  const { closeAuthModal } = useAuth()

  return useMutation({
    mutationFn: (data: UserRegisterData) => authService.registerUser(data),
    onSuccess: (data) => {
      // Store user data and token in store
      if (data.data.userData && data.data.token) {
        setAuth(data.data.userData, data.data.token)
      }

      // Close auth modal
      closeAuthModal()

      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
      authToasts.userRegistered()
      navigate(getRoutePath('account'))
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error)
      authToasts.registrationError(errorMessage)
    },
  })
}

// Vendor Registration Hook
export function useRegisterVendor() {
  const queryClient = useQueryClient()
  const setAuth = useAfroStore((state) => state.setAuth)
  const navigate = useNavigate()
  const { closeAuthModal } = useAuth()

  return useMutation({
    mutationFn: (data: VendorRegisterData) => authService.registerVendor(data),
    onSuccess: (data) => {
      // Store user data and token in store
      if (data.data.userData && data.data.token) {
        setAuth(data.data.userData, data.data.token)

        // Close auth modal
        closeAuthModal()

        // Redirect to creators dashboard (temporary until vendor dashboard is ready)
        navigate(getRoutePath('standalone'))
      }

      queryClient.invalidateQueries({ queryKey: authKeys.user() })
      authToasts.vendorRegistered()
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error)
      authToasts.vendorRegistrationError(errorMessage)
    },
  })
}

// Organizer Registration Hook
export function useRegisterOrganizer() {
  const queryClient = useQueryClient()
  const setAuth = useAfroStore((state) => state.setAuth)
  const navigate = useNavigate()
  const { closeAuthModal } = useAuth()

  return useMutation({
    mutationFn: (data: OrganizerRegisterData) => authService.registerOrganizer(data),
    onSuccess: (data) => {
      // Store user data and token in store
      if (data.data.userData && data.data.token) {
        setAuth(data.data.userData, data.data.token)

        // Close auth modal
        closeAuthModal()

        // Redirect to organizer dashboard
        navigate(getRoutePath('standalone'))
      }

      queryClient.invalidateQueries({ queryKey: authKeys.user() })
      authToasts.organizerRegistered()
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error)
      authToasts.organizerRegistrationError(errorMessage)
    },
  })
}

// Login Hook
export function useLogin() {
  const queryClient = useQueryClient()
  const setAuth = useAfroStore((state) => state.setAuth)
  const navigate = useNavigate()
  const { closeAuthModal } = useAuth()

  return useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: (data) => {
      // Store user data and token in store
      if (data.data.userData && data.data.token) {
        setAuth(data.data.userData, data.data.token)

        // Close auth modal
        closeAuthModal()

        // Redirect based on account type
        const accountType = data.data.userData.accountType
        switch (accountType) {
          case 'User':
            navigate(getRoutePath('my_tickets'))
            break
          case 'Vendor':
            navigate(getRoutePath('standalone'))
            break
          case 'Organizer':
            navigate(getRoutePath('standalone'))
            break
          default:
            navigate(getRoutePath('my_tickets'))
        }
      }

      queryClient.invalidateQueries({ queryKey: authKeys.user() })
      authToasts.loginSuccess()
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error)
      authToasts.loginError(errorMessage)
    },
  })
}

// Logout Hook
export function useLogout() {
  const queryClient = useQueryClient()
  const clearAuth = useAfroStore((state) => state.clearAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear auth store
      clearAuth()

      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all })
      authToasts.logoutSuccess()

      // Redirect to home page after logout
      navigate(getRoutePath('home'))
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error)
      authToasts.logoutError(errorMessage)
    },
  })
}

// Legacy registration hook for backward compatibility
export function useRegister() {
  return useRegisterUser()
}
