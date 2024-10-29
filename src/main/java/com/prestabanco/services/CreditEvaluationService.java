/*package com.prestabanco.services;

import com.prestabanco.entities.ApplicationEntity;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class CreditEvaluationService {

    public ApplicationEntity evaluateApplication(ApplicationEntity application) {
        // Evaluación de todos los criterios
        boolean incomeRatioApproved = evaluateIncomeRatio(application);
        boolean ageRequirementApproved = evaluateAge(application);
        boolean creditHistoryApproved = evaluateCreditHistory(application);
        boolean savingsCapacityApproved = evaluateSavingsCapacity(application);
        boolean maxFinancingApproved = evaluateMaxFinancing(application);

        // Guardar resultados de evaluación
        application.setIncomeRatioApproved(incomeRatioApproved);
        application.setAgeRequirementApproved(ageRequirementApproved);
        application.setCreditHistoryApproved(creditHistoryApproved);
        application.setSavingsCapacityApproved(savingsCapacityApproved);
        application.setEvaluationDate(LocalDateTime.now());

        // Determinar aprobación final
        boolean approved = incomeRatioApproved &&
                ageRequirementApproved &&
                creditHistoryApproved &&
                savingsCapacityApproved &&
                maxFinancingApproved;

        // Actualizar estado de la aplicación
        if (approved) {
            application.setStatus("E4"); // Pre-Aprobada
        } else {
            application.setStatus("E7"); // Rechazada
            application.setRejectionReason(determineRejectionReason(application));
        }

        return application;
    }

    private boolean evaluateIncomeRatio(ApplicationEntity application) {
        // R1: La relación cuota/ingreso no debe ser mayor a 35%
        BigDecimal monthlyPayment = application.getMonthlyPayment();
        BigDecimal monthlyIncome = BigDecimal.valueOf(application.getUser().getIncome());

        BigDecimal ratio = monthlyPayment
                .divide(monthlyIncome, 4, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        return ratio.compareTo(BigDecimal.valueOf(35)) <= 0;
    }

    private boolean evaluateAge(ApplicationEntity application) {
        // R6: La edad máxima al finalizar el préstamo debe ser menor a 75 años
        int currentAge = application.getUser().getAge();
        int loanTermYears = application.getRequestedTerm() / 12;
        int ageAtLoanEnd = currentAge + loanTermYears;

        return ageAtLoanEnd <= 75;
    }

    private boolean evaluateCreditHistory(ApplicationEntity application) {
        // R2: Evaluación del historial crediticio
        String creditHistory = application.getUser().getCreditHistory();
        return "GOOD".equals(creditHistory) || "REGULAR".equals(creditHistory);
    }

    private boolean evaluateSavingsCapacity(ApplicationEntity application) {
        // R7: Evaluación de la capacidad de ahorro
        BigDecimal savingsBalance = application.getUser().getSavingsBalance();
        BigDecimal requiredBalance = application.getRequestedAmount()
                .multiply(BigDecimal.valueOf(0.10)); // 10% del monto solicitado

        return savingsBalance.compareTo(requiredBalance) >= 0;
    }

    private boolean evaluateMaxFinancing(ApplicationEntity application) {
        // R5: Evaluación del monto máximo de financiamiento según tipo de préstamo
        String loanType = application.getLoan().getType();
        BigDecimal propertyValue = application.getRequestedAmount();
        BigDecimal maxFinancingPercentage;

        switch (loanType) {
            case "FIRST_HOME":
                maxFinancingPercentage = BigDecimal.valueOf(0.80); // 80%
                break;
            case "SECOND_HOME":
                maxFinancingPercentage = BigDecimal.valueOf(0.70); // 70%
                break;
            case "COMMERCIAL":
                maxFinancingPercentage = BigDecimal.valueOf(0.60); // 60%
                break;
            case "RENOVATION":
                maxFinancingPercentage = BigDecimal.valueOf(0.50); // 50%
                break;
            default:
                return false;
        }

        BigDecimal maxAmount = propertyValue.multiply(maxFinancingPercentage);
        return application.getRequestedAmount().compareTo(maxAmount) <= 0;
    }

    private String determineRejectionReason(ApplicationEntity application) {
        if (!application.getIncomeRatioApproved()) {
            return "La relación cuota/ingreso excede el 35% permitido";
        }
        if (!application.getAgeRequirementApproved()) {
            return "La edad al término del crédito excede el límite de 75 años";
        }
        if (!application.getCreditHistoryApproved()) {
            return "El historial crediticio no cumple con los requisitos";
        }
        if (!application.getSavingsCapacityApproved()) {
            return "No cumple con la capacidad de ahorro mínima requerida";
        }
        return "Múltiples criterios no cumplidos";
 +   }
}*/
