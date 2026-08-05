pipeline {
    agent any

    tools {
        nodejs 'Node 25'
    }

    stages {
        stage('Verify Node') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Hello') {
            steps {
                echo 'Jenkins is working!'
            }
        }
    }
}