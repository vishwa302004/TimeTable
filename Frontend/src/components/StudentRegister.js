import React, { useState } from 'react';
import './StudentRegister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentRegister() {
  const navigate = useNavigate(); 
  const [role] = useState('Student'); // Role is fixed as student
  const [firstName, setFirstName] = useState(''); // First name state
  const [lastName, setLastName] = useState(''); // Last name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      const userResponse = await axios.post('http://localhost:8080/users/register', {
        role,
        email,
        password
      });
  
      if (userResponse.status === 200) {
        const studentResponse = await axios.post('http://localhost:8080/students', {
          firstName,
          lastName,
          email
        });
  
        if (studentResponse.status === 200) {
          setSuccess('Registration successful!');
          navigate('/login');
        }
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Server Error:', error.response.data);
        setError(`Registration failed: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // No response received
        console.error('No response received:', error.request);
        setError('No response received from server.');
      } else {
        // Other errors
        console.error('Error', error.message);
        setError('Registration failed. Please try again.');
      }
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Student Registration</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
          <button type="button" onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;
