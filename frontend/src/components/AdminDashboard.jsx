import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [checkedInUsers, setCheckedInUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    /* Fetch the currently checked-in users
    -------------------------------------- */
    axios
      .get("http://localhost:3000/api/admin/checked-in")
      .then((response) => {
        setCheckedInUsers(response.data.users);
        setUserCount(response.data.count);
      })
      .catch((error) => {
        console.error("There was an error fetching checked-in users:", error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Currently Checked-In Users: {userCount}</h2>
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
            <tr key={index}>
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
