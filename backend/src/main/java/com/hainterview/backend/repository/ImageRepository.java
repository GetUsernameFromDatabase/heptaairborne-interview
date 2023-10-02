package com.hainterview.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hainterview.backend.entity.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
}