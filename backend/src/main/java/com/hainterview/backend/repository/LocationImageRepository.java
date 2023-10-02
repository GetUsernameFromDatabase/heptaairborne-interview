package com.hainterview.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hainterview.backend.entity.LocationImageEntity;
import com.hainterview.backend.entity.LocationImageId;

public interface LocationImageRepository extends JpaRepository<LocationImageEntity, LocationImageId> {
}