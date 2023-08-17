package router

import (
	"backend/controller"

	"github.com/gofiber/fiber/v2"
)

var BaseRoot = "/chat-api"

func ChatGPTRoutes(app *fiber.App) {
	app.Post(BaseRoot+"/chat", controller.SendChat)
	app.Post(BaseRoot+"/analyze-job-posting", controller.AnalyzeJobPosting)
	app.Post(BaseRoot+"/casestudy-estimation", controller.CaseStudyEstimation)
	app.Post(BaseRoot+"/scoring-estimation", controller.CaseScoringEstimation)
	app.Post(BaseRoot+"/casestudy-company", controller.CaseStudyCompanyRelated)
	app.Post(BaseRoot+"/rubric-company", controller.RubricCompanyRelatedCase)
	app.Post(BaseRoot+"/scoring-company", controller.CaseScoringCompanyRelated)
	app.Post(BaseRoot+"/feedback", controller.Feedback)
	app.Post(BaseRoot+"/question", controller.QuestionPrompt)
}
