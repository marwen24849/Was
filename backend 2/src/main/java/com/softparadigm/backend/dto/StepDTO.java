package com.softparadigm.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;



@Data
@Builder
public class StepDTO {
    private String id;
    private String name;
    protected Map<String,Object> properties ;
    private String description;
    private String type ;
    private String componentType ;


    public StepDTO(String id, String name, Map<String, Object> properties,
                   String description, String type, String componentType)
    {
        this.id = id;
        this.name = name;
        this.properties = properties;
        this.description = description;
        this.type = "step";
        this.componentType = "task";


    }
}
