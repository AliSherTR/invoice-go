package database

import (
	"fmt"
	"log"

	"invoice-backend/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect() {
	cfg := config.App

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBSSLMode,
	)

	// Show SQL queries in development, silent in production
	logLevel := logger.Info
	if cfg.AppEnv == "production" {
		logLevel = logger.Silent
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logLevel),
	})

	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	// Connection pooling — important for production
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("❌ Failed to get database instance:", err)
	}

	sqlDB.SetMaxOpenConns(25)   // max simultaneous connections
	sqlDB.SetMaxIdleConns(10)   // keep 10 connections ready in the pool
	sqlDB.SetConnMaxLifetime(0) // connections live forever until closed

	DB = db
	log.Println("✅ Database connected successfully")
}
