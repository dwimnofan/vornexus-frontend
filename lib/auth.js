// API URL configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Token storage keys
const TOKEN_KEY = "auth_token"
const USER_KEY = "user_info"

/**
 * Login user with username and password
 */
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()

    // Store token in localStorage
    localStorage.setItem(TOKEN_KEY, data.token)

    // Store user info if available
    if (data.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    }

    return true
  } catch (error) {
    console.error("Login error:", error)
    return false
  }
}

/**
 * Register a new user
 */
export async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })

    return response.ok
  } catch (error) {
    console.error("Registration error:", error)
    return false
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false
  }

  const token = localStorage.getItem(TOKEN_KEY)
  return !!token
}

/**
 * Get authentication token
 */
export function getToken() {
  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Logout user by removing token
 */
export function logoutUser() {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/**
 * Get authenticated fetch for API requests
 */
export function authFetch(url, options = {}) {
  const token = getToken()

  const headers = {
    ...options.headers,
    Authorization: token ? `Token ${token}` : "",
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

/**
 * Get user info from localStorage
 */
export function getUserInfo() {
  if (typeof window === "undefined") {
    return null
  }

  const userInfo = localStorage.getItem(USER_KEY)
  return userInfo ? JSON.parse(userInfo) : null
}
