import React, { useState } from "react";
import axios from "axios";
import fingerScan from "../assets/fingerprint-scan.gif";

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

      setMessage(
        `${name} registered successfully. This is the user ID: ${response.data.userId}`
      );
    } catch (error) {
      setMessage("Error registering user");
    }
  };

  return (
    <div className="register">
      <h2>Register User</h2>
      <div className="grid-2 ">
        <div className="finger-scanner">
          <h3>Place your finger on the scanner</h3>
          <img src={fingerScan} />
        </div>
        <div className="check">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="PIN">PIN</label>
              <input
                type="password"
                placeholder="PIN"
                name="PIN"
                value={PIN}
                onChange={(e) => setPIN(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
