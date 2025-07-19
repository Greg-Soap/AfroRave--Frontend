import type { User } from '@/types/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AfroState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  updateUser: (user: User) => void
  get isCreator(): boolean
  get isFan(): boolean
  get isVendor(): boolean
}

export const useAfroStore = create<AfroState>()(
  persist(
    (set, get) => ({
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
        set((state: AfroState) => ({
          ...state,
          user,
        })),
      get isCreator() {
        return get().user?.accountType === 'Organizer'
      },
      get isFan() {
        return get().user?.accountType === 'User'
      },
      get isVendor() {
        return get().user?.accountType === 'Vendor'
      },
    }),
    {
      name: 'afro-store-v1',
    },
  ),
)
