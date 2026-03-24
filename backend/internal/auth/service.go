package auth

import (
	"errors"
	"invoice-backend/internal/models"
	"invoice-backend/pkg/database"
	"invoice-backend/pkg/utils"

	"gorm.io/gorm"
)

var (
	ErrUserExists   = errors.New("user already exists")
	ErrInvalidCreds = errors.New("Invalid email or password")
	ErrUserNotFound = errors.New("user not found")
)

func Register(email, password, name string) (*models.User, error) {
	var existingUser models.User
	if err := database.DB.Where("email = ?", email).First(&existingUser).Error; err == nil {
		return nil, ErrUserExists
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return nil, err
	}

	user := models.User{
		Email:    email,
		Password: &hashedPassword,
		Name:     name,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func Login(email, password string) (string, string, error) {
	var user models.User
	if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", "", ErrInvalidCreds
		}
		return "", "", err
	}

	if user.Password == nil || !utils.CheckPasswordHash(password, *user.Password) {
		return "", "", ErrInvalidCreds
	}

	accessToken, err := utils.GenerateAccessToken(user.ID)
	if err != nil {
		return "", "", err
	}

	refreshToken, err := utils.GenerateRefreshToken(user.ID)
	if err != nil {
		return "", "", err
	}

	// Save refresh token to DB
	user.RefreshToken = &refreshToken
	if err := database.DB.Save(&user).Error; err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func RefreshToken(refreshToken string) (string, string, error) {
	claims, err := utils.ValidateToken(refreshToken)
	if err != nil {
		return "", "", err
	}

	var user models.User
	if err := database.DB.First(&user, "id = ?", claims.UserID).Error; err != nil {
		return "", "", ErrUserNotFound
	}

	if user.RefreshToken == nil || *user.RefreshToken != refreshToken {
		return "", "", errors.New("invalid refresh token")
	}

	newAccessToken, err := utils.GenerateAccessToken(user.ID)
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := utils.GenerateRefreshToken(user.ID)
	if err != nil {
		return "", "", err
	}

	user.RefreshToken = &newRefreshToken
	if err := database.DB.Save(&user).Error; err != nil {
		return "", "", err
	}

	return newAccessToken, newRefreshToken, nil
}

func Logout(userID string) error {
	return database.DB.Model(&models.User{}).Where("id = ?", userID).Update("refresh_token", nil).Error
}
