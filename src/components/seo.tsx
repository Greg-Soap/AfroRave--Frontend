import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  twitterCard?: string
}

export function SEO({
  title,
  description,
  keywords = 'African concerts, concert tickets, African music events, live performances, African artists, event tickets, African entertainment, music festivals',
  ogImage = '/assets/landing-page/logo.png',
  ogUrl = 'https://afro-revive-frontend.vercel.app',
  ogType = 'website',
  twitterCard = 'summary_large_image',
}: SEOProps) {
  try {
    return (
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name='title' content={title} />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content={ogType} />
        <meta property='og:url' content={ogUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={ogImage} />

        {/* Twitter */}
        <meta property='twitter:card' content={twitterCard} />
        <meta property='twitter:url' content={ogUrl} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta property='twitter:image' content={ogImage} />
      </Helmet>
    )
  } catch (error) {
    console.error('Error in SEO component:', error)
    return null
  }
}
