"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Credenciales incorrectas.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Indigo Background with Graphics */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#eef2ff] to-[#c7d2fe] relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Abstract Wavy Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200/40 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-indigo-200/30 rounded-full blur-lg"></div>

        {/* Data Visualization Circles */}
        <div className="absolute top-32 left-1/3 w-4 h-4 bg-indigo-200/60 rounded-full"></div>
        <div className="absolute top-48 right-1/4 w-6 h-6 bg-indigo-200/50 rounded-full"></div>
        <div className="absolute bottom-32 left-1/2 w-3 h-3 bg-indigo-200/70 rounded-full"></div>
        <div className="absolute bottom-48 right-1/3 w-5 h-5 bg-indigo-200/40 rounded-full"></div>

        {/* Dashed Lines connecting circles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="25%" y1="20%" x2="40%" y2="25%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="60%" y1="30%" x2="75%" y2="35%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="50%" y1="70%" x2="65%" y2="75%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="5,5" />
        </svg>

                 {/* Content */}
         <div className="relative z-10 flex flex-col justify-center h-full px-12 pl-24 text-white">
                     {/* Branding */}
           <div className="absolute top-8 left-8 flex items-center space-x-3">
             <span className="text-white font-semibold text-lg">MEDICRM DEMO</span>
           </div>

          {/* Welcome Message */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-4">MEDICRM DEMO</h1>
              <div className="w-16 h-1 bg-white rounded-full"></div>
            </div>
            
            <div className="max-w-md">
              <p className="text-gray-800 leading-relaxed font-medium">
                Sistema de gestión médica integral para demostración. 
                Explora todas las funcionalidades de gestión de pacientes, 
                citas, historias clínicas y más.
              </p>
            </div>

            {/* Demo Users Cards */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Image src="/doctor-avatar.png" alt="Dr. Carlos" width={32} height={32} className="rounded-full" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Dr. Carlos Manuel Rodríguez</p>
                  <p className="text-gray-600 text-sm">Medicina General</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Image src="/serene-woman.png" alt="Dra. Ana" width={32} height={32} className="rounded-full" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Dra. Ana Sofía Martínez</p>
                  <p className="text-gray-600 text-sm">Cardiología</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Image src="/placeholder-user.jpg" alt="Admin" width={32} height={32} className="rounded-full" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Administrador Sistema</p>
                  <p className="text-gray-600 text-sm">Vista Multiclínica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - White Form */}
      <div className="flex-1 lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
                     {/* Mobile Branding */}
           <div className="lg:hidden text-center mb-8">
             <div className="flex items-center justify-center space-x-3 mb-4">
               <span className="text-indigo-600 font-semibold text-lg">MEDICRM DEMO</span>
             </div>
           </div>

                     {/* Form Header */}
           <div className="text-center lg:text-left">
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
             <p className="text-gray-600">
               Ingresa tus credenciales para acceder a tu panel de control médico
             </p>
           </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="space-y-2">
               <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                 Correo Electrónico
               </Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l-lg"></div>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!error}
                  className="h-12 pl-6 pr-4 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

                         <div className="space-y-2">
               <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                 Contraseña
               </Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l-lg"></div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={(e) => {
                    if (typeof e.getModifierState === "function") {
                      setIsCapsLockOn(!!e.getModifierState("CapsLock"))
                    }
                  }}
                  name="password"
                  autoComplete="current-password"
                  aria-invalid={!!error}
                  className="h-12 pl-6 pr-12 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {isCapsLockOn && (
                <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span>Mayúsculas activadas</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700 select-none cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-0 transition-colors"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                                 <span className="group-hover:text-gray-800 transition-colors">Recordarme</span>
              </label>
                             <Link 
                 href="/auth/forgot-password" 
                 className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
               >
                 ¿Olvidaste tu contraseña?
               </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert" aria-live="polite">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                <span>Iniciar sesión</span>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Credenciales Demo:</h3>
            <div className="space-y-2 text-xs text-indigo-700">
              <div><strong>Médico:</strong> carlos.rodriguez@demo.com / demo123</div>
              <div><strong>Cardióloga:</strong> ana.martinez@demo.com / demo123</div>
              <div><strong>Admin:</strong> admin@demo.com / demo123</div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Sistema de demostración - Datos simulados
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
