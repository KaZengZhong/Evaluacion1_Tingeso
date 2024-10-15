package com.prestabanco.repositories;

import com.prestabanco.entities.ApplicationEntity;
import com.prestabanco.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {
    
    List<ApplicationEntity> findByUser(UserEntity user);
    
    List<ApplicationEntity> findByStatus(String status);
    
    List<ApplicationEntity> findByApplicationDateBetween(LocalDateTime start, LocalDateTime end);
    
    long countByUserAndStatus(UserEntity user, String status);
}
