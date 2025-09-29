import { Button } from '@/components/ui/button'

export default function RolesSection() {
  return (
    <section className=' w-full lg:px-[120px] px-[20px] flex flex-col gap-[100px]'>
      <div className='flex flex-col md:flex-row items-center gap-[80px] lg:gap-[120px]'>
        <RoleDescription {...roles[0]} />
        <RoleDescription {...roles[1]} />
      </div>
    </section>
  )
}

function RoleDescription({ role, description }: IRoles) {
  return (
    <div className='w-full md:max-w-1/2 flex flex-col md:items-center gap-5'>
      <div className='w-fit flex flex-col md:items-center gap-2 font-sf-pro text-white uppercase'>
        <p className='w-fit text-[32px] font-black'>{role}</p>
        <p className='font-light md:text-center'>{description}</p>
      </div>

      <Button className='max-w-[120px] h-10 rounded-[20px] font-sf-pro-text text-sm font-semibold px-[17px] py-[11px] uppercase'>
        Learn More
      </Button>
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
