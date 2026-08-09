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

        stage('Validate Docker Compose') {
            steps {
                echo "Validating Docker Compose"
                bat '''
                    docker compose config
                '''
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
                    docker compose build --no-cache
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
                    sleep 15

                    curl --fail --silent http://localhost:5000/health \
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
