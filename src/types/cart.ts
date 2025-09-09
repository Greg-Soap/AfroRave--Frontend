import type { UUID } from 'node:crypto'
import type { ApiResponse } from './api'

interface CartData {
  cartId: number
  ticketId: number
  ticketName: string
  price: number
  quantity: number
  eventId: UUID
  eventName: string
  venue: string
  startDate: Date
  endDate: Date
  createdDate: Date
  reservationExpiry: Date
  reservationStatus: string
  timeUntilExpiry: string // '57828384466181221638698875611538377095590350603083566088881511713074734940.28:27:38.49551'
}

export interface CreateCartRequest {
  ticketId: string
  quantity: number
}

export interface GetAllCartData {
  message: string
  data: CartData[]
  cursor: string
  id: UUID
  status: boolean
  statusCode: number
}

export type GetAllCartResponse = ApiResponse<GetAllCartData>

export interface GetCartData {
  message: string
  data: CartData
  cursor: string
  id: UUID
  status: boolean
  statusCode: number
}

export type GetCartResponse = ApiResponse<GetCartData>

export interface CheckoutRequest {
  paymentMethod: string
  promoCode?: string
  promoCodeId?: UUID
  paymentReference: string
  transactionReference: string
}

export interface CheckoutData {
  message: string
  data: {
    orderId: string
    totalAmount: number
    tax: number
    discount: number
    status: string
    createdDate: Date
    items: CartData[]
  }
  cursor: 'string'
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  status: true
  statusCode: 0
}

export type CheckoutResponse = ApiResponse<CheckoutData>

export interface ValidatePromocodeRequest {
  promoCode: string
  eventIds: UUID[]
  subtotal: number
  totalTickets: number
  ticketIds: UUID[]
}

export interface ValidatePromocodeData {
  message: string
  data: {
    isValid: boolean
    message: string
    discountAmount: number
    discountType: string
    discountValue: number
    promoCodeId: UUID
    promoCodeDetails: {
      tickets: [
        {
          id: UUID
        },
      ]
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
  }
  cursor: string
  id: UUID
  status: boolean
  statusCode: number
}

export type ValidatePromocodeResponse = ApiResponse<ValidatePromocodeData>
