import React, { useState } from "react";
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import PersonalDetail from './PersonalDetail';
import UpdateProfile from './UpdateProfile';
import ViewTimeTable from '../Admin/ViewTimeTable'
const StudentManager = () => {
    const [student, setStudent] = useState({
        role: 'Student',
        firstName: 'Student1',
        lastName: 'Student1',
        email: 'student1@example.com',
        contact: '1234567890',
        address: 'Demo Address',
        batch: 'B Tech 2nd Year - SEM 2'
    });
    const [schedule, setSchedule] = useState(
        Array(8).fill(Array(5).fill('NA'))
      );
    const handleUpdate = (updatedStudent) => {
        setStudent(updatedStudent);
    };

    return (
        <div>
            <Header />
            <Routes>
                <Route 
                    path="PersonalDetail" 
                    element={
                        <PersonalDetail 
                            role={student.role}
                            firstName={student.firstName}
                            lastName={student.lastName}
                            email={student.email}
                            contact={student.contact}
                            address={student.address}
                            batch={student.batch}
                        />
                    } 
                />
                <Route 
                    path="UpdateProfile" 
                    element={
                        <UpdateProfile 
                            student={student}
                            onUpdate={handleUpdate}
                        />
                    } 
                />
                <Route path="viewTimeTable" element={<ViewTimeTable schedule={schedule}/>}/>
            </Routes>
        </div>
    );
}

export default StudentManager;
