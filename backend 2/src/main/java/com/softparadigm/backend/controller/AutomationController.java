package com.softparadigm.backend.controller;


import com.softparadigm.backend.model.Automation;
import com.softparadigm.backend.service.AutomationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/automations")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "Automation Controller", description = "Controller for managing automations")
public class AutomationController {

    private final AutomationService automationService;

    @GetMapping
    @Operation(summary = "Get all automations")
    public ResponseEntity<List<Automation>> getAllAutomations() {
        return ResponseEntity.ok(automationService.findAllAutomations());
    }

    @GetMapping("/valid")
    @Operation(summary = "Get all valid automations")
    public ResponseEntity<List<Automation>> getAllValidAutomations() {
        return ResponseEntity.ok(automationService.findAllValidAutomations());
    }

    @PostMapping("/{automationId}/validate")
    @Operation(summary = "Validate an automation by ID")
    public ResponseEntity<Automation> validateAutomation(@PathVariable("automationId") String automationId) {
        return ResponseEntity.ok(automationService.validateAutomation(automationId));
    }

    @GetMapping("/{currentUserId}/user")
    @Operation(summary = "Get all automations of the current user")
    public ResponseEntity<List<Automation>> getAutomationsOfCurrentUser(@PathVariable("currentUserId") String currentUserId) {
        return ResponseEntity.ok(automationService.findAllAutomationsOfCurrentUser(currentUserId));
    }
}
