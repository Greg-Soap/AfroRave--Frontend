import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type AuthType = 'login' | 'signup'
type LoginType = 'guest' | 'creator' | 'vendor'
type SignupType = 'guest' | 'creator' | 'vendor'

interface AuthContextType {
  isAuthModalOpen: boolean
  authType: AuthType
  loginType: LoginType
  signupType: SignupType
  openAuthModal: (type: AuthType, loginType?: LoginType) => void
  closeAuthModal: () => void
  switchAuthType: (type: AuthType) => void
  switchToSignup: (signupType: SignupType) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authType, setAuthType] = useState<AuthType>('login')
  const [loginType, setLoginType] = useState<LoginType>('guest')
  const [signupType, setSignupType] = useState<SignupType>('guest')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const loginParam = searchParams.get('login')
    const signupParam = searchParams.get('signup')

    if (loginParam === 'guest' || loginParam === 'creator' || loginParam === 'vendor') {
      setLoginType(loginParam)
      setAuthType('login')
      setIsAuthModalOpen(true)
    } else if (loginParam === 'true') {
      setAuthType('login')
      setIsAuthModalOpen(true)
    } else if (signupParam === 'guest' || signupParam === 'creator' || signupParam === 'vendor') {
      setSignupType(signupParam)
      setAuthType('signup')
      setIsAuthModalOpen(true)
    } else if (signupParam === 'true') {
      setAuthType('signup')
      setIsAuthModalOpen(true)
    }
  }, [searchParams])

  const openAuthModal = useCallback(
    (type: AuthType, loginType?: LoginType) => {
      setAuthType(type)
      if (loginType) {
        setLoginType(loginType)
        setSearchParams({ [type]: loginType })
      } else {
        setSearchParams({ [type]: 'true' })
      }
      setIsAuthModalOpen(true)
    },
    [setSearchParams],
  )

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false)
    setSearchParams(
      (params) => {
        params.delete('login')
        params.delete('signup')
        params.delete('auth')
        return params
      },
      { replace: true },
    )
  }, [setSearchParams])

  const switchAuthType = useCallback(
    (type: AuthType) => {
      setAuthType(type)
      setSearchParams({ [type]: 'true' })
    },
    [setSearchParams],
  )

  const switchToSignup = useCallback(
    (signupType: SignupType) => {
      setSignupType(signupType)
      setAuthType('signup')
      setSearchParams({ signup: signupType })
    },
    [setSearchParams],
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthModalOpen,
        authType,
        loginType,
        signupType,
        openAuthModal,
        closeAuthModal,
        switchAuthType,
        switchToSignup,
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
