import { AuthModal } from '@/components/auth/auth-modal'
import { AuthProvider } from '@/contexts/auth-context'
import { Outlet } from 'react-router-dom'
import Header from './sections/header'

export default function CreatorsLandingPageLayout() {
  return (
    <>
      <AuthProvider>
        <Header />
        <AuthModal />

        <Outlet />
      </AuthProvider>
    </>
  )
}
