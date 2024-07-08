package com.softparadigm.backend.service;

import com.softparadigm.backend.model.Automation;

import java.util.List;

public interface AutomationService {

    List<Automation> findAllValidAutomations();
    Automation validateAutomation(String automationId);
    List<Automation> findAllAutomationsOfCurrentUser(String currentUserId);
    List<Automation> findAllAutomations();
}
