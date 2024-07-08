package com.softparadigm.backend.serviceImpl;

import com.softparadigm.backend.dto.LibraryDTO;
import com.softparadigm.backend.mapper.LibraryMapper;
import com.softparadigm.backend.model.Library;
import com.softparadigm.backend.repository.LibraryRepository;
import com.softparadigm.backend.repository.StepRepository;
import com.softparadigm.backend.service.LibraryService;
import lombok.RequiredArgsConstructor;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {

    private final LibraryRepository libraryRepository;
    private final StepRepository stepRepository;
    private final LibraryMapper libraryMapper;

    public static final String ID_NOT_NULL_MESSAGE = "ID must not be null";
    public static final String GROUP_NOT_NULL_MESSAGE = "Group must not be null";

    @Transactional
    @Override
    public LibraryDTO save(LibraryDTO libraryDTO){

        if (libraryDTO == null || libraryRepository.existsByName(libraryDTO.getName())) {
            throw new IllegalArgumentException("GroupDTO must not be null or exists");
        }
        Library library = libraryMapper.toEntity(libraryDTO);
        Library savedLibrary = libraryRepository.save(library);
        System.out.println(savedLibrary);

        return libraryMapper.toDTO(savedLibrary);
    }

    @Override
    public List<LibraryDTO> findAll(){

        List<Library> fetchedLibraries = libraryRepository.findAll();

        return libraryMapper.toDTOList(fetchedLibraries);
    }


    @Override
    public LibraryDTO findById(String id){

        Objects.requireNonNull(id,ID_NOT_NULL_MESSAGE);
        Library library = libraryRepository.findById(id).orElse(null);
        Objects.requireNonNull(library,GROUP_NOT_NULL_MESSAGE);

        return libraryMapper.toDTO(library);
    }



    @Transactional
    @Override
    public LibraryDTO update(String id, LibraryDTO updatedLibraryDTO) {

        Objects.requireNonNull(id, ID_NOT_NULL_MESSAGE);
        Library existingLibrary = libraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("group not found for ID: " + id));
        existingLibrary.setName(updatedLibraryDTO.getName());
        existingLibrary.setDescription(updatedLibraryDTO.getDescription());
        Library updatedLibrary = libraryRepository.save(existingLibrary);

        return libraryMapper.toDTO(updatedLibrary);
    }



    @Override
    public void delete(String id){

        Objects.requireNonNull(id, ID_NOT_NULL_MESSAGE);
        if (!libraryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Group not found for ID: " + id);
        }

        stepRepository.deleteAllByLibraryId(id);
        libraryRepository.deleteById(id);

    }
}
