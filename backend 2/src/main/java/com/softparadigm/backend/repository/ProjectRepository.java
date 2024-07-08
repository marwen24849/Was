package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.Project;
import com.softparadigm.backend.model.Workflow;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {

    List<Project> findAllByCreatedBy(String createdBy);
}
