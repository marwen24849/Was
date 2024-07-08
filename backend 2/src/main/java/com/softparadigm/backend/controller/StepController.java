package com.softparadigm.backend.controller;

import com.softparadigm.backend.dto.StepDTO;
import com.softparadigm.backend.service.StepService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
public class StepController {

    private final StepService stepService;

    @GetMapping
    public ResponseEntity<List<StepDTO>> getAllTasks(){
        List<StepDTO> tasks = stepService.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/createTask/{groupId}")
    public ResponseEntity<StepDTO> createTask(@RequestBody StepDTO stepDTO,
                                              @PathVariable("groupId") String groupId ){
        StepDTO createdTask = stepService.save(stepDTO, groupId);
        return ResponseEntity.ok(createdTask);
    }


    @GetMapping("/{task-id}")
    public ResponseEntity<StepDTO> getTaskById(@PathVariable("task-id") String taskId){
        return ResponseEntity.ok(stepService.findById(taskId));
    }

    @GetMapping("/group/{group-id}")
    public ResponseEntity<List<StepDTO>> getTasksByGroupId(@PathVariable("group-id") String groupId){
        List<StepDTO> tasks = stepService.findTasksByGroupId(groupId);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<StepDTO> updateTask(@PathVariable("taskId") String taskId,
                                              @Valid @RequestBody StepDTO updatedStepDTO) {
        StepDTO updatedTask = stepService.update(taskId, updatedStepDTO);
        return ResponseEntity.ok(updatedTask);
    }


    @DeleteMapping("/{task-id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable("task-id") String taskId){
        stepService.delete(taskId);
        return ResponseEntity.accepted().build();
    }
}
