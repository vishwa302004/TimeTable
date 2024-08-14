import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PersonalDetail.css';

const PersonalDetail = () => {
    const [student, setStudent] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchStudentDetails = async () => {
            const storedEmail = localStorage.getItem('studentEmail');
            setEmail(storedEmail);
            if (storedEmail) {
                try {
                    const response = await axios.get(`http://localhost:8080/students/email/${storedEmail}`);
                    setStudent(response.data);
                } catch (error) {
                    console.error('Failed to fetch student details:', error);
                }
            }
        };

        fetchStudentDetails();
    }, []);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="personal-detail">
            <h2>Personal Detail</h2>
            <div className="detail-container">
                <div className="detail-row">
                    <span className="label">Role:</span> <span className="value">{student.user?.role || 'Student'}</span>
                </div>
                <div className="detail-row">
                    <span className="label">First Name:</span> <span className="value">{student.firstName || 'N/A'}</span>
                    <span className="label">Last Name:</span> <span className="value">{student.lastName || 'N/A'}</span>
                    <span className="label">Email Id:</span> <span className="value">{email}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Contact:</span> <span className="value">{student.contact || 'N/A'}</span>
                    <span className="label">Address:</span> <span className="value">{student.address || 'N/A'}</span>
                    <span className="label">Batch:</span> <span className="value">{student.batch || 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetail;
