export default function CTASection() {
  return (
    <div className='w-full flex flex-col items-center gap-12 md:gap-16 lg:gap-[63px] mb-12 md:mb-24 lg:mb-[154px] py-12 md:py-16 lg:py-[100px] px-4 sm:px-8 md:px-12 lg:px-[120px]'>
      <div className='max-w-[700px] flex flex-col items-center gap-4 md:gap-6'>
        <div className='w-fit flex flex-col items-center text-center gap-2 md:gap-3 font-sf-pro text-white uppercase'>
          <p className='w-fit text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-black leading-tight'>SEAMLESS MANAGEMENT</p>
          <p className='text-xs sm:text-sm md:text-base font-normal leading-relaxed'>
            THE AFRO REVIVE MOBILE APP BRINGS THE POWER OF EVENTS RIGHT TO YOUR POCKET. DESIGNED FOR
            BOTH FANS AND EVENT PROFESSIONALS, THE APP MAKES ATTENDING AND MANAGING EVENTS SMOOTHER
            THAN EVER.
          </p>
        </div>
        <div className='flex items-center justify-center gap-3 md:gap-5'>
          {[
            { src: '/assets/landing-page/google-play.png', alt: 'Google Play' },
            { src: '/assets/landing-page/apple-store.png', alt: 'Apple Store' },
          ].map((item) => (
            <img
              key={item.alt}
              src={item.src}
              alt={item.alt}
              className='max-w-[120px] sm:max-w-[135px] max-h-9 sm:max-h-10 w-auto h-auto'
            />
          ))}
        </div>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-y-10 items-start justify-between'>
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
            className='w-full md:max-w-[540px] flex flex-col gap-2 md:gap-3 font-sf-pro text-white uppercase'>
            <p className='text-lg sm:text-xl md:text-xl lg:text-2xl font-black leading-tight'>{item.heading}</p>
            <p className='text-xs sm:text-sm md:text-base font-normal leading-relaxed'>{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
