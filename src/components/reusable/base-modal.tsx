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
}

const sizeClasses = {
  small: 'sm:max-w-[464px]',
  large: 'sm:max-w-[864px]',
  full: 'sm:max-w-[calc(100vw-2rem)]',
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
        className={`sm:max-w-[425px] ${sizeClasses[size]} p-0 rounded-[8px] w-[90%] lg:w-full block`}
        noCancel={removeCancel}
        floatingCancel={floatingCancel}
        onClick={(e) => e.stopPropagation()}
        onInteractOutside={(e) => {
          e.preventDefault()
        }}>
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>{title || 'Modal Dialog'}</DialogTitle>
          </VisuallyHidden>
          <DialogDescription>
            {description || <VisuallyHidden>Modal content</VisuallyHidden>}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default BaseModal
