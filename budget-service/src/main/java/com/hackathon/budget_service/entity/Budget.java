package com.hackathon.budget_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String category;

    private Double budgetLimit;
    private Double spentAmount = 0.0; // Default value
}
