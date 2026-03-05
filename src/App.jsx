import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PaymentPage from "./PaymentPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}