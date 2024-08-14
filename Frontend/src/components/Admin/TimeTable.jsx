import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TimeTable.css';

const TimeTable = ({ schedule }) => {
    const navigate = useNavigate();

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 1:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
        '4:00 PM - 5:00 PM',
    ];

    const handleUploadClick = () => {
        navigate('/grades/viTimeTable');
    };

    return (
        <div className="timetable-container">
            <h2>Time Table</h2>
            <table className="timetable">
                <thead>
                    <tr>
                        <th>Time Slot \ Day</th>
                        {days.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((slot, i) => (
                        <tr key={slot}>
                            <td>{slot}</td>
                            {days.map((day, j) => (
                                <td key={j}>
                                    {schedule[i][j]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="upload-button" onClick={handleUploadClick}>Upload Timetable</button>
        </div>
    );
};

export default TimeTable;
