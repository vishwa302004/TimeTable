
import React, { useState, useEffect } from 'react';
import './GenTable.css';
import TimeTable from './TimeTable.jsx';
import axios from 'axios';

const GenTable = () => {
    const [day, setDay] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [schedule, setSchedule] = useState(Array(8).fill(Array(5).fill('NA')));

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
        // Fetch courses, teachers, and the saved timetable from the backend
        const fetchData = async () => {
            try {
                const coursesResponse = await axios.get('http://localhost:8080/courses');
                setCourses(coursesResponse.data);

                const teachersResponse = await axios.get('http://localhost:8080/teachers');
                setTeachers(teachersResponse.data);

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
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dayIndex = days.indexOf(day);
        const timeSlotIndex = timeSlots.indexOf(timeSlot);

        if (dayIndex !== -1 && timeSlotIndex !== -1) {
            const course = courses.find(c => c.id.toString() === selectedCourse);
            const teacher = teachers.find(t => t.id.toString() === selectedTeacher);

            const updatedSchedule = schedule.map((row, i) =>
                i === timeSlotIndex
                    ? row.map((cell, j) => (j === dayIndex ? `${course.name} (${teacher.firstName} ${teacher.lastName})` : cell))
                    : row
            );
            setSchedule(updatedSchedule);

            try {
                await axios.post('http://localhost:8080/timetables', {
                    day,
                    timeSlot,
                    course: { id: course.id },
                    teacher: { id: teacher.id }
                });
            } catch (error) {
                console.error('Failed to save timetable entry:', error);
            }
        }

        setDay('');
        setTimeSlot('');
        setSelectedCourse('');
        setSelectedTeacher('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add Time Table!!!</h2>
                <div>
                    <label>Select Day</label>
                    <select value={day} onChange={(e) => setDay(e.target.value)}>
                        <option value="" disabled>Select Day</option>
                        {days.map((day, index) => (
                            <option key={index} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Time Slot</label>
                    <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                        <option value="" disabled>Select Time Slot</option>
                        {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Course</label>
                    <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                        <option value="" disabled>Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Teacher</label>
                    <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                        <option value="" disabled>Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.firstName} {teacher.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Save</button>
            </form>

            <h2>Generated Time Table</h2>
            <TimeTable schedule={schedule} />
        </div>
    );
};

export default GenTable;
