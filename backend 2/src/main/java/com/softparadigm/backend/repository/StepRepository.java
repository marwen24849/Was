package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.Step;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StepRepository extends MongoRepository<Step, String> {

    void deleteAllByLibraryId(String groupId);

    List<Step> findStepByLibrary_Id(String id);






}
