package com.softparadigm.backend.service;


import com.softparadigm.backend.dto.newProjectDTO;
import com.softparadigm.backend.enums.WorkflowType;
import com.softparadigm.backend.model.*;
import com.softparadigm.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkflowService {


    private final ProjectRepository projectRepository;
    private final TemplateRepository templateRepository;
    private final AutomationRepository automationRepository;


    public Project save(newProjectDTO project){
        Project save = new Project();
        save.setDescription(project.getDescription());
        save.setName(project.getName());
        return projectRepository.save(save);
    }

    public Project findProjectById(String id){
        return projectRepository.findById(id).get();
    }

    public List<Project> findAllProjectsOfCurrentUser(){
        //return projectRepository.findAllByCreatedBy(currentUser);
        return projectRepository.findAllByCreatedBy("current_user");
    }
    public void deleteProjectById(String id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
        } else {
            throw new RuntimeException("Project not found with id " + id);
        }
    }

    public Project updateProject(String id, Project updatedProject) {
        Optional<Project> existingProject = projectRepository.findById(id);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            project.setName(updatedProject.getName());
            project.setDescription(updatedProject.getDescription());
            //project.setCreatedBy(updatedProject.getCreatedBy());
            project.setProperties(updatedProject.getProperties());
            project.setSequence(updatedProject.getSequence());
            return projectRepository.save(project);
        } else {
            throw new RuntimeException("Project not found with id " + id);
        }
    }



    public List<Template> findAllTemplates(){

        return templateRepository.findAll();
    }

    public List<Template> findAllValidTemplates() {
        return templateRepository.findAllByIsValid(true);
    }

    public Template validateTemplate(String templateId) {
        Template template = templateRepository.findById(templateId).orElseThrow(() -> new RuntimeException("Template not found"));
        template.setValid(true);
        return templateRepository.save(template);
    }








    public List<Automation> findAllValidAutomations() {
        return automationRepository.findAllByIsValid(true);
    }

    public Automation validateAutomation(String automationId) {
        Automation automation = automationRepository.findById(automationId).orElseThrow(() -> new RuntimeException("Automation not found"));
        automation.setValid(true);
        return automationRepository.save(automation);
    }



    public List<Automation> findAllAutomationsOfCurrentUser(String currentUserId){

        //return automationRepository.findAllByCreatedBy(currentUserId);
        return automationRepository.findAllByCreatedBy("ID of current user");
    }

    public List<Automation> findAllAutomations(){

        return automationRepository.findAll();
    }





//    public Workflow findById(String id){
//        // TODO DTO
//        // TODO validation
//        return workflowRepository.findById(id).get();
//    }
//
//    public List<Workflow> findAll(){
//        // TODO DTO
//        // TODO validation
//        return workflowRepository.findAll();
//    }

    public String getScript(String id) throws IOException {
        var  mainScript = projectRepository.findById(id).get().generateScript("");
        System.out.println(projectRepository.findById(id).get().generateScript(""));
        var transformedScript = projectRepository.findById(id).get().appendScriptToTemplate(mainScript);
        System.out.println(projectRepository.findById(id).get().appendScriptToTemplate(mainScript));
        return transformedScript;
    }




// this method will handle also the creation of a robot
    public Automation convertProjectToAutomation(String projectId, String newName, String newDescription) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent() && projectOptional.get().getType().equals(WorkflowType.PROJECT)) {
            Project project = projectOptional.get();
            Automation automation = WorkflowFactory.createAutomationFromProject(project);
            automation.setName(newName);
            automation.setDescription(newDescription);
            return automationRepository.save(automation);
        } else {
            throw new RuntimeException("Project not found");
        }
    }

    public Project convertTemplateToProject(String templateId,String newName, String newDescription) {
        Optional<Template> templateOptional = templateRepository.findById(templateId);
        if (templateOptional.isPresent() && templateOptional.get().getType().equals(WorkflowType.TEMPLATE)) {
            Template template = templateOptional.get();
            Project project = WorkflowFactory.createProjectFromTemplate(template);
            project.setName(newName);
            project.setDescription(newDescription);
            return projectRepository.save(project);
        } else {
            throw new RuntimeException("Project not found");
        }
    }

    public Template convertProjectToTemplate(String projectId,String newName, String newDescription) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent()&& projectOptional.get().getType().equals(WorkflowType.PROJECT)) {
            Project project =  projectOptional.get();
            Template template = WorkflowFactory.createTemplateFromProject(project);
            template.setName(newName);
            template.setDescription(newDescription);
            //clearPropertiesValue(template.getSequence());
            return templateRepository.save(template);
        } else {
            throw new RuntimeException("Project not found");
        }
    }

















}
