FROM openjdk:21-jdk-slim
EXPOSE 8080
ADD target/TestePipeline-1.0-SNAPSHOT.jar TestePipeline-1.0-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/TestePipeline-1.0-SNAPSHOT.jar"]