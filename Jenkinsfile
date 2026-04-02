pipeline {
    agent any

    stages {
        stage('Inject Secrets') {
            steps {
                sh '''
                  # Copy the root .env file
                  cp .env . 

                  # Ensure backend folder exists
                  mkdir -p backend

                  # Copy backend secrets and config
                  cp backend/.env backend/
                  cp backend/config.json backend/
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Building project..."'
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo "Deploying project..."'
            }
        }

        stage('Health Check') {
            steps {
                sh 'curl -f http://localhost:3000/health || exit 1'
            }
        }

        stage('Integration Test') {
            steps {
                sh 'echo "Running integration tests..."'
            }
        }
    }
}
