import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import { EmptyPage } from '@/pages/landing-page/_component/empty-page'

export default function CreatorsBlogPage() {
  return (
    <VideoBackgroundWrapper overlayOpacity={0.5} secondColor='#a2a2a2'>
      <img
        src='/assets/landing-page/blog.png'
        alt='Abstract'
        className='fixed inset-0 w-full h-full object-cover z-0 opacity-60'
      />
      <EmptyPage withGradient={false} className='bg-transparent' />
    </VideoBackgroundWrapper>
  )
}
