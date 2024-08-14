
package com.example.demo.controller;

import com.example.demo.model.TimeTable;
import com.example.demo.service.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/timetables")
public class TimeTableController {

    @Autowired
    private TimeTableService timeTableService;

    @PostMapping
    public ResponseEntity<TimeTable> saveOrUpdateTimeTable(@RequestBody TimeTable timeTable) {
        Long courseId = timeTable.getCourse().getId();
        Long teacherId = timeTable.getTeacher().getId();
        TimeTable savedTimeTable = timeTableService.saveOrUpdateTimeTable(timeTable, courseId, teacherId);
        return ResponseEntity.ok(savedTimeTable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeTable> getTimeTableById(@PathVariable Long id) {
        Optional<TimeTable> timeTable = timeTableService.getTimeTableById(id);
        return timeTable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<TimeTable>> getAllTimeTables() {
        List<TimeTable> timeTables = timeTableService.getAllTimeTables();
        return ResponseEntity.ok(timeTables);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeTable(@PathVariable Long id) {
        timeTableService.deleteTimeTableById(id);
        return ResponseEntity.ok().build();
    }
}
