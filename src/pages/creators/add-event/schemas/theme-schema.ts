import { z } from 'zod'

// Schema for theme selection
export const themeSchema = z.object({
  theme: z.enum(['1', '2', '3', '4'], {
    required_error: 'You need to select a theme.',
  }),
})

// Schema for banner images
export const bannerSchema = z.object({
  desktop: z.object({
    flyer: z.instanceof(File, { message: 'Please upload a flyer image.' }),
    background: z.instanceof(File, { message: 'Please upload a background image.' }),
  }),
  mobile: z.object({
    flyer: z.instanceof(File, { message: 'Please upload a flyer image.' }),
    background: z.instanceof(File, { message: 'Please upload a background image.' }),
  }),
})

// Combined schema for both theme and banner
export const themeAndBannerSchema = z.object({
  theme: themeSchema.shape.theme,
  banner: bannerSchema,
})

export const defaultThemeValues: z.infer<typeof themeSchema> = {
  theme: '1',
}

export const defaultBannerValues: z.infer<typeof bannerSchema> = {
  desktop: {
    flyer: undefined as any,
    background: undefined as any,
  },
  mobile: {
    flyer: undefined as any,
    background: undefined as any,
  },
}
