package com.example.eventservice.eventRepository;

import com.example.eventservice.eventModel.eventModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface eventRepository extends MongoRepository<eventModel,String> {


    eventModel findByStuRnoAndStuName(String stuRno, String stuName);
}
