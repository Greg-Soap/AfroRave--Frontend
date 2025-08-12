import BaseModal from '@/components/reusable/base-modal'
import { DialogClose } from '@/components/ui/dialog'
import { Plus, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type TSelectedType = 'single_ticket' | 'group_ticket' | 'multi_day'

export function TicketModal({ onContinue }: { onContinue: (selectedType: TSelectedType) => void }) {
  const [selectedType, setSelectedType] = useState<TSelectedType | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        type='button'
        onClick={() => setOpen(true)}
        className='self-center w-fit flex items-center gap-2 py-2 px-3 bg-[#00AD2E] rounded-[20px] text-white text-xs font-sf-pro-text hover:bg-[#00AD2E]/90'>
        <Plus /> <span>ADD TICKET</span>
      </Button>

      <BaseModal
        open={open}
        onClose={setOpen}
        title={<Title />}
        description={<Description />}
        removeCancel
        className='w-[400px] bg-black p-0'>
        <div className='w-full bg-white flex flex-col items-center gap-[21px] p-5 rounded-b-[8px]'>
          {[
            {
              value: 'single_ticket',
              name: 'Single ticket',
              caption: 'Admits only one individual',
              action: () => setSelectedType('single_ticket'),
            },
            {
              value: 'group_ticket',
              name: 'group ticket',
              caption: 'Admits multiple individuals under a single ticket.',
              action: () => setSelectedType('group_ticket'),
            },
            {
              value: 'multi_day',
              name: 'multi day',
              caption: 'Grants access on multiple event dates. ( for recurring events)',
              action: () => setSelectedType('multi_day'),
            },
          ].map((item) => {
            const isSelected = selectedType === item.value

            return <TicketTypeCards key={item.name} {...item} isSelected={isSelected} />
          })}

          <Button
            type='button'
            disabled={selectedType === null}
            onClick={() => {
              if (!selectedType) return
              onContinue(selectedType)
              setOpen(false)
            }}
            className='h-10 w-full rounded-[8px] text-xs uppercase font-sf-pro-text font-extrabold'>
            Continue
          </Button>
        </div>
      </BaseModal>
    </>
  )
}

function Title() {
  return (
    <div className='!min-w-[400px] flex flex-col items-center pt-3 px-5'>
      <DialogClose className='self-end'>
        <X size={20} color='#fff' />
      </DialogClose>
      <div className='w-full flex items-center justify-center text-xl font-black !text-white font-sf-pro-display uppercase'>
        <p>create</p>
        <Zap color='#fff' />
        <p>tickets</p>
      </div>
    </div>
  )
}

function Description() {
  return (
    <p className='font-light uppercase text0sm font-sf-pro-text text-white pb-3'>
      select your ticket format
    </p>
  )
}

function TicketTypeCards({ name, caption, action, isSelected }: ITicketTypeCards) {
  return (
    <Button
      onClick={action}
      className={cn(
        'w-full flex flex-col items-center gap-1 bg-white rounded-[5px] px-3 h-16 hover:bg-black/5 shadow-[0px_2px_10px_2px_#0000001A] border',
        { 'border border-deep-red': isSelected },
      )}>
      <p className='text-charcoal uppercase text-sm leading-[100%] font-sf-pro-text'>{name}</p>
      {!isSelected && (
        <p className='text-xs font-light font-sf-pro-display text-charcoal'>{caption}</p>
      )}
    </Button>
  )
}

interface ITicketTypeCards {
  name: string
  caption: string
  action: () => void
  isSelected: boolean
}
