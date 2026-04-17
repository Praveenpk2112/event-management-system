package com.example.facultyservice.facultyController;

import com.example.facultyservice.facultyModel.eventModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/faculty/events")
@CrossOrigin(origins = "http://localhost:5173/")
public class facultyEventController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String EVENT_SERVICE_URL = "http://localhost:8084/faculty/post";
    private static final String EVENT_DELETE_URL = "http://localhost:8084/faculty/delete/";

    @PostMapping("/post")
    public Object postEvent(@RequestBody eventModel event) {
        return restTemplate.postForObject(EVENT_SERVICE_URL, event, Object.class);
    }

    @DeleteMapping("/delete/{stuRno}")
    public void deleteEvent(@PathVariable String stuRno) {
        restTemplate.delete(EVENT_DELETE_URL + stuRno);
    }
}
