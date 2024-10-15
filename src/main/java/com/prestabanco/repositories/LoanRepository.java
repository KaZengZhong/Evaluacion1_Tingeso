package com.prestabanco.repositories;

import com.prestabanco.entities.LoanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {
    
    List<LoanEntity> findByType(String type);
    
    List<LoanEntity> findByAmountLessThanEqual(BigDecimal maxAmount);
    
    List<LoanEntity> findByInterestRateLessThanEqual(BigDecimal maxRate);
}