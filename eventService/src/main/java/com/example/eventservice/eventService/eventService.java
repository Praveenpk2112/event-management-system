package com.example.eventservice.eventService;

import com.example.eventservice.eventModel.eventModel;
import com.example.eventservice.eventRepository.eventRepository;
import org.springframework.stereotype.Service;

@Service
public class eventService {
    private final eventRepository repo;
    eventService(eventRepository repo1){
        this.repo = repo1;
    }
    public eventModel create(eventModel a) {
        return repo.save(a);
    }

    public eventModel find(String stuRno, String stuName) {
        return repo.findByStuRnoAndStuName(stuRno,stuName);
    }

    public void delete(String stuRno) {
        repo.deleteById(stuRno);
    }

    public java.util.List<eventModel> findAll() {
        return repo.findAll();
    }
}
