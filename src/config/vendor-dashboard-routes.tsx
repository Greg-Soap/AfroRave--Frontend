import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { LoadingFallback } from "@/components/loading-fallback";
import { getRoutePath } from "./get-route-path";

const StandalonePage = lazy(() => import("../pages/standalone"));

export const vendor_dashboard_routes: RouteObject[] = [
  {
    path: getRoutePath("standalone"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <StandalonePage />
      </Suspense>
    ),
  },
];
