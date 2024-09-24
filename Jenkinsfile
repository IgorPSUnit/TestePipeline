pipeline {
    agent any

    environment {
        MAVEN_HOME = tool name: 'Maven 3.x', type: 'maven'
        PATH = "${MAVEN_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/IgorPSUnit/TesteJUnit.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Publish Test Results') {
            steps {
                junit '**/target/surefire-reports/*.xml'
            }
        }
    }

    post {
        always {
            cleanWs()
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}

