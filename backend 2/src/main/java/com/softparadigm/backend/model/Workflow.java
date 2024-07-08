package com.softparadigm.backend.model;

import com.softparadigm.backend.enums.WorkflowType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Getter
@Setter
public class Workflow extends AuditDetails {


    @Id
    private String id;

    private String name;

    private String description;

    private Map<String,String> properties= new HashMap<>();

    public List<Component> sequence =new ArrayList<>();

    private WorkflowType type;



    public String generateScript(String identation) {
        StringBuilder script = new StringBuilder(getName().toUpperCase() + "\n");
        for (Component component : sequence) {
            script.append(component.generateScript("\t"));
        }
        return script.toString();
    }

    public String appendScriptToTemplate(String scriptToAppend) throws IOException {

        StringBuilder templateContent = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader("src/main/resources/template.robot"))) {
            String line;
            boolean tasksSectionFound = false;
            boolean inTasksSection = false;

            while ((line = reader.readLine()) != null) {
                if (line.trim().equalsIgnoreCase("*** Tasks ***")) {
                    tasksSectionFound = true;
                    inTasksSection = true;
                } else if (tasksSectionFound && !line.trim().startsWith("***")) {
                    inTasksSection = true;
                } else if (tasksSectionFound && line.trim().startsWith("***")) {
                    inTasksSection = false;
                }

                templateContent.append(line).append("\n");
            }
        }

        // Append script under Tasks section
        String appendedContent = templateContent.toString() + "\n" + scriptToAppend;

        return appendedContent;
    }
}
