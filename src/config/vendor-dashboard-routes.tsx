import { LoadingFallback } from '@/components/loading-fallback'
import { Suspense, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { getRoutePath } from './get-route-path'

// Vendor routes
const ProfilePage = lazy(() => import('../pages/vendor/profile'))
const DiscoverPage = lazy(() => import('../pages/vendor/discover'))
const WishlistPage = lazy(() => import('../pages/vendor/wishlist'))
const VendorEventDetailsPage = lazy(() => import('../pages/vendor/discover/event-details'))
const SlotsPage = lazy(() => import('../pages/vendor/slots'))

export const vendor_dashboard_routes: RouteObject[] = [
  {
    path: getRoutePath('vendor_profile'),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProfilePage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath('vendor_discover'),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <DiscoverPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath('vendor_wishlist'),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <WishlistPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath('vendor_event_details', { eventId: ':eventId' }),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <VendorEventDetailsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath('vendor_slots'),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SlotsPage />
      </Suspense>
    ),
  }
]
