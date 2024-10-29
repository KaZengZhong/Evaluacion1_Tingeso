package com.prestabanco.controllers;

import com.prestabanco.entities.ApplicationEntity;
import com.prestabanco.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationEntity> createApplication(@RequestBody ApplicationEntity application) {
        return ResponseEntity.ok(applicationService.createApplication(application));
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

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ApplicationEntity>> getApplicationsByStatus(@PathVariable ApplicationEntity.ApplicationStatus status) {
        return ResponseEntity.ok(applicationService.getApplicationsByStatus(status));
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

