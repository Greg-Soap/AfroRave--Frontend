import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexLayout from "./layouts/root-layout";
import { routes } from "./config/routes";
// import AccountLayout from "./layouts/account-layout";

export default function Application() {
  return (
    <Router>
      <Routes>
        <Route element={<IndexLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
