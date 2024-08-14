import React, { useState } from 'react';
import axios from 'axios';
import './AddGrade.css';

const AddGrade = () => {
  const [gradeName, setGradeName] = useState('');
  const [gradeDescription, setGradeDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/grades', {
  
        name: gradeName,
        description: gradeDescription,
      });
      console.log('Grade added successfully:', response.data);

      // Clear the form fields
      setGradeName('');
      setGradeDescription('');
    } catch (error) {
      console.error('There was an error adding the grade!', error);
    }
  };

  return (
    <div className="add-grade-form">
      <h2>Add Grade</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gradeName">Grade Name</label>
          <input
            type="text"
            id="gradeName"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            placeholder="Enter grade name..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gradeDescription">Grade Description</label>
          <textarea
            id="gradeDescription"
            value={gradeDescription}
            onChange={(e) => setGradeDescription(e.target.value)}
            placeholder="Enter grade description..."
            required
          />
        </div>
        <button type="submit">Add Grade</button>
      </form>
    </div>
  );
};

export default AddGrade;
