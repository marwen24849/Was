package com.softparadigm.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "robots")
@Getter
@Setter
public class Robot extends AuditDetails implements Serializable {

    @Id
    private String id;

    private String name;

    private String description;

    private String status;

    private String automationId;

    private String currentScript;

    @JsonIgnore
    @DBRef
    Automation automation;


    public Robot() {

    }
}
