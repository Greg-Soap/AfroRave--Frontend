import { AuthModal } from '@/components/auth/auth-modal'
import { AuthProvider } from '@/contexts/auth-context'
import { Outlet } from 'react-router-dom'
// import Footer from './sections/footer'
import Header from './sections/header'

export default function CreatorsLandingPageLayout() {
  return (
    <>
      <AuthProvider>
        <Header />
        <AuthModal />

        <main className='w-full min-h-screen'>
          <Outlet />
        </main>
        {/* TODO: add back after launch */}
        {/* <Footer /> */}
      </AuthProvider>
    </>
  )
}
