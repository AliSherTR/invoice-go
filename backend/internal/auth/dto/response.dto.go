package dto

import "github.com/google/uuid"

type UserResponse struct {
	ID    uuid.UUID `json:"id"`
	Email string    `json:"email"`
	Name  string    `json:"name"`
}

type RegisterResponse struct {
	Message string       `json:"message"`
	User    UserResponse `json:"user"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
