import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

type LoginType = 'guest' | 'creator' | 'vendor'

interface AuthContextType {
  isLoginModalOpen: boolean
  loginType: LoginType
  openLoginModal: (type?: LoginType) => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loginType, setLoginType] = useState<LoginType>('guest')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const loginParam = searchParams.get('login')
    if (loginParam === 'guest' || loginParam === 'creator' || loginParam === 'vendor') {
      setLoginType(loginParam)
      setIsLoginModalOpen(true)
    } else if (loginParam === 'true') {
      setIsLoginModalOpen(true)
    }
  }, [searchParams])

  const openLoginModal = useCallback(
    (type?: LoginType) => {
      if (type) {
        setLoginType(type)
        setSearchParams({ login: type })
      } else {
        setSearchParams({ login: 'true' })
      }
      setIsLoginModalOpen(true)
    },
    [setSearchParams],
  )

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false)
    setSearchParams(
      (params) => {
        params.delete('login')
        params.delete('auth')
        return params
      },
      { replace: true },
    )
  }, [setSearchParams])

  return (
    <AuthContext.Provider
      value={{
        isLoginModalOpen,
        loginType,
        openLoginModal,
        closeLoginModal,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
