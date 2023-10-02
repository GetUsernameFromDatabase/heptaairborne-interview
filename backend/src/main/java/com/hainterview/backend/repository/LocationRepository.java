package com.hainterview.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hainterview.backend.entity.LocationEntity;

public interface LocationRepository extends JpaRepository<LocationEntity, Long> {
}