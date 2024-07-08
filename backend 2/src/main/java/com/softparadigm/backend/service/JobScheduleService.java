package com.softparadigm.backend.service;


import com.softparadigm.backend.enums.JobStatus;
import com.softparadigm.backend.model.JobSchedule;
//import com.softparadigm.backend.model.ProductionJob;
import com.softparadigm.backend.repository.JobScheduleRepository;
import com.softparadigm.backend.repository.RobotRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.support.CronExpression;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;


@Service
public class JobScheduleService {

    private static final Logger logger = LoggerFactory.getLogger(JobScheduleService.class);


    @Autowired
    private JobService jobService;
    @Autowired
    private RobotService robotService;

    @Autowired
    private JobScheduleRepository jobScheduleRepository;
    @Autowired
    private RobotRepository robotRepository;

    @Autowired
    private TaskScheduler taskScheduler;






    public JobSchedule createSchedule(JobSchedule schedule) {
        JobSchedule newSchedule = new JobSchedule();
        newSchedule.setName(schedule.getName());
        newSchedule.setDescription(schedule.getDescription());
//        newSchedule.setStartDate(schedule.getStartDate());
//        newSchedule.setIntervalType(schedule.getIntervalType());
//        newSchedule.setIntervalValue(schedule.getIntervalValue());
        newSchedule.setRobot(robotRepository.findById(schedule.getRobotId()).orElse(null));
        newSchedule.setCronExpression(schedule.getCronExpression());

        return jobScheduleRepository.save(newSchedule);
    }

    public List<JobSchedule> getAllSchedules() {
        return jobScheduleRepository.findAll();
    }


    public JobSchedule updateSchedule(String id, JobSchedule scheduleDetails) {
        JobSchedule schedule = jobScheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found for this id :: " + id));
        schedule.setName(scheduleDetails.getName());
        schedule.setDescription(scheduleDetails.getDescription());
//        schedule.setStartDate(scheduleDetails.getStartDate());
//        schedule.setIntervalType(scheduleDetails.getIntervalType());
//        schedule.setIntervalValue(scheduleDetails.getIntervalValue());
        schedule.setRobot(robotRepository.findById(scheduleDetails.getRobotId()).orElse(null));
        schedule.setActive(scheduleDetails.isActive());
        schedule.setCronExpression(scheduleDetails.getCronExpression()); // Update cron expression

        return jobScheduleRepository.save(schedule);
    }

    public JobSchedule updateScheduleStatus(String id, boolean status) {
        JobSchedule schedule = jobScheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found for this id :: " + id));
        schedule.setActive(status);
        return jobScheduleRepository.save(schedule);
    }

    public void deleteSchedule(String id) {
        JobSchedule schedule = jobScheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found for this id :: " + id));
        jobScheduleRepository.delete(schedule);
    }





//    @Scheduled(cron = "*/30 * * * * *")
    public void checkAndTriggerCronJobs() {
//        LocalDateTime now = LocalDateTime.now();
//        logger.info("Checking for cron jobs to trigger at {}", now);
//
//        List<JobSchedule> schedulesWithCron = jobScheduleRepository.findByActiveIsTrueAndCronExpressionNotNull();
//        logger.info("Found {} schedules to check", schedulesWithCron.size());
//
//        for (JobSchedule schedule : schedulesWithCron) {
//            try {
//                CronExpression cronExpression = CronExpression.parse(schedule.getCronExpression());
//                System.out.println("=======>");
//                System.out.println(cronExpression);
//                LocalDateTime nextExecution = cronExpression.next(now);
//                System.out.println("=======>");
//                System.out.println(nextExecution);
//
//                logger.info("Schedule {} next execution time: {}", schedule.getId(), nextExecution);
//
//                if (nextExecution != null && (nextExecution.isBefore(now) || nextExecution.equals(now))) {
//                    logger.info("Triggering job for schedule {} at {}", schedule.getId(), now);
//                    triggerJob(schedule);
//                    logger.info("Job triggered for schedule {} at {}", schedule.getId(), now);
//                } else {
//                    logger.info("Schedule {} is not due for execution. Next execution time: {}", schedule.getId(), nextExecution);
//                }
//            } catch (IllegalArgumentException e) {
//                logger.warn("Invalid cron expression found for schedule {}", schedule.getId(), e);
//            } catch (Exception e) {
//                logger.error("Error processing schedule {}", schedule.getId(), e);
//            }
//        }
    }




    private void triggerJob(JobSchedule schedule) {
        // Implement the job triggering logic here
        logger.info("Executing schedule: " + schedule.getName());
    }











//    private void triggerJob(JobSchedule schedule) {
//        logger.info("Creating production job for schedule: {}", schedule.getId());
//
//        ProductionJob execution = new ProductionJob();
//        execution.setJobSchedule(schedule);
//        execution.setStartTime(LocalDateTime.now());
//        execution.setStatus(JobStatus.PENDING);
//
//        jobService.saveProductionJob(execution);
//        logger.info("Production job created with status PENDING for schedule: {}", schedule.getId());
//
//        logger.info("Starting container with logs for robot: {}", schedule.getRobotId());
//
//        robotService.startContainerWithLogs(schedule.getRobot().getId());
//    }


}
