import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { LoadingFallback } from "../components/loading-fallback";
import { getRoutePath } from "./get-route-path";
import AccountPage from "@/pages/account";

const LandingPage = lazy(() => import("../pages/landing-page"));
const EventsPage = lazy(() => import("../pages/event-page"));
const IndividualEventPage = lazy(
  () => import("../pages/event-page/individual-event")
);
const ResellPage = lazy(() => import("../pages/resell-page"));
const NotFoundPage = lazy(() => import("../pages/not-found"));
const AboutUsPage = lazy(() => import("../pages/about-us"));
const BlogPage = lazy(() => import("../pages/blog"));
const CreatorsPage = lazy(() => import("../pages/creators"));
const FaqPage = lazy(() => import("../pages/faq"));
const RefundPolicyPage = lazy(() => import("../pages/refund-policy"));
const WorkWithUsPage = lazy(() => import("../pages/work-with-us"));
const SupportPage = lazy(() => import("../pages/support"));
const ResaleMarketPlacePage = lazy(() => import("../pages/resale-marketplace"));
const IndividualResaleTicket = lazy(
  () => import("../pages/resale-marketplace/individual-resale-event")
);
const SellPage = lazy(() => import("../pages/sell"));
const TermsAndConditionPage = lazy(
  () => import("../pages/terms-and-condition")
);
const PrivacyPolicyPage = lazy(() => import("../pages/privacy-policy"));

export const routes: RouteObject[] = [
  {
    path: getRoutePath("home"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("events"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EventsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("individual_event", { eventId: ":eventId" }),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <IndividualEventPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("resell"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResellPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("about_us"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AboutUsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("blog"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <BlogPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("creators"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CreatorsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("faq"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FaqPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("refund_policy"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RefundPolicyPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("work_with_us"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <WorkWithUsPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("support"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SupportPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("resale"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResaleMarketPlacePage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("individual_resale", { eventId: ":eventId" }),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <IndividualResaleTicket />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("sell"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("terms_and_conditions"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TermsAndConditionPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("privacy_policy"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PrivacyPolicyPage />
      </Suspense>
    ),
  },
  {
    path: getRoutePath("account"),
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AccountPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];
