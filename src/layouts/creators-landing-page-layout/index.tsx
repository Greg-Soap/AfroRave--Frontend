import { AuthModal } from '@/components/auth/auth-modal'
import { AuthProvider } from '@/contexts/auth-context'
import { Outlet } from 'react-router-dom'
import Header from './sections/header'

export default function CreatorsLandingPageLayout() {
  return (
    <div className='w-full h-full bg-mid-gray/60 '>
      <AuthProvider>
        <Header />
        <AuthModal />

        <main className='w-full min-h-screen flex flex-col items-center gap-[200px] bg-mid-gray'>
          <Outlet />
        </main>
      </AuthProvider>
    </div>
  )
}
