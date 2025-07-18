import { useAuthStore } from '@/stores/auth-store'

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const updateUser = useAuthStore((state) => state.updateUser)

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    clearAuth,
    updateUser,
  }
} 