package com.hackathon.budget_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.YearMonth;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"userId", "category", "budgetMonth"})}) // Composite unique constraint
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // To associate the budget with a user

    private String category;

    @Column(length = 7) // For storing YYYY-MM format
    private String budgetMonth; // Change from YearMonth if necessary

    private Double budgetLimit;

    private Double spentAmount = 0.0; // Default to 0
}


