package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.Template;
import com.softparadigm.backend.model.Workflow;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TemplateRepository extends MongoRepository<Template, String> {

    List<Template> findAllByIsValid(boolean isValid);
}
