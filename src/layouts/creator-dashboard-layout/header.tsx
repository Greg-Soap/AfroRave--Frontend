import { CreatorMenuButton } from '@/components/reusable/creator-menu-button'
import { getRoutePath } from '@/config/get-route-path'
import { useAfroStore } from '@/stores'
import { Link } from 'react-router-dom'

export default function CreatorDashboardHeader() {
  const { user } = useAfroStore()

  return (
    <header className='w-full flex justify-center bg-white border-b border-b-light-gray'>
      <nav className='relative px-4 md:px-8 w-full flex items-center justify-between py-4'>
        <Link to={getRoutePath('home')}>
          <img src='/assets/dashboard/creator/ar2.png' alt='Logo' width={60} height={32} />
        </Link>

        <div className='flex items-center gap-8'>
          <img src='/assets/dashboard/creator/bell-icon.png' alt='Bell' width={20} height={22} />

          <CreatorMenuButton user={user} variant='light' />
        </div>
      </nav>
    </header>
  )
}
