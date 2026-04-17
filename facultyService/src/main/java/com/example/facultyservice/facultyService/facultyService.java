package com.example.facultyservice.facultyService;

import com.example.facultyservice.facultyModel.facultyModel;
import com.example.facultyservice.facultyRepository.facultyRepository;
import org.springframework.stereotype.Service;

@Service
public class facultyService {

    private final facultyRepository repo;

    facultyService(facultyRepository repo1) {
        this.repo = repo1;
    }

    public facultyModel register(facultyModel a) {
        return repo.save(a);
    }

    public facultyModel login(facultyModel a) {
        return repo.findByEmailAndPassword(a.getEmail(), a.getPassword());
    }
}
