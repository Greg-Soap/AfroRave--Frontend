import { lazy, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { LoadingFallback } from '../components/loading-fallback'

const LandingPage = lazy(() => import('../pages/landing-page'))
const EventsPage = lazy(() => import('../pages/event-page'))
const IndividualEventPage = lazy(() => import('../pages/event-page/individual-event'))
const ResellPage = lazy(() => import('../pages/resell-page'))
const NotFoundPage = lazy(() => import('../pages/not-found'))
const AboutUsPage = lazy(() => import('../pages/about-us'))
const BlogPage = lazy(() => import('../pages/blog'))
const CreatorsPage = lazy(() => import('../pages/creators'))
const FaqPage = lazy(() => import('../pages/faq'))
const RefundPolicyPage = lazy(() => import('../pages/refund-policy'))
const WorkWithUsPage = lazy(() => import('../pages/work-with-us'))
const SupportPage = lazy(() => import('../pages/support'))
const ResaleMarketPlacePage = lazy(() => import('../pages/resale-marketplace'))
const IndividualResaleTicket = lazy(
  () => import('../pages/resale-marketplace/individual-resale-event'),
)
const SellPage = lazy(() => import('../pages/sell'))
const TermsAndConditionPage = lazy(() => import('../pages/terms-and-condition'))
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy'))

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
    path: '/about-us',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AboutUsPage />
      </Suspense>
    ),
  },
  {
    path: '/blog',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <BlogPage />
      </Suspense>
    ),
  },
  {
    path: '/creators',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CreatorsPage />
      </Suspense>
    ),
  },
  {
    path: '/faq',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FaqPage />
      </Suspense>
    ),
  },
  {
    path: '/refund-policy',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RefundPolicyPage />
      </Suspense>
    ),
  },
  {
    path: '/work-with-us',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <WorkWithUsPage />
      </Suspense>
    ),
  },
  {
    path: '/support',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SupportPage />
      </Suspense>
    ),
  },
  {
    path: '/resale',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResaleMarketPlacePage />
      </Suspense>
    ),
  },
  {
    path: '/resale/:eventId',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <IndividualResaleTicket />
      </Suspense>
    ),
  },
  {
    path: '/sell',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellPage />
      </Suspense>
    ),
  },
  {
    path: '/terms-and-conditions',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TermsAndConditionPage />
      </Suspense>
    ),
  },
  {
    path: '/privacy-policy',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PrivacyPolicyPage />
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
