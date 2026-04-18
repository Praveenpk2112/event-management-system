package com.example.eventservice.eventController;

import com.example.eventservice.eventModel.eventModel;
import com.example.eventservice.eventService.eventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faculty")
@CrossOrigin(origins = "*")
public class facultyController {

    private eventService serv;

    facultyController(eventService serv1){
        this.serv = serv1;
    }

    @PostMapping("/post")
    public eventModel create(@RequestBody eventModel a){
        return serv.create(a);
    }

    @DeleteMapping("/delete/{stuRno}")
    public void delete(@PathVariable String stuRno){
        serv.delete(stuRno);
    }
}
