package com.hackathon.user_service.model;

public class AuthResponse {
    private String token;
    private Long userId; // Store user ID as Long
    private String userName; // Add userName field

    // Constructor with String, Long, and String parameters
    public AuthResponse(String token, Long userId, String userName) {
        this.token = token;
        this.userId = userId; // Initialize userId
        this.userName = userName; // Initialize userName
    }

    public String getToken() {
        return token; // Getter for token
    }

    public Long getUserId() {
        return userId; // Getter for userId
    }

    public String getUserName() {
        return userName; // Getter for userName
    }
}
