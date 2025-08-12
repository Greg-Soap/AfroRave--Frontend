import { CreatorMenuButton } from '@/components/reusable/creator-menu-button'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getRoutePath } from '@/config/get-route-path'
import { usePublishEvent } from '@/hooks/use-event-mutations'
import { cn } from '@/lib/utils'
import { useAfroStore, useEventStore } from '@/stores'
import { ChevronLeft, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import EventDetailsTab from './tabs/event-details-tab'
import PublishTab from './tabs/publish-tab'
import ThemeTab from './tabs/theme-tab'
import TicketsTab from './tabs/tickets-tab'
import VendorTab from './tabs/vendor-tab'
import { OnlyShowIf } from '@/lib/environment'

export default function AddEventPage() {
  const { user } = useAfroStore()
  const { eventId } = useEventStore()
  const publishEventMutation = usePublishEvent()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>('event-details')
  const [heading, setHeading] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [step, setStep] = useState<number>()
  const [themeBtnVisibility, setThemeBtnVisibility] = useState<boolean>(false)
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    const formParam = searchParams.get('form')

    if (
      tabParam === 'event-details' ||
      tabParam === 'tickets' ||
      tabParam === 'theme' ||
      tabParam === 'vendor' ||
      tabParam === 'publish'
    ) {
      setActiveTab(tabParam)
      RenderHeadline(tabParam, setHeading, setDescription)
    } else if (!tabParam) {
      setActiveTab('event-details')
      setSearchParams({ tab: 'event-details' })
      RenderHeadline('event-details', setHeading, setDescription)
    }

    if (tabParam === 'theme' && formParam === 'banner') {
      setThemeBtnVisibility(true)
    } else {
      setThemeBtnVisibility(false)
    }
  }, [searchParams, setSearchParams])

  const setActiveTabState = (incomingTab: string) => {
    setSearchParams({ tab: incomingTab })
    RenderHeadline(incomingTab, setHeading, setDescription)
  }

  const handleBackClick = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeTab)
    if (currentIndex > 0) {
      const previousTab = tabs[currentIndex - 1].value
      setActiveTab(previousTab)
      setSearchParams({ tab: previousTab })
    } else {
      navigate(-1)
    }
  }

  const handlePublishEvent = async () => {
    if (!eventId) {
      console.error('No event ID found')
      return
    }

    try {
      await publishEventMutation.mutateAsync(eventId)
      // Navigate to creator dashboard after successful publish
      navigate(getRoutePath('creators_home'))
    } catch (error) {
      console.error('Failed to publish event:', error)
    }
  }

  const tabs: IEditTabProps[] = [
    {
      value: 'event-details',
      name: 'Event Details',
      element: <EventDetailsTab setStep={setStep} setActiveTabState={setActiveTabState} />,
    },
    {
      value: 'tickets',
      name: 'Tickets',
      element: (
        <TicketsTab
          setStep={setStep}
          setActiveTabState={setActiveTabState}
          showError={() => setShowError(true)}
        />
      ),
    },
    {
      value: 'theme',
      name: 'Theme',
      element: <ThemeTab setStep={setStep} setActiveTabState={setActiveTabState} />,
    },
    {
      value: 'vendor',
      name: 'Vendor',
      element: <VendorTab setStep={setStep} setActiveTabState={setActiveTabState} />,
    },
    {
      value: 'publish',
      name: 'Publish',
      element: <PublishTab setStep={setStep} />,
    },
  ]

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTabState}
      className='w-full min-h-screen flex flex-col items-center bg-black overflow-x-hidden'>
      <div className='w-full flex flex-col'>
        <div className='w-full h-[72px] flex items-center justify-between py-4 px-8'>
          <img src='/assets/landing-page/AR.png' alt='AR' width={60} height={32} />

          <CustomTabTriggers tabs={tabs} className='hidden md:flex p-0' />

          <CreatorMenuButton user={user} variant='dark' />
          <CustomTabTriggers tabs={tabs} className='flex md:hidden px-5' />
        </div>
      </div>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='w-full h-fit max-w-screen overflow-x-hidden bg-[#f8f8f8]'>
          <div className='w-full h-fit flex flex-col items-center'>
            {/** Nav */}
            <TabNav
              handleBackClick={handleBackClick}
              activeTab={activeTab}
              themeBtnVisibility={themeBtnVisibility}
              setActiveTabState={setActiveTabState}
              navigate={navigate}
              handlePublishEvent={handlePublishEvent}
              isPublishing={publishEventMutation.isPending}
            />

            <section className='container w-full flex flex-col gap-10'>
              <div className='flex flex-col gap-6 md:py-10 p-0 md:px-14'>
                <div className='flex flex-col gap-2 text-black font-sf-pro-display'>
                  <p className='font-black text-2xl md:text-4xl uppercase'>{heading}</p>
                  <p className='text-[13px] max-w-[351px] uppercase'>{description}</p>
                  <p className='text-xl font-black'>STEP {step || 1}</p>
                </div>

                <OnlyShowIf condition={showError}>
                  <MoreTabDetails />
                </OnlyShowIf>

                <OnlyShowIf condition={activeTab === 'theme'}>
                  <MoreTabDetails type='theme' />
                </OnlyShowIf>
              </div>

              {tab.element}
            </section>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

function CustomTabTriggers({
  tabs,
  className,
}: {
  tabs: IEditTabProps[]
  className?: string
}) {
  return (
    <TabsList className={cn('items-center gap-5 md:gap-24 w-fit h-fit bg-transparent', className)}>
      {tabs.map((tab) => (
        <TabsTrigger
          disabled
          key={tab.value}
          value={tab.value}
          className='bg-transparent p-0 font-sf-pro-rounded font-normal text-xs md:text-sm text-white/50 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none disabled:opacity-100 uppercase'>
          {tab.name}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}

function TabNav({
  activeTab,
  handleBackClick,
  themeBtnVisibility,
  setActiveTabState,
  navigate,
  handlePublishEvent,
  isPublishing,
}: {
  activeTab: string
  handleBackClick: () => void
  themeBtnVisibility: boolean
  setActiveTabState: (incomingTab: string) => void
  navigate: (path: string) => void
  handlePublishEvent: () => void
  isPublishing: boolean
}) {
  return (
    <div className='w-full h-fit flex items-center justify-between py-3 px-5 md:px-8'>
      <Button
        variant='ghost'
        className='w-fit h-fit hover:bg-black/10'
        onClick={handleBackClick}
        disabled={activeTab === 'event-details'}>
        <ChevronLeft color='#000000' className='min-w-1.5 min-h-3' />
      </Button>

      <div className='flex gap-8'>
        {themeBtnVisibility && (
          <NavBtn name={activeTab} action={() => setActiveTabState('vendor')} />
        )}

        {activeTab === 'publish' && (
          <NavBtn name={isPublishing ? 'PUBLISHING...' : 'PUBLISH'} action={handlePublishEvent} />
        )}

        <Button
          variant='destructive'
          className='h-10 w-[120px] text-xs font-sf-pro-text font-black rounded-[5px]'
          onClick={() => navigate(getRoutePath('standalone'))}>
          Save and Exit
        </Button>
      </div>
    </div>
  )
}

function NavBtn({ name, action }: { name: string; action: () => void }) {
  return (
    <Button
      onClick={action}
      className='h-10 w-[120px] text-xs font-sf-pro-text font-black rounded-[5px] bg-white text-deep-red hover:bg-black/10 uppercase'>
      {name}
    </Button>
  )
}

function MoreTabDetails({ type = 'error' }: { type?: 'error' | 'theme' }) {
  return (
    <div
      className={cn('w-[253px] flec flex-col text-charcoal', {
        'text-deep-red': type === 'error',
        'text-charcoal': type === 'theme',
      })}>
      <div className='flex items-center gap-2'>
        <Info size={16} className='text-inherit' />
        <p className='text-sm font-medium leading-[100%] font-sf-pro-display'>
          {type === 'error' ? 'Changes will be lost' : 'You can come back to this later'}
        </p>
      </div>
      <p className='text-[13px] font-sf-pro-display'>
        {type === 'error'
          ? 'If you leave now any changes will not be saved.'
          : `No worries if you’re not ready to complete this step now. You can always return to it at anytime from your dashboard.`}
      </p>
    </div>
  )
}

function RenderHeadline(
  activeTab: string,
  setHeading: (heading: string) => void,
  setDescription: (description: string) => void,
) {
  if (activeTab === 'tickets') {
    setHeading('CREATE YOUR TICKETS!')
    setDescription('Enhance your ticketing power with flexible, fan-friendly features')
    return
  }

  if (activeTab === 'theme') {
    setHeading('AESTHETICS MATTERS!')
    setDescription('Match with trusted vendors who bring your vision to life')
    return
  }

  if (activeTab === 'vendor') {
    setHeading('Bring Your Event Together!')
    setDescription('Match with trusted vendors who bring your vision to life')
    return
  }

  if (activeTab === 'publish') {
    setHeading("Let's Go Live!")
    setDescription(
      "You're one step from live sales. Review your event details and publish when you're confident",
    )
    return
  }

  setHeading('BUILD YOUR STAGE!')
  setDescription('Your moment starts here! tell us about your event')
  return
}

interface IEditTabProps {
  value: string
  name: string
  element: React.ReactNode
}
