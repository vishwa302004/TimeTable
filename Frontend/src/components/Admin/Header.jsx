import React,{useEffect} from 'react';
import './Header.css';
import { Link, useNavigate  } from 'react-router-dom';
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
          <li><Link to="/admin">Main</Link></li>
          <li><Link to="/grades/viTimeTable">View Timetable</Link></li>
          <li><Link to="/grades/addGrade">Add Grade</Link></li>
          <li><Link to="/grades/viewGrade">View Grades</Link></li>
          <li><Link to="/grades/addCourse">Add Course</Link></li>
          <li><Link to="/grades/viewCourse">View Courses</Link></li>
          <li><Link to="/grades/addBatch">Add Batch</Link></li>
          <li><Link to="/grades/viewBatch">View Batches</Link></li>
          <li><Link to="/grades/addTeacher">Register Teacher</Link></li>
          <li><Link to="/grades/viewTeacher">View Teachers</Link></li>
          <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
