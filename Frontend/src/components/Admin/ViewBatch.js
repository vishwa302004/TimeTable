import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewBatch.css';

const ViewBatch = () => {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/batches');
        setBatches(response.data);
      } catch (err) {
        setError('Error fetching batches');
        console.error(err);
      }
    };

    fetchBatches();
  }, []);

  const handleUpdate = (batch) => {
    const updatedName = prompt('Enter new name:', batch.name);
    const updatedDescription = prompt('Enter new description:', batch.description);
    const updatedGradeId = prompt('Enter new grade ID:', batch.grade.id);

    if (updatedName && updatedDescription && updatedGradeId) {
      axios.put(`http://localhost:8080/batches/${batch.id}`, {
        name: updatedName,
        description: updatedDescription,
        grade: { id: updatedGradeId },
      })
        .then(response => {
          const updatedBatch = response.data;
          setBatches(batches.map(b => (b.id === updatedBatch.id ? updatedBatch : b)));
        })
        .catch(err => {
          setError('Error updating batch');
          console.error(err);
        });

      navigate('/grades/viewTimeTable');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      axios.delete(`http://localhost:8080/batches/${id}`)
        .then(() => {
          setBatches(batches.filter(b => b.id !== id));
        })
        .catch(err => {
          setError('Error deleting batch');
          console.error(err);
        });
    }
  };

  const handleUploadTimetable = () => {
    navigate('/grades/viewTimeTable'); // Navigate to the "Upload Timetable" page without batch ID
  };

  const handleViewTimetable = () => {
    navigate('/grades/viewTimeTable'); // Navigate to the "View Timetable" page without batch ID
  };

  return (
    <div className="batches-table">
      <h2>All Batches</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Batch Id</th>
            <th>Batch Name</th>
            <th>Description</th>
            <th>Grade</th>
            <th>Time Table</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id}>
              <td>{batch.id}</td>
              <td>{batch.name}</td>
              <td>{batch.description}</td>
              <td>{batch.grade.name}</td> {/* Displaying grade name */}
              <td>
                <button
                  className={`timetable-button ${
                    batch.timetable === 'View Time Table' ? 'view' : 'upload'
                  }`}
                  onClick={() =>
                    batch.timetable === 'View Time Table'
                      ? handleViewTimetable()
                      : handleUploadTimetable()
                  }
                >
                  {batch.timetable}
                </button>
              </td>
              <td>
                <button className="action-button" onClick={() => handleUpdate(batch)}>Update</button>
                <button className="action-button" onClick={() => handleDelete(batch.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBatch;
