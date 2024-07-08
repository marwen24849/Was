package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.Process;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProcessRepository extends MongoRepository<Process, String> {

    List<Process> findAll();
}
