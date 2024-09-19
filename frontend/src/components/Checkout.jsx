import React, { useState } from "react";
import axios from "axios";

const CheckInOut = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/check-in",
        {
          userId,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error during check-in/out");
    }
  };

  return (
    <div>
      <h2>Check Out</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckInOut;
