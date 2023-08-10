package configs

import (
	"context"
	"log"

	"google.golang.org/api/option"
	"google.golang.org/api/vision/v1"
)

func VisionClient() *vision.Service {
	ctx := context.Background()
	visionService, err := vision.NewService(ctx, option.WithScopes(vision.CloudVisionScope))
	if err != nil {
		log.Fatal(err)
	}
	return visionService
}
