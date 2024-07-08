package com.softparadigm.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LibraryDTO {

    private String id;
    private String name;
    private String description;

    public LibraryDTO(String id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
