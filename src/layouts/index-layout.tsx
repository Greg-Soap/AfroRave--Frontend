import Footer from '@/components/footer'
import Header from '@/components/header'
import { Outlet } from 'react-router-dom'
import UserLogin from '@/pages/auth/user-login'
import { AuthProvider } from '@/contexts/auth-context'

export default function IndexLayout() {
  return (
    <AuthProvider>
      <Header />
      <UserLogin />
      <main className='w-full flex flex-col items-center'>
        <Outlet />
      </main>

      <Footer />
    </AuthProvider>
  )
}
