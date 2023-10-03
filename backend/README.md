# HeptaAirborne Technical Interview Backend <!-- omit in toc -->

This is the java backend for HeptaAirborne Technical Interview.

Table of contents:

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Documentation](#documentation)
  - [API Documentation](#api-documentation)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

[Spring initializr](https://start.spring.io/) was used to get the project started.
> [link to exact configuration](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.1.4&packaging=jar&jvmVersion=17&groupId=com.hainterview&artifactId=backend&name=backend&description=HeptaAirborne%20technical%20exercise&packageName=com.hainterview.backend&dependencies=postgresql,data-jpa,liquibase,lombok,web,h2)

### Prerequisites

What things you need to install the software and how to install them:

- Java Development Kit (JDK), this project uses Temurin JDK 17
  - link to download <https://adoptium.net/en-GB/temurin/releases/>
- An Integrated Development Environment (IDE) like IntelliJ IDEA or Eclipse

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository to your local machine.
2. Open the project in your chosen IDE.
3. Build the project and resolve any dependencies if necessary.

## Deployment

DB will not be running during build phase, hence dev profile

Command to package the project:

```bash
./mvnw package -P dev
```

> dev profile is used

Command to start the project in production mode:

```bash
java -jar ./target/backend.jar --spring.profiles.active=prod
```

---

Development (`dev`) profile uses [h2](http://h2database.com/html/main.html) database.
Production (`prod`) profile uses [postgres](https://www.postgresql.org/)

## Built With

- Java - The programming language used
- Maven - Dependency Management
- Spring Boot - The framework used

## Documentation

### API Documentation

The api documentation can be accessed from the `/v3/api-docs` endpoint.
> Example request <http://localhost:8080/v3/api-docs>

The api file can be found at [docs/api-docs.json](./docs/api-docs.json).
> Keep in mind -- this is not automatically generated.
