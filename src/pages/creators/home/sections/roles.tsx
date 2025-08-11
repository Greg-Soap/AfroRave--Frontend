import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function RolesSection() {
  return (
    <section className='container w-full px-[120px] flex flex-col gap-[100px]'>
      <div className='flex flex-col md:flex-row items-center gap-[120px]'>
        <RoleDescription {...roles[0]} />
        <PrototypesContainer />
      </div>

      <div className='flex flex-col-reverse md:flex-row items-center gap-[120px]'>
        <PrototypesContainer />
        <RoleDescription {...roles[1]} className='md:items-center md:text-center' />
      </div>
    </section>
  )
}

function RoleDescription({ role, description, className }: IRoles & { className?: string }) {
  return (
    <div className={cn('w-full md:max-w-1/2 flex flex-col gap-5', className)}>
      <div className={cn('w-fit flex flex-col gap-2 font-sf-pro text-white uppercase', className)}>
        <p className='w-fit text-[32px] font-black'>{role}</p>
        <p className='font-light'>{description}</p>
      </div>

      <Button className='max-w-[120px] h-10 rounded-[20px] font-sf-pro-text text-sm font-semibold px-[17px] py-[11px] uppercase'>
        Learn More
      </Button>
    </div>
  )
}

function PrototypesContainer() {
  return (
    <div className='w-full h-[400px] flex items-center justify-center bg-[#a2a2a2]'>
      <p className='uppercase text-white text-xl font-semibold font-sf-pro-text'>
        prototypes will be here!
      </p>
    </div>
  )
}

const roles: IRoles[] = [
  {
    role: 'organizers',
    description:
      'Afro Revive is your backend for seamless event execution. launch events, configure ticket tiers, track live sales, assign vendor slots, and manage guests—all from a unified dashboard. Built for speed, scale, and full control',
  },
  {
    role: 'vendors',
    description:
      'With our smart interface, you can browse available service slots, accept bookings, and upload required assets. Stay connected with organizers through in-app messaging (available only on mobile), and manage your event schedule with ease. Everything is streamlined, trackable, and built to help you stay ready and professional at every event.',
  },
]

interface IRoles {
  role: 'organizers' | 'vendors'
  description: string
}
