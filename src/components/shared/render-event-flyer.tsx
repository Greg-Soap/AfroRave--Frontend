import { cn } from '@/lib/utils'

export function RenderEventImage({
  image,
  event_name,
  className = 'h-[190px] md:h-[312px] rounded-[5px] md:rounded-[15px]',
}: { image?: string; event_name: string; className?: string }) {
  return (
    <>
      {!image || image === '' ? (
        <div
          className={cn(
            'flex items-center justify-center bg-white/30 px-5 min-h-[190px]',
            className,
          )}>
          <p className='text-center font-semibold text-white'>{event_name}</p>
        </div>
      ) : (
        <img src={image} alt={event_name} className={cn('object-cover', className)} />
      )}
    </>
  )
}
