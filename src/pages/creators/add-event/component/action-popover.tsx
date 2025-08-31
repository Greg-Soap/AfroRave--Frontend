import { BasePopover } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'

export function ActionPopover({ isDeleting, isUpdating, onDelete, onEdit }: IActionPopover) {
  return (
    <BasePopover
      trigger={
        <Button variant='ghost' className='hover:bg-black/10' disabled={isUpdating || isDeleting}>
          <Ellipsis width={3} height={15} color='#1E1E1E' />
        </Button>
      }
      content={
        <>
          <Button variant='ghost' onClick={onEdit} disabled={isUpdating || isDeleting}>
            {isUpdating ? 'Updating...' : 'Edit'}
          </Button>
          <Button
            variant='ghost'
            onClick={onDelete}
            disabled={isUpdating || isDeleting}
            className='text-red-600 hover:text-red-700'>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </>
      }
    />
  )
}

interface IActionPopover {
  isDeleting: boolean
  isUpdating: boolean
  onEdit: () => void
  onDelete: () => void
}
