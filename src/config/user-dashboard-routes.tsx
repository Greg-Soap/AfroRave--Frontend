import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { LoadingFallback } from "@/components/loading-fallback";
import { getRoutePath } from "./get-route-path";

const AccountPage = lazy(() => import("../pages/fans/account"));
const MyTicketsPage = lazy(() => import("../pages/fans/my-tickets"));
const IndividualActiveTicketsPage = lazy(
  () => import("../pages/fans/my-tickets/individual-active-tickets")
);
const ListedTicketPage = lazy(() => import("../pages/fans/listed-tickets"));

export const user_dashboard_routes: RouteObject[] = [
  {
    path: getRoutePath("account"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AccountPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("my_tickets"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MyTicketsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("active_tickets", { eventId: ":eventId" }),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <IndividualActiveTicketsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("listed_tickets"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ListedTicketPage />
      </Suspense>
    ),
  },
];
