"use client"

import { useEffect, useRef } from "react"
import { toast } from "@/components/ui/sonner"

/**
 * NotificationListener Component
 *
 * Establishes WebSocket connection to Django backend and displays
 * real-time notifications using ShadCN toast component
 */
export default function NotificationListener() {

  // const wsRef = useRef(null)
  // const reconnectTimeoutRef = useRef(null)
  // const reconnectAttemptsRef = useRef(0)
  // const maxReconnectAttempts = 5
  // const reconnectDelay = 3000 // 3 seconds

  // /**
  //  * Establishes WebSocket connection with automatic reconnection logic
  //  */
  // const connectWebSocket = () => {
  //   try {
  //     // Create WebSocket connection to Django backend
  //     const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws/notification/"
  //     wsRef.current = new WebSocket(wsUrl)

  //     // Handle successful connection
  //     wsRef.current.onopen = (event) => {
  //       console.log("✅ WebSocket connected successfully")
  //       reconnectAttemptsRef.current = 0 // Reset reconnection attempts

  //       // Show connection success toast
  //       toast({
  //         title: "Connected",
  //         description: "Real-time notifications enabled",
  //         duration: 2000,
  //       })
  //     }

  //     // Handle incoming messages
  //     wsRef.current.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data)
  //         console.log("📨 Received notification:", data)

  //         // Extract message from the WebSocket data
  //         const message = data.message || data.text || event.data

  //         // Determine toast variant based on message content
  //         let variant = "default"
  //         let title = "Notification"

  //         if (message.toLowerCase().includes("success")) {
  //           variant = "default"
  //           title = "Success"
  //         } else if (message.toLowerCase().includes("failed") || message.toLowerCase().includes("error")) {
  //           variant = "destructive"
  //           title = "Error"
  //         } else if (message.toLowerCase().includes("processing")) {
  //           variant = "default"
  //           title = "Processing"
  //         }

  //         // Display toast notification
  //         toast({
  //           title: title,
  //           description: message,
  //           variant: variant,
  //           duration: 4000, // 4 seconds
  //         })
  //       } catch (error) {
  //         console.error("❌ Error parsing WebSocket message:", error)
  //         // Fallback: show raw message if JSON parsing fails
  //         toast({
  //           title: "Notification",
  //           description: event.data,
  //           duration: 4000,
  //         })
  //       }
  //     }

  //     // Handle connection errors
  //     wsRef.current.onerror = (error) => {
  //       console.error("❌ WebSocket error:", error)
  //       toast({
  //         title: "Connection Error",
  //         description: "Failed to connect to notification service",
  //         variant: "destructive",
  //         duration: 3000,
  //       })
  //     }

  //     // Handle connection close
  //     wsRef.current.onclose = (event) => {
  //       console.log("🔌 WebSocket connection closed:", event.code, event.reason)

  //       // Only attempt reconnection if it wasn't a manual close
  //       if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
  //         reconnectAttemptsRef.current += 1
  //         console.log(`🔄 Attempting to reconnect... (${reconnectAttemptsRef.current}/${maxReconnectAttempts})`)

  //         toast({
  //           title: "Connection Lost",
  //           description: `Reconnecting... (${reconnectAttemptsRef.current}/${maxReconnectAttempts})`,
  //           variant: "destructive",
  //           duration: 2000,
  //         })

  //         // Schedule reconnection
  //         reconnectTimeoutRef.current = setTimeout(() => {
  //           connectWebSocket()
  //         }, reconnectDelay)
  //       } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
  //         toast({
  //           title: "Connection Failed",
  //           description: "Unable to establish connection. Please refresh the page.",
  //           variant: "destructive",
  //           duration: 0, // Persistent toast
  //         })
  //       }
  //     }
  //   } catch (error) {
  //     console.error("❌ Failed to create WebSocket connection:", error)
  //     toast({
  //       title: "Connection Error",
  //       description: "Failed to initialize notification service",
  //       variant: "destructive",
  //       duration: 3000,
  //     })
  //   }
  // }

  // /**
  //  * Cleanup function to close WebSocket and clear timeouts
  //  */
  // const cleanup = () => {
  //   // Clear any pending reconnection timeout
  //   if (reconnectTimeoutRef.current) {
  //     clearTimeout(reconnectTimeoutRef.current)
  //     reconnectTimeoutRef.current = null
  //   }

  //   // Close WebSocket connection
  //   if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
  //     wsRef.current.close(1000, "Component unmounting")
  //   }
  // }

  // // Effect to establish WebSocket connection on component mount
  // useEffect(() => {
  //   connectWebSocket()

  //   // Cleanup on component unmount
  //   return cleanup
  // }, []) // Empty dependency array ensures this runs once on mount

  // // Effect to handle page visibility changes (optional optimization)
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       // Page is hidden, optionally pause reconnection attempts
  //       console.log("📱 Page hidden, pausing notifications")
  //     } else {
  //       // Page is visible, ensure connection is active
  //       console.log("📱 Page visible, ensuring connection")
  //       if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
  //         connectWebSocket()
  //       }
  //     }
  //   }

  //   document.addEventListener("visibilitychange", handleVisibilityChange)
  //   return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  // }, [])

  // // This component doesn't render any UI
  // return null
}
