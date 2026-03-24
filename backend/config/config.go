package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv     string
	AppPort    string
	DBUrl      string
	DBHost       string
	DBPort       string
	DBUser       string
	DBPassword   string
	DBName       string
	CookieDomain string
}

var App Config

func Load() {
	if err := godotenv.Load(".env"); err != nil {
		log.Println("No .env file found")
	}

	App = Config{
		AppEnv:     getEnv("APP_ENV", "development"),
		AppPort:    getEnv("APP_PORT", "8080"),
		DBUrl:      getEnv("DATABASE_URL", ""),
		DBHost:       getEnv("DB_HOST", "localhost"),
		DBPort:       getEnv("DB_PORT", "5432"),
		DBUser:       getEnv("DB_USER", "postgres"),
		DBPassword:   getEnv("DB_PASSWORD", ""),
		DBName:       getEnv("DB_NAME", "invoice_db"),
		CookieDomain: getEnv("COOKIE_DOMAIN", "localhost"),
	}

}

func getEnv(key string, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
