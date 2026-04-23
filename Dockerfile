# Estágio de build
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Fazer o build skipando os testes para ser mais rápido no deploy do Railway
RUN mvn clean package -DskipTests

# Estágio de execução
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copiar o .jar compilado do estágio anterior
COPY --from=build /app/target/*.jar app.jar

# Expor a porta padrão que o Railway configurará (usando a variável de ambiente $PORT)
# O Spring Boot lerá $PORT automaticamente, mas expor 8080 é boa prática.
EXPOSE 8080

# Rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
