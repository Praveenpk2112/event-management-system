package com.example.studentregister.registerModel;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "student")
public class registerModel {
    @Id
    private String stuRno;
    private String stuName;
    private String email;
    private String password;
}
