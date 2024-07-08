package com.softparadigm.backend.service;


import com.softparadigm.backend.dto.JobPayload;
import com.softparadigm.backend.enums.JobStatus;
import com.softparadigm.backend.model.*;
import com.softparadigm.backend.repository.DevelopementJobRepository;
//import com.softparadigm.backend.repository.ProductionJobRepository;
import com.softparadigm.backend.repository.ProjectRepository;
import com.softparadigm.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {


    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final DevelopementJobRepository developementJobRepository;
    //private final ProductionJobRepository productionJobRepository;





//    @Transactional
//    public ProductionJob saveProductionJob(ProductionJob productionJob){
//        return productionJobRepository.save(productionJob);
//    }




    @Transactional
    public DevelopementJob saveDevelopementJob(JobPayload jobPayload){

        //User user = userRepository.findById(jobPayload.getUserId()).orElseThrow();

        Project project = projectRepository.findById(jobPayload.getProjectId()).orElseThrow();
        System.out.println(project);


        DevelopementJob developementJob = new DevelopementJob();
        developementJob.setCreatedBy(jobPayload.getUserId());
        developementJob.setProject(project);
        developementJob.setStatus(JobStatus.PENDING);
        return developementJobRepository.save(developementJob);



    }


    public void createAndExecuteDevelopementJob(String userId, String processId) {
        User user = userRepository.findById(userId).orElseThrow();
        Project project = projectRepository.findById(processId).orElseThrow();
        DevelopementJob developementJob = new DevelopementJob();
        developementJob.setCreatedBy("user");
        developementJob.setProject(project);
        developementJob.setStatus(JobStatus.PENDING);
        Job savedJob = developementJobRepository.save(developementJob);
        executeJob(developementJob);
    }

    public List<DevelopementJob> findAll(){
        List<DevelopementJob> DevelopementJobs = developementJobRepository.findAll();
        return DevelopementJobs;
    }

    public DevelopementJob findById(String id){
        DevelopementJob fetchedJob = developementJobRepository.findById(id).orElseThrow();
        return fetchedJob;
    }

    public List<DevelopementJob> findAllByUserId(String userId){
        List<DevelopementJob> fetchedJobByUser = developementJobRepository.findAllByCreatedBy(userId);
        return fetchedJobByUser;
    }



    public void executeJob(Job job) {
//        System.out.println("executing job");
//        try {
//            String script = job.getProcess().generateScript("");
//            System.out.println("executing this script"+ script);
//
//            String filePath = "./" + job.getId() + ".robot";
//            try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
//                writer.write(script);
//            }
//            System.out.println("Job ID: " + job.getId());
//
//            // Start the process to display the content of the .robot file
//            ProcessBuilder processBuilder = new ProcessBuilder("cat", filePath);
//            processBuilder.redirectOutput(ProcessBuilder.Redirect.INHERIT);
//            processBuilder.redirectError(ProcessBuilder.Redirect.INHERIT);
//            java.lang.Process process = processBuilder.start();
//
//            // Wait for the process to complete and capture the exit code
//            int exitCode = process.waitFor();
//            System.out.println("Process exited with code: " + exitCode);
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//
//        }
    }
}
