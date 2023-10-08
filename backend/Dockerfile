FROM eclipse-temurin:17

# setup app files
WORKDIR /app
COPY . .

# db will not be running during build phase, hence dev profile
RUN sh ./mvnw package -P dev

CMD ["java", "-jar", "./target/backend.jar", "--spring.profiles.active=prod"]
