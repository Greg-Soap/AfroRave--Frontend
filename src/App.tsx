import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/custom/footer";
import LandingPage from "./pages/landing-page";
import Header from "./components/custom/header";
import TicketPage from "./pages/ticket-page";

function App() {
  return (
    <Router>
      <Header />

      <main className="w-full flex flex-col items-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tickets" element={<TicketPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
