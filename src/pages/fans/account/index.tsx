import { useSearchParams } from 'react-router-dom'
import ProfileTab from './tabs/profile-tab'
import WalletTab from './tabs/wallet-tab'

export default function AccountPage() {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('account') || 'profile'

  return (
    <section className='w-full flex-1 flex flex-col'>
      {activeTab === 'wallet' ? <WalletTab /> : <ProfileTab />}
    </section>
  )
}