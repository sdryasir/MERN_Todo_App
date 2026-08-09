pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'todo-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Check Docker') {
                steps {
                    bat 'echo %PATH%'
                    bat 'where docker'
                    bat 'docker --version'
                }
            }

        stage('Validate Docker Compose') {
            steps {
                echo "Validating Docker Compose"
                bat '''
                    docker compose config
                '''
            }
        }
        stage('Check SonarScanner') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    echo "Scanner location: ${scannerHome}"

                    bat """
                        "${scannerHome}\\bin\\sonar-scanner.bat" --version
                    """
                }
            }
        }

         stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        bat """
                            "${scannerHome}\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=three-tier-app ^
                            -Dsonar.projectName=ThreeTierApp ^
                            -Dsonar.sources=.
                        """
                    }
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                echo "Stoping Existing Containers"
                bat '''
                    docker compose down --remove-orphans || true
                '''
            }
        }

        stage('Build Images') {
            steps {
                bat '''
                    docker compose build
                '''
            }
        }

        stage('Start Application') {
            steps {
                bat '''
                    docker compose up -d
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                bat '''
                    docker compose ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                bat '''
                    echo "Waiting for services to start..."
                    

                    curl --fail --silent http://localhost:5000/health/live \
                        || curl --fail --silent http://localhost:5000 \
                        || exit 1

                    curl --fail --silent http://localhost:3000 \
                        || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'Todo application deployed successfully.'
            echo 'Frontend: http://localhost:3000'
            echo 'Backend: http://localhost:5000'
        }

        failure {
            echo 'Deployment failed. Showing container logs.'

            bat '''
                docker compose ps || true
                docker compose logs --tail=200 || true
            '''
        }

        always {
            cleanWs()
        }
    }
}
