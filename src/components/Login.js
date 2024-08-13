import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://company-search-engine-backend.onrender.com/api/auth/login', { username, password });
      setToken(res.data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.response.data.message || 'Login failed');
      console.error("Login failed:", err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Login
          </button>
          <div>
            <p>
                  New User?{' '}
                  <Link to="/register" className="text-blue-500 hover:underline">
                      Register Now
                  </Link>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
