import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useEffect, useRef } from 'react'

export default function RolesSection() {
  return (
    <section className='w-full flex items-center px-6 md:px-[120px] py-16 md:py-[10px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-[120px] w-full'>
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
  const pRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!pRef.current) return
    const computed = window.getComputedStyle(pRef.current)
    console.log(`[RolesSection "${role}" description] computed styles:`, {
      fontFamily: computed.fontFamily,
      fontWeight: computed.fontWeight,
      fontSize: computed.fontSize,
    })
  }, [role])

  return (
    <div className='flex flex-col gap-[20px] items-center text-center max-w-[700px] mx-auto'>
      {/* Title */}
      <h2 className='font-sf-pro-text font-black text-[24px] md:text-[32px] uppercase text-white leading-none tracking-[0]'>
        {role}
      </h2>
      {/* Description */}
      <p ref={pRef} className='font-sf-pro-text text-[15px] md:text-[18px] uppercase leading-relaxed tracking-[0] text-white' style={{ fontWeight: 300 }}>
        {description}
      </p>
      <Button
        onClick={() => openAuthModal('login', login)}
        className='w-[120px] h-[40px] rounded-[20px] bg-[#1E1E1E] text-white uppercase gap-[8px] border-0 hover:bg-[#2a2a2a] transition-colors'
        style={{ boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.10)' }}
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
