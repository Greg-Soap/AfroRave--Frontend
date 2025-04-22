function StepCard({
  title,
  description,
  icon,
}: { title: string; description: string; icon: string }) {
  return (
    <div className='flex flex-col items-center text-center'>
      <img
        src={icon}
        alt={title}
        className='h-20 w-20 bg-gray-700 border border-white rounded-full mb-4'
      />
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-400 text-sm'>{description}</p>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex items-start space-x-4'>
      <img src='/assets/resell/lighting.svg' alt={title} />
      <div>
        <h4 className='text-lg font-semibold'>{title}</h4>
        <p className='text-gray-400 text-sm'>{description}</p>
      </div>
    </div>
  )
}

function ResellPage() {
  return (
    <div className='bg-transparent text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Top Section: 3 Steps */}
        <section className='mb-24 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-12'>
            SELL YOUR TICKETS IN 3 SIMPLE STEPS
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto'>
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
          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>Seamless Resale Experience</h2>
          <p className='text-lg text-gray-400 max-w-3xl mx-auto mb-16'>
            List your ticket and let Afro Revive do the rest—from secure delivery to guaranteed
            payouts, we ensure a seamless resale process.
          </p>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
            {/* Feature Group 1 */}
            <div className='flex flex-col space-y-8 text-left'>
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
            <div className='flex flex-col space-y-8 text-left row-start-4 md:row-start-auto'>
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
