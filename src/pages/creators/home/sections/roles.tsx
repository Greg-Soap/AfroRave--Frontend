import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

export default function RolesSection() {
  return (
    <section className=' w-full lg:px-[120px] px-[20px] flex flex-col gap-[100px]'>
      <div className='flex flex-col md:flex-row items-center gap-[120px]'>
        <RoleDescription {...roles[0]} className='md:items-center md:text-center' />
        <RoleDescription {...roles[1]} className='md:items-center md:text-center' />
      </div>
    </section>
  )
}

// Hope added minor fix to match UI
function RoleDescription({ role, description, className, login }: IRoles & { className?: string }) {
  const { openAuthModal } = useAuth()
  return (
    <div className={cn('w-full md:max-w-1/2 flex flex-col gap-5 md:pb-[290px] xs:pb-[10px] items-center', className)}>
      <div className={cn('flex flex-col gap-2 font-sf-pro text-white uppercase text-center', className)}>
        <p className='text-[32px] font-black'>{role}</p>
        <p className='font-normal'>{description}</p>
      </div>

      <Button
        onClick={login === 'vendor' ? () => openAuthModal('login', login) : undefined}
        className='w-[120px] h-10 rounded-[20px] font-sf-pro-text text-sm font-semibold px-[17px] py-[11px] uppercase'>
        Learn More
      </Button>
    </div>
  )
}

const roles: IRoles[] = [
  {
    role: 'organizers',
    login: 'creator',
    description:
      'Afro Revive is your backend for seamless event execution. launch events, configure ticket tiers, track live sales, assign vendor slots, and manage guests—all from a unified dashboard. Built for speed, scale, and full control',
  },
  {
    role: 'vendors',
    login: 'vendor',
    description:
      'With our smart interface, you can browse available service slots, accept bookings, and upload required assets. Stay connected with organizers through in-app messaging (available only on mobile), and manage your event schedule with ease. Everything is streamlined, trackable, and built to help you stay ready and professional at every event.',
  },
]

interface IRoles {
  role: 'organizers' | 'vendors'
  description: string
  login: 'creator' | 'vendor'
}
