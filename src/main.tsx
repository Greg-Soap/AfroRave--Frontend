import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from './components/error-boundary.tsx'
import './index.css'
import Application from './application.tsx'
import { WishlistProvider } from './contexts/wishlist-context.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <WishlistProvider>
          <Application />
        </WishlistProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
