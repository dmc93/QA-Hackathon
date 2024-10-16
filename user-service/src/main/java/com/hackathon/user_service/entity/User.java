package com.hackathon.user_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password; // Store hashed passwords

    // New field for authorities
    private List<GrantedAuthority> authorities; // Store user roles

    // These methods below are required for Spring Security
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities; // Return the assigned authorities
    }

    @Override
    public String getPassword() {
        return password; // Password used for authentication
    }

    @Override
    public String getUsername() {
        return email; // Email used as username for authentication
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Add a method to set authorities
    public void setAuthorities(List<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}
