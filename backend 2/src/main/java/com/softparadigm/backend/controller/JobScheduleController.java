package com.softparadigm.backend.controller;


import com.softparadigm.backend.model.JobSchedule;
import com.softparadigm.backend.service.JobScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
@CrossOrigin("*")
public class JobScheduleController {

    @Autowired
    private JobScheduleService scheduleService;


    @PostMapping
    public ResponseEntity<JobSchedule> createSchedule(@RequestBody JobSchedule schedule) {
        JobSchedule createdSchedule = scheduleService.createSchedule(schedule);
        return ResponseEntity.ok(createdSchedule);
    }

    @GetMapping
    public ResponseEntity<List<JobSchedule>> getAllSchedules() {
        List<JobSchedule> schedules = scheduleService.getAllSchedules();
        return ResponseEntity.ok(schedules);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobSchedule> updateSchedule(@PathVariable String id, @RequestBody JobSchedule scheduleDetails) {
        JobSchedule updatedSchedule = scheduleService.updateSchedule(id, scheduleDetails);
        return ResponseEntity.ok(updatedSchedule);
    }
    @PatchMapping("/updateStatus/{id}")
    public ResponseEntity<JobSchedule> updateScheduleStatus(@PathVariable String id, @RequestParam boolean status) {
        JobSchedule updatedSchedule = scheduleService.updateScheduleStatus(id, status);
        return ResponseEntity.ok(updatedSchedule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable String id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }

}
