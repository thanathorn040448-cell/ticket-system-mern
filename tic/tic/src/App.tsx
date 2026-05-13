import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';


import { Home } from './pages/Home';
import { Login, Signup } from './pages/Auth';
import { SeatSelection } from './pages/SeatSelection';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';
import { Artists } from './pages/Artists';
import { Profile } from './pages/Profile';
import { TicketHistory } from './pages/TicketHistory';
import { Concerts } from './pages/Concerts'

import { AdminEvents } from "./pages/AdminEvents";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";


const AppContent = () => {

  const location = useLocation();
  const { user } = useAuth();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (

    <div className="flex flex-col min-h-screen">

      {!isAuthPage && <Header />}

      <main className="flex-grow">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/artists" element={<Artists />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/tickets" element={<TicketHistory />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/select-seats/:id" element={<SeatSelection />} />

          <Route path="/checkout/:id" element={<Checkout />} />

          <Route path="/confirmation" element={<Confirmation />} />

          <Route path="/concerts" element={<Concerts />} />

          <Route path="/events/:id/seats" element={<SeatSelection />} />
          <Route
            path="/admin/events"
            element={
              user?.role === "admin"
                ? <AdminEvents />
                : <Navigate to="/" />
            }
          />



        </Routes>

      </main>

      {!isAuthPage && <Footer />}

    </div>

  );
};

export default function App() {

  return (

    <Router>

      <AppContent />

    </Router>

  );

}