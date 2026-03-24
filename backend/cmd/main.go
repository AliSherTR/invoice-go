package main

import (
	"invoice-backend/config"
	"invoice-backend/internal/auth"
	"invoice-backend/internal/health"
	"invoice-backend/internal/middleware"
	"invoice-backend/pkg/database"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	config.Load()
	database.Connect()
	database.Migrate()

	v1 := app.Group("/api/v1")
	{
		health.RegisterRoutes(v1)
		auth.RegisterRoutes(v1)

		protected := v1.Group("/")
		protected.Use(middleware.RequireAuth())
		{
			auth.RegisterProtectedRoutes(protected)
		}
	}

	log.Println("Server is running on port 8080")

	app.Run(":8080")
}
