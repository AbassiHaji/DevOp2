pipeline {
    agent any

    environment {
        // Define SERVER_PORT here so docker-compose sees it
        SERVER_PORT = "3000"
    }

    stages {
        stage('Inject Secrets') {
            steps {
                sh '''
                  mkdir -p deploy/backend

                  # Copy root .env into deploy folder
                  cp .env deploy/.env

                  # Copy backend secrets and config if they exist
                  if [ -f backend/.env ]; then
                    cp backend/.env deploy/backend/.env
                  fi

                  if [ -f backend/config.json ]; then
                    cp backend/config.json deploy/backend/config.json
                  fi
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                  echo "Building project..."
                  # Example: npm install OR mvn clean package
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
                  curl -f http://localhost:$SERVER_PORT/health || exit 1
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
