pipeline {
    agent any
    stages {
        stage('Environment Setup') {
            steps {
                echo 'Environment setup'
                sh 'rm -f .env'
                sh 'touch backend/.env'
                sh """
                    echo "OPENAI_API_KEY=${env.OPENAI_API_KEY}\\nOPENAI_DEPLOYMENT_ID=${env.OPENAI_DEPLOYMENT_ID}\\nOPENAI_ENDPOINT=${env.OPENAI_ENDPOINT}" >> backend/.env
                """
            }
        }
        stage('Clean up before starting new one') {
            steps {
                script {
                    echo 'check old running containers, and images'
                    def containers = sh(
                        script: "sudo docker ps -a -q || true",
                        returnStatus: true,
                        returnStdout: true
                    ).trim()

                    if (containers){
                        echo 'stop all containers'
                        sh 'sudo docker stop $(sudo docker ps -a -q)'
                        
                    } else {
                        echo 'no containers to stop'
                    }

                    echo 'delete old containers and images'
                    sh 'sudo docker system prune -af'
                }
            }
        }

        stage('Building Images') {
            steps {
                dir('backend') {
                    script {
                        sh 'sudo docker build -t intervue-backend .'
                    }
                }
                dir('frontend') {
                    script {
                        sh 'sudo docker build -t intervue-frontend .'
                    }
                }
            }
        }
        

        stage('Start docker containers') {
            steps {
                script {
                    echo 'Run frontend container'
                    sh 'sudo docker run --name intervue-frontend -p 3000:3000 -d intervue-frontend'
                    echo 'Run backend container'
                    sh 'sudo docker run --name intervue-backend -p 8000:8000 -d intervue-backend'
                }
            }
        }

        stage('Cleaning up') {
            steps {
                script {
                    echo 'Restarting nginx server'
                    sh 'sudo nginx -s reload'
                    sh 'sudo systemctl restart nginx'
                }
            }
        }
    }
}
