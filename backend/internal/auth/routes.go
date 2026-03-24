package auth

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.RouterGroup) {
	authGroup := router.Group("/auth")
	{
		authGroup.POST("/register", RegisterHandler)
		authGroup.POST("/login", LoginHandler)
		authGroup.POST("/refresh", RefreshTokenHandler)
		// We'll protect logout with middleware later in main.go by mounting it on a protected group,
		// or we can just expect the token here. Let's assume it's protected by the auth middleware down the line.
		// However, it's safer to not mount it under the open auth group if we want it protected, 
		// but since it just reads the context, we will export the handler and let the main router handle it,
		// or we can pass a middleware to this function. 
		// Actually, let's keep it in this generic file and assume the router uses middleware on specific routes.
	}
}

func RegisterProtectedRoutes(router *gin.RouterGroup) {
	authGroup := router.Group("/auth")
	{
		authGroup.POST("/logout", LogoutHandler)
	}
}
