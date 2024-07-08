package com.softparadigm.backend.model;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DevelopementJob")
@Getter
@Setter
public class DevelopementJob extends Job{


    @DBRef
    Project project;
}
