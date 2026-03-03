package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv  string
	AppPort string

	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	DBSSLMode  string

	JWTSecret     string
	JWTExpiryDays int
}

// App-wide config instance
var App Config

func Load() {
	// In production, env vars are injected directly — no .env file needed
	if os.Getenv("APP_ENV") != "production" {
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found, reading from environment")
		}
	}

	expiryDays, err := strconv.Atoi(os.Getenv("JWT_EXPIRY_DAYS"))
	if err != nil || expiryDays <= 0 {
		expiryDays = 7
	}

	App = Config{
		AppEnv:  getEnv("APP_ENV", "development"),
		AppPort: getEnv("APP_PORT", "8080"),

		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "postgres"),
		DBSSLMode:  getEnv("DB_SSLMODE", "require"),
		DBPassword: getEnv("DB_PASSWORD", ""),
		DBName:     getEnv("DB_NAME", "invoice_db"),

		JWTSecret:     getEnv("JWT_SECRET", ""),
		JWTExpiryDays: expiryDays,
	}

	if App.AppEnv == "production" && App.JWTSecret == "" {
		log.Fatal("JWT_SECRET must be set in production")
	}
}

// getEnv reads an env variable with a fallback default value
func getEnv(key string, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}
