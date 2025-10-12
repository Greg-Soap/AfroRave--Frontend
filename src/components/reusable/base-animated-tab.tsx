import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs'
import { cn } from '@/lib/utils'

export function BaseAnimatedTab({
  activeTab,
  setActiveTab,
  tabs,
  variant = 'account',
  CustomElement,
}: BaseAnimatedTabProps) {
  const isAccount = variant === 'account'
  const isListed = variant === 'listed-tickets'

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn('w-full md:w-fit flex', {
        'flex-col md:flex-row justify-center gap-10 md:gap-[100px] xl:gap-[307px]': isAccount,
        'flex-col items-center gap-[132px]': isListed,
      })}>
      <TabsList
        className={cn('h-fit relative', {
          'w-full md:w-fit lg:w-[175px] xl:w-[366px] hidden md:flex flex-row max-md:gap-7 md:flex-col bg-transparent mb-10 justify-start overflow-scroll scrollbar-none':
            isAccount,
          'flex w-fit px-1 py-1.5 rounded-[8px] bg-deep-red': isListed,
        })}>
        {tabs.map(({ name, value, image }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={cn('font-input-mono transition-all duration-300', {
              'w-fit md:w-full flex items-center justify-start gap-[7px] text-[15px] uppercase rounded-none tracking-[4%] py-7 data-[state=active]:bg-transparent data-[state=active]:shadow-none group font-sf-pro-display font-normal':
                isAccount,
              'md:border-y md:border-y-white/40 md:py-7': value === 'payout',
              'w-[116px] h-9 text-[13px] rounded-[8px] bg-transparent text-white data-[state=active]:bg-white data-[state=active]:text-pure-black':
                isListed,
            })}>
            {image && isAccount && (
              <img
                src={image}
                alt={name}
                width={17}
                height={18}
                className='opacity-60 group-hover:opacity-100 group-data-[state=active]:opacity-100'
              />
            )}
            <span
              className={cn({
                'opacity-60 group-hover:opacity-100 group-data-[state=active]:opacity-100':
                  isAccount,
                'text-inherit': isListed,
              })}>
              {name}
            </span>
          </TabsTrigger>
        ))}
        {CustomElement}
      </TabsList>

      <TabsContents className='w-full flex justify-center'>
        {tabs.map(({ value, element }) => (
          <TabsContent key={value} value={value} className='w-full'>
            <div className='w-full h-fit flex justify-center'>{element}</div>
          </TabsContent>
        ))}
      </TabsContents>
    </Tabs>
  )
}

type TabVariant = 'account' | 'listed-tickets'

export interface IAnimatedTabProps {
  value: string
  image?: string
  name: string
  element: React.ReactNode
}

interface BaseAnimatedTabProps {
  activeTab: string
  setActiveTab: (value: string) => void
  tabs: IAnimatedTabProps[]
  variant?: TabVariant
  CustomElement?: React.ReactNode
}
