package com.softparadigm.backend.serviceImpl;

import com.softparadigm.backend.dto.StepDTO;
import com.softparadigm.backend.mapper.StepMapper;
import com.softparadigm.backend.model.Library;
import com.softparadigm.backend.repository.LibraryRepository;
import com.softparadigm.backend.model.Step;
import com.softparadigm.backend.repository.StepRepository;
import com.softparadigm.backend.service.StepService;
import lombok.RequiredArgsConstructor;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class StepServiceImpl implements StepService {

    private final StepRepository stepRepository;
    private final StepMapper stepMapper;
    private final LibraryRepository libraryRepository;

    public static final String ID_NOT_NULL_MESSAGE = "ID must not be null";
    public static final String TASK_NOT_NULL_MESSAGE = "Task must not be null";




    @Transactional
    @Override
    public StepDTO save(StepDTO stepDTO, String groupId) {

        Library library = libraryRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found for ID: " + groupId));
        Step step = stepMapper.toEntity(stepDTO);
        step.setLibrary(library);
        Step savedStep = stepRepository.save(step);

        return  stepMapper.toDTO(savedStep);

    }


    @Override
    public StepDTO findById(String id){

        Objects.requireNonNull(id,ID_NOT_NULL_MESSAGE);
        Step step = stepRepository.findById(id).orElse(null);
        Objects.requireNonNull(step,TASK_NOT_NULL_MESSAGE);

        return stepMapper.toDTO(step);
    }

    @Override
    public List<StepDTO> findAll(){

        List<Step> fetchedSteps = stepRepository.findAll();

        return stepMapper.toDTOList(fetchedSteps);
    }

    @Transactional
    @Override
    public StepDTO update(String id, StepDTO updatedStepDTO) {
        Objects.requireNonNull(id, ID_NOT_NULL_MESSAGE);

        Step existingStep = stepRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found for ID: " + id));

        Library library = libraryRepository.findById(existingStep.getLibrary().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Group not found for ID: " + existingStep.getLibrary().getId()));


        existingStep.setName(updatedStepDTO.getName());
        existingStep.setProperties(updatedStepDTO.getProperties());
        existingStep.setType(updatedStepDTO.getType());
        existingStep.setComponentType(updatedStepDTO.getComponentType());
        existingStep.setDescription(updatedStepDTO.getDescription());
        existingStep.setLibrary(library);


        Step updatedStep = stepRepository.save(existingStep);


        return stepMapper.toDTO(updatedStep);
    }

    @Override
    public void delete(String id){

        Objects.requireNonNull(id, ID_NOT_NULL_MESSAGE);
        if (!stepRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found for ID: " + id);
        }
        stepRepository.deleteById(id);
    }

    @Override
    public List<StepDTO> findTasksByGroupId(String id){
        Objects.requireNonNull(id, ID_NOT_NULL_MESSAGE);
        List<Step> steps = stepRepository.findStepByLibrary_Id(id);
        return stepMapper.toDTOList(steps);
    }
}
