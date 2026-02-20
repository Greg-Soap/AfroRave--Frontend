import { Button } from '@/components/ui/button'

export function AddButton({ name, onClick }: IAddButton) {
  return (
    <div className='flex justify-center'>
      <Button
        type='button'
        onClick={onClick}
        className='bg-[#00AD2E] text-white hover:bg-[#009926] px-6 py-3 rounded-lg font-medium'>
        + {name}
      </Button>
    </div>
  )
}

interface IAddButton {
  name: string
  onClick: () => void
}
