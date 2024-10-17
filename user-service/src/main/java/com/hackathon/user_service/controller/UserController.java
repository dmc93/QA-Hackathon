package com.hackathon.user_service.controller;

import com.hackathon.user_service.entity.User;
import com.hackathon.user_service.model.AuthRequest;
import com.hackathon.user_service.model.AuthResponse;
import com.hackathon.user_service.repository.UserRepository;
import com.hackathon.user_service.service.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections; // Make sure to import this for Collections
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil; // Utility to generate JWT tokens

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject the PasswordEncoder


    // Create a new user (registration)
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        System.out.println("Attempting to create user: " + user);

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            System.out.println("User with email " + user.getEmail() + " already exists.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        User savedUser = userRepository.save(user);
        System.out.println("User created: " + savedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }



    // Get all users (for testing purposes)
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        System.out.println("Login attempt for: " + authRequest.getEmail()); // Log the email
        try {
            // Authenticate the user using the provided credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            // Fetch the user by email to get the user ID
            User user = userRepository.findByEmail(authRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Generate JWT token upon successful authentication
            String token = jwtUtil.generateToken(authRequest.getEmail());

            // Return the JWT token and user ID to the client
            return ResponseEntity.ok(new AuthResponse(token, user.getId())); // Include user ID in the response
        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " + e.getMessage()); // Log the error message
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage()); // Log any other exceptions
            e.printStackTrace(); // Print the stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login");
        }
    }




}
