package com.softparadigm.backend.model;


import java.util.List;
import java.util.Map;

public class WorkflowFactory {

    public static Automation createAutomationFromProject(Project project) {
        Automation automation = new Automation();
        automation.setSequence(project.getSequence());


        return automation;
    }

    public static Template createTemplateFromProject(Project project) {
        Template template = new Template();
        template.setSequence(project.getSequence());

        // Clear values recursively in the sequence
        clearPropertiesValue(template.getSequence());
        return template;
    }



    public static Project createProjectFromTemplate(Template template) {
        Project project = new Project();
        project.setSequence(template.getSequence());
        return project;
    }





    private static void clearPropertiesValue(List<Component> sequence) {
        if (sequence == null) {
            return;
        }
        for (Component component : sequence) {
            clearPropertyValue(component.getProperties());
        }
    }

    // Method to recursively clear "value" fields in properties map
    private static void clearPropertyValue(Map<String, Object> properties) {
        if (properties == null) {
            return;
        }
        for (Map.Entry<String, Object> entry : properties.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof String || value instanceof Number || value instanceof Boolean) {
                // Reset values based on type
                if (value instanceof String) {
                    entry.setValue("");
                } else if (value instanceof Number) {
                    entry.setValue(0); // Reset Number value to 0
                } else if (value instanceof Boolean) {
                    entry.setValue(false); // Reset Boolean value to false
                }
            } else
                if (value instanceof Map) {
                clearPropertyValue((Map<String, Object>) value); // Recursively clear nested maps
            } else if (value instanceof List) {
                for (Object obj : (List<Object>) value) {
                    if (obj instanceof Map) {
                        clearPropertyValue((Map<String, Object>) obj); // Recursively clear nested maps in list
                    }
                }
            }
        }
    }
}
