package com.softparadigm.backend.model;



import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Map;
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Step.class, name = "step"),
        @JsonSubTypes.Type(value = Process.class, name = "process")
})

@Getter
@Setter
public abstract class Component implements Serializable {

    private String name;

    private String description;

    private Map<String,Object> properties ;

    public abstract String generateScript(String identation);



}
