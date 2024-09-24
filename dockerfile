# Etapa 1: Usar uma imagem base do OpenJDK 21
FROM openjdk:21-jdk-slim AS build

# Variáveis para o Maven
ENV MAVEN_VERSION=3.9.9
ENV MAVEN_HOME=/usr/share/maven
ENV MAVEN_BIN=$MAVEN_HOME/bin
ENV PATH=$MAVEN_BIN:$PATH

# Instalar dependências e baixar o Maven
RUN apt-get update && \
    apt-get install -y wget unzip && \
    mkdir -p $MAVEN_HOME && \
    wget -q https://downloads.apache.org/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.zip && \
    unzip apache-maven-$MAVEN_VERSION-bin.zip -d $MAVEN_HOME && \
    ln -s $MAVEN_HOME/apache-maven-$MAVEN_VERSION/bin/mvn /usr/bin/mvn && \
    rm apache-maven-$MAVEN_VERSION-bin.zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo pom.xml e o diretório src
COPY pom.xml .
COPY src ./src

# Baixe as dependências do Maven e execute os testes
RUN mvn clean install

# Etapa 2: Criar a imagem para execução
FROM openjdk:21-jdk-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo JAR gerado da etapa de construção
COPY --from=build /app/target/*.jar app.jar

# Exponha a porta em que a aplicação irá rodar
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
