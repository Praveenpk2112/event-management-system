package com.example.studentregister.registerRepository;

import com.example.studentregister.registerModel.registerModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface registerRepository extends MongoRepository<registerModel,String> {
    registerModel findByEmailAndPassword(String email,String password);
}
