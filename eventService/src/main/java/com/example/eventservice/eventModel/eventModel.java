package com.example.eventservice.eventModel;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Document(collection = "events")
public class eventModel {
    @Id
    private String stuRno;
    private String stuName;
    private String eventName;
    private String eventLocation;
    private String eventDate;
    private String facId;
}
