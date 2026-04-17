package com.example.studentregister.registerModel;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "events")
public class eventModel {
    @Id
    private String stuName;
    private String stuRno;
    private String eventName;
    private String eventLocation;
    private String eventDate;

}
