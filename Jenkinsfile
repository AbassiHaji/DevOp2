pipeline {
    agent any   // runs on any available agent

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
    }
}
