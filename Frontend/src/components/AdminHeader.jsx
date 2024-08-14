import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logoAdmin.jpeg'; // Replace with your logo image path

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/login');
  };

  return (
    <div className="timetable-management">
      <header className="header">
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <div className="logo-text">E-Timetable Management</div>
        </div>
        <div className="auth-links">
          <Link to="/StudentRegister" className="auth-link">Student Register</Link>
          <Link to="/login" className="auth-link">Login</Link>
        </div>
      </header>
      <main className="main-content">
        <h1>Effortless schedules, organized learning.</h1>
        <p>Elevate your education journey with our Timetable Management System.</p>
        <button className="explore-button" onClick={handleExploreClick}>Explore now!</button>
        <section className="empower-section">
          <center><h2>Empowering Education with Smart Timetables</h2></center>
          <p>Welcome to the University Timetable Management System, where organization meets efficiency. Our platform streamlines the complex task of scheduling courses, managing resources, and facilitating collaboration among faculty and students. With intuitive features and user-friendly interfaces, we empower educational institutions to optimize their timetables with ease.</p>
        </section>
      </main>
    </div>
  );
};

export default AdminHeader;
