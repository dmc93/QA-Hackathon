package com.hackathon.ledger_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Ledger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // Add this field to associate the ledger entry with a user

    private String description;
    private String category;
    private Double amount;
    private LocalDateTime date;
    private Boolean roundUp;
    private Double savingsAmount;
}
