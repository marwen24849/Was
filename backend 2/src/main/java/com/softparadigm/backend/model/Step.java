package com.softparadigm.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;


@Document(collection = "step")
@Getter
@Setter
public class Step extends Component {

    public Step() {
    }


    @Id
    private String id;

    private String type = "step";

    private String componentType = "task";

    @JsonIgnore
    @DBRef
    Library library;

    @Override
    public String generateScript(String identation) {
        StringBuilder script = new StringBuilder();
        script.append(identation);
        script.append(getName());
        for (Map.Entry<String, Object> entry : getProperties().entrySet()) {
            script.append("\t" +entry.getValue());
        }
        script.append("\n");
        return script.toString();
    }


}
