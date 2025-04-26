import { Link } from 'react-router-dom'
import clsx from 'clsx'

export default function Socials() {
  return (
    <section className='min-h-screen w-full flex flex-col gap-10 pt-[75px]'>
      <p className='container font-input-mono font-bold text-2xl md:text-[30px]'>Socials</p>

      <div className='flex-1 flex flex-col min-h-screen'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 min-h-screen'>
          {social_posts.map((item, index) => (
            <Link
              key={`${item.alt}-${index}`}
              to={item.href}
              className={clsx('w-full overflow-hidden block aspect-square', {
                'md:col-span-2 md:row-span-2': index === 1 || index === 10,
              })}>
              <img
                src={item.image}
                alt={item.alt}
                className='w-full h-full object-cover object-left-top hover:scale-105 transition-all duration-300 opacity-60'
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const social_posts: { image: string; alt: string; href: string }[] = [
  { image: '/assets/landing-page/s1.png', alt: 'Rema', href: '/' },
  { image: '/assets/landing-page/s2.png', alt: 'Ragga', href: '/' },
  { image: '/assets/landing-page/s3.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s4.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s5.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s6.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s7.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s8.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s9.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s10.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s11.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s12.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s13.png', alt: 'Logo', href: '/' },
  { image: '/assets/landing-page/s3.png', alt: 'Logo', href: '/' },
]
