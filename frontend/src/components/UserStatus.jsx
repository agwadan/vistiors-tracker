import React, { useState } from 'react';
import axios from 'axios';

const UserStatus = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/user-status/${userId}`);
      setUser(response.data.user);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error fetching user status');
    }
  };

  return (
    <div>
      <h2>User Status</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Check Status</button>
      </form>
      {message && <p>{message}</p>}
      {user && (
        <div>
          <h3>User Info:</h3>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>PIN: {user.PIN}</p>
        </div>
      )}
    </div>
  );
};

export default UserStatus;
