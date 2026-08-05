pipeline {
    agent any

    tools {
        nodejs 'Node 25'
    }

    stages {
        stage('Verify Tools') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'git --version'
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    bat 'npm ci'
                }
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    bat 'npm ci'
                }
            }
        }

        stage('Server Tests') {
            steps {
                dir('server') {
                    bat 'npm test -- --runInBand'
                }
            }
        }

        stage('Build Client') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }
    }

    post {
        success {
            echo 'CI pipeline completed successfully.'
        }

        failure {
            echo 'CI pipeline failed. Check the failed stage logs.'
        }

        always {
            cleanWs()
        }
    }
}