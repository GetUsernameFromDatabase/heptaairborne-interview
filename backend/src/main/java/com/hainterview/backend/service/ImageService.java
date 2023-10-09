package com.hainterview.backend.service;

import com.hainterview.backend.entity.ImageEntity;
import com.hainterview.backend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    private final ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Page<ImageEntity> getAllImages(int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return imageRepository.findAll(pageable);
    }
}
