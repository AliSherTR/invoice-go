package auth

import (
	"errors"
	"net/http"
	"strings"

	"invoice-backend/config"
	"invoice-backend/internal/auth/dto"
	"invoice-backend/pkg/utils"

	"github.com/gin-gonic/gin"
	"github.com/microcosm-cc/bluemonday"
)

func setAuthCookies(c *gin.Context, accessToken, refreshToken string) {
	domain := config.App.CookieDomain
	secure := config.App.AppEnv != "development" // Use true for https domains

	// HttpOnly cookies
	c.SetCookie("access_token", accessToken, 15*60, "/", domain, secure, true)
	c.SetCookie("refresh_token", refreshToken, 7*24*60*60, "/", domain, secure, true)
}

func clearAuthCookies(c *gin.Context) {
	domain := config.App.CookieDomain
	secure := config.App.AppEnv != "development"

	c.SetCookie("access_token", "", -1, "/", domain, secure, true)
	c.SetCookie("refresh_token", "", -1, "/", domain, secure, true)
}

func RegisterHandler(c *gin.Context) {
	var req dto.RegisterRequest
	if err := utils.BindJSONStrict(c, &req); err != nil {
		utils.HandleValidationError(c, err)
		return
	}

	p := bluemonday.UGCPolicy()
	email := strings.ToLower(strings.TrimSpace(req.Email))
	name := p.Sanitize(strings.TrimSpace(req.Name))

	user, err := Register(email, req.Password, name)
	if err != nil {
		if errors.Is(err, ErrUserExists) {
			c.JSON(http.StatusConflict, dto.ErrorResponse{Error: "User already exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Failed to register user"})
		return
	}

	c.JSON(http.StatusCreated, dto.RegisterResponse{
		Message: "User registered successfully",
		User: dto.UserResponse{
			ID:    user.ID,
			Email: user.Email,
			Name:  user.Name,
		},
	})
}

func LoginHandler(c *gin.Context) {
	var req dto.LoginRequest
	if err := utils.BindJSONStrict(c, &req); err != nil {
		utils.HandleValidationError(c, err)
		return
	}

	email := strings.ToLower(strings.TrimSpace(req.Email))

	accessToken, refreshToken, err := Login(email, req.Password)
	if err != nil {
		if errors.Is(err, ErrInvalidCreds) {
			c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "Invalid email or password"})
			return
		}
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Failed to login"})
		return
	}

	setAuthCookies(c, accessToken, refreshToken)
	c.JSON(http.StatusOK, gin.H{"message": "Logged in successfully"})
}

func RefreshTokenHandler(c *gin.Context) {
	refreshToken, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "Refresh token missing"})
		return
	}

	newAccessToken, newRefreshToken, err := RefreshToken(refreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "Invalid or expired refresh token"})
		return
	}

	setAuthCookies(c, newAccessToken, newRefreshToken)
	c.JSON(http.StatusOK, gin.H{"message": "Tokens refreshed successfully"})
}

func LogoutHandler(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, dto.ErrorResponse{Error: "Unauthorized"})
		return
	}

	if err := Logout(userID.(string)); err != nil {
		c.JSON(http.StatusInternalServerError, dto.ErrorResponse{Error: "Failed to logout"})
		return
	}

	clearAuthCookies(c)
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
