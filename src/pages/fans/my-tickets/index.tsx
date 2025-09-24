import { Button } from '@/components/ui/button'
import { BaseTab } from '@/components/reusable/base-tab'
import { ChevronLeft } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ActiveTicketsTab from './my-tickets-tabs/active-tab'
import PastTicketsTab from './my-tickets-tabs/past-tab'
import { useUserActiveTickets, useUserPastTickets } from '@/hooks/use-profile-mutations'
import type { UserTicketData } from '@/types'

export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState<string>('active')
  const [searchParams, setSearchParams] = useSearchParams()

  const myTicketParam = searchParams.get('tab')

  const { data: activeTicketResponse, isLoading: isLoadingActiveTickets } = useUserActiveTickets()
  const { data: pastTicketResponse, isLoading: isLoadingPastTickets } = useUserPastTickets()

  const activeTickets: UserTicketData[] = activeTicketResponse?.data || []
  const pastTickets: UserTicketData[] = pastTicketResponse?.data || []

  useEffect(() => {
    if (myTicketParam === 'active' || myTicketParam === 'past') {
      setActiveTab(myTicketParam)
    } else {
      setActiveTab('active')
      setSearchParams({ tab: 'active' })
    }
  }, [searchParams])

  const setActiveTabState = (nextTab: string) => {
    setActiveTab(nextTab)
    setSearchParams({ tab: nextTab })
  }

  const my_tickets_tabs: IMyTicketsTab[] = [
    {
      value: 'active',
      name: 'Active',
      element: <ActiveTicketsTab data={activeTickets} isLoading={isLoadingActiveTickets} />,
    },
    {
      value: 'past',
      name: 'Past',
      element: <PastTicketsTab data={pastTickets} isLoading={isLoadingPastTickets} />,
    },
  ]

  return (
    <section className='w-full flex flex-col items-center justify-center gap-[34px] mt-[124px]'>
      <Button variant='ghost' className='pl-5 md:ml-[50px] self-start w-fit hover:bg-white/10'>
        <ChevronLeft color='#ffffff' className='w-[14px] h-[30px]' />
      </Button>

      <BaseTab
        activeTab={activeTab}
        setActiveTab={setActiveTabState}
        tabs={my_tickets_tabs}
        variant='listed-tickets'
      />
    </section>
  )
}

interface IMyTicketsTab {
  value: 'active' | 'past'
  name: string
  element: React.ReactNode
}
