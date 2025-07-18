// User registration types
export interface UserRegisterData {
  firstName: string
  lastName: string
  email: string
  telphone: string
  gender: string
  dateOfBirth: string
  country: string
  state: string
  password: string
}

export interface VendorRegisterData {
  firstName: string
  lastName: string
  email: string
  telphone: string
  gender: string
  businessName: string
  vendorType: string
  category: string
  website: string
  password: string
}

export interface OrganizerRegisterData {
  firstName: string
  lastName: string
  email: string
  telphone: string
  gender: string
  companyName: string
  website: string
  password: string
}

// Login types
export interface LoginData {
  email: string
  password: string
}

// User type
export interface User {
  userId: string
  email: string
  accountType: 'User' | 'Vendor' | 'Organizer'
  profile: {
    firstName: string
    lastName: string
  }
  messages: number
  telphone?: string
  gender?: string
  dateOfBirth?: string
  country?: string
  state?: string
  businessName?: string
  vendorType?: string
  category?: string
  website?: string
  companyName?: string
  isEmailVerified?: boolean
  createdAt?: string
  updatedAt?: string
}

// API Response types
export interface AuthResponse {
  message: string
  userData: User
  token?: string
}

export interface LoginResponse {
  message: string
  userData: User
  token: string
}

export interface VerifyLoginResponse {
  message: string
  user: User
  token: string
}

export interface VerifyOtpResponse {
  message: string
  token: string
  user: User
  otp?: string
}

export interface ForgotPasswordResponse {
  message: string
  otp?: string
}

// Union type for all register data
export type RegisterData = UserRegisterData | VendorRegisterData | OrganizerRegisterData
