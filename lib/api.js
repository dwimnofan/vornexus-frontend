import { authFetch } from "./auth"

// API URL configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

/**
 * Generic function to fetch data from the API
 */
export async function fetchData(endpoint, options = {}) {
  const url = `${API_URL}/${endpoint}`
  const response = await authFetch(url, options)

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}

/**
 * Generic function to post data to the API
 */
export async function postData(endpoint, data, options = {}) {
  const url = `${API_URL}/${endpoint}`

  const response = await authFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}

/**
 * Get all notes
 */
export async function getNotes() {
  return fetchData("notes/")
}

/**
 * Get a specific note by ID
 */
export async function getNote(id) {
  return fetchData(`notes/${id}/`)
}

/**
 * Create a new note
 */
export async function createNote(noteData) {
  return postData("notes/", noteData)
}

/**
 * Update an existing note
 */
export async function updateNote(id, noteData) {
  return postData(`notes/${id}/`, noteData, { method: "PUT" })
}

/**
 * Delete a note
 */
export async function deleteNote(id) {
  const url = `${API_URL}/notes/${id}/`
  const response = await authFetch(url, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return true
}

/**
 * Get user profile
 */
export async function getUserProfile() {
  return fetchData("users/profile/")
}

/**
 * Update user profile
 */
export async function updateUserProfile(profileData) {
  return postData("users/profile/", profileData, { method: "PUT" })
}
