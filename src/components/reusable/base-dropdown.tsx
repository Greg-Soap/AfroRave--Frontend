'use client'

import { type ReactNode, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Link } from 'react-router-dom'

interface DropdownItemProps {
  to?: string
  onClick?: () => void
  icon?: ReactNode
  label: string
}

interface CustomDropdownProps {
  trigger: ReactNode
  items: DropdownItemProps[]
  className?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  header?: ReactNode
}

function BaseDropdown({
  trigger,
  items,
  className = '',
  align = 'end',
  side = 'bottom',
  header,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsOpen(false)
    }
  }, [])

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false)
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={`p-10 min-w-[280px] bg-white ${className}`}
        align={align}
        side={side}
        onCloseAutoFocus={(event) => {
          // Prevent focus from being trapped
          event.preventDefault()
        }}>
        {header && (
          <div className='flex flex-col justify-center items-center px-4 pb-4'>{header}</div>
        )}

        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            className='py-2 cursor-pointer min-w-[280px] px-0'
            onSelect={(event) => {
              event.preventDefault()
              setIsOpen(false)
              if (item.onClick) {
                item.onClick()
              }
            }}>
            {item.to ? (
              <Link
                to={item.to}
                className='flex items-center w-full text-base text-gray-700 font-normal'
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}>
                {item.icon && <span className='mr-3'>{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                  item.onClick?.()
                }}
                className='flex items-center w-full text-base text-gray-700 font-normal'
                type='button'>
                {item.icon && <span className='mr-3'>{item.icon}</span>}
                {item.label}
              </button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BaseDropdown
