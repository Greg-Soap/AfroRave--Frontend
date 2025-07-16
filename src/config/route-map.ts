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
  // Landing page routes
  home: "/",
  events: "/events",
  individual_event: "/events/:eventId",
  resell: "/resell",
  about_us: "/about-us",
  blog: "/blog",
  creators: "/creators",
  faq: "/support/faq",
  refund_policy: "/refund-policy",
  work_with_us: "/work-with-us",
  support: "/support",
  resale: "/resale",
  individual_resale: "/resale/:eventId",
  sell: "/sell",
  terms_and_conditions: "/terms-and-conditions",
  privacy_policy: "/privacy-policy",
  not_found: "*",

  // User dashboard routes
  account: "/fans/account",
  my_tickets: "/fans/my-tickets",
  active_tickets: "/fans/my-tickets/:eventId",
  listed_tickets: "/fans/listed-tickets",

  // Creator dashboard routes
  standalone: "/creators/standalone",
  season: "/creators/season",
  reports: "/creators/reports",
  charts: "/creators/charts",
  realtime: "/creators/realtime",
  promo_codes: "/creators/promo-codes",
  edit_event: "/creators/edit/:eventId",
  add_event: "/creators/add-event",
  access_control: "/creators/access-control",
  revenue_vendor: "/creators/revenue-vendor",
  creator_not_found: "/creators/*",

  // Vendor dashboard routes
  revenue_vendor_slot: "/vendor/revenue-vendor/:slotId",
  service_vendor: "/vendor/service-vendor",
  individual_service_vendor: "/vendor/service-vendor/:serviceId",
  seating_maps: "/vendor/seating-maps",
  vendor_not_found: "/vendor/*",
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
  not_found: never;

  // User dashboard routes
  account: never;
  my_tickets: never;
  active_tickets: { eventId: string | number };
  listed_tickets: never;

  // Creator dashboard routes
  standalone: never;
  season: never;
  reports: never;
  charts: never;
  realtime: never;
  promo_codes: never;
  edit_event: { eventId: string | number };
  add_event: never;
  access_control: never;
  seating_maps: never;
  creator_not_found: never;

  // Vendor dashboard routes
  service_vendor: never;
  revenue_vendor: never;
  individual_service_vendor: { serviceId: string | number };
  revenue_vendor_slot: { slotId: string | number };
  vendor_not_found: never;
}
