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
    }
}