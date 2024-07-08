package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.Automation;
import com.softparadigm.backend.model.Project;
import com.softparadigm.backend.model.Workflow;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AutomationRepository extends MongoRepository<Automation, String> {

    List<Automation> findAllByCreatedBy(String createdBy);

    List<Automation> findAllByIsValid(boolean isValid);

}
