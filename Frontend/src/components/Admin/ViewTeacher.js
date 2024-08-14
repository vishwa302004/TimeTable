import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewTeacher.css';

const ViewTeacher = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch teachers from the backend
    axios.get('http://localhost:8080/teachers')
      .then(response => {
        setTeachers(response.data); // Set the fetched data to state
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  }, []);

  const handleDelete = (id, email) => {
    // Delete the teacher by ID
    axios.delete(`http://localhost:8080/teachers/${id}`)
      .then(() => {
        // Remove the deleted teacher from the state
        setTeachers(teachers.filter(teacher => teacher.id !== id));

        // After deleting the teacher, delete the corresponding user by email
        axios.delete(`http://localhost:8080/users/${email}`)
          .then(() => {
            console.log('User deleted successfully');
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting teacher:', error);
      });
  };

  return (
    <div>
      <center><h1>Teacher Management</h1></center>
      <div className="teacher-table">
        <center><h2>All Teachers</h2></center>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Phone No</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.address}</td>
                <td>
                  <button onClick={() => handleDelete(teacher.id, teacher.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTeacher;
