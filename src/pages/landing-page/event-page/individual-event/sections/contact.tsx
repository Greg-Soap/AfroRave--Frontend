import { SectionContainer } from '../_components/section-container'
import { BlockName } from '../../_components/block-name'
import { Link } from 'react-router-dom'
import type { EventDetailData } from '@/types'

export default function ContactSection({ event }: { event: EventDetailData }) {
  return (
    <SectionContainer>
      <BlockName name='contact' />

      <div className='w-full flex flex-col'>
        <div className='w-full flex items-center justify-between p-6 border-b border-mid-dark-gray/30 rounded-t-[8px] bg-[#3d3d3d]'>
          <p className='text-xl font-medium leading-[140%] font-sf-pro-display'>Socials</p>

          <SocialMediaLinks socials={event.eventDetails.socials} />
        </div>

        {event.eventDetails.eventContact.website && (
          <div className='w-full flex items-center justify-between p-6 border-b border-mid-dark-gray/30 rounded-b-[8px] bg-[#3d3d3d]'>
            <p className='text-xl font-medium leading-[140%] font-sf-pro-display'>Website</p>

            <Link
              to={event.eventDetails.eventContact.website}
              className='font-sf-pro-display font-medium text-xl w-fit leading-[140%] underline text-[#419e57] underline-offset-4'>
              Click here
            </Link>
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

function SocialMediaLinks({ socials }: { socials: ISocials }) {
  const platforms: SocialPlatform[] = [
    { name: 'yt', link: socials.facebook, alt: 'Facebook' },
    { name: 'insta', link: socials.instagram, alt: 'Instagram' },
    { name: 'tiktok', link: socials.tiktok, alt: 'TikTok' },
    { name: 'X', link: socials.x, alt: 'X' },
  ].filter((platform) => platform.link) as SocialPlatform[]

  return (
    <div className='flex items-center gap-5'>
      {platforms.map((platform) => (
        <SocialMediaIcon key={platform.name} platform={platform} link={platform.link} />
      ))}
    </div>
  )
}

function SocialMediaIcon({ platform, link }: ISocialMediaIconProps) {
  return (
    <Link to={link}>
      <img
        src={`/assets/landing-page/${platform.name}.png`}
        alt={platform.alt}
        className='w-[18px] h-auto'
      />
    </Link>
  )
}

interface ISocials {
  instagram: 'string'
  x: 'string'
  tiktok: 'string'
  facebook: 'string'
}

type SocialPlatform = {
  name: 'yt' | 'insta' | 'tiktok' | 'X'
  link: string
  alt: string
}

interface ISocialMediaIconProps {
  platform: SocialPlatform
  link: string
}
