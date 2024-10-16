package com.hackathon.budget_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.YearMonth;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // Add this field to associate the budget with a user

    private String category;
    private YearMonth budgetMonth; // Year and month for the budget
    private Double budgetLimit;
    private Double spentAmount = 0.0; // Default value
}

