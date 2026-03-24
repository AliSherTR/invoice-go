package auth

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"invoice-backend/internal/auth/dto"
	"invoice-backend/internal/models"
	"invoice-backend/pkg/database"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB() {
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to test database")
	}
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		panic("Failed to migrate test database")
	}
	database.DB = db
}

func setupTestRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	RegisterRoutes(router.Group("/"))
	return router
}

func TestMain(m *testing.M) {
	setupTestDB()
	code := m.Run()
	os.Exit(code)
}

func TestRegisterHandler_Success(t *testing.T) {
	router := setupTestRouter()

	reqBody := dto.RegisterRequest{
		Email:    "test@example.com",
		Password: "password123",
		Name:     "Test User",
	}
	jsonData, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest(http.MethodPost, "/auth/register", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "User registered successfully", response["message"])

	
	userMap := response["user"].(map[string]interface{})
	assert.Equal(t, "test@example.com", userMap["email"])
	assert.Equal(t, "Test User", userMap["name"])
}

func TestRegisterHandler_Sanitization(t *testing.T) {
	router := setupTestRouter()

	reqBody := dto.RegisterRequest{
		Email:    "SanitizeMe@Example.com",
		Password: "password123",
		Name:     "  <script>alert('xss')</script> John Doe  ",
	}
	jsonData, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest(http.MethodPost, "/auth/register", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)

	userMap := response["user"].(map[string]interface{})
	// Email should be lowercased and spaces trimmed
	assert.Equal(t, "sanitizeme@example.com", userMap["email"])
	// Name should have XSS tags removed and spaces trimmed
	assert.Equal(t, " John Doe", userMap["name"])
}

func TestLoginHandler_Success(t *testing.T) {
	router := setupTestRouter()

	// Ensure user exists from previous test or create one
	reqBody := dto.LoginRequest{
		Email:    "test@example.com",
		Password: "password123",
	}
	jsonData, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest(http.MethodPost, "/auth/login", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "Logged in successfully", response["message"])

	cookies := w.Result().Cookies()
	var hasAccess, hasRefresh bool
	for _, cookie := range cookies {
		if cookie.Name == "access_token" && cookie.Value != "" {
			hasAccess = true
		}
		if cookie.Name == "refresh_token" && cookie.Value != "" {
			hasRefresh = true
		}
	}
	assert.True(t, hasAccess, "expected access_token cookie")
	assert.True(t, hasRefresh, "expected refresh_token cookie")
}

func TestLoginHandler_InvalidCreds(t *testing.T) {
	router := setupTestRouter()

	reqBody := dto.LoginRequest{
		Email:    "test@example.com",
		Password: "wrongpassword",
	}
	jsonData, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest(http.MethodPost, "/auth/login", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
}
