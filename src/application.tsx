import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexLayout from "./layouts/root-layout";
import { routes } from "./config/routes";
import { user_dashboard_routes } from "./config/user-dashboard-routes";
import UserDashboardLayout from "./layouts/user-dashboard-layout";
import CreatorDashboardLayout from "./layouts/creator-dashboard-layout";
import { creator_dashboard_routes } from "./config/creator-dashboard-routes";

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
      </Routes>
    </Router>
  );
}
