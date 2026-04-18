package com.example.studentregister.controller;

import com.example.studentregister.registerModel.registerModel;
import com.example.studentregister.registerService.registerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "*")
public class registerController {
    private final registerService serv;
    registerController(registerService serv1){
        this.serv = serv1;
    }

    @PostMapping("/user")
    public registerModel create(@RequestBody registerModel a){
        return serv.create(a);
    }

    @GetMapping("/all")
    public List<registerModel> findstudents(){
        return serv.findstudents();
    }



}
