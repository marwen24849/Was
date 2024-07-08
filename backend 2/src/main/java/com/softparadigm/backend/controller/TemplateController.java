package com.softparadigm.backend.controller;


import com.softparadigm.backend.model.Template;
import com.softparadigm.backend.service.TemplateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "Template Controller", description = "Controller for managing templates")
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping
    @Operation(summary = "Get all templates")
    public ResponseEntity<List<Template>> getAllTemplates() {
        return ResponseEntity.ok(templateService.findAllTemplates());
    }

    @GetMapping("/valid")
    @Operation(summary = "Get all valid templates")
    public ResponseEntity<List<Template>> getAllValidTemplates() {
        return ResponseEntity.ok(templateService.findAllValidTemplates());
    }

    @PostMapping("/{templateId}/validate")
    @Operation(summary = "Validate a template by ID")
    public ResponseEntity<Template> validateTemplate(@PathVariable("templateId") String templateId) {
        return ResponseEntity.ok(templateService.validateTemplate(templateId));
    }
}
