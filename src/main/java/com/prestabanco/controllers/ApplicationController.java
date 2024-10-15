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
        ApplicationEntity newApplication = applicationService.saveApplication(application);
        return new ResponseEntity<>(newApplication, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationEntity> getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<ApplicationEntity>> getAllApplications() {
        List<ApplicationEntity> applications = applicationService.getAllApplications();
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ApplicationEntity>> getApplicationsByStatus(@PathVariable String status) {
        List<ApplicationEntity> applications = applicationService.getApplicationsByStatus(status);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @PostMapping("/{id}/process")
    public ResponseEntity<ApplicationEntity> processApplication(@PathVariable Long id) {
        return applicationService.getApplicationById(id)
                .map(application -> {
                    ApplicationEntity processedApplication = applicationService.processApplication(application);
                    return new ResponseEntity<>(processedApplication, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        if (!applicationService.getApplicationById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        applicationService.deleteApplication(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
