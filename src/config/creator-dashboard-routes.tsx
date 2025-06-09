import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { LoadingFallback } from "@/components/loading-fallback";
import { getRoutePath } from "./get-route-path";

const StandalonePage = lazy(() => import("../pages/standalone"));
const RevenueVendorPage = lazy(() => import("../pages/vendor/revenue-vendor"));
const IndividualSlotsPage = lazy(
  () => import("../pages/vendor/revenue-vendor/individual-slot")
);
const ServiceVendorPage = lazy(() => import("../pages/vendor/service-vendors"));
const IndividualServicePage = lazy(
  () => import("../pages/vendor/service-vendors/individual-service")
);
const AccessControlPage = lazy(() => import("../pages/access-control"));
const PromoCodesPage = lazy(() => import("../pages/promo-codes"));

export const creator_dashboard_routes: RouteObject[] = [
  {
    path: getRoutePath("standalone"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <StandalonePage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("revenue_vendor"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RevenueVendorPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("revenue_vendor_slot", { slotId: ":slotId" }),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <IndividualSlotsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("service_vendor"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ServiceVendorPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("individual_service_vendor", {
      serviceId: ":serviceId",
    }),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <IndividualServicePage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("access_control"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AccessControlPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("promo_codes"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PromoCodesPage />
      </Suspense>
    ),
  },
];
