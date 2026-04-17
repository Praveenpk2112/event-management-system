package com.example.facultyservice.facultyModel;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "faculty")
public class facultyModel {
    @Id
    private String facId;
    private String facName;
    private String email;
    private String password;
}
