import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export default function RolesSection() {
  return (
    <section className='w-full px-4 sm:px-8 md:px-12 lg:px-[120px] flex flex-col gap-12 md:gap-20 lg:gap-[100px]'>
      {/* Organizers Section - Image Left, Text Right */}
      <div className='flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16'>
        <PlaceholderImage />
        <RoleDescription
          role={roles[0].role}
          description={roles[0].description}
          login={roles[0].login}
        />
      </div>

      {/* Vendors Section - Text Left, Image Right */}
      <div className='flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-16'>
        <PlaceholderImage />
        <RoleDescription
          role={roles[1].role}
          description={roles[1].description}
          login={roles[1].login}
        />
      </div>
    </section>
  )
}

function PlaceholderImage() {
  return (
    <div className='w-full lg:w-1/2 aspect-video bg-[#545454] rounded-lg flex items-center justify-center'>
      <p className='text-white text-xs sm:text-sm font-sf-pro-text uppercase tracking-wide'>
        PROTOTYPES WILL BE HERE!
      </p>
    </div>
  )
}

function RoleDescription({ role, description, login }: IRoles) {
  const { openAuthModal } = useAuth()
  return (
    <div className='w-full lg:w-1/2 flex flex-col gap-4 md:gap-5 items-start'>
      <div className='flex flex-col gap-2 md:gap-3 font-sf-pro text-white uppercase'>
        <p className='text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-black leading-tight'>{role}</p>
        <p className='text-xs sm:text-sm md:text-base font-normal leading-relaxed'>{description}</p>
      </div>

      <Button
        onClick={login === 'vendor' ? () => openAuthModal('login', login) : () => openAuthModal('login', login)}
        className='w-[120px] sm:w-[140px] h-10 sm:h-11 rounded-[20px] font-sf-pro-text text-xs sm:text-sm font-semibold px-4 sm:px-[17px] py-[11px] uppercase bg-black text-white hover:bg-gray-900 transition-colors'>
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
      'AFRO REVIVE IS YOUR BACKEND FOR SEAMLESS EVENT EXECUTION. LAUNCH EVENTS, CONFIGURE TICKET TIERS, TRACK LIVE SALES, ASSIGN VENDOR SLOTS, AND MANAGE GUESTS—ALL FROM A UNIFIED DASHBOARD. BUILT FOR SPEED, SCALE, AND FULL CONTROL.',
  },
  {
    role: 'vendors',
    login: 'vendor',
    description:
      'OUR SMART INTERFACE LETS YOU BROWSE AVAILABLE SERVICE SLOTS, ACCEPT BOOKINGS, AND UPLOAD REQUIRED ASSETS. STAY CONNECTED WITH ORGANIZERS THROUGH IN-APP MESSAGING (AVAILABLE ONLY ON MOBILE), AND MANAGE YOUR EVENT SCHEDULE WITH EASE. EVERYTHING IS STREAMLINED, TRACKABLE, AND BUILT TO HELP YOU STAY READY AND PROFESSIONAL AT EVERY EVENT.',
  },
]

interface IRoles {
  role: 'organizers' | 'vendors'
  description: string
  login: 'creator' | 'vendor'
}
