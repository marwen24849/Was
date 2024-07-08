package com.softparadigm.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
//import org.springframework.messaging.converter.StringMessageConverter;
//import org.springframework.messaging.simp.stomp.StompHeaders;
//import org.springframework.messaging.simp.stomp.StompSession;
//import org.springframework.messaging.simp.stomp.StompSessionHandler;
//import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.web.socket.client.standard.StandardWebSocketClient;
//import org.springframework.web.socket.messaging.WebSocketStompClient;

@SpringBootApplication
@EnableMongoAuditing
@EnableScheduling
//@EnableMethodSecurity(prePostEnabled = true)
public class RpaApplication  {

	public static void main(String[] args) {
		SpringApplication.run(RpaApplication.class, args);}





//	@Autowired
//	private ProcessRepository processRepository;
//	@Autowired
//	private UserRepository userRepository;
//	@Autowired
//	private JobService jobService;
//	@Autowired
//	private JobRepository jobRepository;
//
//	@Autowired
//	private JobScheduleService jobScheduleService;
//
//
//	@Override
//	public void run(String... args) throws Exception {
//		// Ensure the process exists
//		Process process = processRepository.findById("66657e3ea901024c55541d92").orElse(null);
//
//
//		// Ensure the user exists
//		User user = userRepository.findById("1").orElse(null);
//
//
////		// Create a job
////		Job job = new Job();
////		job.setUser(user);
////		job.setProcess(process);
////		job.setStatus(JobStatus.PENDING);
////		jobRepository.save(job);
////
////		// Test the executeJob method
////		jobService.executeJob(job);
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Date scheduledTime = new Date(System.currentTimeMillis() + 5000); // 5 seconds from now
//
//		String name = "Test Scheduled Job";
//		String description = "This is a test scheduled job";
//
//		jobScheduleService.scheduleJob("1", "66657e3ea901024c55541d92", scheduledTime, name, description);
//
//		// Keep the application running to observe the scheduled job execution
//		Thread.sleep(10000); // Wait for 10 seconds to allow the job to execute
//	}

//	Map<String, Object> step1Properties = new HashMap<>();
//		step1Properties.put("Property 1", "Value 1");
//		step1Properties.put("Property 2", "Value 2");
//
//		Map<String, Object> step2Properties = new HashMap<>();
//		step2Properties.put("Property 1", new HashMap<>());
//		step2Properties.put("Property 2", new HashMap<>());
//
//		Map<String, Object> process1Properties = new HashMap<>();
//		process1Properties.put("Property 1", "Value 1");
//		process1Properties.put("Property 2", "Value 2");
//
//
//		Workflow workflow = new Workflow();
//		workflow.setId("1");
//		workflow.setName("My Workflow");
//
//		Step step1 = new Step();
//		step1.setName("step1");
//		step1.setProperties(step1Properties);
//
//		Step step2 = new Step();
//		step2.setName("step2");
//		step2.setProperties(step2Properties);
//
//		Step step3 = new Step();
//		step3.setName("step3");
//		step3.setProperties(step1Properties);
//
//		Step step4 = new Step();
//		step4.setName("step4");
//		step4.setProperties(step2Properties);
//
//		// Create processes
//		Process process1 = new Process();
//		process1.setName("Process 1");
//		process1.setProperties(process1Properties);
//		process1.add(step2);
//
//
//		Process process2 = new Process();
//		process2.setName("Process 2");
//		process2.add(step3,process1);
//
//		Process process3 = new Process();
//		process3.setName("Process 3");
//		process3.add(step4);
//
//		Process process4 = new Process();
//		process4.setName("Process 4");
//		process4.add(step1,process2,process3);
//
//
//
//
//		// Add processes to the workflow
//		workflow.setSequence(Arrays.asList(step1,process2,process3));
//
//		// Generate the script
//		String script = workflow.generateScript("");
//		System.out.println(script);
//	}







}
