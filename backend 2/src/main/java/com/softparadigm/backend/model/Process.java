package com.softparadigm.backend.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Document(collection = "process")
@Getter
@Setter
public class Process extends Component {

    public Process() {
    }


    @Id
    private String id;

    private List<Component> sequence = new ArrayList<>();

    private Process parentProcess;

//    private String type = "process";

    private String componentType = "container";

    @Override
    public String generateScript(String identation) {
        StringBuilder script = new StringBuilder();
        script.append(identation);
        script.append(getName().toUpperCase());
        script.append("\n");
        for (Component component : sequence) {
            script.append(component.generateScript(identation +"\t"));
        }
        return script.toString();
    }






    public void add(Component component) {
        sequence.add(component);
        if (component instanceof Process) {
            ((Process) component).setParentProcess(this);
        }
    }

    public void add(Component... components) {
        sequence.addAll(Arrays.asList(components));
    }

    public void remove(Component child) {
        sequence.remove(child);
    }

    public void remove(Component... components) {
        sequence.removeAll(Arrays.asList(components));
    }




}
