import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewGrade from './ViewGrade'; // Adjust the path as needed

const GradeContainer = () => {
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

  const updateGrade = async (id, updatedName, updatedDescription) => {
    console.log(`Updating grade with ID: ${id}, Name: ${updatedName}, Description: ${updatedDescription}`);
    try {
      await axios.put(`http://localhost:8080/grades/${id}`, {
        name: updatedName,
        description: updatedDescription,
      });
      setGrades(grades.map((grade) =>
        grade.id === id ? { ...grade, name: updatedName, description: updatedDescription } : grade
      ));
    } catch (err) {
      console.error('Error updating grade:', err);
    }
  };

  const deleteGrade = async (id) => {
    console.log(`Deleting grade with ID: ${id}`);
    try {
      await axios.delete(`http://localhost:8080/grades/${id}`);
      setGrades(grades.filter((grade) => grade.id !== id));
    } catch (err) {
      console.error('Error deleting grade:', err);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <ViewGrade grades={grades} updateGrade={updateGrade} deleteGrade={deleteGrade} />
    </div>
  );
};

export default GradeContainer;
