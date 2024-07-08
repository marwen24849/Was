package com.softparadigm.backend.service;

import com.softparadigm.backend.dto.StepDTO;
import com.softparadigm.backend.model.Step;

import java.util.List;

public interface StepService {

    StepDTO save(StepDTO stepDTO, String groupId);
    StepDTO findById(String id);
    List<StepDTO> findAll();
    StepDTO update(String id, StepDTO updatedStepDTO);
    void delete(String id);
    List<StepDTO> findTasksByGroupId(String id);




}
