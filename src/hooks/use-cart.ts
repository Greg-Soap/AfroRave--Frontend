import { cartService } from '@/services/cart.serice'
import type { CheckoutRequest, CreateCartRequest, ValidatePromocodeRequest } from '@/types/cart'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { cartKeys } from '@/lib/cart-keys'

export function useGetAllCart() {
  return useQuery({
    queryKey: cartKeys.lists(),
    queryFn: () => cartService.getAllCart(),
  })
}

export function useCreateCart() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCartRequest) => cartService.createCart(data),
    onSuccess: () => {
      toast.success('Cart created successfully.')
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() })
    },
    onError: () => toast.error('Failed to create cart.'),
  })
}

export function useDeleteCart() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ cartId }: { cartId: string }) => cartService.deleteCart(cartId),
    onSuccess: (_, cartId) => {
      toast.success('Cart deleted successfully.')
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() })
      queryClient.invalidateQueries({ queryKey: cartKeys.detail(cartId.cartId) })
    },
    onError: () => toast.error('Failed to delete cart.'),
  })
}

export function useGetCart(cartId: string) {
  return useQuery({
    queryKey: cartKeys.detail(cartId),
    queryFn: () => cartService.getCart(cartId),
  })
}

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ cartId, data }: { data: number; cartId: string }) =>
      cartService.updateQuantity(cartId, data),
    onSuccess: (_, { cartId }) => {
      toast.success('Quantity updated successfully.')
      queryClient.invalidateQueries({ queryKey: cartKeys.detail(cartId) })
    },
    onError: () => toast.error('Failed to update quantity'),
  })
}

export function useClearCart() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      toast.success('Cart cleared successfully.')
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() })
    },
    onError: () => toast.error('Failed to clear cart.'),
  })
}

export function useCheckoutCart() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ data }: { data: CheckoutRequest }) => cartService.checkoutCart(data),
    mutationKey: cartKeys.checkout(),
    onSuccess: () => {
      toast.success('Checkout successful.')
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() })
    },
    onError: () => toast.error('Failed to checkout.'),
  })
}

export function useValidatePromocode() {
  return useMutation({
    mutationFn: ({ data }: { data: ValidatePromocodeRequest }) =>
      cartService.validatePromoCode(data),
    mutationKey: cartKeys.validatePromocode(),
    onSuccess: () => toast.success('Promocode validated successfully.'),
    onError: () => toast.error('Failed to validate promocode.'),
  })
}

export function useExtendReservation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ cartId }: { cartId: string }) => cartService.extendReservation(cartId),
    mutationKey: cartKeys.extendReservation('dynamic-id'), // replaced at runtime
    onSuccess: (_, cartId) => {
      toast.success('Reservation extended successfully.')
      queryClient.invalidateQueries({ queryKey: cartKeys.detail(cartId.cartId) })
    },
    onError: () => toast.error('Failed to extend reservation.'),
  })
}
