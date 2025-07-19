import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const EmptyPage = () => {
  return (
    <div className='bg-transparent text-white min-h-screen mx-auto w-full'>
      <section className='relative max-h-[510px] h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 w-full bg-gray-400/30'>
        {/* Background Image with Grayscale */}
        <div className='absolute inset-0 bg-cover bg-center filter grayscale' />

        <div className='absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent' />

        {/* Centered Content */}
        <div className='relative z-50 max-w-2xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 text-white'>Coming Soon...</h1>
          <p className='text-lg md:text-xl text-gray-200 mb-8 leading-relaxed uppercase'>
            We're cooking up stories, insights, and behind-the-scenes updates just for you.
          </p>
          <Link to='/'>
            <Button className='bg-white text-black hover:bg-white/90 rounded-full px-5 py-3'>
              Stay Tuned
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
