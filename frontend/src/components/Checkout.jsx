import React, { useState } from "react";
import axios from "axios";

const CheckInOut = () => {
  const [userId, setUserId] = useState("");
  const [userPIN, setUserPIN] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/check-in",
        {
          userId,
          userPIN,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error during check-in/out");
    }
  };

  return (
    <div className="check">
      <h2>Check Out</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="PIN">PIN</label>
          <input
            type="password"
            name="PIN"
            placeholder="PIN"
            value={userPIN}
            onChange={(e) => setUserPIN(e.target.value)}
            required
          />
        </div>
        <button type="submit">Check Out</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckInOut;
