import { AuthModal } from '@/components/auth/auth-modal'
import { AuthProvider } from '@/contexts/auth-context'
import { Outlet } from 'react-router-dom'
import AccountFooter from './footer'
import AccountHeader from './header'

export default function UserDashboardLayout() {
  return (
    <AuthProvider>
      <div className='w-full min-h-screen flex flex-col items-center bg-system-black'>
        <AccountHeader />
        <AuthModal />

        <main className='w-full min-h-[calc(100vh-250px)] flex flex-col items-center'>
          <Outlet />
        </main>

        <AccountFooter />
      </div>
    </AuthProvider>
  )
}
