package com.example.demo.service;

import com.example.demo.model.Batch;
import com.example.demo.repository.BatchRepository;
import com.example.demo.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private GradeRepository gradeRepository;

    public Batch saveBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    public Optional<Batch> getBatchById(Long id) {
        return batchRepository.findById(id);
    }

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Batch updateBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    public void deleteBatchById(Long id) {
        batchRepository.deleteById(id);
    }
}
