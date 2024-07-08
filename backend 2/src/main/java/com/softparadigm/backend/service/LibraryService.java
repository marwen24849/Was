package com.softparadigm.backend.service;

import com.softparadigm.backend.dto.LibraryDTO;

import java.util.List;

public interface LibraryService {

    LibraryDTO save(LibraryDTO libraryDTO);
    List<LibraryDTO> findAll();
    LibraryDTO findById(String id);
    LibraryDTO update(String id, LibraryDTO updatedLibraryDTO);
    void delete(String id);
}
