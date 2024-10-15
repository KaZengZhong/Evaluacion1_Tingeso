package com.prestabanco.controllers;

import com.prestabanco.entities.LoanEntity;
import com.prestabanco.services.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping
    public ResponseEntity<LoanEntity> createLoan(@RequestBody LoanEntity loan) {
        LoanEntity newLoan = loanService.saveLoan(loan);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanEntity> getLoanById(@PathVariable Long id) {
        return loanService.getLoanById(id)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<LoanEntity>> getAllLoans() {
        List<LoanEntity> loans = loanService.getAllLoans();
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<LoanEntity>> getLoansByType(@PathVariable String type) {
        List<LoanEntity> loans = loanService.getLoansByType(type);
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }

    @GetMapping("/calculate")
    public ResponseEntity<BigDecimal> calculateMonthlyPayment(
            @RequestParam BigDecimal amount,
            @RequestParam int term,
            @RequestParam BigDecimal interestRate) {
        BigDecimal monthlyPayment = loanService.calculateMonthlyPayment(amount, term, interestRate);
        return new ResponseEntity<>(monthlyPayment, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        if (!loanService.getLoanById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        loanService.deleteLoan(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
