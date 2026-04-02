pipeline {
    agent any

    stages {
        stage('Inject Secrets') {
            steps {
                sh '''
                  cp /home/kist/docker/Dev_app/.env .
                  mkdir -p backend
                  cp /home/kist/docker/Dev_app/backend/.env backend/
                  cp /home/kist/docker/Dev_app/backend/config.json backend/
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                  echo "Building project..."
                  # Example: npm install or mvn clean package
                  # Replace with your actual build command
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  echo "Deploying project..."
                  # Example: docker-compose up -d or kubectl apply -f
                  # Replace with your actual deployment command
                '''
            }
        }
    }
}
