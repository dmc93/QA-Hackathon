package com.hackathon.ledger_service.controller;

import com.hackathon.ledger_service.entity.Ledger;
import com.hackathon.ledger_service.repository.LedgerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ledgers")
public class LedgerController {

    @Autowired
    private LedgerRepository ledgerRepository;

    // Add a new ledger (transaction) with userId
    @PostMapping
    public ResponseEntity<Ledger> addLedger(@RequestBody Ledger ledger) {
        return ResponseEntity.ok(ledgerRepository.save(ledger));
    }

    // Get all ledgers (transactions) for a specific userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ledger>> getLedgersByUserId(@PathVariable Long userId) {
        List<Ledger> userLedgers = ledgerRepository.findByUserId(userId);
        return ResponseEntity.ok(userLedgers);
    }

    // Get all ledgers (for all users)
    @GetMapping
    public ResponseEntity<List<Ledger>> getAllLedgers() {
        return ResponseEntity.ok(ledgerRepository.findAll());
    }
}
