import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

// Routes that should never trigger token refresh logic
const PUBLIC_ROUTES = ['/auth/refresh', '/auth/login', '/auth/register'];

const isPublicRoute = (url: string | undefined): boolean => {
  if (!url) return false;
  return PUBLIC_ROUTES.some((route) => url.includes(route));
};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;

    // Reject immediately for public routes to prevent infinite loops
    if (isPublicRoute(originalRequest.url)) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Calling refresh endpoint. Because of withCredentials: true,
        // the refresh_token cookie is attached automatically.
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // If refresh fails, we clear cookies and redirect to login
        if (typeof window !== 'undefined') {
          // Tell the backend to clear the cookies by hitting logout
          // Not strictly necessary since we redirect, but clean behavior
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'}/auth/logout`,
              {},
              { withCredentials: true }
            )
            .finally(() => {
              window.location.href = '/auth/login';
            });
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

   
    return Promise.reject(err);
  }
);