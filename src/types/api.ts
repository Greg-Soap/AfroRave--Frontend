// API Response Types
export interface ApiResponse<T> {
  message: string
  data: T
  cursor?: string
  id?: string
  status: boolean
  statusCode: number
}
