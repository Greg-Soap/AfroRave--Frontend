import { Button } from '@/components/ui/button'
import { BaseCarousel } from '@/components/reusable/base-carousel'
import { Link } from 'react-router-dom'

interface AfroCarouselProps {
  items: {
    id: string
    image: string
    alt: string
  }[]
  buttonText?: string
  buttonLink?: string
}

export function AfroCarousel({
  items,
  buttonText = 'Find Tickets',
  buttonLink = '/events',
}: AfroCarouselProps) {
  const carouselItems = items.map((item) => ({
    id: item.id,
    content: (
      <img src={item.image} alt={item.alt} className='w-full h-full opacity-70 object-cover' />
    ),
  }))

  return (
    <section className='relative h-[615px]'>
      <BaseCarousel
        items={carouselItems}
        className='max-w-[1536px] w-full h-[615px] flex justify-center'
        itemClassName='h-[615px] flex flex-col items-center justify-center'
      />

      <div className='absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-[#1f1f1f]/10 to-transparent' />

      <div className='absolute flex flex-col w-fit items-center bottom-20 gap-5'>
        <Button
          asChild
          className='w-[205px] h-[39px] opacity-90 bg-white text-black text-[15px] font-input-mono hover:bg-white'>
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  )
}
