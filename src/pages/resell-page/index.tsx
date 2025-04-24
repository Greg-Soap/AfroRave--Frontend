function StepCard({
  title,
  description,
  icon,
}: { title: string; description: string; icon: string }) {
  return (
    <div className='flex flex-col items-center text-center'>
      <img src={icon} alt={title} className='h-[150px] w-[150px] mb-4' />
      <h3 className='text-[24px] font-semibold mb-2'>{title}</h3>
      <p className='text-white font-sf-pro-text text-base font-normal'>{description}</p>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex items-center space-x-4'>
      <img src='/assets/resell/lighting.svg' alt={title} />
      <div>
        <h4 className='text-[20px] font-semibold'>{title}</h4>
        <p className='font-sf-pro-text text-[12px] max-w-[320px]'>{description}</p>
      </div>
    </div>
  )
}

function ResellPage() {
  return (
    <div className='bg-transparent text-white min-h-screen  mx-auto w-full'>
      {/* Hero Section */}
      <section className='relative max-h-[510px] h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 w-full '>
        {/* Background Image with Grayscale */}
        <div
          className='absolute inset-0 bg-cover bg-center filter grayscale '
          style={{ backgroundImage: "url('/assets/resell/hero.png')" }}
        />

        <div className='absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-[#1f1f1f]/10 to-transparent' />

        {/* Content (remains on top) */}
        <div className='relative z-10 max-w-[1140px] w-full'>
          <h1 className='text-start m-0'>
            <span className='text-4xl sm:text-5xl md:text-[100px] font-bold mb-8 leading-tight text-start'>
              Resell with Ease on Afro Revive
            </span>
            <a
              href='/events'
              className='bg-secondary hover:bg-secondary/80 text-white p-6 rounded-[10px] ml-4 align-super mb-3 text-2xl font-normal font-sf-pro'>
              LIST YOUR TICKET
            </a>
          </h1>
        </div>
      </section>

      {/* Existing Content - Add padding top to separate from hero */}
      <div className='max-w-[1400px] mx-auto py-16 px-4 sm:px-6 lg:px-8 pt-24'>
        {/* Top Section: 3 Steps */}
        <section className='mb-[170px] text-center'>
          <h2 className='text-3xl sm:text-[45px] font-bold mb-[192px]'>
            SELL YOUR TICKETS IN 3 SIMPLE STEPS
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-[112px] mx-auto'>
            <StepCard
              title='Select the Ticket You Want to sell'
              description='If the event supports resale and you purchased your ticket on Afro Revive, you can list it directly from your account.'
              icon='/assets/resell/Icon1.svg'
            />
            <StepCard
              title='Set Your Price'
              description="Using our pricing tool, Set your price and see exactly how much you'll be paid when your tickets sell. Get Paid"
              icon='/assets/resell/icon2.svg'
            />
            <StepCard
              title='Get Paid Securely'
              description="Once your tickets are sold, you'll receive your payout through your preferred payment method — usually within 7 business days after the event."
              icon='/assets/resell/icon3.svg'
            />
          </div>
        </section>

        {/* Middle Section: Seamless Resale Experience */}
        <section className='mb-24 text-center'>
          <h2 className='text-3xl sm:text-[40px] font-bold mb-4'>Seamless Resale Experience</h2>
          <p className='text-[24px] mx-auto mb-[120px] font-normal max-w-[840px]'>
            List your ticket and let Afro Revive do the rest—from secure delivery to guaranteed
            payouts, we ensure a seamless resale process.
          </p>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
            {/* Feature Group 1 */}
            <div className='flex flex-col justify-between text-left h-full'>
              <FeatureItem
                title='Smart Pricing'
                description='Using real-time ticket pricing information, We help you sell your tickets with confidence.'
              />
              <FeatureItem
                title='Transparent Earnings'
                description="Know what you'll earn before you list. We show you a full breakdown of your resale payout, no hidden fees."
              />
            </div>
            {/* Image 1 */}
            <div className='flex justify-center md:justify-end'>
              <img
                src='/assets/resell/pic1.png'
                alt='image1'
                className='w-full h-full object-cover md:w-[468px] md:h-[468px] rounded-full'
              />
            </div>

            {/* Image 2 */}
            <div className='flex justify-center md:justify-start row-start-3 md:row-start-auto'>
              <img
                src='/assets/resell/pic2.png'
                alt='image2'
                className='w-full h-full object-cover md:w-[468px] md:h-[468px] rounded-full'
              />
            </div>

            {/* Feature Group 2 */}
            <div className='flex flex-col  text-left row-start-4 md:row-start-auto justify-between h-full'>
              <FeatureItem
                title='Share Your Listing'
                description="Know what you'll earn before you list. We show you a full breakdown of your resale payout, no hidden fees." // Note: Description duplicated in image, using it here.
              />
              <FeatureItem
                title="You're In Control"
                description='Want your ticket to sell faster? Share your personal resale link with friends and drive more visibility to your listing.'
              />
              <FeatureItem
                title="We've Got you Covered"
                description='When your ticket sells, we take care of everything — from secure delivery to the buyer to processing your payout.'
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResellPage
