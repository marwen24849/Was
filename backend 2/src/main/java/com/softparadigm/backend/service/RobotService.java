package com.softparadigm.backend.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.StartContainerCmd;
import com.github.dockerjava.api.command.StopContainerCmd;
import com.github.dockerjava.api.command.WaitContainerResultCallback;
import com.github.dockerjava.api.exception.NotFoundException;
import com.github.dockerjava.api.model.Bind;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.api.model.Volume;
import com.github.dockerjava.core.command.LogContainerResultCallback;
import com.softparadigm.backend.model.Automation;
import com.softparadigm.backend.model.Robot;
import com.softparadigm.backend.repository.AutomationRepository;
import com.softparadigm.backend.repository.RobotRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class RobotService {

    private static final Logger logger = LoggerFactory.getLogger(RobotService.class);


    @Autowired
    private DockerClient dockerClient;
    @Autowired
    private RobotRepository robotRepository;
    @Autowired
    private AutomationRepository automationRepository;

    private final String BASE_IMAGE = "robotframework-base";

    Set<PosixFilePermission> permissions
            = PosixFilePermissions.fromString("rwxrwxrwx");

    private CountDownLatch countDownLatch = new CountDownLatch(1);







    public Robot createRobot(Robot robot) throws IOException {
        Automation automation = getAutomation(robot.getAutomationId());
        String scriptContent = generateScriptContent(automation);
        String scriptPath = "/Users/wassef/Desktop/backend/src/main/resources/tmp/example.robot";
        try (FileWriter writer = new FileWriter(scriptPath)) {
            writer.write(scriptContent);
            System.out.println("Script written to file successfully: " + scriptPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        setScriptPermissions(scriptPath);

        String containerOutputDir = "/app/results";
        //setScriptPermissions(containerOutputDir);
        String containerName = robot.getName();

        try {
            String containerId = createDockerContainer(containerName, scriptPath, scriptContent, containerOutputDir);
            return saveRobot(robot, automation, scriptContent, containerId);
        } catch (Exception e) {
            System.err.println("Failed to create robot: " + e.getMessage());
            return null;
        }
    }

    private Automation getAutomation(String automationId) {
        return automationRepository.findById(automationId)
                .orElseThrow(() -> new RuntimeException("Automation not found"));
    }

    private String generateScriptContent(Automation automation) throws IOException {
        return automation.appendScriptToTemplate(automation.generateScript(""));
    }

    private void setScriptPermissions(String scriptPath) {
        try {
            Path path = Paths.get(scriptPath);
            Files.setPosixFilePermissions(path, permissions);
            System.out.println("Permissions set successfully for: " + scriptPath);
        } catch (IOException e) {
            System.err.println("Failed to set permissions: " + e.getMessage());
        }
    }

    private String createDockerContainer(String containerName, String scriptPath, String scriptContent, String containerOutputDir) {
        try {

            var creationResp = dockerClient.createContainerCmd(BASE_IMAGE)

            .withBinds( new Bind(System.getProperty("user.dir") +"/src/main/resources/tmp/",new Volume( "/app/tests/") ),
                    new Bind(System.getProperty("user.dir") +"/src/main/resources/results/",new Volume( "/app/results/") ))
                    .withName(containerName)
                    .withCmd("robot", "--outputdir", containerOutputDir, "/app/tests/example.robot")
                    .exec();


            return creationResp.getId();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Docker container", e);
        }
    }

    private Robot saveRobot(Robot robot, Automation automation, String scriptContent, String containerId) {
        try {
            InspectContainerResponse containerInfo = dockerClient.inspectContainerCmd(containerId).exec();

            Robot newRobot = new Robot();
            newRobot.setId(containerId);
            newRobot.setName(robot.getName());
            newRobot.setDescription(robot.getDescription());
            newRobot.setAutomation(automation);
            newRobot.setCurrentScript(scriptContent);
            newRobot.setStatus(containerInfo.getState().getStatus());

            return robotRepository.save(newRobot);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save robot entity", e);
        }
    }


//======================================================================================================================


    public void startRobot(String robotId) {
        try {
            startDockerContainer(robotId);
            waitForContainer(robotId);
            System.out.println("Container " + robotId + " has stopped. Proceeding to copy results...");

            String containerResultsPath = "/app/results/";
            String hostResultsPath = "/Users/wassef/Desktop/backend/src/main/resources/results/";

            copyResultsFromContainer(robotId, containerResultsPath, hostResultsPath);
        } catch (Exception e) {

            System.err.println("Failed during robot execution for robot " + robotId + ": " + e.getMessage());

        }
    }




    private void startDockerContainer(String robotId) {
        try {
            System.out.println("Starting Docker container for robot: " + robotId);
            dockerClient.startContainerCmd(robotId).exec();
            System.out.println("Docker container started successfully: " + robotId);
        } catch (Exception e) {
            System.err.println("Failed to start Docker container for robot " + robotId + ": " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to start Docker container for robot " + robotId, e);
        }
    }


    private void waitForContainer(String robotId) {
        try {
            dockerClient.waitContainerCmd(robotId).exec(new WaitContainerResultCallback());
        } catch (Exception e) {
            System.err.println("Failed while waiting for Docker container " + robotId + " to finish: " + e.getMessage());
            e.printStackTrace();
        }
    }



    String containerResultsPath = "/app/results/";
    String hostResultsPath = "/Users/wassef/Desktop/backend/src/main/resources/results/";
    private void copyResultsFromContainer(String robotId, String containerResultsPath, String hostResultsPath) {
        try {

            System.out.println("Copying results from Docker container " + robotId + " to host...");

            dockerClient.copyArchiveFromContainerCmd(robotId, containerResultsPath)
                    .withHostPath(hostResultsPath)
                    .exec();


            System.out.println("Results copied successfully from Docker container " + robotId + " to host.");

        } catch (Exception copyException) {

            System.err.println("Failed to copy results from Docker container " + robotId + ": " + copyException.getMessage());
            copyException.printStackTrace();

        }
    }

//======================================================================================================================


    public void stopRobot(String robotId) {
        try {
            StopContainerCmd stoptCmd = dockerClient.stopContainerCmd(robotId);
            stoptCmd.exec();

        } catch (NotFoundException e) {
            System.err.println("Container not found: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Failed to start container: " + e.getMessage());

        }
    }

//======================================================================================================================













    public List<?> listAllRobots() {
        List<Container> containers = dockerClient.listContainersCmd().withShowAll(true).exec();
        List<?> containerInfoList = containers.stream()
                .filter(container -> container.getImage().equals(BASE_IMAGE))
                //.map(container ->new Robot(container.getId(), container.getNames()[0], "",container.getState(), null," "," " ))
                .collect(Collectors.toList());
        return containerInfoList;
    }




//======================================================================================================================




    private Robot mapContainerToRobot(Container container) {
        Robot robot = new Robot();
        robot.setId(container.getId());
        robot.setName(container.getNames()[0]); // Example: Assuming names is an array
        robot.setDescription("Description placeholder"); // Set description as needed
        robot.setStatus(container.getState());

        return robot;
    }


    public List<Robot> listRunningRobots() {
        List<Robot> robots = new ArrayList<>();
        try {

            robots = dockerClient.listContainersCmd().withShowAll(true).exec().stream()
                    .filter(container -> container.getImage().contains(BASE_IMAGE))
                    .map(this::mapContainerToRobot)
                    .collect(Collectors.toList());


            System.out.println("Currently running robots: " + robots.size());

        } catch (Exception e) {
            System.err.println("Error retrieving running robots: " + e.getMessage());
            e.printStackTrace();
        }
        return robots;
    }








}
