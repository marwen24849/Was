package com.softparadigm.backend.serviceImpl;

import com.softparadigm.backend.model.Template;
import com.softparadigm.backend.repository.TemplateRepository;
import com.softparadigm.backend.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TemplateServiceImpl implements TemplateService {

    private final TemplateRepository templateRepository;



    @Override
    public List<Template> findAllTemplates() {
        return templateRepository.findAll();
    }

    @Override
    public List<Template> findAllValidTemplates() {
        return templateRepository.findAllByIsValid(true);
    }

    @Override
    public Template validateTemplate(String templateId) {
        Template template = templateRepository.findById(templateId).orElseThrow(() -> new RuntimeException("Template not found"));
        template.setValid(true);
        return templateRepository.save(template);
    }
}
