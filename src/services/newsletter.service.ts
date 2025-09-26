import api from './http.service'

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
}

export default NewsletterService
