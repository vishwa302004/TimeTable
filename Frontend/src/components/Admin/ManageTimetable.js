import React, { useState } from 'react';
import GenTable from './GenTable';
import TimeTable from './TimeTable';

const ManageTimetable = ({ courses, teachers }) => {
  const [schedule, setSchedule] = useState(
    Array(8).fill(Array(5).fill('NA'))
  );

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
      <GenTable courses={courses} teachers={teachers} onAddTimeTableEntry={handleAddTimeTableEntry} />
      <TimeTable schedule={schedule} />
    </div>
  );
};

export default ManageTimetable;
