package com.hackathon.budget_service.controller;

import com.hackathon.budget_service.entity.Budget;
import com.hackathon.budget_service.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    // Add a new budget with userId
    @PostMapping
    public ResponseEntity<?> addBudget(@RequestBody Budget budget) {
        // Ensure that budgetMonth is already in YearMonth format
        try {
            // If budgetMonth is already a YearMonth, no need to parse
            if (budget.getBudgetMonth() != null) {
                // No need to set it again since it's already a YearMonth
            } else {
                // You might want to handle cases where budgetMonth is null
                return ResponseEntity.badRequest().body("Budget month is required.");
            }

            // Save the budget to the repository
            Budget savedBudget = budgetRepository.save(budget);
            return ResponseEntity.ok(savedBudget);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add budget: " + e.getMessage());
        }
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
