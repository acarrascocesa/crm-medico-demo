import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { ConfigProvider } from "@/context/config-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MediCRM Demo - Sistema de Gestión Médica",
  description: "Demo del sistema de gestión integral para clínicas médicas",
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/medical-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/medical-logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/medical-logo.png',
    apple: '/medical-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <ConfigProvider>
              {children}
            </ConfigProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
