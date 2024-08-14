package com.example.demo.controller;

import com.example.demo.model.Batch;
import com.example.demo.model.Grade;
import com.example.demo.service.BatchService;
import com.example.demo.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/batches")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @Autowired
    private GradeService gradeService;

    @PostMapping
    public ResponseEntity<Batch> addBatch(@RequestBody Batch batch) {
        Optional<Grade> grade = gradeService.getGradeById(batch.getGrade().getId());
        if (grade.isPresent()) {
            batch.setGrade(grade.get());
            Batch savedBatch = batchService.saveBatch(batch);
            return ResponseEntity.ok(savedBatch);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Batch> getBatchById(@PathVariable Long id) {
        Optional<Batch> batch = batchService.getBatchById(id);
        return batch.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Batch>> getAllBatches() {
        List<Batch> batches = batchService.getAllBatches();
        return ResponseEntity.ok(batches);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Batch> updateBatch(@PathVariable Long id, @RequestBody Batch batchDetails) {
        Optional<Batch> batch = batchService.getBatchById(id);
        if (batch.isPresent()) {
            Batch existingBatch = batch.get();
            existingBatch.setName(batchDetails.getName());
            existingBatch.setDescription(batchDetails.getDescription());
            existingBatch.setTimetable(batchDetails.getTimetable());
            Optional<Grade> grade = gradeService.getGradeById(batchDetails.getGrade().getId());
            if (grade.isPresent()) {
                existingBatch.setGrade(grade.get());
                Batch updatedBatch = batchService.updateBatch(existingBatch);
                return ResponseEntity.ok(updatedBatch);
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBatch(@PathVariable Long id) {
        batchService.deleteBatchById(id);
        return ResponseEntity.ok().build();
    }
}
