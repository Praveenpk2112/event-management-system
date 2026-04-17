package com.example.studentregister.controller;

import com.example.studentregister.registerModel.registerModel;
import com.example.studentregister.registerService.registerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:5173/")
public class loginController {
    private final registerService serv;
    loginController(registerService serv1){
        this.serv = serv1;
    }

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/")
    public Object login(@RequestBody registerModel a){
        registerModel aa = serv.findbylogin(a);
        if(aa == null){
            return null;
        }
        String url = "http://localhost:8084/events/find/" + aa.getStuRno() + "/" + aa.getStuName();
        return restTemplate.getForObject(url, Object.class);
    }
}
