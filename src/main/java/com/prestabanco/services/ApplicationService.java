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


    public ApplicationEntity createApplication(ApplicationEntity application) {
        return applicationRepository.save(application);
    }

    public Optional<ApplicationEntity> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    public List<ApplicationEntity> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    public List<ApplicationEntity> getApplicationsByStatus(ApplicationEntity.ApplicationStatus statuss) {
        return applicationRepository.findByStatus(statuss);
    }

    public ApplicationEntity updateApplication(ApplicationEntity application) {
        return applicationRepository.save(application);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    public List<ApplicationEntity> getAllApplications() {
        return applicationRepository.findAll();
    }
}
