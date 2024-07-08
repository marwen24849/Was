package com.softparadigm.backend.service;

import com.softparadigm.backend.dto.newProjectDTO;
import com.softparadigm.backend.model.Automation;
import com.softparadigm.backend.model.Project;
import com.softparadigm.backend.model.Template;

import java.util.List;

public interface ProjectService {

    Project save(newProjectDTO project);
    Project findProjectById(String id);
    List<Project> findAllProjectsOfCurrentUser();
    void deleteProjectById(String id);
    Project updateProject(String id, Project updatedProject);
    Automation convertProjectToAutomation(String projectId, String newName, String newDescription, Integer version);
    Project convertTemplateToProject(String templateId, String newName, String newDescription);
    Template convertProjectToTemplate(String projectId, String newName, String newDescription);
}
