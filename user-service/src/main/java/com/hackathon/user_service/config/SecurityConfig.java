package com.hackathon.user_service.config;

import com.hackathon.user_service.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // PasswordEncoder bean - used to encode passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Use CustomUserDetailsService for authentication
    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    // Expose AuthenticationManager bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Configure security for HTTP requests and authentication handling
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF for simplicity (enable in production)
                .csrf(csrf -> csrf.disable())
                // Define request authorization
                .authorizeHttpRequests(auth -> auth
                        // Allow access to Swagger UI and API docs without authentication
                        .requestMatchers("/users/register", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        // Secure all other endpoints
                        .anyRequest().authenticated()
                )
                // Configure form login
                .formLogin(login -> login
                        .defaultSuccessUrl("/swagger-ui.html", true) // Corrected to not use wildcard
                        .permitAll()
                )
                // Configure logout functionality
                .logout(logout -> logout.permitAll());

        return http.build();
    }
}
