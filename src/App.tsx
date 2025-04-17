import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import IndexLayout from "./layouts/index-layout";
import EventsPage from "./pages/event-page";
import IndividualEventPage from "./pages/individual-event";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<IndexLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:eventId" element={<IndividualEventPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
