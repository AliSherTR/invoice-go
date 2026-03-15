package database

import (
	"fmt"
	"log"

	"invoice-backend/config"
	"invoice-backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.App.DBHost,
		config.App.DBPort,
		config.App.DBUser,
		config.App.DBPassword,
		config.App.DBName,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Database connection failed: ", err)
	}

	DB = db
	log.Println("✅ Database connected successfully")
}

func Migrate() {
	if err := DB.AutoMigrate(
		&models.User{},
	); err != nil {
		log.Fatal("Migration failed: ", err)
	}
	log.Println("✅ Migration completed successfully")
}
