import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pin from "./pages/Pin";
import EmailOtp from "./pages/EmailOtp";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/otp" element={<Pin />} />
          <Route path="/email-otp" element={<EmailOtp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
