import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCourse.css'; // Import the CSS file

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [gradeId, setGradeId] = useState('');
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://localhost:8080/grades');
        setGrades(response.data);
      } catch (err) {
        setError('Error fetching grades');
        console.error(err);
      }
    };

    fetchGrades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = {
      name: courseName,
      description: courseDescription,
      grade: { id: gradeId },
    };

    try {
      const response = await axios.post('http://localhost:8080/courses', newCourse);
      console.log('Course added successfully:', response.data);
      setCourseName('');
      setCourseDescription('');
      setGradeId('');
    } catch (err) {
      setError('Error adding course');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="add-course-form">
        <h2>Add Course</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Course Description</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Grade</label>
            <select
              value={gradeId}
              onChange={(e) => setGradeId(e.target.value)}
              required
            >
              <option value="">Select Grade</option>
              {grades.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add Course</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
