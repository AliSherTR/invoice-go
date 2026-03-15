package models

import (
	"time"

	"github.com/google/uuid"
)

type Provider string

const (
	ProviderLocal  Provider = "local"
	ProviderGoogle Provider = "google"
	ProviderGithub Provider = "github"
)

type User struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Email      string    `gorm:"column:email;uniqueIndex;not null"`
	Password   *string   `gorm:"column:password"`
	Name       string    `gorm:"column:name;not null"`
	AvatarURL  *string   `gorm:"column:avatar_url"`
	Provider   Provider  `gorm:"column:provider;not null;default:local"`
	ProviderID *string   `gorm:"column:provider_id"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime"`
}
