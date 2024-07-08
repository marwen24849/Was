package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.DevelopementJob;
import com.softparadigm.backend.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DevelopementJobRepository extends MongoRepository<DevelopementJob, String> {

    List<DevelopementJob> findAllByCreatedBy(String userId);
}
