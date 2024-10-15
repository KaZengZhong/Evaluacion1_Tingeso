package com.prestabanco.services;

import com.prestabanco.entities.LoanEntity;
import com.prestabanco.repositories.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public LoanEntity saveLoan(LoanEntity loan) {
        return loanRepository.save(loan);
    }

    public Optional<LoanEntity> getLoanById(Long id) {
        return loanRepository.findById(id);
    }

    public List<LoanEntity> getAllLoans() {
        return loanRepository.findAll();
    }

    public List<LoanEntity> getLoansByType(String type) {
        return loanRepository.findByType(type);
    }

    public List<LoanEntity> getLoansByMaxAmount(BigDecimal maxAmount) {
        return loanRepository.findByAmountLessThanEqual(maxAmount);
    }

    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }

    public BigDecimal calculateMonthlyPayment(BigDecimal amount, int term, BigDecimal interestRate) {
        // Implementar lógica de cálculo de cuota mensual
        // Esta es una implementación simple y puede necesitar ajustes
        BigDecimal monthlyRate = interestRate.divide(new BigDecimal("12"), 10, BigDecimal.ROUND_HALF_UP);
        BigDecimal factor = BigDecimal.ONE.add(monthlyRate).pow(term).subtract(BigDecimal.ONE);
        return amount.multiply(monthlyRate.multiply(factor)).divide(factor, 2, BigDecimal.ROUND_HALF_UP);
    }
}
