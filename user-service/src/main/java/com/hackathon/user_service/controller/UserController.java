package com.hackathon.user_service.controller;

import com.hackathon.user_service.entity.User;
import com.hackathon.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject password encoder

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        System.out.println("Registering User: " + user.getEmail());

        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        System.out.println("User registered successfully with ID: " + savedUser.getId());

        return ResponseEntity.ok(savedUser);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
