import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCourse = ({ course, onUpdate, onCancel }) => {
  const [name, setName] = useState(course.name);
  const [description, setDescription] = useState(course.description);
  const [gradeId, setGradeId] = useState(course.grade.id);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://localhost:8080/grades');
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedGrade = grades.find((grade) => grade.id === parseInt(gradeId));

    if (selectedGrade) {
      onUpdate(course.id, { name, description, grade: selectedGrade });
    } else {
      console.error('Invalid grade selected');
    }
  };

  return (
    <div className="update-course-form">
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCourse;
