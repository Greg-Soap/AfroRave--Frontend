import { useAfroStore } from '@/stores'

export function useAuth() {
  const user = useAfroStore((state) => state.user)
  const token = useAfroStore((state) => state.token)
  const isAuthenticated = useAfroStore((state) => state.isAuthenticated)
  const setAuth = useAfroStore((state) => state.setAuth)
  const clearAuth = useAfroStore((state) => state.clearAuth)
  const updateUser = useAfroStore((state) => state.updateUser)

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    clearAuth,
    updateUser,
  }
}
