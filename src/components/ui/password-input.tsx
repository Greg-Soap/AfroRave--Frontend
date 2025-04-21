'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'

interface PasswordInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  onError?: boolean
}

function PasswordInput({ placeholder, value, onChange, disabled, onError }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className='relative w-full'>
      <Input
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='pr-10'
        disabled={disabled}
        onError={onError}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='absolute right-0 top-0 h-full rounded-full hover:text-primary/75 hover:bg-transparent'
        onClick={toggleVisibility}>
        {isVisible ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
      </Button>
    </div>
  )
}

export default PasswordInput
