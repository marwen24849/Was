package com.softparadigm.backend.controller;


import com.softparadigm.backend.dto.JobPayload;
import com.softparadigm.backend.model.DevelopementJob;
import com.softparadigm.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping("/development")
    public ResponseEntity<DevelopementJob> saveDevelopmentJob(@RequestBody JobPayload jobPayload) {
        DevelopementJob savedJob = jobService.saveDevelopementJob(jobPayload);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }

    @PostMapping("/development/{userId}/{processId}")
    public ResponseEntity<Void> createAndExecuteDevelopmentJob(@PathVariable String userId, @PathVariable String processId) {
        jobService.createAndExecuteDevelopementJob(userId, processId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/development")
    public ResponseEntity<List<DevelopementJob>> getAllDevelopmentJobs() {
        List<DevelopementJob> jobs = jobService.findAll();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/development/{userId}")
    public ResponseEntity<List<DevelopementJob>> getAllDevelopmentJobsByUserId(@PathVariable String userId) {
        List<DevelopementJob> jobs = jobService.findAllByUserId(userId);
        return ResponseEntity.ok(jobs);
    }








}
