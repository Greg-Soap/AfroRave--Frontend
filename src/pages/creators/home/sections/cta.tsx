export default function CTASection() {
  return (
    <div className='w-full flex flex-col items-center gap-20 py-20 px-6 sm:px-10 md:px-16 lg:px-24'>

      {/* Seamless Management — centered */}
      <div className='w-full flex flex-col items-center gap-6 text-center'>
        <h2 className='text-[28px] sm:text-[32px] md:text-[36px] font-black uppercase text-white font-sf-pro tracking-wide leading-tight'>
          SEAMLESS MANAGEMENT
        </h2>
        <p className='text-[13px] sm:text-[14px] font-normal uppercase leading-relaxed text-white/85 font-sf-pro max-w-[560px]'>
          THE AFRO REVIVE MOBILE APP BRINGS THE POWER OF EVENTS RIGHT TO YOUR POCKET. DESIGNED FOR
          BOTH FANS AND EVENT PROFESSIONALS, THE APP MAKES ATTENDING AND MANAGING EVENTS SMOOTHER
          THAN EVER.
        </p>
        <div className='flex items-center justify-center gap-4'>
          {[
            { src: '/assets/landing-page/google-play.png', alt: 'Google Play' },
            { src: '/assets/landing-page/apple-store.png', alt: 'Apple Store' },
          ].map((item) => (
            <img
              key={item.alt}
              src={item.src}
              alt={item.alt}
              className='h-10 sm:h-11 w-auto object-contain'
            />
          ))}
        </div>
      </div>

      {/* Feature Cards — 2-column, left-aligned */}
      <div className='w-full flex flex-col md:flex-row gap-12 md:gap-10 lg:gap-20 items-start justify-between'>
        {[
          {
            heading: 'SCAN TICKETS, MANAGE GUESTS, AND STAY CONNECTED!',
            details:
              'SCAN TICKETS ON-SITE, MANAGE GUEST LISTS, CHAT WITH VENDORS OR ORGANIZERS, AND KEEP THINGS RUNNING SMOOTHLY — EVEN DURING THE EVENT.',
          },
          {
            heading: 'ACCESS TICKETS INSTANTLY, GET UPDATES, AND CHECK IN WITH EASE!',
            details:
              'WITH THE BUILT-IN WALLET, GET EVENT UPDATES, AND ENJOY A SECURE, HASSLE-FREE ENTRY EXPERIENCE — ALL FROM YOUR PHONE.',
          },
        ].map((item) => (
          <div
            key={item.heading}
            className='w-full md:w-1/2 flex flex-col gap-3 font-sf-pro text-white uppercase'
          >
            <h3 className='text-[15px] sm:text-[16px] font-black leading-snug'>
              {item.heading}
            </h3>
            <p className='text-[12px] sm:text-[13px] font-normal leading-relaxed text-white/80'>
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
