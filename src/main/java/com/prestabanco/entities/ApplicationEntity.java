package com.prestabanco.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.Map;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private LoanEntity loan;

    private LocalDateTime applicationDate;
    private String status;
    private BigDecimal requestedAmount;
    private Integer requestedTerm;

    // Campos nuevos para simulación:
    private BigDecimal monthlyPayment;      // Cuota mensual calculada
    private BigDecimal totalCost;           // Costo total del crédito
    private BigDecimal insuranceCost;       // Costo del seguro
    private BigDecimal administrationFee;   // Comisión por administración

    // Campos para documentación:
    @ElementCollection
    @CollectionTable(name = "application_documents")
    private Map<String, String> documents;   // Mapa de documentos (tipo -> URL)

    // Campos para evaluación:
    private Boolean incomeRatioApproved;     // Si cumple ratio cuota/ingreso
    private Boolean ageRequirementApproved;  // Si cumple requisito de edad
    private Boolean savingsCapacityApproved; // Si cumple capacidad de ahorro
    private Boolean creditHistoryApproved;   // Si cumple historial crediticio
    private String rejectionReason;          // Razón de rechazo si aplica
    private LocalDateTime evaluationDate;    // Fecha de evaluación
}
