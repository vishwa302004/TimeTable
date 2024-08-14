import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewGrade.css';

const ViewGrade = ({ grades, updateGrade, deleteGrade }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const navigate = useNavigate();

  const handleEdit = (grade) => {
    setIsEditing(grade.id);
    setEditName(grade.name);
    setEditDescription(grade.description);
  };

  const handleUpdate = (id) => {
    updateGrade(id, editName, editDescription);
    setIsEditing(null);
    setEditName('');
    setEditDescription('');
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditName('');
    setEditDescription('');
  };

  return (
    <div className="grades-table">
      <h2>All Grades</h2>
      <table>
        <thead>
          <tr>
            <th>Grade Id</th>
            <th>Grade Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.id}</td>
              <td>
                {isEditing === grade.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  grade.name
                )}
              </td>
              <td>
                {isEditing === grade.id ? (
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  grade.description
                )}
              </td>
              <td>
                {isEditing === grade.id ? (
                  <>
                    <button
                      className="action-button"
                      onClick={() => handleUpdate(grade.id)}
                    >
                      Save
                    </button>
                    <button
                      className="action-button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="action-button"
                      onClick={() => handleEdit(grade)}
                    >
                      Update
                    </button>
                    <button
                      className="action-button"
                      onClick={() => deleteGrade(grade.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="action-button"
                      onClick={() => navigate('/grades/addCourse')}
                    >
                      Courses
                    </button>
                    <button
                      className="action-button"
                      onClick={() => navigate('/grades/addBatch')}
                    >
                      Batches
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewGrade;
