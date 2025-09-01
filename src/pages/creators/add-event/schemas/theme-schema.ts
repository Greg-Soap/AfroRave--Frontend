import { z } from 'zod'

const themeSchema = z.object({
  theme: z.enum(['default', 'with-flyer', 'standard-carousel'], {
    required_error: 'You need to select a theme.',
  }),
})

const bannerSchema = z.object({
  flyer: z.instanceof(File, { message: 'Please upload a flyer image.' }).optional(),
  background: z.instanceof(File, { message: 'Please upload a background image.' }).optional(),
})

export const themeAndBannerSchema = z.object({
  theme: themeSchema.shape.theme,
  banner: bannerSchema,
})
