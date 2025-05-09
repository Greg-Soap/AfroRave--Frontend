/**
 * A reusable avatar component that displays user images with fallback options.
 * Supports different sizes and custom fallback content.
 *
 * @example
 * ```tsx
 * <BaseAvatar
 *   src="/path/to/image.jpg"
 *   alt="User profile"
 *   size="lg"
 *   fallback={<UserIcon />}
 * />
 * ```
 */
'use client'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'iconsax-react'
import type { ReactNode } from 'react'

interface CustomAvatarProps {
  /** The source URL of the avatar image */
  src?: string | null
  /** Alternative text for the avatar image */
  alt?: string
  /** Custom fallback content to display when the image fails to load */
  fallback?: ReactNode
  /** Size variant of the avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'huge'
  /** Additional CSS classes to apply to the avatar */
  className?: string
}

function BaseAvatar({ src, alt, fallback, size = 'md', className }: CustomAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-14 w-14',
    huge: 'h-32 w-32',
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    huge: 50,
  }

  return (
    <Avatar className={cn(sizeClasses[size], 'object-cover', className)}>
      <AvatarImage
        src={src || '/assets/images/default-user.svg'}
        alt={alt}
        className='object-cover'
      />
      <AvatarFallback>{fallback || <User size={iconSizes[size]} />}</AvatarFallback>
    </Avatar>
  )
}

export default BaseAvatar
