package com.softparadigm.backend.controller;


import com.softparadigm.backend.dto.newProjectDTO;
import com.softparadigm.backend.model.*;
import com.softparadigm.backend.service.WorkflowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/workflow")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "Demo Controller", description = "Controller for demonstrating Springdoc OpenAPI")

public class WorkflowController {

    private final WorkflowService workflowService;


    @PostMapping("/projects")
    @Operation(summary = "Save a new project")
    public ResponseEntity<Project> saveProject(@RequestBody newProjectDTO project){
        return ResponseEntity.ok(workflowService.save(project));
    }
    @GetMapping("/projects/{project-id}")
    @Operation(summary = "Get a project by ID")
    public ResponseEntity<Project> getProject(@PathVariable("project-id") String projectId){
        return ResponseEntity.ok(workflowService.findProjectById(projectId));
    }


    @GetMapping("/projects")
    @Operation(summary = "Get all projects of the current user")
    public ResponseEntity<List<Project>> findAllProjectsOfCurrentUser(){
        return ResponseEntity.ok(workflowService.findAllProjectsOfCurrentUser());
    }

    @DeleteMapping("/projects/{projectId}")
    @Operation(summary = "Delete a project by ID")
    public ResponseEntity<Void> deleteProject(@PathVariable("project-id") String projectId) {
        workflowService.deleteProjectById(projectId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/projects/{project-id}")
    @Operation(summary = "Update a project by ID")
    public ResponseEntity<Project> updateProject(@PathVariable("project-id") String projectId, @RequestBody Project updatedProject) {
        return ResponseEntity.ok(workflowService.updateProject(projectId, updatedProject));
    }




    @GetMapping("/templates")
    @Operation(summary = "Get all templates")
    public ResponseEntity<List<Template>> getAllTemplates() {
        return ResponseEntity.ok(workflowService.findAllTemplates());
    }

    @GetMapping("/templates/valid")
    @Operation(summary = "Get all valid templates")
    public ResponseEntity<List<Template>> getAllValidTemplates() {
        return ResponseEntity.ok(workflowService.findAllValidTemplates());
    }

    @PostMapping("/templates/{templateId}/validate")
    @Operation(summary = "Validate a template by ID")
    public ResponseEntity<Template> validateTemplate(@PathVariable("template-id") String templateId) {
        return ResponseEntity.ok(workflowService.validateTemplate(templateId));
    }









    @GetMapping("/automations/{currentUserId}/automations")
    @Operation(summary = "Get all automations of the current user")
    public ResponseEntity<List<Automation>> getAutomationsOfCurrentUser(@PathVariable("currentUser-id") String currentUserId) {
        return ResponseEntity.ok(workflowService.findAllAutomationsOfCurrentUser(currentUserId));
    }

    @GetMapping("/automations")
    @Operation(summary = "Get all automations")
    public ResponseEntity<List<Automation>> getAllAutomations() {
        return ResponseEntity.ok(workflowService.findAllAutomations());
    }

    @GetMapping("/automations/valid")
    @Operation(summary = "Get all valid automations")
    public ResponseEntity<List<Automation>> getAllValidAutomations() {
        return ResponseEntity.ok(workflowService.findAllValidAutomations());
    }

    @PostMapping("/automations/{automationId}/validate")
    @Operation(summary = "Validate an automation by ID")
    public ResponseEntity<Automation> validateAutomation(@PathVariable("automation-id") String automationId) {
        return ResponseEntity.ok(workflowService.validateAutomation(automationId));
    }
















    @GetMapping("/script/{project-id}")
    @Operation(summary = "Get a project by ID")
    public ResponseEntity<String> getScript(@PathVariable("project-id") String projectId) throws IOException {
        return ResponseEntity.ok(workflowService.getScript(projectId));
    }


















    @PostMapping("/templates/{templateId}/convert-to-project")
    @Operation(summary = "Convert a template to a project")
    public ResponseEntity<Project> convertTemplateToProject(@PathVariable String templateId,
                                                            @RequestParam String newName,
                                                            @RequestParam String newDescription) {
        try {
            Project project = workflowService.convertTemplateToProject(templateId, newName, newDescription);
            return ResponseEntity.ok(project);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/projects/{projectId}/convert-to-template")
    @Operation(summary = "Convert a project to a template")
    public ResponseEntity<Template> convertProjectToTemplate(@PathVariable String projectId,
                                                             @RequestParam String newName,
                                                             @RequestParam String newDescription) {
        try {
            Template template = workflowService.convertProjectToTemplate(projectId, newName, newDescription);
            return ResponseEntity.ok(template);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/projects/{projectId}/convert-to-automation")
    @Operation(summary = "Convert a project to an automation")
    public ResponseEntity<Automation> convertProjectToAutomation(@PathVariable String projectId,
                                                                 @RequestParam String newName,
                                                                 @RequestParam String newDescription) {
        try {
            Automation automation = workflowService.convertProjectToAutomation(projectId, newName, newDescription);
            return ResponseEntity.ok(automation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
