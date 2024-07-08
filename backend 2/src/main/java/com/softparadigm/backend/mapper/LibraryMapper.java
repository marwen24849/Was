package com.softparadigm.backend.mapper;


import com.softparadigm.backend.dto.LibraryDTO;
import com.softparadigm.backend.model.Library;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LibraryMapper {


    public LibraryDTO toDTO(Library library) {
        return new LibraryDTO(
                library.getId(),
                library.getName(),
                library.getDescription()
        );
    }


    public List<LibraryDTO> toDTOList(List<Library> libraries) {
        return libraries.stream()
                .map(this::toDTO).toList();
    }

    public Library toEntity(LibraryDTO libraryDTO) {
        Library library = new Library();
        library.setId(libraryDTO.getId());
        library.setName(libraryDTO.getName());
        library.setDescription(libraryDTO.getDescription());
        return library;
    }
}
