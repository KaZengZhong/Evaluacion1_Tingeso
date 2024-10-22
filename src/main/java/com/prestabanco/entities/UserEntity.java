package com.prestabanco.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String rut;
    private int age;
    private double income;

    // Campos adicionales para evaluación
    private BigDecimal savingsBalance;          // Saldo actual de ahorros del usuario
    private LocalDateTime accountOpenDate;      // Fecha en que abrió su cuenta de ahorros
    private BigDecimal averageMonthlyDeposit;   // Promedio de depósitos mensuales
    private String employmentStatus;            // Estado laboral
    private Integer employmentYears;            // Años en el empleo actual
    private String creditHistory;               // Historial crediticio
}
