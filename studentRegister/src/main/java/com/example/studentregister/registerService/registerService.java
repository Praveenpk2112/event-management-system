package com.example.studentregister.registerService;

import com.example.studentregister.registerModel.registerModel;
import com.example.studentregister.registerRepository.registerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class registerService {
    private final registerRepository repo;
    registerService(registerRepository repo1){
        this.repo = repo1;
    }

    public registerModel create(registerModel a) {
        return repo.save(a);
    }

    public List<registerModel> findstudents() {
        return repo.findAll();
    }

    public registerModel findbylogin(registerModel a) {
        return repo.findByEmailAndPassword(a.getEmail(),a.getPassword());
    }
}
