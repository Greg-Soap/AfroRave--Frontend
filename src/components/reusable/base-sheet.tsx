import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useState } from 'react'

import clsx from 'clsx'

const SHEET_SIZES = {
  default: 'max-w-fit',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  full: 'max-w-full h-full sm:overflow-y-auto',
} as const

const sheetVariants = cva('gap-10 border-none', {
  variants: {
    size: SHEET_SIZES,
  },
  defaultVariants: {
    size: 'md',
  },
})

export default function BaseSheet({
  open = false,
  hasFooter = false,
  footerContent,
  setOpen,
  side = 'right',
  size = 'md',
  title,
  description,
  trigger,
  triggerClassName = '',
  contentClassName = '',
  children,
  hasNav = false,
  navChildren,
  circleCancel = false,
}: CustomSheetProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)

  const handleOpenChange = (open: boolean) => {
    setInternalOpen(open)
    setOpen?.(open)
  }

  return (
    <Sheet open={open ? open : internalOpen} onOpenChange={handleOpenChange}>
      {trigger && <SheetTrigger className={triggerClassName}>{trigger}</SheetTrigger>}
      <SheetContent
        side={side}
        circleCancel={circleCancel}
        className={cn(
          contentClassName,
          sheetVariants({ size }),
          `${hasNav ? '[&>button]:hidden scrollbar-none' : ''}`,
        )}>
        {hasNav && <SheetNav>{navChildren}</SheetNav>}

        <SheetHeader className='w-full flex flex-col items-center justify-center font-input-mono sr-only'>
          <SheetTitle className='text-2xl'>{title}</SheetTitle>
          <SheetDescription className='text-lg'>{description}</SheetDescription>
        </SheetHeader>

        {children}

        {hasFooter && <SheetFooter className='mt-auto pt-4'>{footerContent || null}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

function SheetNav({
  children,
  closeFunction,
}: {
  children: ReactNode
  closeFunction?: CustomSheetProps['closeFunction']
}) {
  return (
    <nav
      className={clsx(
        'max-w-[var(--max-width)] w-full flex items-center px-[1rem] md:px-[2rem] fixed top-0  backdrop-blur-sm',
        {
          'justify-end py-3 bg-transparent': !children,
          'bg-white/10 justify-between': children,
        },
      )}>
      {children}
      <SheetClose onClick={closeFunction} className='p-2 hover:bg-white/10 rounded-lg w-6 h-6 '>
        <X />
      </SheetClose>
    </nav>
  )
}

type SheetVariantProps = VariantProps<typeof sheetVariants>

interface CustomSheetProps extends SheetVariantProps {
  open?: boolean
  setOpen?: (open: boolean) => void
  side?: 'top' | 'right' | 'bottom' | 'left'
  trigger?: ReactNode
  triggerClassName?: string
  title: string
  description?: string
  children: ReactNode
  contentClassName?: string
  hasNav?: boolean
  navChildren?: ReactNode
  hasFooter?: boolean
  footerContent?: ReactNode
  closeFunction?: () => void
  circleCancel?: boolean
}
