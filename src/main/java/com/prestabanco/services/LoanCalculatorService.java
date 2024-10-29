package com.prestabanco.services;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class LoanCalculatorService {

    private static final int MONTHS_IN_YEAR = 12;
    private static final int SCALE = 2;
    private static final RoundingMode ROUNDING_MODE = RoundingMode.HALF_UP;

    public BigDecimal calculateMonthlyPayment(BigDecimal loanAmount, BigDecimal annualInterestRate, int years) {
        // Convertir tasa anual a mensual (r = tasa anual / 12 / 100)
        BigDecimal monthlyRate = annualInterestRate
                .divide(BigDecimal.valueOf(MONTHS_IN_YEAR), 6, ROUNDING_MODE)
                .divide(BigDecimal.valueOf(100), 6, ROUNDING_MODE);

        // Calcular número total de pagos (n = años * 12)
        int numberOfPayments = years * MONTHS_IN_YEAR;

        // Calcular (1 + r)^n
        BigDecimal onePlusRate = BigDecimal.ONE.add(monthlyRate);
        BigDecimal compoundFactor = onePlusRate.pow(numberOfPayments);

        // Calcular numerador: P * r * (1 + r)^n
        BigDecimal numerator = loanAmount
                .multiply(monthlyRate)
                .multiply(compoundFactor);

        // Calcular denominador: (1 + r)^n - 1
        BigDecimal denominator = compoundFactor.subtract(BigDecimal.ONE);

        // Calcular cuota mensual
        return numerator.divide(denominator, SCALE, ROUNDING_MODE);
    }

    // Metodo de ayuda para calcular el costo total
    public BigDecimal calculateTotalCost(BigDecimal monthlyPayment, int years) {
        return monthlyPayment.multiply(BigDecimal.valueOf(years * MONTHS_IN_YEAR));
    }

    // Metodo para verificar si un préstamo cumple con la relación cuota/ingreso máxima
    public boolean validateIncomeRatio(BigDecimal monthlyPayment, BigDecimal monthlyIncome) {
        BigDecimal maxRatio = new BigDecimal("0.35"); // 35%
        BigDecimal actualRatio = monthlyPayment.divide(monthlyIncome, 4, ROUNDING_MODE);
        return actualRatio.compareTo(maxRatio) <= 0;
    }
}
