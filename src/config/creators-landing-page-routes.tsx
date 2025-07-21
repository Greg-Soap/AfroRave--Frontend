import { LoadingFallback } from "@/components/loading-fallback";
import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { getRoutePath } from "./get-route-path";

const CreatorsHomePage = lazy(() => import("../pages/creators/home"));
const AboutUsPage = lazy(() => import("../pages/creators/about-us"));
const ContactUsPage = lazy(() => import("../pages/creators/contact-us"));
const CreatorsBlogPage = lazy(() => import("../pages/creators/blog"));

export const creator_landing_page_routes: RouteObject[] = [
  {
    path: getRoutePath("creators_home"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CreatorsHomePage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("creators_about"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AboutUsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("creators_contact"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ContactUsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("creators_blog"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CreatorsBlogPage />
      </Suspense>
    ),
  },
];
