package com.softparadigm.backend.model;

import com.softparadigm.backend.enums.WorkflowType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Automation")
@Getter
@Setter
public class Automation extends Workflow{

    private boolean isValid;

    private Integer version;

    public Automation() {
        setType(WorkflowType.AUTOMATION);
        this.isValid = false;
    }

}
