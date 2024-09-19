import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import CheckInOut from "./components/CheckInOut";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1>Visitor Clock-in System</h1>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register User</Link>
            </li>
            <li>
              <Link to="/check-in-out">Check In/Out</Link>
            </li>
            <li>
              <Link to="/user-status">User Status</Link>
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
          <Route path="/check-in-out" element={<CheckInOut />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
