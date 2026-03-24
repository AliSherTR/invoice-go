package utils

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

// BindJSONStrict decodes JSON strictly rejecting unknown fields, and then runs struct validation.
func BindJSONStrict(c *gin.Context, obj interface{}) error {
	decoder := json.NewDecoder(c.Request.Body)
	decoder.DisallowUnknownFields()

	if err := decoder.Decode(obj); err != nil {
		return err
	}

	// Validate the struct using Gin's built-in validator
	if err := binding.Validator.ValidateStruct(obj); err != nil {
		return err
	}

	return nil
}

// HandleValidationError provides clean, user-friendly error messages for DTO validation failures
func HandleValidationError(c *gin.Context, err error) {
	if errors.Is(err, io.EOF) || err.Error() == "EOF" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Request body is missing"})
		return
	}

	var ve validator.ValidationErrors
	if errors.As(err, &ve) {
		// Just grab the first validation error for a clean message
		firstErr := ve[0]
		field := firstErr.Field()
		tag := firstErr.Tag()
		
		msg := "Invalid value for field " + field
		switch tag {
		case "required":
			msg = field + " is a required field"
		case "email":
			msg = field + " must be a valid email address"
		case "min":
			msg = field + " must be at least " + firstErr.Param() + " characters long"
		}

		c.JSON(http.StatusBadRequest, gin.H{"error": msg})
		return
	}

	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload: ensure fields match the expected format"})
}
