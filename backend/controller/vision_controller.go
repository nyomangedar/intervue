package controller

// import (
// 	"backend/configs"
// 	"backend/responses"
// 	"context"
// 	"encoding/base64"
// 	"net/http"
// 	"time"

// 	"github.com/gofiber/fiber/v2"
// 	"google.golang.org/api/vision/v1"
// )

// var VisionClient = configs.VisionClient()

// type VisionRequestBody struct {
// 	Image []byte `json:"image"`
// }

// func VisionReadText(c *fiber.Ctx) error {
// 	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	var req VisionRequestBody
// 	defer cancel()

// 	err := c.BodyParser(&req)
// 	if err != nil {
// 		c.Status(http.StatusBadRequest).JSON(responses.VisionResponse{
// 			Status:  http.StatusBadRequest,
// 			Message: "Vision error reading images",
// 			Data: &fiber.Map{
// 				"data": err,
// 			},
// 		})
// 	}

// 	visionRequest := &vision.AnnotateImageRequest{
// 		Image: &vision.Image{
// 			Content: base64.StdEncoding.EncodeToString(req.Image),
// 		},
// 		Features: []*vision.Feature{
// 			{Type: "TEXT_DETECTION"},
// 		},
// 	}

// 	batch := &vision.BatchAnnotateImagesRequest{
// 		Requests: []*vision.AnnotateImageRequest{
// 			visionRequest,
// 		},
// 	}

// 	res, err := VisionClient.Images.Annotate(batch).Do()
// 	if err != nil {
// 		return c.Status(http.StatusInternalServerError).JSON(responses.VisionResponse{
// 			Status:  http.StatusInternalServerError,
// 			Message: "Error Retrieving Result",
// 			Data: &fiber.Map{
// 				"data": err,
// 			},
// 		})
// 	}

// 	return c.Status(http.StatusOK).JSON(responses.VisionResponse{
// 		Status:  http.StatusOK,
// 		Message: "Vision API call success",
// 		Data: &fiber.Map{
// 			"data": res.Responses[0].TextAnnotations,
// 		},
// 	})

// }
