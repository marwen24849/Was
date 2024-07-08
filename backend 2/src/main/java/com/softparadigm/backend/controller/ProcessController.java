package com.softparadigm.backend.controller;


import com.softparadigm.backend.model.Process;
import com.softparadigm.backend.service.ProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Process")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProcessController {

    private final ProcessService processService;

    @GetMapping
    public ResponseEntity<List<Process>> getAll(){
        return ResponseEntity.ok(processService.findAll());
    }

    @GetMapping("/{workflow-id}")
    public ResponseEntity<Process> getWorkflow(@PathVariable("workflow-id") String workflowId){
        return ResponseEntity.ok(processService.findById(workflowId));
    }

    @PostMapping("")
    public ResponseEntity<String> save(@RequestBody Process process){
        return ResponseEntity.ok(processService.save(process));
    }

    @PostMapping("/script")
    public ResponseEntity<String> getScript(@RequestBody Process process){
        return ResponseEntity.ok(processService.getScript(process));
    }

}
