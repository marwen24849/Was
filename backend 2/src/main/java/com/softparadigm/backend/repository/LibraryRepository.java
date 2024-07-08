package com.softparadigm.backend.repository;

import com.softparadigm.backend.model.Library;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LibraryRepository extends MongoRepository<Library, String> {

    void deleteById(String id);

    boolean existsByName(String name);



}
