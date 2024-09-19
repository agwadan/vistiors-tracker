// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [checkedInUsers, setCheckedInUsers] = useState([]);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);

  useEffect(() => {
    // Fetch the admin dashboard data
    axios
      .get("http://localhost:3000/api/admin/dashboard")
      .then((response) => {
        setCheckedInUsers(response.data.checkedInUsers);
        setCheckedInCount(response.data.checkedInCount);
        setCheckedOutCount(response.data.checkedOutCount);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  const getRowStyle = (index) => ({
    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff", // Alternating colors
  });

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="cards flex-x">
        <div className="card">
          <h2> {checkedInCount}</h2>
          <h3>Checked-In Users</h3>
        </div>
        <div className="card">
          <h2>{checkedOutCount}</h2>
          <h3>Checkouts </h3>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Entry Time</th>
          </tr>
        </thead>
        <tbody>
          {checkedInUsers.map((user, index) => (
            <tr key={index} style={getRowStyle(index)}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{new Date(user.entry_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
