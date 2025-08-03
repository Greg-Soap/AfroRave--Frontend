import { Button } from '@/components/ui/button'
import type { ticketSchema } from '@/pages/creators/add-event/schemas/tickets-schema'
import type { serviceSchema } from '@/pages/creators/add-event/schemas/vendor-service-schema'
import type { slotSchema } from '@/pages/creators/add-event/schemas/vendor-slot-schema'
import type { EditEventDetailsSchema } from '@/schema/edit-event-details'
import { faker } from '@faker-js/faker'
import type { UseFormReset } from 'react-hook-form'
import type { z } from 'zod'

// Event categories and options from constants
const eventCategories = [
  'festival',
  'concert',
  'conference',
  'workshop',
  'seminar',
  'networking',
  'comedy',
  'theater',
  'sports',
  'exhibition',
  'trade-show',
  'fashion',
  'food-wine',
  'art-culture',
  'dance',
  'film-screening',
  'gaming',
  'tech',
  'startup',
  'charity',
  'religious',
  'kids-family',
  'fitness-wellness',
  'education',
  'business',
  'awards',
  'party',
  'outdoor',
  'craft-diy',
  'book-reading',
  'other',
]

const ageRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR']

const africanTimezones = [
  'Africa/Lagos',
  'Africa/Nairobi',
  'Africa/Johannesburg',
  'Africa/Cairo',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Casablanca',
  'Africa/Dar_es_Salaam',
  'Africa/Kinshasa',
  'Africa/Luanda',
  'Africa/Khartoum',
]

const vendorTypes = ['service_vendor', 'product_vendor', 'food_vendor']
const vendorCategories = [
  'dj_mc',
  'photography',
  'catering',
  'decorations',
  'security',
  'transportation',
  'lighting',
  'sound',
  'makeup',
  'fashion',
  'jewelry',
  'art',
  'crafts',
]

/**
 * Generates a phone number in E.164 format for supported countries
 * @returns A phone number string in E.164 format (e.g. +2348012345678)
 */
// const generatePhoneNumber = () => {
//   const country = faker.helpers.arrayElement(['NG', 'KE', 'ZA', 'EG', 'GH']) as string
//   const numberFormats = {
//     NG: () => `+234${faker.number.int({ min: 7000000000, max: 9999999999 })}`,
//     KE: () => `+254${faker.number.int({ min: 700000000, max: 999999999 })}`,
//     ZA: () => `+27${faker.number.int({ min: 600000000, max: 899999999 })}`,
//     EG: () => `+20${faker.number.int({ min: 1000000000, max: 1999999999 })}`,
//     GH: () => `+233${faker.number.int({ min: 200000000, max: 999999999 })}`,
//   }
//   return numberFormats[country as keyof typeof numberFormats]()
// }

/**
 * Generates a random time in 12-hour format
 */
const generateTime = () => {
  const hour = faker.number.int({ min: 1, max: 12 }).toString()
  const minute = faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0')
  const period = faker.helpers.arrayElement(['AM', 'PM'])
  return { hour, minute, period }
}

/**
 * Generates a random date in the future
 */
const generateFutureDate = (daysFromNow = 30) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date
}

// All fake data generation functions
const fakeDataGenerators = {
  eventDetails: (): z.infer<typeof EditEventDetailsSchema> => ({
    name: faker.helpers.arrayElement([
      'AfroBeats Festival 2024',
      'Tech Innovation Summit',
      'Cultural Heritage Exhibition',
      'Startup Networking Mixer',
      'Art & Music Fusion Night',
      'Business Leadership Conference',
      'Community Wellness Workshop',
      'Creative Design Showcase',
      'Youth Empowerment Summit',
      'Traditional Dance Festival',
      'Digital Marketing Masterclass',
      'Sustainable Living Expo',
      'Entrepreneurship Bootcamp',
      'Cultural Food Festival',
      'Innovation & Technology Fair',
    ]),
    age_rating: faker.helpers.arrayElement(ageRatings),
    category: faker.helpers.arrayElement(eventCategories),
    venue: faker.helpers.arrayElement([
      'Lagos Convention Centre',
      'Nairobi International Conference Centre',
      'Johannesburg Expo Centre',
      'Cairo International Stadium',
      'Accra Conference Centre',
      'Addis Ababa Exhibition Hall',
      'Dar es Salaam Convention Centre',
      'Kinshasa Grand Hotel',
      'Luanda Business Centre',
      'Khartoum International Hall',
    ]),
    description: faker.lorem.paragraphs(2, '\n\n'),
    custom_url: faker.helpers.arrayElement([
      'afrobeats-festival-2024',
      'tech-summit-2024',
      'cultural-exhibition',
      'startup-mixer',
      'art-music-fusion',
      'business-conference',
      'wellness-workshop',
      'design-showcase',
      'youth-summit',
      'dance-festival',
    ]),
    time_zone: faker.helpers.arrayElement(africanTimezones),
    start_date: {
      date: generateFutureDate(30),
      ...generateTime(),
    },
    end_date: {
      date: generateFutureDate(31),
      ...generateTime(),
    },
    email: faker.internet.email(),
    website_url: faker.internet.url(),
    socials: {
      instagram: faker.helpers.maybe(() => `@${faker.internet.userName()}`, { probability: 0.8 }),
      x: faker.helpers.maybe(() => `@${faker.internet.userName()}`, { probability: 0.7 }),
      tiktok: faker.helpers.maybe(() => `@${faker.internet.userName()}`, { probability: 0.6 }),
      facebook: faker.helpers.maybe(() => faker.internet.url(), { probability: 0.5 }),
    },
  }),

  tickets: (): z.infer<typeof ticketSchema> => ({
    tickets: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      ticketName: faker.helpers.arrayElement([
        'Early Bird Ticket',
        'General Admission',
        'VIP Experience',
        'Premium Access',
        'Student Ticket',
        'Group Package',
        'Corporate Pass',
        'Media Pass',
        'Artist Pass',
        'Sponsor Package',
      ]),
      type: faker.helpers.arrayElement(['paid', 'free', 'invite-only'] as const),
      salesType: faker.helpers.arrayElement(['online', 'offline', 'both'] as const),
      ticketType: faker.helpers.arrayElement([
        'single_ticket',
        'group_ticket',
        'vip_ticket',
        'early_bird',
      ] as const),
      quantity: {
        availability: faker.helpers.arrayElement(['limited', 'unlimited'] as const),
        amount: faker.number.int({ min: 50, max: 1000 }).toString(),
      },
      price: faker.number.int({ min: 1000, max: 50000 }).toString(),
      description: faker.lorem.paragraph(),
      perks: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
        faker.helpers.arrayElement([
          'Free parking',
          'Complimentary drinks',
          'Meet & greet access',
          'Exclusive seating',
          'Backstage tour',
          'Merchandise package',
          'Photo opportunity',
          'Priority entry',
          'Food voucher',
          'Swag bag',
        ]),
      ),
      tags: faker.helpers.arrayElement([
        'popular',
        'trending',
        'featured',
        'new',
        'limited-time',
      ] as const),
      advancedOptions: faker.helpers.arrayElement(['allow', 'dont-allow'] as const),
      allowResell: faker.helpers.arrayElement(['allow', 'dont-allow'] as const),
    })),
    whenToStart: faker.helpers.arrayElement(['immediately', 'at-a-scheduled-date']),
    scheduledDate: {
      date: generateFutureDate(7),
      ...generateTime(),
    },
    confirmationMailText: faker.lorem.paragraph(),
    email: faker.internet.email(),
  }),

  vendorSlots: (): z.infer<typeof slotSchema> => ({
    slot: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      type: faker.helpers.arrayElement(vendorTypes),
      category: faker.helpers.arrayElement(vendorCategories),
      name: faker.helpers.arrayElement([
        'Premium DJ Booth',
        'Photography Station',
        'Catering Corner',
        'Decoration Zone',
        'Security Post',
        'Transport Hub',
        'Lighting Setup',
        'Sound System',
        'Makeup Station',
        'Fashion Display',
      ]),
      slotAmount: faker.number.int({ min: 1, max: 10 }).toString(),
      pricePerSlot: faker.number.int({ min: 5000, max: 50000 }).toString(),
      description: faker.lorem.paragraph(),
    })),
    useDifferentContactDetails: faker.datatype.boolean(),
    email: faker.internet.email(),
    phone: Array.from({ length: faker.number.int({ min: 1, max: 2 }) }, () => ({
      countryCode: faker.helpers.arrayElement(['+234', '+254', '+27', '+20', '+233']),
      number: faker.number.int({ min: 7000000000, max: 9999999999 }).toString(),
    })),
    showSocialHandles: faker.datatype.boolean(),
  }),

  vendorServices: (): z.infer<typeof serviceSchema> => ({
    service: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      type: faker.helpers.arrayElement(vendorTypes),
      category: faker.helpers.arrayElement(vendorCategories),
      name: faker.helpers.arrayElement([
        'Professional DJ Services',
        'Event Photography',
        'Catering Services',
        'Event Decoration',
        'Security Services',
        'Transportation Services',
        'Lighting & Sound',
        'Makeup & Styling',
        'Fashion & Accessories',
        'Art & Crafts',
      ]),
      budgetRange: faker.datatype.boolean(),
      workDuration: {
        hour: faker.number.int({ min: 1, max: 12 }).toString(),
        minute: faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0'),
        second: faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0'),
      },
      start: generateTime(),
      stop: generateTime(),
      description: faker.lorem.paragraph(),
    })),
    useDifferentContactDetails: faker.datatype.boolean(),
    email: faker.internet.email(),
    phone: Array.from({ length: faker.number.int({ min: 1, max: 2 }) }, () => ({
      countryCode: faker.helpers.arrayElement(['+234', '+254', '+27', '+20', '+233']),
      number: faker.number.int({ min: 7000000000, max: 9999999999 }).toString(),
    })),
    showSocialHandles: faker.datatype.boolean(),
  }),
}

type FakeDataType = keyof typeof fakeDataGenerators

interface FakeDataGeneratorProps<T extends FakeDataType> {
  /**
   * The type of fake data to generate
   */
  type: T
  /**
   * The form reset function from react-hook-form
   */
  onGenerate: UseFormReset<ReturnType<(typeof fakeDataGenerators)[T]>>
  /**
   * Optional class name for the button
   */
  className?: string
  /**
   * Optional button variant
   */
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  /**
   * Optional callback to trigger after generating data
   */
  onAfterGenerate?: () => void
  /**
   * Optional button text
   */
  buttonText?: string
}

/**
 * A development-only component that generates fake data for forms
 * Only renders in development mode
 */
export function FakeDataGenerator<T extends FakeDataType>({
  type,
  onGenerate,
  className = '',
  variant = 'outline',
  onAfterGenerate,
  buttonText = 'Auto-fill with fake data',
}: FakeDataGeneratorProps<T>) {
  // Only show in development mode
  if (import.meta.env.PROD) return null

  const handleClick = () => {
    const fakeData = fakeDataGenerators[type]()
    onGenerate(fakeData as unknown as ReturnType<(typeof fakeDataGenerators)[T]>)
    onAfterGenerate?.()
  }

  return (
    <div className='flex justify-end mb-4'>
      <Button type='button' variant={variant} className={className} onClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  )
}

// Export individual generators for direct use
export const generateFakeEventDetails = fakeDataGenerators.eventDetails
export const generateFakeTickets = fakeDataGenerators.tickets
export const generateFakeVendorSlots = fakeDataGenerators.vendorSlots
export const generateFakeVendorServices = fakeDataGenerators.vendorServices
