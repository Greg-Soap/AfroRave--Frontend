import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BaseCarouselProps {
  items: {
    id: string
    content: React.ReactNode
  }[]
  showIndicators?: boolean
  showNavigation?: boolean
  className?: string
  itemClassName?: string
  indicatorsPosition?: string
  onSlideChange?: (index: number) => void
}

export function BaseCarousel({
  items,
  showIndicators = true,
  showNavigation = true,
  className = '',
  itemClassName = '',
  indicatorsPosition = 'bottom-4',
  onSlideChange,
}: BaseCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      const newIndex = api.selectedScrollSnap()
      setActiveIndex(newIndex)
      onSlideChange?.(newIndex)
    })
  }, [api, onSlideChange])

  return (
    <Carousel className={cn('relative w-full', className)} setApi={setApi}>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className={cn('w-full ', itemClassName)}>
            {item.content}
          </CarouselItem>
        ))}
      </CarouselContent>

      {showIndicators && (
        <div
          className={cn(
            'absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1.5',
            indicatorsPosition,
          )}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn('rounded-full transition-all duration-150', {
                'bg-[#949494] size-2': index !== activeIndex,
                ' outline-white outline-2 size-5': index === activeIndex,
              })}
            />
          ))}
        </div>
      )}

      {showNavigation && (
        <>
          <CarouselPrevious className='z-20 border-none bg-transparent hover:bg-white/10 hover:text-white w-5 h-5' />
          <CarouselNext className='z-20 border-none bg-transparent hover:bg-white/10 hover:text-white w-5 h-5' />
        </>
      )}
    </Carousel>
  )
}
