package com.softparadigm.backend.model;

import com.softparadigm.backend.enums.WorkflowType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Template")
@Getter
@Setter
public class Template extends Workflow{

    private boolean isValid;

    public Template() {
        setType(WorkflowType.TEMPLATE);
        this.isValid = false;
    }

}
