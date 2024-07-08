package com.softparadigm.backend.mapper;

import com.softparadigm.backend.dto.StepDTO;
import com.softparadigm.backend.model.Step;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class StepMapper {

    public StepDTO toDTO(Step step) {
        return new StepDTO(
                step.getId(),
                step.getName(),
                step.getProperties(),
                step.getDescription(),
                step.getType(),
                step.getComponentType()

        );
    }

    public List<StepDTO> toDTOList(List<Step> steps) {
        return steps.stream()
                .map(this::toDTO).toList();


    }

    public Step toEntity(StepDTO stepDTO) {
        Step step = new Step();
        step.setId(stepDTO.getId());
        step.setName(stepDTO.getName());
        step.setProperties(stepDTO.getProperties());
        step.setDescription(stepDTO.getDescription());
//        task.setType(taskDTO.getType());
//        task.setComponentType(taskDTO.getComponentType());
        return step;
    }
}
