import { z } from 'zod'

const themeSchema = z.object({
  theme: z.enum(['default', 'with-flyer', 'standard-carousel'], {
    required_error: 'You need to select a theme.',
  }),
})

const bannerSchema = z.object({
  flyer: z.string().optional(),
  background: z.string().optional(),
})

export const themeAndBannerSchema = z.object({
  theme: themeSchema.shape.theme,
  banner: bannerSchema,
})

export type ThemeAndBannerSchema = z.infer<typeof themeAndBannerSchema>
