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
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)

	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},
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
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
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
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},
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
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("Give the user 1 estimation study case question, only the question without giving any advice")},
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
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr( "Here is the context of the previous chat, you have a discussion about a study case and the you have a scoring rubric" + req.Context + "and here is the rubric:" + rubric.PMRubric )},

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Give score for each rubrics and give overal score for answer below with the range of score 1-5:" + req.Message)},
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
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You were given a job description from the user " + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("based on job description, write a company-related case study interview includes context or company situation (you can use hypothetical numbers to give enough clear context) and one line question. Don't give the answer to the user!")},
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
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr( "Here is the context of the previous chat, you have a discussion about a study case and the you have a scoring rubric" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("Give score for each rubrics and give overal score for answer below with the range of score 1-5:" + req.Message)},
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
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Here is a case study" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("Based on the case study please make and breakdown the rubric scoring, and make 5 rubric category")},
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
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Here is feedback for estimation and company related case study" + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr("based on feedback above, write summary, actionable advice and resources for candidate to prepare")},
	}
	maxTokens := int32(2000)
	temperature := float32(0.7)
	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
		MaxTokens: &maxTokens,
		Temperature: &temperature,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})
}

func QuestionPrompt(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	var req ChatRequestBody
	defer cancel()

	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ChatGPTResponse{Status: http.StatusBadRequest, Message: "Error input request", Data: &fiber.Map{"data": err}})
	}

	messages := []azopenai.ChatMessage{
		// You set the tone and rules of the conversation with a prompt as the system role.
		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You are an AI that has a role as HR that interviews people for Product Manager candidate (use text formatting html styling to answer your question)")},

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("You're having a discussion with your candidate about a case study, here is the discussion: " + req.Context)},

		{Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr("Answer candidate question, you can make a logical assumption to answer the question if there is no information provided in the question. Don't give answer which can answer the study case question directly!`")},

		{Role: to.Ptr(azopenai.ChatRoleUser), Content: to.Ptr(req.Message)},
	}
	maxTokens := int32(2000)
	temperature := float32(0.7)
	resp, err := ChatGPTClient.GetChatCompletions(ctx, azopenai.ChatCompletionsOptions{
		// This is a conversation in progress.
		// NOTE: all messages count against token usage for this API.
		Messages:     messages,
		DeploymentID: configs.DEPLOYMENT_ID,
		MaxTokens: &maxTokens,
		Temperature: &temperature,
	}, nil)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ChatGPTResponse{Status: http.StatusInternalServerError, Message: "Error sending request to OpenaAI API", Data: &fiber.Map{"data": err}})
	}
	choices := resp.Choices[0].Message
	return c.Status(http.StatusOK).JSON(responses.ChatGPTResponse{Status: http.StatusOK, Message: "Chat Successful", Data: &fiber.Map{"data": choices}})
}