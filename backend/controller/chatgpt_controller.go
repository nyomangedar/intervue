package controller

import (
	"backend/configs"
	"backend/public/rubric"
	"backend/responses"
	"context"
	"net/http"
	"time"

	"github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
	"github.com/gofiber/fiber/v2"
)

var ChatGPTClient *azopenai.Client = configs.ChatGPTClient()

type ChatRequestBody struct {
	Context string `json:"context"`
	Message string `json:"message"`
}

func SendChat(c *fiber.Ctx) error {
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
		DeploymentID: configs.DEPLOYMENT_ID,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})

}

func AnalyzeJobPosting(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{
			Status:  http.StatusBadRequest,
			Message: "Bad Request body",
			Data: &fiber.Map{
				"data": err,
			},
		})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for tech jobs")},
		// Assistant responsibility
		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("I want you to analyze job posting, I want to know the seniority level (could also be in time range), industry type, key skills required, potential projects and day to day activities")},
		// User input
		{Role: to.Ptr(azopenai.ChatRoleUser), Content: to.Ptr(req.Message)},
	}

	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})

}

func CaseStudyEstimation(c *fiber.Ctx) error {
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

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("The previous company are:" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("Based on rubrics below, give the user estimation case study related to the company:" + rubric.PMRubric)},
	}

	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})

}

func CaseScoringEstimation(c *fiber.Ctx) error {
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

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Here is the previous context" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleUser), Content: to.Ptr("Give score based on rubrics for answer below:" + req.Message)},
	}

	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})

}

func CaseStudyCompanyRelated(c *fiber.Ctx) error {
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

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Here is the context of the company" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("Make a case study based on the company")},
	}

	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})
}

func CaseScoringCompanyRelated(c *fiber.Ctx) error {
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

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Previous rubrics and case study" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("Based on rubrics give score for answer below:" + req.Message)},
	}

	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})

}

func RubricCompanyRelatedCase(c *fiber.Ctx) error {
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

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Previous rubrics and case study" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("Based on rubrics give score for answer below:" + req.Message)},
	}

	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})

}

func Feedback(c *fiber.Ctx) error {
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

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Here is the context of the previous chat" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("below is feedback for estimation and company related case study, provide summary and suggestion for candidates\n\ncompany related case study feedback: [feedback]\n[estimation/product design/analytical/execution/product strategy/technical pm/favorite product] case study feedback: [feedback]\n" + req.Message)},
	}

	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})
}
