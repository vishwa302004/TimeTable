import React, { useEffect, useState } from 'react';
import './UpdateProfile.css';
import axios from 'axios';

const UpdateProfile = () => {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        contact: '',
        address: '',
        batch: '',
        id: '',
        email: '' // Add email to the student state
    });
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Get the student email from local storage
        const storedEmail = localStorage.getItem('studentEmail');
        setEmail(storedEmail || ''); // Set email in state or default to empty string
        if (storedEmail) {
            // Fetch the student data using the email
            axios.get(`http://localhost:8080/students/email/${storedEmail}`)
                .then(response => {
                    const studentData = response.data;
                    setStudent({
                        firstName: studentData.firstName || '',
                        lastName: studentData.lastName || '',
                        contact: studentData.contact || '',
                        address: studentData.address || '',
                        batch: studentData.batch || '',
                        id: studentData.id || '',
                        email: studentData.email || '' // Include email in the student object
                    });
                })
                .catch(error => {
                    console.error('Error fetching student data:', error);
                });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure that the email is included in the student object before sending the request
        const updatedStudent = { ...student, email };

        axios.put(`http://localhost:8080/students/${student.id}`, updatedStudent)
            .then(response => {
                console.log('Student data updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating student data:', error);
            });
    };

    return (
        <div className="update-profile">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit} className="update-form">
                <div className="form-row">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={student.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={student.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={student.email} // Use student.email here
                        disabled
                    />
                </div>
                <div className="form-row">
                    <label>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={student.contact}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={student.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Batch:</label>
                    <input
                        type="text"
                        name="batch"
                        value={student.batch}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
