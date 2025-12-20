export interface VendorRegistration {
    firstName: string
    lastName: string
    category: string
    email: string
    businessName: string
    isRegistered: boolean
    description: string
}

export interface VendorCategory {
    value: string
    label: string
}

export const VENDOR_CATEGORIES: VendorCategory[] = [
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'merchandise', label: 'Merchandise & Apparel' },
    { value: 'art_crafts', label: 'Art & Crafts' },
    { value: 'beauty_wellness', label: 'Beauty & Wellness' },
    { value: 'entertainment', label: 'Entertainment Services' },
    { value: 'photography', label: 'Photography & Videography' },
    { value: 'technology', label: 'Technology & Electronics' },
    { value: 'other', label: 'Other' },
]
