package com.prestabanco.services;

import com.prestabanco.entities.ApplicationEntity;
import com.prestabanco.entities.UserEntity;
import com.prestabanco.repositories.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CreditEvaluationService creditEvaluationService;

    public ApplicationEntity saveApplication(ApplicationEntity application) {
        return applicationRepository.save(application);
    }

    public Optional<ApplicationEntity> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    public List<ApplicationEntity> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<ApplicationEntity> getApplicationsByUser(UserEntity user) {
        return applicationRepository.findByUser(user);
    }

    public List<ApplicationEntity> getApplicationsByStatus(String status) {
        return applicationRepository.findByStatus(status);
    }

    public List<ApplicationEntity> getApplicationsBetweenDates(LocalDateTime start, LocalDateTime end) {
        return applicationRepository.findByApplicationDateBetween(start, end);
    }

    public long countApplicationsByUserAndStatus(UserEntity user, String status) {
        return applicationRepository.countByUserAndStatus(user, status);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    public ApplicationEntity processApplication(ApplicationEntity application) {
        application.setStatus("E3"); // En Evaluación
        ApplicationEntity evaluatedApplication = creditEvaluationService.evaluateApplication(application);
        return saveApplication(evaluatedApplication);
    }
}