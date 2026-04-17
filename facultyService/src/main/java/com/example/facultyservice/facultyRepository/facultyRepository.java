package com.example.facultyservice.facultyRepository;

import com.example.facultyservice.facultyModel.facultyModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface facultyRepository extends MongoRepository<facultyModel, String> {
    facultyModel findByEmailAndPassword(String email, String password);
}
