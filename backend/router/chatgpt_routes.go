package router

import (
	"backend/controller"

	"github.com/gofiber/fiber/v2"
)

func ChatGPTRoutes(app *fiber.App) {
	app.Post("/chat", controller.SendChat)
}