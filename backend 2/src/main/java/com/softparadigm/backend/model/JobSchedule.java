package com.softparadigm.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "jobSchedules")
@Getter
@Setter
public class JobSchedule extends AuditDetails {

    @Id
    private String id;

    private String name;

    private String description;

//    private LocalDateTime startDate;
//
//    private String intervalType;
//
//    private int intervalValue;

    private boolean active = true;

    private String robotId;

    @DBRef
    Robot robot;

    private String cronExpression;
}
