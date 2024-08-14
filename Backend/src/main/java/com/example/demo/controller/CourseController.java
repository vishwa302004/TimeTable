package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.model.Grade;
import com.example.demo.service.CourseService;
import com.example.demo.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private GradeService gradeService;

    @PostMapping
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        Optional<Grade> grade = gradeService.getGradeById(course.getGrade().getId());
        if (grade.isPresent()) {
            course.setGrade(grade.get());
            Course savedCourse = courseService.saveCourse(course);
            return ResponseEntity.ok(savedCourse);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseService.getCourseById(id);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Optional<Course> course = courseService.getCourseById(id);
        if (course.isPresent()) {
            Course existingCourse = course.get();
            existingCourse.setName(courseDetails.getName());
            existingCourse.setDescription(courseDetails.getDescription());
            Optional<Grade> grade = gradeService.getGradeById(courseDetails.getGrade().getId());
            if (grade.isPresent()) {
                existingCourse.setGrade(grade.get());
                Course updatedCourse = courseService.updateCourse(existingCourse);
                return ResponseEntity.ok(updatedCourse);
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourseById(id);
        return ResponseEntity.ok().build();
    }
}
