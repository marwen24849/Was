package com.softparadigm.backend.controller;


import com.softparadigm.backend.dto.newProjectDTO;
import com.softparadigm.backend.model.Automation;
import com.softparadigm.backend.model.Project;
import com.softparadigm.backend.model.Template;
import com.softparadigm.backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "Project Controller", description = "Controller for managing projects")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("")
    @Operation(summary = "Save a new project")
    public ResponseEntity<Project> saveProject(@RequestBody newProjectDTO project){
        return ResponseEntity.ok(projectService.save(project));
    }

    @GetMapping("/{project-id}")
    @Operation(summary = "Get a project by ID")
    public ResponseEntity<Project> getProject(@PathVariable("project-id") String projectId){
        return ResponseEntity.ok(projectService.findProjectById(projectId));
    }

    @GetMapping("")
    @Operation(summary = "Get all projects of the current user")
    public ResponseEntity<List<Project>> findAllProjectsOfCurrentUser(){
        return ResponseEntity.ok(projectService.findAllProjectsOfCurrentUser());
    }

    @DeleteMapping("/{project-id}")
    @Operation(summary = "Delete a project by ID")
    public ResponseEntity<Void> deleteProject(@PathVariable("project-id") String projectId) {
        projectService.deleteProjectById(projectId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{project-id}")
    @Operation(summary = "Update a project by ID")
    public ResponseEntity<Project> updateProject(@PathVariable("project-id") String projectId, @RequestBody Project updatedProject) {
        return ResponseEntity.ok(projectService.updateProject(projectId, updatedProject));
    }

    @PostMapping("/{projectId}/convert-to-template")
    @Operation(summary = "Convert a project to a template")
    public ResponseEntity<Template> convertProjectToTemplate(@PathVariable("projectId") String projectId,
                                                             @RequestParam String newName,
                                                             @RequestParam String newDescription) {
        try {
            Template template = projectService.convertProjectToTemplate(projectId, newName, newDescription);
            return ResponseEntity.ok(template);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/{projectId}/convert-to-automation")
    @Operation(summary = "Convert a project to an automation")
    public ResponseEntity<Automation> convertProjectToAutomation(@PathVariable("projectId") String projectId,
                                                                 @RequestParam String newName,
                                                                 @RequestParam String newDescription,
                                                                 @RequestParam Integer version) {
        try {
            Automation automation = projectService.convertProjectToAutomation(projectId, newName, newDescription, version);
            return ResponseEntity.ok(automation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/templates/{templateId}/convert-to-project")
    @Operation(summary = "Convert a template to a project")
    public ResponseEntity<Project> convertTemplateToProject(@PathVariable("templateId") String templateId,
                                                            @RequestParam String newName,
                                                            @RequestParam String newDescription) {
        try {
            Project project = projectService.convertTemplateToProject(templateId, newName, newDescription);
            return ResponseEntity.ok(project);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
