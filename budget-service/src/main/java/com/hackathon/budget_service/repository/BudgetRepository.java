package com.hackathon.budget_service.repository;

import com.hackathon.budget_service.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    // Find all budgets for a specific userId
    List<Budget> findByUserId(Long userId);

    // Find a budget by category
    Optional<Budget> findByCategory(String category);

    Optional<Budget> findByUserIdAndCategoryAndBudgetMonth(Long userId, String category, String budgetMonth);
}
