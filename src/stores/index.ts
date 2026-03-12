import type { CreateEventRequest } from '@/types'
import type { User } from '@/types/auth'
import { create } from 'zustand'

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

interface EventState {
  eventId: string | null
  eventData: CreateEventRequest | null
  setEventId: (id: string) => void
  setEventData: (data: CreateEventRequest) => void
  resetEventData: () => void
}

// Load initial state from localStorage
const getInitialState = () => {
  try {
    const stored = localStorage.getItem('afro-store-v1')
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        user: parsed.state?.user || null,
        token: parsed.state?.token || null,
        isAuthenticated: parsed.state?.isAuthenticated || false,
      }
    }
  } catch (error) {
    console.error('Error loading auth state from localStorage:', error)
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  }
}

const initialState = getInitialState()

export const useAfroStore = create<AfroState>()((set, get) => ({
  user: initialState.user,
  token: initialState.token,
  isAuthenticated: initialState.isAuthenticated,
  setAuth: (user: User, token: string) => {
    const newState = {
      user,
      token,
      isAuthenticated: true,
    }
    set(newState)
    // Persist to localStorage
    localStorage.setItem('afro-store-v1', JSON.stringify({ state: newState }))
  },
  clearAuth: () => {
    const newState = {
      user: null,
      token: null,
      isAuthenticated: false,
    }
    set(newState)
    // Clear from localStorage
    localStorage.removeItem('afro-store-v1')
  },
  updateUser: (user: User) => {
    const currentState = get()
    const newState = {
      ...currentState,
      user,
    }
    set(newState)
    // Update localStorage
    localStorage.setItem('afro-store-v1', JSON.stringify({ state: newState }))
  },
  get isCreator() {
    return get().user?.accountType === 'Organizer'
  },
  get isFan() {
    return get().user?.accountType === 'User'
  },
  get isVendor() {
    return get().user?.accountType === 'Vendor'
  },
}))

export const useEventStore = create<EventState>()((set) => ({
  eventId: null,
  eventData: null,
  setEventId: (id: string) => set({ eventId: id }),
  setEventData: (data: CreateEventRequest) => set({ eventData: data }),
  resetEventData: () => set({ eventId: null, eventData: null }),
}))

interface GuideState {
  guideActive: boolean
  guideStep: number
  startGuide: () => void
  nextGuideStep: () => void
  prevGuideStep: () => void
  endGuide: () => void
}

export const useGuideStore = create<GuideState>()((set) => ({
  guideActive: false,
  guideStep: 0,
  startGuide: () => set({ guideActive: true, guideStep: 0 }),
  nextGuideStep: () => set((s) => ({ guideStep: s.guideStep + 1 })),
  prevGuideStep: () => set((s) => ({ guideStep: Math.max(0, s.guideStep - 1) })),
  endGuide: () => set({ guideActive: false, guideStep: 0 }),
}))

interface EventSelectorState {
  selectedEventId: string | null
  setSelectedEventId: (id: string | null) => void
}

export const useEventSelectorStore = create<EventSelectorState>()((set) => ({
  selectedEventId: null,
  setSelectedEventId: (id) => set({ selectedEventId: id }),
}))
