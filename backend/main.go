package main

import (
	"backend/router"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	router.ChatGPTRoutes(app)
	router.VisionRouter(app)

	app.Listen(":8000")
	fmt.Print("Server is Running")
}
