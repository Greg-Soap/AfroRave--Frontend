import type { User } from '@/types/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      updateUser: (user: User) =>
        set((state: AuthState) => ({
          ...state,
          user,
        })),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
