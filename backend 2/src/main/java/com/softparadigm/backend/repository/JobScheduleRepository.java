package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.Job;
import com.softparadigm.backend.model.JobSchedule;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface JobScheduleRepository extends MongoRepository<JobSchedule, String> {

    List<JobSchedule>findAll();

    List<JobSchedule> findByActiveIsTrueAndCronExpressionNotNull();

}
