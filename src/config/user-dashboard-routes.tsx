import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { LoadingFallback } from "@/components/loading-fallback";
import { UserAuthGuard } from "@/components/auth/user-auth-guard";
import { getRoutePath } from "./get-route-path";

const AccountPage = lazy(() => import("../pages/fans/account"));
const SettingsPage = lazy(() => import("../pages/fans/settings")); // Added import
const MyTicketsPage = lazy(() => import("../pages/fans/my-tickets"));
const IndividualActiveTicketsPage = lazy(
  () => import("../pages/fans/my-tickets/individual-active-tickets")
);
const ListedTicketPage = lazy(() => import("../pages/fans/listed-tickets"));

export const user_dashboard_routes: RouteObject[] = [
  {
    path: getRoutePath("account"),
    element: (
      <UserAuthGuard>
        <Suspense fallback={<LoadingFallback />}>
          <AccountPage />
        </Suspense>
      </UserAuthGuard>
    ),
  },
  {
    path: getRoutePath("settings"),
    element: (
      <UserAuthGuard>
        <Suspense fallback={<LoadingFallback />}>
          <SettingsPage />
        </Suspense>
      </UserAuthGuard>
    ),
  },
  {
    path: getRoutePath("my_tickets"),
    element: (
      <UserAuthGuard>
        <Suspense fallback={<LoadingFallback />}>
          <MyTicketsPage />
        </Suspense>
      </UserAuthGuard>
    ),
  },
  {
    path: getRoutePath("active_tickets", { eventId: ":eventId" }),
    element: (
      <UserAuthGuard>
        <Suspense fallback={<LoadingFallback />}>
          <IndividualActiveTicketsPage />
        </Suspense>
      </UserAuthGuard>
    ),
  },
  {
    path: getRoutePath("listed_tickets"),
    element: (
      <UserAuthGuard>
        <Suspense fallback={<LoadingFallback />}>
          <ListedTicketPage />
        </Suspense>
      </UserAuthGuard>
    ),
  },
];
