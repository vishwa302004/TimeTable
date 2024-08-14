import React,{useEffect} from 'react';
import './Header.css';
import { Link,useNavigate } from 'react-router-dom';
import logoAdmin from '../../assets/images/logoAdmin.jpeg'
const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if token is not found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Navigate to the login page after logout
  };
  return (
    <header className="header">
      <div className="logo">
        <img src={logoAdmin} alt="Logo" />
       
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/student">Main</Link></li>
          <li><Link to="/student/viewTimeTable">Timetable</Link></li>
          <li><Link to="/student/UpdateProfile">Update Profile</Link></li>
          <li><Link to="/student/PersonalDetail">My Profile</Link></li>
          <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
