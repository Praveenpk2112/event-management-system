package com.example.eventservice.eventController;

import com.example.eventservice.eventModel.eventModel;
import com.example.eventservice.eventService.eventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://localhost:5173/")
public class eventController {
    private eventService serv;
    eventController(eventService serv1){
       this.serv = serv1;
    }

    @GetMapping("/find/{rno}/{name}")
    public eventModel find(@PathVariable String rno, @PathVariable String name){
        return serv.find(rno, name);
    }

    @GetMapping("/all")
    public List<eventModel> findAll(){
        return serv.findAll();
    }
}
