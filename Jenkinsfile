pipeline {
    agent any

    // environment {
    //     // Define a versão do Maven configurada no Jenkins
    //     MAVEN_HOME = tool name: 'Maven 3.x', type: 'maven'
    //     PATH = "${MAVEN_HOME}/bin;${env.PATH}" // Use o separador de caminho correto para o Windows
    // }

    stages {
        // stage('Checkout') {
        //     steps {
        //         // Clona o repositório do Git
        //         git 'https://github.com/IgorPSUnit/TesteJUnit.git'
        //     }
        // }

        stage('Build') {
            steps {
                // Compila o projeto e executa os testes
                bat 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                // Executa os testes
                bat 'mvn test'
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
            // Limpa o workspace após a execução
            cleanWs() // Certifique-se de que isso está dentro de um nó.
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
