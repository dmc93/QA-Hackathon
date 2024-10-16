package com.hackathon.budget_service.controller;

import com.hackathon.budget_service.entity.Budget;
import com.hackathon.budget_service.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    // Add a new budget with userId
    @PostMapping
    public ResponseEntity<Budget> addBudget(@RequestBody Budget budget) {
        return ResponseEntity.ok(budgetRepository.save(budget));
    }

    // Get budgets for a specific userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Budget>> getBudgetsByUserId(@PathVariable Long userId) {
        List<Budget> userBudgets = budgetRepository.findByUserId(userId);
        return ResponseEntity.ok(userBudgets);
    }

    // Get budget by category (no userId filtering)
    @GetMapping("/{category}")
    public ResponseEntity<Budget> getBudgetByCategory(@PathVariable String category) {
        Optional<Budget> budget = budgetRepository.findByCategory(category);
        return budget.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all budgets (for all users)
    @GetMapping
    public ResponseEntity<Iterable<Budget>> getAllBudgets() {
        return ResponseEntity.ok(budgetRepository.findAll());
    }
}
