package com.hackathon.budget_service.controller;

import com.hackathon.budget_service.entity.Budget;
import com.hackathon.budget_service.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "*") //Allows requests from all origins
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @PostMapping
    public ResponseEntity<Budget> addBudget(@RequestBody Budget budget) {
        return ResponseEntity.ok(budgetRepository.save(budget));
    }

    @GetMapping("/{category}")
    public ResponseEntity<Budget> getBudgetByCategory(@PathVariable String category) {
        Optional<Budget> budget = budgetRepository.findByCategory(category);
        return budget.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Iterable<Budget>> getAllBudgets() {
        return ResponseEntity.ok(budgetRepository.findAll());
    }
}
