package com.hackathon.user_service.service;

import com.hackathon.user_service.entity.User;
import com.hackathon.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User.UserBuilder;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Fetch the user from the database
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // Map the database user to a Spring Security User object
        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(email);
        builder.password(user.getPassword()); // The encrypted password from the DB
        builder.roles("USER"); // Assign default role for now

        return builder.build();
    }
}
