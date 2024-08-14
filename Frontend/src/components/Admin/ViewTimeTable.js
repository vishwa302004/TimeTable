import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './viewTimeTable.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewTimeTable = () => {
    const { state } = useLocation();
    const [schedule, setSchedule] = useState(state?.schedule || Array(8).fill(Array(5).fill('NA')));

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

    useEffect(() => {
        if (!state?.schedule) {
            const fetchData = async () => {
                try {
                    const timetableResponse = await axios.get('http://localhost:8080/timetables');
                    const timeTables = timetableResponse.data;
                    const newSchedule = Array(8).fill(null).map(() => Array(5).fill('NA'));

                    timeTables.forEach((entry) => {
                        const dayIndex = days.indexOf(entry.day);
                        const timeSlotIndex = timeSlots.indexOf(entry.timeSlot);
                        if (dayIndex !== -1 && timeSlotIndex !== -1) {
                            newSchedule[timeSlotIndex][dayIndex] = `${entry.course.name} (${entry.teacher.firstName} ${entry.teacher.lastName})`;
                        }
                    });

                    setSchedule(newSchedule);
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            };

            fetchData();
        }
    }, [state]);

    const downloadPDF = () => {
        const input = document.getElementById('timetable');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; // Width of the image in mm
            const pageHeight = 295; // Height of the page in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('timetable.pdf');
        });
    };

    return (
        <div className="timetable-container">
            <h2>Time Table</h2>
            <div id="timetable">
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
                                    <td key={j}>{schedule[i][j]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="Download TimeTable" onClick={downloadPDF}>
                Download Timetable
            </button>
        </div>
    );
};

export default ViewTimeTable;
