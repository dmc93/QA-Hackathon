package com.hackathon.ledger_service.repository;

import com.hackathon.ledger_service.entity.Ledger;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LedgerRepository extends JpaRepository<Ledger, Long> {
    // Find all ledger entries for a specific userId
    List<Ledger> findByUserId(Long userId);
}
