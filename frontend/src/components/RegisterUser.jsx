import React, { useState } from "react";
import axios from "axios";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [PIN, setPIN] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        { name, PIN }
      );
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      alert(`${name} registered successfully`);
    } catch (error) {
      setMessage("Error registering user");
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="PIN"
          value={PIN}
          onChange={(e) => setPIN(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
