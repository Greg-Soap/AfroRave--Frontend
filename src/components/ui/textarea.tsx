import * as React from 'react'

import { cn } from 'src/lib/utils'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[115px] w-full rounded-[4px] border border-gray-300 bg-transparent px-3 py-2 text-base  placeholder:text-gray-150 focus-visible:outline-none active:border-primary-500 focus-within:border-primary-500  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
