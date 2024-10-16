package com.hackathon.user_service.filter;

import com.hackathon.user_service.service.JwtUtil;
import com.hackathon.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        // Skip JWT authentication for certain endpoints
        if (request.getServletPath().equals("/users") || request.getServletPath().equals("/users/login")) {
            filterChain.doFilter(request, response); // Skip JWT processing for these endpoints
            return; // Exit the filter chain
        }

        String username = null;
        String jwt = null;

        // Check if the Authorization header contains a JWT token
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Extract JWT token from the Bearer header
            username = jwtUtil.extractUsername(jwt); // Extract the username from the token
        }

        // Validate the token and authenticate the user if not already authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userService.loadUserByUsername(username); // Load the user details from the UserService

            // Validate the token
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                // Set the authentication in the SecurityContextHolder
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        // Continue with the next filter in the chain
        filterChain.doFilter(request, response);
    }

}
