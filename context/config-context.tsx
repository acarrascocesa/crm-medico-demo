"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import useConfig from '@/hooks/useConfig'

interface ConfigSettings {
  clinicName: string
  timezone: string
  language: string
}

interface ConfigContextType {
  settings: ConfigSettings
  updateSettings: (newSettings: ConfigSettings) => Promise<void>
  isLoading: boolean
  refreshSettings: () => Promise<void>
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

interface ConfigProviderProps {
  children: ReactNode
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [settings, setSettings] = useState<ConfigSettings>({
    clinicName: "HSaludPro-360",
    timezone: "America/Santo_Domingo",
    language: "es"
  })
  
  const [isLoading, setIsLoading] = useState(true)
  const { getBasicSettings, saveBasicSettings } = useConfig()

  const refreshSettings = async () => {
    try {
      const newSettings = await getBasicSettings()
      setSettings(newSettings)
      
      // Aplicar configuraciones al sistema
      applySettings(newSettings)
    } catch (error) {
      console.error('Error al cargar configuraciones:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSettings = async (newSettings: ConfigSettings) => {
    try {
      await saveBasicSettings(newSettings)
      setSettings(newSettings)
      
      // Aplicar configuraciones al sistema
      applySettings(newSettings)
    } catch (error) {
      console.error('Error al guardar configuraciones:', error)
      throw error
    }
  }

  const applySettings = (config: ConfigSettings) => {
    // Aplicar zona horaria
    if (typeof window !== 'undefined') {
      // Guardar en localStorage para persistencia
      localStorage.setItem('app-settings', JSON.stringify(config))
      
      // Aplicar configuración de idioma (podría usarse con i18n)
      document.documentElement.lang = config.language
      
      // Actualizar título de la página
      if (config.clinicName) {
        document.title = `${config.clinicName} - CRM`
      }
    }
  }

  useEffect(() => {
    // Cargar configuraciones al inicializar
    const loadInitialSettings = async () => {
      // Intentar cargar desde localStorage primero (para mejor UX)
      if (typeof window !== 'undefined') {
        const savedSettings = localStorage.getItem('app-settings')
        if (savedSettings) {
          try {
            const parsedSettings = JSON.parse(savedSettings)
            setSettings(parsedSettings)
            applySettings(parsedSettings)
          } catch (error) {
            console.error('Error al cargar configuraciones del localStorage:', error)
          }
        }
      }
      
      // Luego cargar desde el servidor
      await refreshSettings()
    }

    loadInitialSettings()
  }, [])

  return (
    <ConfigContext.Provider value={{
      settings,
      updateSettings,
      isLoading,
      refreshSettings
    }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfigContext() {
  const context = useContext(ConfigContext)
  if (context === undefined) {
    throw new Error('useConfigContext must be used within a ConfigProvider')
  }
  return context
}

export default ConfigContext
