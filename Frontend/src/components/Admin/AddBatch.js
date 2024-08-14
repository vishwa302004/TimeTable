import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCourse.css'; // Reuse the same CSS file

const AddBatch = () => {
  const [batchName, setBatchName] = useState('');
  const [batchDescription, setBatchDescription] = useState('');
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
    setError(null); // Reset error state before making request

    const newBatch = {
      name: batchName,
      description: batchDescription,
      grade: { id: gradeId },
      timetable: 'Upload Time Table', // Default timetable value
    };

    try {
      const response = await axios.post('http://localhost:8080/batches', newBatch);
      console.log('Batch added successfully:', response.data);
      setBatchName('');
      setBatchDescription('');
      setGradeId('');
    } catch (err) {
      setError('Error adding batch');
      console.error('Error response:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <div className="add-course-form"> {/* Apply the same styles */}
        <h2>Add Batch</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Batch Name</label>
            <input
              type="text"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Batch Description</label>
            <textarea
              value={batchDescription}
              onChange={(e) => setBatchDescription(e.target.value)}
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
          <button type="submit">Add Batch</button>
        </form>
      </div>
    </div>
  );
};

export default AddBatch;
