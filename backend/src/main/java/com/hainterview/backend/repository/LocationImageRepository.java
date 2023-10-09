package com.hainterview.backend.repository;

import com.hainterview.backend.entity.LocationImageEntity;
import com.hainterview.backend.entity.LocationImageId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationImageRepository extends JpaRepository<LocationImageEntity, LocationImageId> {
}