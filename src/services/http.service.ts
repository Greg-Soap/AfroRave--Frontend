import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'

export const multipartHeaders = {
  headers: { 'Content-Type': 'multipart/form-data' },
}

const apiUrl =
  process.env.NODE_ENV === 'development' ? process.env.VITE_API_DEV : process.env.VITE_API_PROD

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'X-Device-Type': 'web',
    'Access-Control-Allow-Origin': '*',
    tokenId: process.env.TOKEN_ID,
  },
  withCredentials: true,
})

api.interceptors.request.use(
  (req) => {
    if (req.url?.includes('login') || req.url?.includes('register')) return req

    // Get token from auth store
    const token = useAuthStore.getState().token

    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  },
  (err) => {
    Promise.reject(err)
  },
)

export default api
