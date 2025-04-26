import { Outlet } from 'react-router-dom'
import { AuthProvider } from '@/contexts/auth-context'
import Header from './header'
import Footer from './footer'
import { AuthModal } from '@/components/auth/auth-modal'

export default function IndexLayout() {
  return (
    <AuthProvider>
      <Header />
      <AuthModal />

      <main className='w-full flex flex-col items-center'>
        <Outlet />
      </main>

      <Footer />
    </AuthProvider>
  )
}
