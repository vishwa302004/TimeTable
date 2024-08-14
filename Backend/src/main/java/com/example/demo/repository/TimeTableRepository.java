package com.example.demo.repository;

import com.example.demo.model.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TimeTableRepository extends JpaRepository<TimeTable, Long> {
    Optional<TimeTable> findByDayAndTimeSlot(String day, String timeSlot);
}
