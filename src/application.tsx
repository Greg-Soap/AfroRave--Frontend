import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexLayout from "./layouts/root-layout";
import { routes } from "./config/routes";
import { user_dashboard_routes } from "./config/user-dashboard-routes";
import UserDashboardLayout from "./layouts/user-dashboard-layout";
import CreatorDashboardLayout from "./layouts/creator-dashboard-layout";
import { creator_dashboard_routes } from "./config/creator-dashboard-routes";
import { getRoutePath } from "./config/get-route-path";
import { lazy } from "react";
import SupportLayout from "./layouts/support-layout";
import { support_routes } from "./config/support-routes";

const EditEventPage = lazy(() => import("./pages/creators/edit-event"));
const AddEventPage = lazy(() => import("./pages/creators/add-event"));

export default function Application() {
  return (
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
          path={getRoutePath("edit_event", { eventId: ":eventId" })}
          element={<EditEventPage />}
        />

        <Route path={getRoutePath("add_event")} element={<AddEventPage />} />
      </Routes>
    </Router>
  );
}
