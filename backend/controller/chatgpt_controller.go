package controller

import (
	"backend/configs"
	"backend/responses"
	"context"
	"net/http"
	"os"
	"time"

	"github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

var ChatGPTClient *azopenai.Client = configs.ChatGPTClient()

type ChatRequestBody struct {
	Context string `json:"context"`
	Message string `json:"message"`
}

func SendChat(c *fiber.Ctx) error {
	godotenv.Load()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for tech jobs")},
		// The user send answer
		{Role: to.Ptr(azopenai.ChatRoleUser), Content: to.Ptr(req.Message)},
	}

	prevContext := req.Context
	if prevContext != "" {
		prevContext := azopenai.ChatMessage{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("The previous context of this chat are: " + req.Context)}
		messages = append(messages, prevContext)
	}

	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: os.Getenv("DEPLOYMENT_ID"),
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})

}
