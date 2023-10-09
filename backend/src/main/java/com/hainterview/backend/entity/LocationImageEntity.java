package com.hainterview.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "location_images")
@IdClass(LocationImageId.class)
public class LocationImageEntity {

    @Id
    @Column(name = "location_id", nullable = false)
    private Long locationId;

    @Id
    @Column(name = "image_id", nullable = false)
    private Long imageId;

    @ManyToOne
    @JoinColumn(name = "location_id", insertable = false, updatable = false)
    private LocationEntity locationEntity;

    @ManyToOne
    @JoinColumn(name = "image_id", insertable = false, updatable = false)
    private ImageEntity imageEntity;
}