import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export default function RolesSection() {
  return (
    <section className='w-full min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 py-20'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-16 md:gap-12 lg:gap-20'>
        <RoleDescription
          role={roles[0].role}
          description={roles[0].description}
          login={roles[0].login}
        />
        <RoleDescription
          role={roles[1].role}
          description={roles[1].description}
          login={roles[1].login}
        />
      </div>
    </section>
  )
}

function RoleDescription({ role, description, login }: IRoles) {
  const { openAuthModal } = useAuth()
  return (
    <div className='w-full md:w-1/2 flex flex-col gap-7 items-center text-center'>
      {/* Title */}
      <h2 className='text-[28px] sm:text-[32px] md:text-[36px] font-black uppercase text-white leading-tight font-sf-pro tracking-wide'>
        {role}
      </h2>
      {/* Description */}
      <p className='text-[13px] sm:text-[14px] font-normal uppercase leading-relaxed text-white/85 max-w-[440px] font-sf-pro'>
        {description}
      </p>
      <Button
        onClick={() => openAuthModal('login', login)}
        className='h-11 rounded-full font-sf-pro-text text-[13px] font-semibold px-8 uppercase bg-[#111] text-white hover:bg-white/10 border border-white/25 transition-colors'
      >
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
      'OUR SMART INTERFACE PUTS EVERY VENDOR, SERVICE OR REVENUE—ONE STEP AHEAD. BOOK SLOTS, SHARE ASSETS, CHAT WITH ORGANIZERS (MOBILE ONLY), AND KEEP YOUR SCHEDULE ON POINT. STREAMLINED, TRACKABLE, AND BUILT FOR YOUR EVENT SUCCESS.',
  },
]

interface IRoles {
  role: 'organizers' | 'vendors'
  description: string
  login: 'creator' | 'vendor'
}
