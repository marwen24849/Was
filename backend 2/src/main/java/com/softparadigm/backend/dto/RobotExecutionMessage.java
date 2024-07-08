package com.softparadigm.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RobotExecutionMessage {
    private String userId;
    private String event;
    private String jobId;
    private String script;
}