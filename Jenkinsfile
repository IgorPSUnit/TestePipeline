pipeline {
    agent any

    environment {
        // Variável que define a versão do Maven que está configurada no Jenkins
        MAVEN_HOME = tool name: 'Maven 3.x', type: 'maven'
        PATH = "${MAVEN_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clona o repositório do Git
                git 'https://github.com/IgorPSUnit/TesteJUnit.git'
            }
        }

        stage('Build') {
            steps {
                // Compila o projeto e roda os testes
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                // Executa os testes usando Maven
                sh 'mvn test'
            }
        }

        stage('Publish Test Results') {
            steps {
                // Publica os resultados dos testes no Jenkins
                junit '**/target/surefire-reports/*.xml'
            }
        }
    }

    post {
        always {
            // Limpa o workspace após a execução do pipeline
            cleanWs()
        }

        failure {
            // Envia uma notificação caso o pipeline falhe
            echo 'Pipeline failed.'
        }
    }
}
