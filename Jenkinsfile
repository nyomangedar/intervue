pipeline {
    agent any
    stages{
        stage('Environment Setup'){
            steps {
                echo 'Environment setup'
                sh 'rm -f .env'
                sh 'touch backend/.env'
                sh """
                    echo "OPENAI_API_KEY=${env.OPENAI_API_KEY}\nOPENAI_DEPLOYMENT_ID=${env.OPENAI_DEPLOYMENT_ID}\nOPENAI_ENDPOINT=${env.OPENAI_ENDPOINT}" >> backend/.env
                """
            }
        }
        stage('Building Images'){
            steps {
                dir('backend'){
                    script{
                        sh 'docker build -t intervue-backend .'
                    }
                }
            }
            steps {
                dir('frontend'){
                    script {
                        sh 'docker build -t intervue-frontend .'
                    }
                }
            }
        }
        stage('Clean up before starting new one'){
            steps{
                script{
                    echo 'stop all container'
                    sh 'docker stop ${docker ps -a -q}'
                    echo 'delete old containers'
                    sh 'docker rm $(docker ps -a -q)'
                    echo 'remove old images'
                    sh 'docker system prune'
                }
            }
        }

        stage('Start docker containers'){
            steps{
                script{
                    echo 'Run frontend container'
                    sh 'docker run --name intervue-frontend -p 3000:3000 -d intervue-frontend'
                    echo 'Run backend container'
                    sh 'docker run --name intervue-backend -p 8000:8000 -d intervue-backend '
                }
            }
        }

        stage('Cleaning up'){
            steps{
                script{
                    echo 'Restarting nginx server'
                    sh 'sudo nginx -s reload'
                    sh 'sudo systemctl restart nginx'
                }
            }
        }
    }
}