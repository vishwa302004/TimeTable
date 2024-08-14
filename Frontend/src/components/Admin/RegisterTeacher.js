import React, { useState } from 'react';
import axios from 'axios';
import './RegisterTeacher.css';

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNo: '',
    street: '',
    city: '',
    pincode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a teacher object
    const newTeacher = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.contactNo,
      address: `${formData.street}, ${formData.city}, ${formData.pincode}`,
      role: 'Admin' // Assign the role as "Admin"
    };

    try {
      // Send a POST request to the backend to register the teacher
      const teacherResponse = await axios.post('http://localhost:8080/teachers', newTeacher);
      console.log('Teacher registered successfully:', teacherResponse.data);

      // After the teacher is successfully registered, register the user in the UserController
      const newUser = {
        email: formData.email,
        password: formData.password,
        role: 'Admin' // Role as "Admin"
      };

      const userResponse = await axios.post('http://localhost:8080/users/register', newUser);
      console.log('User registered successfully:', userResponse.data);

      // Clear the form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNo: '',
        street: '',
        city: '',
        pincode: ''
      });
    } catch (error) {
      console.error('Error registering teacher or user:', error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register Here!!!</h2>
        <div className="register-form-group">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="register-form-group">
          <input type="email" name="email" placeholder="Email Id" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="register-form-group">
          <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
        </div>
        <div className="register-form-group">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
        </div>
        <button type="submit" className="register-button">Register User</button>
      </form>
    </div>
  );
};

export default RegisterTeacher;
