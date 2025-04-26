'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { cancelOnOverlay?: boolean }
>(({ className, cancelOnOverlay, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[900000] bg-gradient-to-b from-[#949494] via-[#616161] to-[#2E2E2E] backdrop-blur-[3px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    style={{
      backgroundImage:
        'linear-gradient(to bottom, #949494 0%, #616161 34%, #616161 84%, #2E2E2E 100%)',
    }}
    {...props}>
    {cancelOnOverlay && (
      <DialogPrimitive.Close
        className='absolute top-10 right-10 font-bold opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer'
        onClick={(e) => e.stopPropagation()}>
        <X className='h-6 w-6 text-white font-bold' />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    )}
  </DialogPrimitive.Overlay>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  noCancel?: boolean
  floatingCancel?: boolean
  cancelOnOverlay?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, noCancel, floatingCancel, cancelOnOverlay, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay cancelOnOverlay={cancelOnOverlay} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-[990000] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-center data-[state=open]:slide-in-from-center sm:rounded-lg',
        className,
      )}
      {...props}>
      {!noCancel && !cancelOnOverlay && (
        <DialogPrimitive.Close
          className={cn(
            'font-bold opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            floatingCancel ? 'absolute top-10 right-10' : 'w-full flex justify-end px-10 pt-6',
          )}
          onClick={(e) => e.stopPropagation()}>
          <X className='h-10 w-10 cursor-pointer' />
          <span className='sr-only'>Close</span>
        </DialogPrimitive.Close>
      )}
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
