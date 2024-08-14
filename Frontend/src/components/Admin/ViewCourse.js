import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateCourse from './UpdateCourse'; // Import the UpdateCourse component

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/courses');
        setCourses(response.data);
      } catch (err) {
        setError('Error fetching courses');
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const updateCourse = async (id, updatedCourse) => {
    try {
      const response = await axios.put(`http://localhost:8080/courses/${id}`, updatedCourse);
      setCourses(courses.map((course) => (course.id === id ? response.data : course)));
      setEditingCourse(null);
    } catch (err) {
      setError('Error updating course');
      console.error(err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/courses/${id}`);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      setError('Error deleting course');
      console.error(err);
    }
  };

  const handleUpdateClick = (course) => {
    setEditingCourse(course);
  };

  const handleUpdate = (id, updatedCourse) => {
    updateCourse(id, updatedCourse);
  };

  const handleCancelUpdate = () => {
    setEditingCourse(null);
  };

  return (
    <div>
      <div>
        <center><h1>All Courses</h1></center>
        {error && <p>{error}</p>}
        {editingCourse && (
          <UpdateCourse
            course={editingCourse}
            onUpdate={handleUpdate}
            onCancel={handleCancelUpdate}
          />
        )}
        <table>
          <thead>
            <tr>
              <th>Course Id</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {courses.map((course) => (
    <tr key={course.id}>
      <td>{course.id}</td>
      <td>{course.name}</td>
      <td>{course.description}</td>
      <td>{course.grade.name}</td>
      <td>
        <button onClick={() => handleUpdateClick(course)}>Update</button>
        <button onClick={() => deleteCourse(course.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCourse;
