package com.softparadigm.backend.serviceImpl;

import com.softparadigm.backend.dto.newProjectDTO;
import com.softparadigm.backend.enums.WorkflowType;
import com.softparadigm.backend.model.Automation;
import com.softparadigm.backend.model.Project;
import com.softparadigm.backend.model.Template;
import com.softparadigm.backend.model.WorkflowFactory;
import com.softparadigm.backend.repository.AutomationRepository;
import com.softparadigm.backend.repository.ProjectRepository;
import com.softparadigm.backend.repository.TemplateRepository;
import com.softparadigm.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final TemplateRepository templateRepository;
    private final AutomationRepository automationRepository;


    @Override
    public Project save(newProjectDTO project) {
        Project save = new Project();
        save.setDescription(project.getDescription());
        save.setName(project.getName());
        //save.setCreatedBy();
        return projectRepository.save(save);
    }

    @Override
    public Project findProjectById(String id) {
        return projectRepository.findById(id).get();
    }

    @Override
    public List<Project> findAllProjectsOfCurrentUser() {
        //return projectRepository.findAllByCreatedBy(currentUser);
        return projectRepository.findAllByCreatedBy("current_user");
    }

    @Override
    public void deleteProjectById(String id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
        } else {
            throw new RuntimeException("Project not found with id " + id);
        }

    }

    @Override
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

    @Override
    public Automation convertProjectToAutomation(String projectId, String newName, String newDescription, Integer version) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent() && projectOptional.get().getType().equals(WorkflowType.PROJECT)) {
            Project project = projectOptional.get();
            Automation automation = WorkflowFactory.createAutomationFromProject(project);
            automation.setName(newName);
            automation.setDescription(newDescription);
            automation.setVersion(version);
            //automation.setCreatedBy();
            return automationRepository.save(automation);
        } else {
            throw new RuntimeException("Project not found");
        }
    }

    @Override
    public Project convertTemplateToProject(String templateId, String newName, String newDescription) {
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

    @Override
    public Template convertProjectToTemplate(String projectId, String newName, String newDescription) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent()&& projectOptional.get().getType().equals(WorkflowType.PROJECT)) {
            Project project =  projectOptional.get();
            Template template = WorkflowFactory.createTemplateFromProject(project);
            template.setName(newName);
            template.setDescription(newDescription);
            //template.setCreatedBy();
            //clearPropertiesValue(template.getSequence());
            return templateRepository.save(template);
        } else {
            throw new RuntimeException("Project not found");
        }
    }
}
