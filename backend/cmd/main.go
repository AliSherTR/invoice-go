package main

import (
	"invoice-backend/config"
	"invoice-backend/pkg/database"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	config.Load()

	// 2. Connect to database
	database.Connect()

	// 3. Set Gin mode
	if config.App.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// 4. Create router
	app := gin.Default()

	// 5. Health check
	app.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	// 6. Start server
	log.Printf("🚀 Server running on port %s", config.App.AppPort)
	// 6. Start server
	log.Printf("🚀 Server running on port %s", config.App.AppPort)
	if err := app.Run(":" + config.App.AppPort); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
