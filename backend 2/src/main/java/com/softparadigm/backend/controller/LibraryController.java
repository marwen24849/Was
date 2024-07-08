package com.softparadigm.backend.controller;

import com.softparadigm.backend.dto.LibraryDTO;
import com.softparadigm.backend.serviceImpl.LibraryServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
@CrossOrigin("*")
public class LibraryController {

    private final LibraryServiceImpl libraryServiceImpl;

    public LibraryController(LibraryServiceImpl libraryServiceImpl) {
        this.libraryServiceImpl = libraryServiceImpl;
    }


    @PostMapping("/createGroup")
    public ResponseEntity<LibraryDTO> createGroup(@RequestBody LibraryDTO libraryDTO){
        LibraryDTO createdGroup = libraryServiceImpl.save(libraryDTO);
        return ResponseEntity.ok(createdGroup);
    }


    @GetMapping
    public ResponseEntity<List<LibraryDTO>> getAll(){
        List<LibraryDTO> groups = libraryServiceImpl.findAll();
        return ResponseEntity.ok(groups);
    }


    @GetMapping("/{groupId}")
    public ResponseEntity<LibraryDTO> getById(@PathVariable("groupId") String groupId){
        return ResponseEntity.ok(libraryServiceImpl.findById(groupId));
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<LibraryDTO> save(@PathVariable("groupId") String groupId,
                                           @RequestBody LibraryDTO libraryDTO){
        LibraryDTO updatedGroup = libraryServiceImpl.update(groupId, libraryDTO);
        return ResponseEntity.ok(updatedGroup);
    }



    @DeleteMapping("/{group-id}")
    public ResponseEntity<String> delete(@PathVariable("group-id") String groupId){
        libraryServiceImpl.delete(groupId);
        var resp = "deleted successfully";
        return ResponseEntity.ok(resp);
    }
}
