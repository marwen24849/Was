package com.softparadigm.backend.model;

import com.softparadigm.backend.enums.WorkflowType;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Project")
public class Project extends Workflow{

    public Project() {
        setType(WorkflowType.PROJECT);
    }
}
