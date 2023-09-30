# HeptaAirborne Technical Interview Backend <!-- omit in toc -->

- [Steps I did to get it started](#steps-i-did-to-get-it-started)

## Steps I did to get it started

Used [spring initializr](https://start.spring.io/) to get the basis for the project.
> [link to exact configuration](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.1.4&packaging=jar&jvmVersion=17&groupId=com.hainterview&artifactId=backend&name=backend&description=HeptaAirborne%20technical%20exercise&packageName=com.hainterview.backend&dependencies=postgresql,data-jpa,liquibase,docker-compose,lombok,web)

Then added custom dependancies:

- `springdoc-openapi-starter-webmvc-ui`

Removed some files:

- `compose.yml`
