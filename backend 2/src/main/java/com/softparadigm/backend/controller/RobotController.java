package com.softparadigm.backend.controller;

import com.github.dockerjava.api.model.Container;
import com.softparadigm.backend.model.Robot;
import com.softparadigm.backend.service.RobotService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/robot")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RobotController {


    @Autowired
    private RobotService robotService;


    @GetMapping("/getAllRobots")
    @Operation(summary = "Get a List of All Robots")
    public ResponseEntity<List<Robot>> getAllRobots() {
        List<Robot> containerInfoList = robotService.listRunningRobots();
        return ResponseEntity.ok(containerInfoList);
    }


//    @GetMapping("/getRunningRobots")
//    @Operation(summary = "Get a list of running robots")
//    public ResponseEntity<List<?>> getRunningRobots() {
//        List<?> containerInfoList = robotService.listRunningRobots();
//        return ResponseEntity.ok(containerInfoList);
//    }




















    @PostMapping("/create")
    @Operation(summary = "Create a new robot")
    public ResponseEntity<Robot> createRobot(@RequestBody Robot robot) throws IOException {
        Robot savedRobot = robotService.createRobot(robot);
        return new ResponseEntity<>(savedRobot, HttpStatus.CREATED);
    }







    @PostMapping("/start/{containerId}")
    @Operation(summary = "Starts a robot")
    public ResponseEntity<String> startContainerWithLogs(@PathVariable String containerId) {
        try {
            robotService.startRobot(containerId);
            return ResponseEntity.ok("Container started successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to start container: " + e.getMessage());
        }
    }






    @PostMapping("/stop/{containerId}")
    @Operation(summary = "Stops a robot")
    public ResponseEntity<String> stopContainer(@PathVariable String containerId) {
        try {
            robotService.stopRobot(containerId);
            return ResponseEntity.ok("Container started successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to start container: " + e.getMessage());
        }
    }

}