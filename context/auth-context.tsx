"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authenticateUser } from "@/data/users"

export interface User {
  id: string
  name: string
  email: string
  role: "doctor" | "secretary" | "admin"
  multiClinicView?: boolean
  avatarUrl?: string
  licenseNumber?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("authToken")
      if (token) {
        try {
          // Para demo, verificar si el token corresponde a un usuario válido
          const userData = JSON.parse(token)
          if (userData && userData.id) {
            setUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              avatarUrl: userData.avatar,
              licenseNumber: userData.license,
              multiClinicView: userData.role === "admin",
            })
          } else {
            localStorage.removeItem("authToken")
            localStorage.removeItem("selectedClinicId")
          }
        } catch (error) {
          console.error("Token verification failed:", error)
          localStorage.removeItem("authToken")
          localStorage.removeItem("selectedClinicId")
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      // Usar autenticación demo
      const authenticatedUser = authenticateUser(email, password)
      
      if (authenticatedUser) {
        const userData = {
          id: authenticatedUser.id,
          name: authenticatedUser.name,
          email: authenticatedUser.email,
          role: authenticatedUser.role,
          avatar: authenticatedUser.avatar,
          license: authenticatedUser.license,
        }
        
        // Guardar token demo
        localStorage.setItem("authToken", JSON.stringify(userData))
        
        setUser({
          id: authenticatedUser.id,
          name: authenticatedUser.name,
          email: authenticatedUser.email,
          role: authenticatedUser.role as "doctor" | "secretary" | "admin",
          avatarUrl: authenticatedUser.avatar,
          licenseNumber: authenticatedUser.license,
          multiClinicView: authenticatedUser.role === "admin",
        })
        
        setLoading(false)
        return true
      } else {
        setLoading(false)
        return false
      }
    } catch (error) {
      console.error("Login failed:", error)
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("selectedClinicId")
    setUser(null)
    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
