import type { ReactNode } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { cn } from '@/lib/utils'

interface CustomModalProps {
  trigger?: ReactNode
  title?: string
  description?: string
  children: ReactNode
  className?: string
  open?: boolean
  onClose?: (open: boolean) => void
  size?: keyof typeof sizeClasses
  removeCancel?: boolean
  floatingCancel?: boolean
  hasFooter?: boolean
  footerContent?: ReactNode
  disableOverlayClick?: boolean
  cancelOnOverlay?: boolean
}

const sizeClasses = {
  small: 'sm:max-w-[415px]',
  large: 'sm:max-w-[864px]',
  full: ' h-full sm:overflow-y-auto',
}

function BaseModal({
  trigger,
  title,
  description,
  children,
  open,
  onClose,
  size = 'small',
  removeCancel = false,
  floatingCancel = false,
  hasFooter = false,
  footerContent,
  className,
  disableOverlayClick = false,
  cancelOnOverlay = false,
}: CustomModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.(open)
        }
      }}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(`sm:max-w-[425px] ${sizeClasses[size]} p-0 rounded-[8px]  block`, className)}
        noCancel={removeCancel}
        floatingCancel={floatingCancel}
        onClick={(e) => e.stopPropagation()}
        onInteractOutside={(e) => {
          if (disableOverlayClick) {
            e.preventDefault()
          }
        }}
        cancelOnOverlay={cancelOnOverlay}>
        <DialogHeader
          className={cn('w-full flex flex-col items-center justify-center font-input-mono')}>
          <VisuallyHidden>
            <DialogTitle>{title || 'Modal Dialog'}</DialogTitle>
          </VisuallyHidden>
          <DialogDescription>
            {description || <VisuallyHidden>Modal content</VisuallyHidden>}
          </DialogDescription>
        </DialogHeader>

        {children}

        {hasFooter && <div className='mt-auto pt-4'>{footerContent}</div>}
      </DialogContent>
    </Dialog>
  )
}

export default BaseModal
