import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import CheckIn from "./components/CheckIn";
import CheckOut from "./components/CheckOut";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul className="flex-x">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register User</Link>
            </li>
            <li>
              <Link to="/check-in">Check In</Link>
            </li>
            <li>
              <Link to="/check-out">Check Out</Link>
            </li>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* Routes for different components */}
        <Routes>
          <Route
            path="/"
            element={<h2>Welcome to the Visitor Clock-in System</h2>}
          />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
