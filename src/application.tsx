import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { creator_dashboard_routes } from './config/creator-dashboard-routes'
import { getRoutePath } from './config/get-route-path'
import { routes } from './config/routes'
import { support_routes } from './config/support-routes'
import { user_dashboard_routes } from './config/user-dashboard-routes'
import { OrganizerAuthGuard } from './components/auth/organizer-auth-guard'
import { LoadingFallback } from './components/loading-fallback'
import CreatorDashboardLayout from './layouts/creator-dashboard-layout'
import IndexLayout from './layouts/root-layout'
import SupportLayout from './layouts/support-layout'
import UserDashboardLayout from './layouts/user-dashboard-layout'

const EditEventPage = lazy(() => import('./pages/creators/edit-event'))
const AddEventPage = lazy(() => import('./pages/creators/add-event'))

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

export default function Application() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<IndexLayout />}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route element={<UserDashboardLayout />}>
            {user_dashboard_routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route element={<CreatorDashboardLayout />}>
            {creator_dashboard_routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route element={<SupportLayout />}>
            {support_routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route
            path={getRoutePath('edit_event', { eventId: ':eventId' })}
            element={
              <OrganizerAuthGuard>
                <Suspense fallback={<LoadingFallback />}>
                  <EditEventPage />
                </Suspense>
              </OrganizerAuthGuard>
            }
          />

          <Route 
            path={getRoutePath('add_event')} 
            element={
              <OrganizerAuthGuard>
                <Suspense fallback={<LoadingFallback />}>
                  <AddEventPage />
                </Suspense>
              </OrganizerAuthGuard>
            } 
          />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position='top-right' richColors closeButton duration={4000} />
    </QueryClientProvider>
  )
}
