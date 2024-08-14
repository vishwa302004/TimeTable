import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); 
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users/authenticate', {
        email,
        password,
        role
      });

      if (response.status === 200) {
        // Assume the backend sends { token: "your-jwt-token" }
        localStorage.setItem('token', response.data.token); // Store the token

        // Redirect based on role
        if (role === 'student') {
          localStorage.setItem('studentEmail', email); // Store the student email if needed
          navigate('/student');
        } else if (role === 'admin') {
          navigate('/admin');
        } else {
          setError('Invalid role.');
        }
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>User Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form>
          <div className="form-group">
            <label htmlFor="role">User Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
