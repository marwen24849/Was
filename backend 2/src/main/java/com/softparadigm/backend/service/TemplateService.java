package com.softparadigm.backend.service;

import com.softparadigm.backend.model.Template;

import java.util.List;

public interface TemplateService {

    List<Template> findAllTemplates();
    List<Template> findAllValidTemplates();
    Template validateTemplate(String templateId);
}
