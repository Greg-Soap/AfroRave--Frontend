// Event creation interfaces
export interface EventContact {
  email: string
  website: string
}

export interface EventSocials {
  instagram: string
  x: string
  tiktok: string
  facebook: string
}

export interface EventDetails {
  termsOfRefund: string
  eventContact: EventContact
  socials: EventSocials
}

export interface EventDate {
  timezone: string
  startDate: string
  endDate: string
  frequency: string
  startTime: string
  endTime: string
  occurance: number
}

export interface CreateEventRequest {
  eventName: string
  ageRating: string
  categoryId: string
  venue: string
  description: string
  customUrl: string
  eventId: string
  eventDate: EventDate
  eventDetails: EventDetails
}

// Ticket creation interfaces
export interface TicketMail {
  body: string
}

export interface TicketDetails {
  saleImmediately: boolean
  saleBegins: string
  allowResell: boolean
  mail: TicketMail
}

export interface CreateTicketRequest {
  ticketName: string
  accessType: string
  salesType: string
  ticketType: string
  quantity: number
  price: number
  purchaseLimit: number
  groupSize: number
  validDays: number
  description: string
  eventId: string
  ticketDetails: TicketDetails
}

// Vendor creation interfaces
export interface VendorSlotData {
  slotName: string
  slotNumber: number
  price: number
}

export interface VendorServiceData {
  serviceName: string
  minBudget: number
  maxBudget: number
  startDate: string
  endDate: string
}

export interface VendorContact {
  email: string
  phoneNumbers: string[]
}

export interface VendorDetails {
  slotData: VendorSlotData
  serviceData: VendorServiceData
  contact: VendorContact
}

export interface CreateVendorRequest {
  vendorType: string
  category: string
  description: string
  eventId: string
  vendorDetails: VendorDetails
}

// Promo code creation interfaces
export interface PromoTicket {
  id: string
}

export interface PromoCodeDetails {
  tickets: PromoTicket[]
  isMinimumSpend: boolean
  minimumSpend: number
  isMinimumTicket: boolean
  minimumTicket: number
  note: string
  isPrivate: boolean
  isPartnership: boolean
  partnerName: string
  commisionType: string
  commission: number
}

export interface CreatePromoCodeRequest {
  promoCode: string
  discountType: string
  discountValue: number
  discountUsage: number
  startDate: string
  endDate: string
  eventId: string
  promoCodeDetails: PromoCodeDetails
}

// Theme creation interfaces
export interface MediaAssets {
  flyer: string
  background: string
}

export interface EventTheme {
  themeName: string
}

export interface CreateThemeRequest {
  mobileMedia: MediaAssets
  desktopMedia: MediaAssets
  theme: EventTheme
  eventId: string
}
