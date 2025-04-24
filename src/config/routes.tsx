import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { LoadingFallback } from '../components/loading-fallback'

const LandingPage = lazy(() => import('../pages/landing-page'))
const EventsPage = lazy(() => import('../pages/event-page'))
const IndividualEventPage = lazy(() => import('../pages/individual-event'))
const ResellPage = lazy(() => import('../pages/resell-page'))
const NotFoundPage = lazy(() => import('../pages/not-found'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: '/events',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EventsPage />
      </Suspense>
    ),
  },
  {
    path: '/events/:eventId',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <IndividualEventPage />
      </Suspense>
    ),
  },
  {
    path: '/resell',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResellPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]
