import { cn } from '@/lib/utils'
import * as React from 'react'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'onError'> {
  onError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-14 w-full rounded-[4px] bg-transparent border border-gray-300 px-3 py-1 text-base  transition-colors file:border-0  file:text-sm file:font-medium file:text-foreground placeholder:text-gray-150 focus-visible:outline-none active:border-primary-500 focus-within:border-primary-500  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
          onError && 'border-error-900',
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
