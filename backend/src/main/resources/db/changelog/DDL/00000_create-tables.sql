-- liquibase formatted sql
-- changeset ryan:create-tables
CREATE TABLE locations (
    id BIGSERIAL PRIMARY KEY,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    name VARCHAR(255) NOT NULL
);
/* Currently it is assumed that all images come from picsum
 *  Should new sources be added account for that
 */
CREATE TABLE images (
    id BIGSERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    description VARCHAR(255)
);
CREATE TABLE location_images (
    location_id BIGINT NOT NULL,
    image_id BIGINT NOT NULL,
    PRIMARY KEY (location_id, image_id),
    FOREIGN KEY (location_id) REFERENCES locations(id),
    FOREIGN KEY (image_id) REFERENCES images(id)
);