import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddGrade from './AddGrade';
import ViewGrade from './ViewGrade';
import AddCourse from './AddCourse';
import ViewCourse from './ViewCourse';
import Header from './Header';
import AddBatch from './AddBatch';
import ViewBatch from './ViewBatch';
import RegisterTeacher from './RegisterTeacher';
import ViewTeacher from './ViewTeacher';
import GenTable from './GenTable';
import ViewTimeTable from './ViewTimeTable';
import GradeContainer from './GradeContainer';
const GradeManager = () => {
  const [grades, setGrades] = useState([
    { id: 1, name: 'B Tech 1st Year - SEM 1', description: 'B Tech 1st Year - SEM 1' },
    { id: 2, name: 'B Tech 1st Year - SEM 2', description: 'B Tech 1st Year - SEM 2' },
    { id: 3, name: 'B Tech 2nd Year - SEM 1', description: 'B Tech 2nd Year - SEM 1' },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, name: 'Compiler Design 1', description: 'Compiler Design 1', grade: 'B Tech 2nd Year - SEM 2' },
    { id: 2, name: 'Assembly Language', description: 'Assembly Language', grade: 'B Tech 2nd Year - SEM 2' },
    { id: 3, name: 'Microservices', description: 'Microservices', grade: 'B Tech 2nd Year - SEM 2' },
  ]);

  const [batches, setBatches] = useState([
    { id: 1, name: 'Batch 1', description: 'Batch 1', grade: 'B Tech 1st Year - SEM 1', timetable: 'Upload Time Table' },
    { id: 2, name: 'Batch 2', description: 'Batch 2', grade: 'B Tech 1st Year - SEM 1', timetable: 'Upload Time Table' },
    { id: 3, name: 'Batch 1', description: 'Batch 1', grade: 'B Tech 1st Year - SEM 2', timetable: 'View Time Table' },
    { id: 4, name: 'Batch 2', description: 'Batch 2', grade: 'B Tech 1st Year - SEM 2', timetable: 'View Time Table' },
    { id: 5, name: 'Batch 1', description: 'Batch 1', grade: 'B Tech 2nd Year - SEM 1', timetable: 'View Time Table' },
    { id: 6, name: 'Batch 2', description: 'Batch 2', grade: 'B Tech 2nd Year - SEM 1', timetable: 'View Time Table' },
    { id: 7, name: 'Batch 3', description: 'Batch 3', grade: 'B Tech 2nd Year - SEM 1', timetable: 'Upload Time Table' },
    { id: 8, name: 'Batch 1', description: 'Batch 1', grade: 'B Tech 2nd Year - SEM 2', timetable: 'Upload Time Table' },
  ]);

  const [teachers, setTeachers] = useState([
    {
      firstName: 'Santhosh',
      lastName: 'B',
      email: 'Santhosh@example.com',
      phone: '9654309876',
      address: 'Theni'
    },
    {
      firstName: 'Rajesh ',
      lastName: 'R',
      email: 'Rajesh@example.com',
      phone: '1234567890',
      address: 'coimbatore'
    },
  ]);

  const [schedule, setSchedule] = useState(
    Array(8).fill(Array(5).fill('NA'))
  );

  const addTeacher = (teacher) => {
    setTeachers([...teachers, teacher]);
  };

  const deleteTeacher = (index) => {
    const newTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(newTeachers);
  };

  const addGrade = (name, description) => {
    const newGrade = { id: grades.length + 1, name, description };
    setGrades([...grades, newGrade]);
  };

  const updateGrade = (id, updatedName, updatedDescription) => {
    const updatedGrades = grades.map((grade) =>
      grade.id === id ? { ...grade, name: updatedName, description: updatedDescription } : grade
    );
    setGrades(updatedGrades);
  };

  const deleteGrade = (id) => {
    const updatedGrades = grades.filter((grade) => grade.id !== id);
    setGrades(updatedGrades);
  };

  const addCourse = (course) => {
    const newCourse = { id: courses.length + 1, ...course };
    setCourses([...courses, newCourse]);
  };

  const addBatch = (batch) => {
    const newBatch = { id: batches.length + 1, ...batch };
    setBatches([...batches, newBatch]);
  };

  const updateBatch = (id, updatedBatch) => {
    const updatedBatches = batches.map((batch) =>
      batch.id === id ? { ...batch, ...updatedBatch } : batch
    );
    setBatches(updatedBatches);
  };

  const deleteBatch = (id) => {
    const updatedBatches = batches.filter((batch) => batch.id !== id);
    setBatches(updatedBatches);
  };

  const updateCourse = (id, updatedCourse) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, ...updatedCourse } : course
    );
    setCourses(updatedCourses);
  };

  const deleteCourse = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };
  
  const handleAddTimeTableEntry = (day, timeSlot, course, teacher) => {
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(day);
    const timeSlotIndex = [
      '9:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '12:00 PM - 1:00 PM',
      '1:00 PM - 2:00 PM',
      '2:00 PM - 3:00 PM',
      '3:00 PM - 4:00 PM',
      '4:00 PM - 5:00 PM',
    ].indexOf(timeSlot);

    if (dayIndex !== -1 && timeSlotIndex !== -1) {
      const newSchedule = [...schedule];
      const newDaySchedule = [...newSchedule[timeSlotIndex]];
      newDaySchedule[dayIndex] = `${course} - ${teacher}`;
      newSchedule[timeSlotIndex] = newDaySchedule;
      setSchedule(newSchedule);
    }
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="addGrade" element={<AddGrade addGrade={addGrade} />} />
        <Route path="viewGrade" element={<GradeContainer/>} />
        <Route path="addCourse" element={<AddCourse grades={grades} onAddCourse={addCourse} />} />
        <Route path="viewCourse" element={<ViewCourse courses={courses} updateCourse={updateCourse} deleteCourse={deleteCourse} />} />
        <Route path="addBatch" element={<AddBatch grades={grades} onAddBatch={addBatch} />} />
        <Route path="viewBatch" element={<ViewBatch batches={batches} updateBatch={updateBatch} deleteBatch={deleteBatch} />} />
        <Route path="addTeacher" element={<RegisterTeacher onRegisterTeacher={addTeacher} />} />
        <Route path="viewTeacher" element={<ViewTeacher teachers={teachers} onDelete={deleteTeacher} />} />
        <Route path="viewTimeTable" element={<GenTable courses={courses} teachers={teachers} onAddTimeTableEntry={handleAddTimeTableEntry} />} />
        <Route path="viTimeTable" element={<ViewTimeTable schedule={schedule}/>}/>
      </Routes>
    </div>
  );
};

export default GradeManager;
