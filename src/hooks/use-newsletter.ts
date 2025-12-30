import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import NewsletterService from '@/services/newsletter.service'

interface NewsletterData {
  email: string
}

export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: (data: NewsletterData) => NewsletterService.subscribeToNewsletter(data),
    onSuccess: (response) => {
      toast.success(response.data.message || 'Successfully subscribed to Afro Revive!')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to subscribe to Afro Revive. Please try again.'
      toast.error(errorMessage)
    },
  })
}

export function useVendorNewsletterSubscription() {
  return useMutation({
    mutationFn: (data: any) => NewsletterService.subscribeToVendorNewsletter(data),
    onSuccess: (response) => {
      toast.success(response.data.message || 'Successfully joined the vendor wishlist!')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to join vendor wishlist. Please try again.'
      toast.error(errorMessage)
    },
  })
}
