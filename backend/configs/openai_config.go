package configs

import (
	"log"
	"os"

	"github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
	"github.com/joho/godotenv"
)

func ChatGPTClient() *azopenai.Client{
	err := godotenv.Load()
	OPEN_AI_KEY := os.Getenv("API_KEY")
	URL_ENDPOINT := os.Getenv("ENDPOINT")
	DEPLOYMENT_ID := os.Getenv("DEPLOYMENT_ID")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	if OPEN_AI_KEY == "" || URL_ENDPOINT == "" || DEPLOYMENT_ID == "" {
		log.Fatal("One of the environment key is failed")
	}

	keyCredential, err := azopenai.NewKeyCredential(OPEN_AI_KEY)
	if err != nil {
		log.Fatal("Error api key")
	}

	client, err := azopenai.NewClientWithKeyCredential(URL_ENDPOINT, keyCredential, nil)
	if err != nil {
		log.Fatal("Error configuring api with the key")
	}
	return client
}