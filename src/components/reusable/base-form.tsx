import React, { type ReactElement, type ReactNode } from 'react'
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import type { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormBaseProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
  children: ReactNode
  className?: string
}

export function FormBase<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormBaseProps<T>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        {children}
      </form>
    </Form>
  )
}

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  description?: string
  showMessage?: boolean
  showError?: boolean
  children: ReactElement | ((field: ControllerRenderProps<T, Path<T>>) => ReactElement)
  form: UseFormReturn<T>
  className?: string
}

export function FormField<T extends FieldValues>({
  name,
  label = '',
  description = '',
  showMessage = false,
  showError = false,
  children,
  form,
  className,
}: FormFieldProps<T>) {
  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const errorClass =
          showError && fieldState.invalid ? 'border-red-500 focus-visible:ring-red-500' : ''

        const isSelectComponent = (element: React.ReactElement) => {
          if (element.type && typeof element.type === 'function' && 'displayName' in element.type) {
            return element.type.displayName === 'BaseSelect'
          }

          if (element.type && typeof element.type === 'function') {
            return element.type.name === 'BaseSelect'
          }

          return false
        }

        return (
          <FormItem className={cn('flex flex-col items-start', className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {typeof children === 'function'
                ? children(field)
                : React.isValidElement(children)
                  ? React.cloneElement(children, {
                      ...field,
                      ...(isSelectComponent(children)
                        ? {
                            triggerClassName: cn(
                              errorClass,
                              (children.props as { triggerClassName?: string })?.triggerClassName ??
                                '',
                            ),
                          }
                        : {
                            className: cn(
                              errorClass,
                              (children.props as { className?: string })?.className ?? '',
                            ),
                          }),
                    } as React.HTMLAttributes<HTMLElement>)
                  : null}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {showMessage && <FormMessage className='text-end' />}
          </FormItem>
        )
      }}
    />
  )
}

interface FormFooterProps {
  children: ReactNode
  className?: string
}

export function FormFooter({ children, className }: FormFooterProps) {
  return <div className={cn('flex justify-end space-x-2', className)}>{children}</div>
}
