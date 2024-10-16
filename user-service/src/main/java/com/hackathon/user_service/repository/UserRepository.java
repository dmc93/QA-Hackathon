package com.hackathon.user_service.repository;

import com.hackathon.user_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Method to find a user by email - used by CustomUserDetailsService
    User findByEmail(String email);
}
