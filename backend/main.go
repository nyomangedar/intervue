package main

import (
	"backend/router"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	router.ChatGPTRoutes(app)
	router.VisionRouter(app)

	app.Listen(":8000")
	fmt.Print("Server is Running")
}
