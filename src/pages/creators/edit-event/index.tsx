import { CreatorMenuButton } from '@/components/reusable/creator-menu-button'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getRoutePath } from '@/config/get-route-path'
import { useDeleteEvent, useGetEvent, useUpdateEvent } from '@/hooks/use-event-mutations'
import { cn } from '@/lib/utils'
import { useAfroStore } from '@/stores'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import EventDetailsTab from './tabs/event-details-tab'
import SettingsTab from './tabs/settings-tab'
import ThemeTab from './tabs/theme-tab'
import TicketsTab from './tabs/tickets-tab'
import type { EventDetailData } from '@/types'

export default function EditEventPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>('event-details')

  const { user } = useAfroStore()
  const { eventId } = useParams()

  const updateEventMutation = useUpdateEvent()
  const deleteEventMutation = useDeleteEvent()

  const navigate = useNavigate()

  const event = useGetEvent(eventId || '').data?.data

  useEffect(() => {
    const editParam = searchParams.get('editTab')

    if (
      editParam === 'event-details' ||
      editParam === 'tickets' ||
      editParam === 'theme' ||
      editParam === 'settings'
    ) {
      setActiveTab(editParam)
    } else {
      setActiveTab('event-details')
      setSearchParams({ editTab: 'event-details' })
    }
  }, [searchParams, setSearchParams])

  if (!event) {
    return (
      <div className='w-full h-screen flex flex-col gap-5 items-center justify-center bg-white'>
        <p className='text-charcoal text-4xl font-semibold'>No Event Found</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    )
  }

  const setActiveTabState = (tab: string) => {
    setActiveTab(tab)
    setSearchParams({ editTab: tab })
  }

  const handleBackClick = () => {
    const currentIndex = edit_tabs.findIndex((tab) => tab.value === activeTab)
    if (currentIndex > 0) {
      const previousTab = edit_tabs[currentIndex - 1].value
      setActiveTab(previousTab)
      setSearchParams({ editTab: previousTab })
    } else {
      navigate(getRoutePath('standalone'))
    }
  }

  const handleSaveEvent = async () => {
    if (!eventId) {
      console.error('No event ID found')
      return
    }

    try {
      console.log('HElo world')
      // await updateEventMutation.mutateAsync({ eventId, data: formData })
    } catch (error) {
      console.error('Failed to update event:', error)
    }
  }

  const handleDeleteEvent = async () => {
    if (!eventId) {
      console.error('No event ID found')
      return
    }

    try {
      await deleteEventMutation.mutateAsync(eventId)
      // Navigate to creator dashboard after successful delete
      navigate(getRoutePath('creators_home'))
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  }

  const edit_tabs: IEditTabProps[] = [
    {
      value: 'event-details',
      name: 'Event Details',
      element: <EventDetailsTab event={event} />,
    },
    { value: 'tickets', name: 'Tickets', element: <TicketsTab /> },
    { value: 'theme', name: 'Theme', element: <ThemeTab /> },
    {
      value: 'settings',
      name: 'Settings',
      element: (
        <SettingsTab onDeleteEvent={handleDeleteEvent} isDeleting={deleteEventMutation.isPending} />
      ),
    },
  ]

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTabState}
      className='w-full min-h-screen flex flex-col items-center bg-white overflow-x-hidden'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-full flex items-center justify-between pt-3 md:py-4 px-5 md:px-8'>
          <img src='/assets/event/ar-black.png' alt='AR' width={60} height={32} />

          <CustomTabTrigger tabs={edit_tabs} className='p-0 hidden md:flex' />

          <CreatorMenuButton user={user} variant='dark' />
        </div>
        <CustomTabTrigger tabs={edit_tabs} className='w-full flex md:hidden px-5 justify-between' />
      </div>

      {edit_tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='w-full max-w-screen overflow-x-hidden bg-[#f8f8f8]'>
          <div className='w-full h-fit flex flex-col items-center'>
            {/** Nav */}
            <div className='w-full flex items-center justify-between py-3 px-5 md:px-8'>
              <Button
                variant='ghost'
                className='w-fit h-fit hover:bg-black/10 !p-1'
                onClick={handleBackClick}
                disabled={activeTab === 'event-details'}>
                <ChevronLeft color='#000000' className='min-w-1.5 min-h-3' />
              </Button>

              <Button
                variant='destructive'
                className='h-8 w-24 text-xs font-sf-pro-text font-black rounded-[5px]'
                onClick={handleSaveEvent}
                disabled={updateEventMutation.isPending}>
                {updateEventMutation.isPending ? 'SAVING...' : 'SAVE'}
              </Button>
            </div>

            {/**Content */}
            <div className='container w-full h-fit gap-2 flex !pl-2 pb-8'>
              <div className='flex flex-col py-16 md:px-14 gap-14 max-w-[612px]'>
                <EventDetails {...event} isTheme={activeTab === 'theme'} />

                <SalesSummary
                  totalTicket={event.eventDetails.eventStat.totalTicket}
                  promoCodes={event.eventDetails.eventStat.activePromoCodes}
                  revenue={event.eventDetails.eventStat.netProfit}
                  ticketSold={event.eventDetails.eventStat.ticketSold}
                />
              </div>

              {tab.element}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

function CustomTabTrigger({ tabs, className }: ICustomTabTrigger) {
  return (
    <TabsList
      className={cn(
        'items-center gap-[35px] md:gap-24 w-fit h-fit bg-transparent md:p-0',
        className,
      )}>
      {tabs.map((tab) => (
        <TabsTrigger
          disabled
          key={tab.value}
          value={tab.value}
          className='bg-transparent p-0 font-sf-pro-rounded font-normal text-xs md:text-sm text-black data-[state=active]:text-deep-red data-[state=active]:bg-transparent data-[state=active]:shadow-none disabled:opacity-100'>
          {tab.name}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}

function EventDetails({
  eventDetails,
  eventName,
  venue,
  eventDate,
  isTheme = false,
}: EventDetailData & { isTheme?: boolean }) {
  return (
    <div className='hidden md:flex gap-6 text-black w-[465px]'>
      <div className='relative w-fit h-fit flex items-center justify-center'>
        <img
          src={eventDetails.desktopMedia.flyer}
          alt={eventName}
          width={240}
          height={285}
          className='rounded-[10px]'
        />
        {isTheme && (
          <Button className='absolute w-[92px] h-10 bg-white text-deep-red text-[11px] font-medium hover:bg-medium-gray hover:text-white'>
            Edit Flyer
          </Button>
        )}
      </div>

      <div className='flex flex-col max-w-[237px] gap-2 py-3 font-sf-pro-display'>
        <p className='text-xl font-bold uppercase'>{eventName}</p>
        <p className='text-sm font-normal'>{venue}</p>
        <p className='text-sm font-normal'>
          {eventDate.startDate} {eventDate.startTime}
        </p>
        <p className='w-fit py-1 px-2 rounded-[5px] bg-[#f3f3f3] text-xs font-semibold capitalize font-sf-pro-rounded text-[#00AD2E]'>
          upcoming
        </p>
      </div>
    </div>
  )
}

function SalesSummary({ ticketSold, revenue, totalTicket, promoCodes }: ISalesSummary) {
  return (
    <div className='hidden md:flex flex-col gap-6 p-6 rounded-[10px]'>
      <p className='p-1 font-sf-pro-display text-2xl font-bold text-black capitalize'>
        Sales Summary
      </p>

      <div className='grid grid-cols-2 gap-y-6 gap-x-3'>
        <IndividualSaleSummary title='total tickets sold' details={ticketSold} />
        <IndividualSaleSummary title='total revenue' details={revenue} />
        <IndividualSaleSummary title='total tickets' details={totalTicket} />
        <IndividualSaleSummary title='active promo codes' details={promoCodes} />
      </div>
    </div>
  )
}

function IndividualSaleSummary({ title, details }: IndividualSaleSummary) {
  return (
    <div className='flex flex-col p-1 font-sf-pro-display text-pure-black'>
      <p className='text-sm capitalize'>{title}</p>
      <p className='font-semibold'>{details}</p>
    </div>
  )
}

interface ICustomTabTrigger {
  tabs: IEditTabProps[]
  className?: string
}

interface IEditTabProps {
  value: string
  name: string
  element: React.ReactNode
}

interface ISalesSummary {
  ticketSold: number
  revenue: number
  totalTicket: number
  promoCodes: number
}

interface IndividualSaleSummary {
  title: string
  details: string | number
}
