import { FormBase } from '@/components/reusable'
import BaseTable from '@/components/reusable/base-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useCreatePromoCode,
  useCreateTicket,
  useDeleteTicket,
  useGetEventPromoCodes,
  useGetEventTickets,
  useDeletePromoCode,
} from '@/hooks/use-event-mutations'
import { transformTicketsToCreateRequest } from '@/lib/event-transforms'
import type { TicketData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { EllipsisVertical, Plus, Ticket, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import {
  type TPromoCodeSchema,
  defaultPromoCodeValues,
  promoCodeSchema,
} from '../../add-event/schemas/promo-code-schema'
import {
  type UnifiedTicketForm,
  defaultUnifiedTicketValues,
  unifiedTicketFormSchema,
} from '../../add-event/schemas/ticket-schema'
import type { TicketType } from '../../add-event/ticket-forms/create/helper'
import { TicketForm } from '../../add-event/ticket-forms/create/ticket-form'
import { TicketModal } from '../../add-event/ticket-forms/create/ticket-modal'
import { populatePromoCodeJson } from '../../add-event/ticket-forms/promo-code-form/helper'
import { PromoCodeFormFields } from '../../add-event/ticket-forms/promo-code-form/promo-code-form'
import { TabChildrenContainer } from '../component/edit-tab-children-container'
import { cn } from '@/lib/utils'
import { OnlyShowIf } from '@/lib/environment'

export default function TicketsTab({ eventId, setActiveTab, eventName }: ITicketTab) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentForm, setCurrentForm] = useState<string>()
  const [selectedType, setSelectedType] = useState<TicketType>()
  const [ticketTab, setTicketTab] = useState<'ticket' | 'promocode'>('ticket')

  const { data: ticketsResponse, isLoading, error, refetch } = useGetEventTickets(eventId)
  const {
    data: promocodeResponse,
    isLoading: isLoadingPromoCodes,
    refetch: refetchPromocodes,
    error: promocodeError,
  } = useGetEventPromoCodes(eventId)
  const { mutate: createPrmocodeMutation, isPending: isCreatingPromoCode } =
    useCreatePromoCode(eventId)
  const { mutate: createTicketMutation, isPending: isCreatingTIcket } = useCreateTicket(eventId)

  const deleteTicketMutation = useDeleteTicket(eventId)
  const deletePromocodeMutation = useDeletePromoCode(eventId)

  const tickets = ticketsResponse?.data || []
  const promocodes = promocodeResponse?.data || []

  useEffect(() => {
    const formParam = searchParams.get('form')

    if (formParam === 'create' || formParam === 'promocode') {
      setCurrentForm(formParam)
    }
  }, [searchParams, setSearchParams])

  const ticketForm = useForm<UnifiedTicketForm>({
    resolver: zodResolver(unifiedTicketFormSchema),
    defaultValues: {
      ...defaultUnifiedTicketValues,
      whenToStart: 'immediately',
      scheduledDate: undefined,
    },
  })

  const promocodeForm = useForm<{ promoCodes: TPromoCodeSchema }>({
    resolver: zodResolver(z.object({ promoCodes: promoCodeSchema })),
    defaultValues: { promoCodes: defaultPromoCodeValues },
  })

  function handleCreateTicket(values: UnifiedTicketForm) {
    const ticketReuest = transformTicketsToCreateRequest(
      {
        tickets: [values.ticket],
        whenToStart: values.whenToStart,
        scheduledDate: values.scheduledDate,
      },
      eventId,
    )

    createTicketMutation(ticketReuest[0], {
      onSuccess: () => {
        setSelectedType(undefined)
        ticketForm.reset()
        handleBackClick()
      },
    })
  }

  function handleCreatePromoCode() {
    const promocodeRequest = populatePromoCodeJson(promocodeForm)

    createPrmocodeMutation(
      { ...promocodeRequest, eventId },
      {
        onSuccess: () => {
          setSelectedType(undefined)
          promocodeForm.reset()
          handleBackClick()
        },
      },
    )
  }

  async function handleDeleteTicket(id: string) {
    deleteTicketMutation.mutateAsync(id, { onSuccess: () => refetch() })
  }

  async function handleDeletePromocode(id: string) {
    deletePromocodeMutation.mutateAsync(id)
  }

  function handleAddTicket(selectedType: TicketType) {
    ticketForm.setValue('ticket.ticketType', selectedType)
    setSelectedType(selectedType)
    handleFormChange('create')
  }

  function handleFormChange(form: string) {
    setSearchParams({ tab: 'tickets', form: form })
    setCurrentForm(form)
  }

  function handleBackClick() {
    setCurrentForm(undefined)
    setSelectedType(undefined)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('form')
      return next
    })
  }

  if (currentForm === 'promocode') {
    return (
      <TabChildrenContainer
        handleSaveEvent={() => promocodeForm.handleSubmit(handleCreatePromoCode)()}
        handleBackClick={handleBackClick}
        currentTab='tickets'
        onChange={setActiveTab}
        isLoading={isCreatingPromoCode}>
        <FormBase form={promocodeForm} onSubmit={() => {}} className='max-w-[560px] w-full'>
          <PromoCodeFormFields form={promocodeForm} eventTickets={tickets} />
        </FormBase>
      </TabChildrenContainer>
    )
  }

  if (currentForm === 'create') {
    return (
      <TabChildrenContainer
        handleSaveEvent={() => ticketForm.handleSubmit(handleCreateTicket)()}
        handleBackClick={handleBackClick}
        currentTab='tickets'
        onChange={setActiveTab}
        isLoading={isCreatingTIcket}>
        <FormBase form={ticketForm} onSubmit={() => {}} className='max-w-[560px] w-full'>
          <TicketForm form={ticketForm} type={selectedType || 'single_ticket'} />
        </FormBase>
      </TabChildrenContainer>
    )
  }

  return (
    <TabChildrenContainer
      handleSaveEvent={() => setActiveTab('theme')}
      handleBackClick={() => setActiveTab('event-details')}
      currentTab='tickets'
      onChange={setActiveTab}
      buttonText={eventName}
      isLoading={undefined}>
      <div className='w-full flex flex-col gap-14 pt-10 md:p-14'>
        <div className='flex flex-col pl-2 gap-[13px]'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-3'>
              {[
                { value: 'ticket', name: 'Your Tickets' },
                { value: 'promocode', name: 'Promo Codes' },
              ].map((item) => {
                const isActive = ticketTab === item.value

                return (
                  <Button
                    key={item.value}
                    onClick={() => setTicketTab(item.value as 'ticket' | 'promocode')}
                    className={cn(
                      'font-sf-pro-display p-0 bg-transparent hover:bg-transparent shadow-none',
                      {
                        'font-black text-xl text-black': isActive,
                        'text-lg font-medium text-medium-gray': !isActive,
                      },
                    )}>
                    {item.name}
                  </Button>
                )
              })}
            </div>

            <OnlyShowIf condition={ticketTab === 'promocode'}>
              <Button
                type='button'
                onClick={() => setCurrentForm('promocode')}
                className='self-center w-fit flex items-center gap-2 py-2 px-3 bg-[#00AD2E] rounded-[20px] text-white text-xs font-sf-pro-text hover:bg-[#00AD2E]/90'>
                <Plus /> <span>ADD PROMOCODE</span>
              </Button>
            </OnlyShowIf>

            <OnlyShowIf condition={ticketTab === 'ticket'}>
              <TicketModal onContinue={handleAddTicket} />
            </OnlyShowIf>
          </div>

          {(() => {
            if (isLoading || isLoadingPromoCodes) {
              return <LoadingState activeTab={ticketTab} />
            }

            if (ticketTab === 'ticket' && error) {
              return <ErrorState activeTab={ticketTab} onClick={refetch} />
            }

            if (ticketTab === 'promocode' && promocodeError) {
              return <ErrorState activeTab={ticketTab} onClick={refetchPromocodes} />
            }

            if (tickets.length === 0 && ticketTab === 'ticket') {
              return <EmptyTicketState onAddTicket={() => handleFormChange('create')} />
            }

            if (promocodes.length === 0 && ticketTab === 'promocode') {
              return (
                <div className='w-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
                  <Button
                    type='button'
                    onClick={() => setCurrentForm('promocode')}
                    className='self-center w-fit flex items-center gap-2 py-2 px-3 bg-[#00AD2E] rounded-[20px] text-white text-xs font-sf-pro-text hover:bg-[#00AD2E]/90'>
                    <Plus /> <span>ADD PROMOCODE</span>
                  </Button>

                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    No promocodes created yet
                  </h3>
                </div>
              )
            }

            if (ticketTab === 'ticket') {
              return tickets.map((ticket) => (
                <TicketCard
                  key={ticket.ticketId}
                  name={ticket.ticketName}
                  onDelete={() => handleDeleteTicket(ticket.ticketId)}
                  isLoading={deleteTicketMutation.isPending}
                />
              ))
            }

            return promocodes.map((promocode) => (
              <TicketCard
                key={promocode.promocodeId}
                name={promocode.promoCode}
                onDelete={() => handleDeletePromocode(promocode.promocodeId)}
                isLoading={deletePromocodeMutation.isPending}
              />
            ))
          })()}
        </div>

        {tickets.length > 0 ? <TicketSales tickets={tickets} /> : null}
      </div>
    </TabChildrenContainer>
  )
}

function EmptyTicketState({ onAddTicket }: { onAddTicket: () => void }) {
  return (
    <div className='w-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
      <Ticket className='w-12 h-12 text-gray-400 mb-4' />
      <h3 className='text-lg font-medium text-gray-900 mb-2'>No tickets created yet</h3>
      <p className='text-sm text-gray-500 text-center max-w-md'>
        Start by creating your first ticket type. You can add multiple ticket types with different
        pricing and features.
      </p>
      <Button onClick={onAddTicket} className='mt-4 bg-deep-red text-white hover:bg-red-700'>
        Create First Ticket
      </Button>
    </div>
  )
}

function LoadingState({ activeTab }: { activeTab: TicketTab }) {
  return (
    <div className='w-full py-8 flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-deep-red mx-auto mb-2' />
        <p className='text-sm text-gray-600'>
          Loading {activeTab === 'ticket' ? 'tickets' : 'promocodes'}...
        </p>
      </div>
    </div>
  )
}

function ErrorState({ activeTab, onClick }: { activeTab: TicketTab; onClick: () => void }) {
  return (
    <div className='w-full py-8 flex items-center justify-center'>
      <div className='text-center'>
        <p className='text-sm text-red-600 mb-2'>
          Failed to load {activeTab === 'ticket' ? 'tickets' : 'promocodes'}. Please try again.
        </p>
        <Button variant='outline' size='sm' onClick={onClick} className='text-xs'>
          Try Again
        </Button>
      </div>
    </div>
  )
}

function TicketSales({ tickets }: { tickets: TicketData[] }) {
  const salesData = tickets.map((ticket) => ({
    ticketName: ticket.ticketName,
    ticketSold: `${ticket.quantity - ticket.availableQuantity}/${ticket.quantity}`,
    price: `₦${ticket.price.toLocaleString()}`,
    status: ticket.availableQuantity === 0 ? 'SOLD OUT' : ('ONGOING' as const),
  }))

  return (
    <div className='w-full bg-white p-3 md:p-5 flex flex-col gap-5 rounded-[10px]'>
      <div className='flex items-center gap-1'>
        <img src='/assets/harmburger/ticket.png' alt='Ticket' className='size-5' />
        <p className='text-black font-medium text-xl font-sf-pro-display'>Ticket Sales</p>
      </div>

      <BaseTable caption='A table of your ticket sales' columns={columns} data={salesData} />
    </div>
  )
}

function TicketCard({ name, onDelete, isLoading = false }: ITIcketCard) {
  return (
    <div className='w-full h-16 bg-white py-4 pl-3 pr-1 rounded-[8px] flex items-center justify-between shadow-sm border border-gray-100'>
      <div className='flex items-center gap-5'>
        <Button variant='ghost' className='py-0 px-1 w-fit h-fit hover:bg-black/20'>
          <img src='/assets/event/menu.png' alt='Grip' className='size-4' />
        </Button>
        <p className='text-sm font-sf-pro-display text-black'>{name}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='p-1 !w-fit h-fit hover:bg-black/20'>
            <EllipsisVertical className='w-[3px] h-[13px]' color='#000000' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() => onDelete()}
            disabled={isLoading}
            className='text-red-600 focus:text-red-600'>
            <Trash2 size={16} className='mr-2' />
            {isLoading ? 'Deleting...' : 'Delete Ticket'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const columns: { key: string; label: string }[] = [
  { key: 'ticketName', label: 'Ticket Name' },
  { key: 'ticketSold', label: 'Ticket Sold' },
  { key: 'price', label: 'Price' },
  { key: 'status', label: 'Status' },
]

type TicketTab = 'ticket' | 'promocode'

interface ITicketTab {
  eventId: string
  setActiveTab: (tab: string) => void
  eventName: string
}

interface ITIcketCard {
  name: string
  onDelete: () => void
  isLoading?: boolean
}
