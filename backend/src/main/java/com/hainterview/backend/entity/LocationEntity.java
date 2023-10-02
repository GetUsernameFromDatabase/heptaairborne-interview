package com.hainterview.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "locations")
public class LocationEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "latitude", nullable = false)
  private BigDecimal latitude;

  @Column(name = "longitude", nullable = false)
  private BigDecimal longitude;

  @Column(name = "name", nullable = false)
  private String name;
}