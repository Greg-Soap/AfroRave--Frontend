import { z } from 'zod'

export const vendorRegistrationSchema = z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must not exceed 50 characters'),
    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must not exceed 50 characters'),
    category: z.string().min(1, 'Please select a category'),
    email: z.string().email('Please enter a valid email address'),
    businessName: z
        .string()
        .min(2, 'Business name must be at least 2 characters')
        .max(100, 'Business name must not exceed 100 characters'),
    isRegistered: z.boolean(),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must not exceed 500 characters'),
})

export type VendorRegistrationFormData = z.infer<typeof vendorRegistrationSchema>
