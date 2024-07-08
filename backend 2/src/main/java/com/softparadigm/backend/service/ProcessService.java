package com.softparadigm.backend.service;


import com.softparadigm.backend.model.Process;
import com.softparadigm.backend.repository.ProcessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProcessService {

    private final ProcessRepository processRepository;


    public String save(Process process){
        return processRepository.save(process).getId();


    }

    public Process findById(String id){
        return processRepository.findById(id).get();
    }

    public List<Process> findAll(){
        return processRepository.findAll();
    }

    public String getScript(Process process){
        System.out.println(process.generateScript(""));
        return process.generateScript("");
    }
}
