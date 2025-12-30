import api from './http.service'
import { VendorNewsletterData } from '@/types/vendor'

interface NewsletterRequest {
  email: string
}

interface NewsletterResponse {
  message: string
}

class NewsletterService {
  /**
   * Subscribe to newsletter
   */
  static subscribeToNewsletter(data: NewsletterRequest) {
    return api.post<NewsletterResponse>('/api/newsletter', data)
  }

  /**
   * Subscribe to vendor newsletter
   */
  static subscribeToVendorNewsletter(data: VendorNewsletterData) {
    return api.post<NewsletterResponse>('/api/Newsletter/vendors', data)
  }
}

export default NewsletterService
