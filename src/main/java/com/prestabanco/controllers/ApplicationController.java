package com.prestabanco.controllers;

import com.prestabanco.entities.ApplicationEntity;
import com.prestabanco.entities.SavingsEntity;
import com.prestabanco.entities.UserEntity;
import com.prestabanco.services.ApplicationService;
import com.prestabanco.services.LoanCalculatorService;
import com.prestabanco.services.CreditEvaluationService;
import com.prestabanco.services.UserService;
import com.prestabanco.services.SavingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private UserService userService;
    @Autowired
    private SavingsService savingsService;
    @Autowired
    private LoanCalculatorService calculatorService;
    @Autowired
    private CreditEvaluationService evaluationService;

    @PostMapping
    public ResponseEntity<ApplicationEntity> createApplication(@RequestBody ApplicationEntity application) {
        return ResponseEntity.ok(applicationService.createApplication(application));
    }


    @PostMapping("/{applicationId}/evaluate")
    public ResponseEntity<CreditEvaluationService.CreditEvaluationResult> evaluateApplication(
            @PathVariable Long applicationId) {

        ApplicationEntity application = applicationService.getApplicationById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        UserEntity user = userService.getUserById(application.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SavingsEntity savings = savingsService.getSavingsByUserId(user.getId())
                .orElse(null);

        BigDecimal monthlyPayment = calculatorService.calculateMonthlyPayment(
                application.getRequestedAmount(),
                application.getInterestRate(),
                application.getTerm()
        );

        return ResponseEntity.ok(evaluationService.evaluateApplication(
                application, user, savings, monthlyPayment));
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApplicationEntity> getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ApplicationEntity>> getApplicationsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getApplicationsByUserId(userId));
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApplicationEntity> updateApplication(@PathVariable Long id, @RequestBody ApplicationEntity application) {
        application.setId(id);
        return ResponseEntity.ok(applicationService.updateApplication(application));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.ok().build();
    }
}

