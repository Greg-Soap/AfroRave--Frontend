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
      console.log('User registration successful:', data.data)
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : undefined
      authToasts.registrationError(errorMessage)
      console.error('User registration failed:', error)
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
      console.log('Vendor registration successful:', data.data)
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : undefined
      authToasts.vendorRegistrationError(errorMessage)
      console.error('Vendor registration failed:', error)
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
      console.log('Organizer registration successful:', data.data)
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : undefined
      authToasts.organizerRegistrationError(errorMessage)
      console.error('Organizer registration failed:', error)
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
      console.log('Login successful:', data.data)
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : undefined
      authToasts.loginError(errorMessage)
      console.error('Login failed:', error)
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
      console.log('Logout successful')
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : undefined
      authToasts.logoutError(errorMessage)
      console.error('Logout failed:', error)
    },
  })
}

// Legacy registration hook for backward compatibility
export function useRegister() {
  return useRegisterUser()
}
