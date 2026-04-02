pipeline {
    agent any

    stages {
        stage('Inject Secrets') {
            steps {
                sh '''
                  # Create a deploy folder
                  mkdir -p deploy/backend

                  # Copy root .env into deploy folder
                  cp .env deploy/.env

                  # Copy backend secrets and config into deploy/backend
                  cp backend/.env deploy/backend/.env
                  cp backend/config.json deploy/backend/config.json
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                  echo "Building project..."
                  # Replace with your actual build command
                  # Example: mvn clean package OR npm install
                '''
            }
        }

                    stage('Deploy') {
                steps {
                    sh '''
                      echo "Deploying project..."
                      docker-compose up -d --build
                    '''
                }
            }
            
            stage('Health Check') {
                steps {
                    sh '''
                      echo "Running health check..."
                      curl -f http://localhost:3000/health || exit 1
                    '''
                }
            }


        stage('Integration Test') {
            steps {
                sh '''
                  echo "Running integration tests..."
                  # Replace with your actual integration test command
                  # Example: npm run test:integration OR mvn verify -Pintegration
                '''
            }
        }
    }
}
