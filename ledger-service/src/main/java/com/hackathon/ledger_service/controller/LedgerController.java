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

    @PostMapping
    public ResponseEntity<Ledger> addLedger(@RequestBody Ledger ledger) {
        return ResponseEntity.ok(ledgerRepository.save(ledger));
    }

    @GetMapping
    public ResponseEntity<List<Ledger>> getAllLedgers() {
        return ResponseEntity.ok(ledgerRepository.findAll());
    }
}
