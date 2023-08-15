pipeline {
    agent any
    stages{
        stage('Environment Setup'){
            steps {
                echo 'Environment setup'
                sh 'rm -f .env'
                sh 'touch backend/.env'
                sh """
                    echo "OPENAI_API_KEY=${env.OPENAI_API_KEY}\n OPENAI_DEPLOYMENT_ID=${env.OPENAI_DEPLOYMENT_ID}\n OPENAI_ENDPOINT=${env.OPENAI_ENDPOINT}" >> .env
                """
            }
        }
    }
}