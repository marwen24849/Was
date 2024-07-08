package com.softparadigm.backend.model;

import com.softparadigm.backend.enums.JobStatus;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;
@Document(collection = "jobs")
@Getter
@Setter
public class Job extends AuditDetails {

    @Id
    private String id;

    private String name;

    private String description;

    private JobStatus status;

    private LocalDateTime startTime;

    private String logs;


}
