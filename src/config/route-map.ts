/**
 * A constant map of all available routes in the application.
 * Each key represents a route identifier in snake_case format,
 * and each value represents the actual URL path.
 *
 * @example
 * ```ts
 * ROUTE_PATHS.home // '/'
 * ROUTE_PATHS.individual_event // '/events/:eventId'
 * ```
 */
export const ROUTE_PATHS = {
  home: "/",
  events: "/events",
  individual_event: "/events/:eventId",
  resell: "/resell",
  about_us: "/about-us",
  blog: "/blog",
  creators: "/creators",
  faq: "/faq",
  refund_policy: "/refund-policy",
  work_with_us: "/work-with-us",
  support: "/support",
  resale: "/resale",
  individual_resale: "/resale/:eventId",
  sell: "/sell",
  terms_and_conditions: "/terms-and-conditions",
  privacy_policy: "/privacy-policy",
  account: "/account",
  my_tickets: "/my-tickets",
  active_tickets: "/my-tickets/:eventId",
  listed_tickets: "/listed-tickets",
  standalone: "/standalone",
  season: "/season",
  reports: "/reports",
  charts: "/charts",
  realtime: "/realtime",
  revenue_vendor: "/revenue-vendor",
  revenue_vendor_slot: "/revenue-vendor/:slotId",
  service_vendor: "/service-vendor",
  individual_service_vendor: "/service-vendor/:serviceId",
  access_control: "/access-control",
  promo_codes: "/promo-codes",
  seating_maps: "/seating-maps",
  not_found: "*",
} as const;

/**
 * Type representing all valid route keys from ROUTE_PATHS.
 * Used for type-safe route access throughout the application.
 */
export type RouteKey = keyof typeof ROUTE_PATHS;

/**
 * Interface defining the required parameters for each route.
 * Routes that don't require parameters are marked with `never`.
 * Routes with dynamic segments (like :eventId) require corresponding parameters.
 *
 * @example
 * ```ts
 * // No parameters needed
 * RouteParams.home // never
 *
 * // Parameters required
 * RouteParams.individual_event // { eventId: string | number }
 * ```
 */
export interface RouteParams {
  home: never;
  events: never;
  individual_event: { eventId: string | number };
  resell: never;
  about_us: never;
  blog: never;
  creators: never;
  faq: never;
  refund_policy: never;
  work_with_us: never;
  support: never;
  resale: never;
  individual_resale: { eventId: string | number };
  sell: never;
  terms_and_conditions: never;
  privacy_policy: never;
  account: never;
  my_tickets: never;
  active_tickets: { eventId: string | number };
  listed_tickets: never;
  standalone: never;
  season: never;
  reports: never;
  charts: never;
  realtime: never;
  revenue_vendor: never;
  revenue_vendor_slot: { slotId: string | number };
  service_vendor: never;
  individual_service_vendor: { serviceId: string | number };
  access_control: never;
  promo_codes: never;
  seating_maps: never;
  not_found: never;
}
