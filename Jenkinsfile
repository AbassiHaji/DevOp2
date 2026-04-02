pipeline {
    agent any

    stages {
        stage('Inject Secrets') {
            steps {
                sh '''
                  cp /var/lib/jenkins/workspace/project_Dev/.env

                  mkdir -p backend
                  cp /var/lib/jenkins/workspace/project_Dev/backend/.env

                  cp /var/lib/jenkins/workspace/project_Dev/backend/config.json

                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                  echo "Building project..."
                  # Example: mvn clean package OR npm install
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  echo "Deploying project..."
                  # Example: docker-compose up -d --build
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                  echo "Running health check..."
                  # Example: curl -f http://localhost:8080/health || exit 1
                '''
            }
        }

        stage('Integration Test') {
            steps {
                sh '''
                  echo "Running integration tests..."
                  # Example: npm run test:integration OR mvn verify -Pintegration
                '''
            }
        }
    }
}
