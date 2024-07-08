package com.softparadigm.backend.serviceImpl;

import com.softparadigm.backend.model.Automation;
import com.softparadigm.backend.repository.AutomationRepository;
import com.softparadigm.backend.service.AutomationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutomationServiceImpl implements AutomationService {


    private final AutomationRepository automationRepository;


    @Override
    public List<Automation> findAllValidAutomations() {
        return automationRepository.findAllByIsValid(true);
    }

    @Override
    public Automation validateAutomation(String automationId) {
        Automation automation = automationRepository.findById(automationId).orElseThrow(() -> new RuntimeException("Automation not found"));
        automation.setValid(true);
        return automationRepository.save(automation);
    }

    @Override
    public List<Automation> findAllAutomationsOfCurrentUser(String currentUserId) {
        //return automationRepository.findAllByCreatedBy(currentUserId);
        return automationRepository.findAllByCreatedBy("ID of current user");
    }

    @Override
    public List<Automation> findAllAutomations() {
        return automationRepository.findAll();
    }
}
