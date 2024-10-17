package com.hackathon.user_service.model;

public class AuthResponse {
    private String token;
    private Long userId; // Store user ID as Long

    public AuthResponse(String token, Long userId) { // Constructor with String and Long parameters
        this.token = token;
        this.userId = userId; // Initialize userId
    }

    public String getToken() {
        return token; // Getter for token
    }

    public Long getUserId() {
        return userId; // Getter for userId
    }
}

