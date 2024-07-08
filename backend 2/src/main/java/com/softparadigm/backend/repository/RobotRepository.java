package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.Robot;
import com.softparadigm.backend.model.Step;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RobotRepository extends MongoRepository<Robot, String> {
}
