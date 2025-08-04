import { CustomFormField as FormField } from '@/components/custom/custom-form'
import { BaseRadioGroup, type IRadioGroupProps } from '@/components/reusable/base-radio-group'
import { FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateTheme } from '@/hooks/use-event-mutations'
import { transformThemeToCreateRequest } from '@/lib/event-transforms'
import { useEventStore } from '@/stores'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { type FieldValues, type Path, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import type { z } from 'zod'
import { SubmitBtn } from '../component/submit-btn'
import { TabContainer } from '../component/tab-ctn'
import {
  type bannerSchema,
  defaultBannerValues,
  defaultThemeValues,
  themeAndBannerSchema,
  themeSchema,
} from '../schemas/theme-schema'

export default function ThemeTab({
  setStep,
  setActiveTabState,
}: {
  setStep: (step: number) => void
  setActiveTabState: (activeTab: string) => void
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeForm, setActiveForm] = useState<string>()
  const { eventId } = useEventStore()

  useEffect(() => {
    const formParam = searchParams.get('form')

    if (formParam === 'layout' || formParam === 'banner') {
      setActiveForm(formParam)
    } else if (searchParams.get('tab') === 'theme') {
      setSearchParams({ tab: 'theme', form: 'layout' })
    }
  }, [searchParams, setSearchParams])

  function handleFormChange() {
    setSearchParams({ tab: 'theme', form: 'banner' })
    setActiveForm('banner')
  }

  function renderVendorTab() {
    setActiveTabState('vendor')
    searchParams.delete('form')
  }

  if (!eventId) {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-4 py-8'>
        <div className='text-center'>
          <h2 className='text-xl font-bold text-black mb-2'>No Event Found</h2>
          <p className='text-gray-600 mb-4'>Please create an event first before adding theme.</p>
          <button
            type='button'
            onClick={() => setActiveTabState('event-details')}
            className='bg-black text-white hover:bg-gray-800 px-4 py-2 rounded'>
            Go to Event Details
          </button>
        </div>
      </div>
    )
  }

  if (activeForm === 'banner') {
    setStep(3.5)
    return <CombinedThemeForm renderVendorTab={renderVendorTab} />
  }

  setStep(3)
  return <LayoutForm handleFormChange={handleFormChange} />
}

function LayoutForm({ handleFormChange }: { handleFormChange: () => void }) {
  const { eventId } = useEventStore()

  const form = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema),
    defaultValues: defaultThemeValues,
  })

  async function onSubmit() {
    try {
      if (!eventId) {
        console.error('No event ID found. Please create an event first.')
        return
      }

      handleFormChange()
    } catch (error) {
      console.error('Failed to process theme selection:', error)
    }
  }

  return (
    <TabContainer form={form} onSubmit={onSubmit}>
      <FormField form={form} name='theme'>
        {(field) => <BaseRadioGroup {...field} data={data} />}
      </FormField>

      <SubmitBtn />
    </TabContainer>
  )
}

function CombinedThemeForm({
  renderVendorTab,
}: {
  renderVendorTab: () => void
}) {
  const createThemeMutation = useCreateTheme()
  const { eventId } = useEventStore()

  const form = useForm<z.infer<typeof themeAndBannerSchema>>({
    resolver: zodResolver(themeAndBannerSchema),
    defaultValues: {
      theme: '1',
      banner: defaultBannerValues,
    },
  })

  async function onSubmit(values: z.infer<typeof themeAndBannerSchema>) {
    try {
      if (!eventId) {
        console.error('No event ID found. Please create an event first.')
        return
      }

      const themeRequest = transformThemeToCreateRequest({ theme: values.theme }, eventId)

      const result = await createThemeMutation.mutateAsync(themeRequest)

      console.log('Theme created successfully:', result)

      renderVendorTab()
    } catch (error) {
      console.error('Failed to create theme:', error)
    }
  }

  return (
    <TabContainer form={form} onSubmit={onSubmit} className='gap-10 md:gap-[100px]'>
      {/* Theme Selection */}
      <div className='w-full flex flex-col gap-4'>
        <p className='font-sf-pro-display text-medium-gray text-sm md:text-2xl uppercase'>
          SELECT THEME
        </p>
        <FormField form={form} name='theme'>
          {(field) => <BaseRadioGroup {...field} data={data} />}
        </FormField>
      </div>

      {/* Banner Images */}
      {bannerForm.map((item) => (
        <div key={item.type} className='w-full flex flex-col gap-3'>
          <p className='font-sf-pro-display text-medium-gray text-sm md:text-2xl uppercase'>
            {item.type} VIEW
          </p>
          <div className='w-full flex gap-3 md:gap-14'>
            <FormField form={form} name={`banner.${item.flyer_name}`} className='w-[162px]'>
              {(field) => (
                <>
                  <FileInputWithPreview onChange={field.onChange} type='flyer' />

                  <FieldDescription description='Shown on Web page when in Flyer View. Also appears on the Ticket and Confirmation' />
                </>
              )}
            </FormField>

            <FormField form={form} name={`banner.${item.background_name}`} className='w-full'>
              {(field) => (
                <>
                  <FileInputWithPreview onChange={field.onChange} type='background' />

                  <FieldDescription description='Background image on Webpage when viewed from a desktop' />
                </>
              )}
            </FormField>
          </div>
        </div>
      ))}

      <SubmitBtn isLoading={createThemeMutation.isPending} />
    </TabContainer>
  )
}

function FileInputWithPreview({
  onChange,
  type,
  className,
}: {
  onChange: (file: File | undefined) => void
  type: 'flyer' | 'background'
  className?: string
}) {
  const [preview, setPreview] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onChange(file)
    } else {
      setPreview(null)
      onChange(undefined)
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[5px] shadow-2xl ${
        type === 'flyer' ? 'w-[162px] h-[216px]' : 'w-full h-[200px]'
      } relative ${className || ''}`}>
      <Input
        type='file'
        accept='image/*'
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer px-3'
        onChange={handleFileChange}
      />
      {preview ? (
        <img
          src={preview}
          alt='preview'
          className='object-contain w-full h-full pointer-events-none'
        />
      ) : (
        <InnerText type={type} />
      )}
    </div>
  )
}

function InnerText({ type }: { type: 'background' | 'flyer' }) {
  return (
    <div className='flex flex-col items-center justify-center font-sf-pro-text pointer-events-none'>
      <span className='text-mid-dark-gray text-sm'>Insert {type} image</span>
      <span className='text-deep-red text-xs mt-2'>
        {type === 'background' ? ' 1600 X 500' : '550 x 770'} (PIXELS)
      </span>
    </div>
  )
}

function FieldDescription({ description }: { description: string }) {
  return (
    <FormDescription className='text-mid-dark-gray text-sm text-center font-semibold'>
      {description}
    </FormDescription>
  )
}

const bannerForm: IBannerForm<z.infer<typeof bannerSchema>>[] = [
  {
    type: 'desktop',
    flyer_name: 'desktop.flyer',
    background_name: 'desktop.background',
  },
  {
    type: 'mobile',
    flyer_name: 'mobile.flyer',
    background_name: 'mobile.background',
  },
]

const data: IRadioGroupProps[] = [
  { value: '1', src: '/assets/event/1.png', alt: 'layout' },
  { value: '2', src: '/assets/event/2.png', alt: 'layout' },
  { value: '3', src: '/assets/event/3.png', alt: 'layout' },
  { value: '4', src: '/assets/event/4.png', alt: 'layout' },
]

interface IBannerForm<T extends FieldValues> {
  type: 'mobile' | 'desktop'
  flyer_name: Path<T>
  background_name: Path<T>
}
