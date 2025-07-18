import { authToasts } from '@/lib/toast'
import authService from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'
import type {
  LoginData,
  OrganizerRegisterData,
  UserRegisterData,
  VendorRegisterData,
} from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

// Helper function to extract error messages from API responses
function extractErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as AxiosError
    const responseData = axiosError.response?.data as Record<string, unknown>
    
    // Handle validation errors from the API
    if (responseData?.errors && typeof responseData.errors === 'object') {
      const errorMessages: string[] = []
      
      // Extract all error messages from the errors object
      Object.entries(responseData.errors).forEach(([, messages]) => {
        if (Array.isArray(messages)) {
          errorMessages.push(...messages)
        } else if (typeof messages === 'string') {
          errorMessages.push(messages)
        }
      })
      
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
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: (data: UserRegisterData) => authService.registerUser(data),
    onSuccess: (data) => {
      // Store user data and token in store
      if (data.data.user && data.data.token) {
        setAuth(data.data.user, data.data.token)
      }
      
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
      authToasts.userRegistered()
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
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: (data: VendorRegisterData) => authService.registerVendor(data),
    onSuccess: (data) => {
      // Store user data and token in store
      if (data.data.user && data.data.token) {
        setAuth(data.data.user, data.data.token)
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
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: (data: OrganizerRegisterData) => authService.registerOrganizer(data),
    onSuccess: (data) => {
      // Store user data and token in store
      if (data.data.user && data.data.token) {
        setAuth(data.data.user, data.data.token)
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
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: (data) => {
      // Store user data and token in store
      if (data.data.user && data.data.token) {
        setAuth(data.data.user, data.data.token)
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
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear auth store
      clearAuth()
      
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all })
      authToasts.logoutSuccess()
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
