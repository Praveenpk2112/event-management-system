package com.example.facultyservice.facultyController;

import com.example.facultyservice.facultyModel.facultyModel;
import com.example.facultyservice.facultyService.facultyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/faculty")
@CrossOrigin(origins = "*")
public class facultyAuthController {

    private final facultyService serv;

    facultyAuthController(facultyService serv1) {
        this.serv = serv1;
    }

    @PostMapping("/register")
    public facultyModel register(@RequestBody facultyModel a) {
        return serv.register(a);
    }

    @PostMapping("/login")
    public facultyModel login(@RequestBody facultyModel a) {
        return serv.login(a);
    }
}
