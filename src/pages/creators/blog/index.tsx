import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import Footer from '@/layouts/creators-landing-page-layout/sections/footer'

export default function CreatorsBlogPage() {
  return (
    <VideoBackgroundWrapper
      backgroundImage='/assets/landing-page/BG-3-new.png'
      overlayOpacity={0.6}
      secondColor='#a2a2a2'
    >
      <div className='bg-transparent text-white min-h-screen mx-auto w-full z-20'>
        <section className='relative h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 w-full'>
          {/* Centered Content */}
          <div className='relative z-50 max-w-2xl mx-auto'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 text-white uppercase'>
              Coming Soon.....
            </h1>
            <p className='text-lg md:text-xl text-gray-200 mb-8 leading-relaxed uppercase'>
              We're cooking up stories, insights, and behind-the-scenes updates just for you.
            </p>
            <Link to='/'>
              <Button className='bg-white text-black hover:bg-white/90 rounded-full px-5 py-3 uppercase'>
                Stay Tuned
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </VideoBackgroundWrapper>
  )
}
