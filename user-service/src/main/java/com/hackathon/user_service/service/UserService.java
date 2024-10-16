package com.hackathon.user_service.service;

import com.hackathon.user_service.entity.User;
import com.hackathon.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // BCryptPasswordEncoder instance for hashing passwords
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Override method to load user by username (email in this case)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername()) // Since getUsername() returns the email
                .password(user.getPassword()) // Password should be hashed
                .authorities("USER") // Authorities for user roles
                .build();
    }

    // Method to register a new user with a hashed password
    public User registerNewUser(String name, String email, String rawPassword) {
        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);

        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(rawPassword);
        newUser.setPassword(hashedPassword);

        // Save the user in the repository
        return userRepository.save(newUser);
    }
}

