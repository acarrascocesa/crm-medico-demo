"use client"

import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext } from "@/context/app-context"
import { useAuth } from "@/context/auth-context"
import { useDemoClinics } from "@/hooks/useDemoData"
import { Building, Loader2, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ClinicSelector() {
  const { user } = useAuth()
  const { selectedClinicId, setSelectedClinicId } = useAppContext()
  const { clinics, loading, error } = useDemoClinics()

  // Check if user has multi-clinic view
  const hasMultiClinicView = user?.multiClinicView && user?.role === 'doctor'

  useEffect(() => {
    // For multi-clinic users, don't set a default clinic (unified view)
    if (hasMultiClinicView) {
      return // Don't auto-select any clinic for unified view
    }

    // Set a default clinic if none is selected and we have clinics (normal users)
    if (clinics.length > 0 && !selectedClinicId) {
      setSelectedClinicId(clinics[0].clinic_id)
    }
  }, [clinics, selectedClinicId, setSelectedClinicId, hasMultiClinicView])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center gap-2 w-[220px] h-10">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground truncate">
          Cargando clínicas...
        </span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center gap-2 w-[220px] h-10">
        <Building className="h-5 w-5 text-red-500" />
        <span className="text-sm text-red-500 truncate">
          Error al cargar clínicas
        </span>
      </div>
    )
  }

  // No clinics
  if (clinics.length === 0) {
    return (
      <div className="flex items-center gap-2 w-[220px] h-10">
        <Building className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground truncate">
          Sin clínicas disponibles
        </span>
      </div>
    )
  }

  // Multi-clinic view - show unified view indicator
  if (hasMultiClinicView) {
    return (
      <div className="flex items-center gap-2 w-[220px] h-10">
        <Globe className="h-5 w-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-700 truncate">
          Vista Unificada
        </span>
        <Badge variant="secondary" className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200">
          Todas
        </Badge>
      </div>
    )
  }

  // Si solo tiene una clínica, mostrar solo el nombre
  if (clinics.length === 1) {
    return (
      <div className="flex items-center gap-2 w-[220px] h-10">
        <Building className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground truncate">
          {clinics[0].clinic_name}
        </span>
      </div>
    )
  }

  return (
    <Select onValueChange={setSelectedClinicId} value={selectedClinicId || ""}>
      <SelectTrigger className="w-[220px]">
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          <SelectValue placeholder="Seleccionar centro..." />
        </div>
      </SelectTrigger>
      <SelectContent>
        {clinics.map((clinic) => (
          <SelectItem key={clinic.clinic_id} value={clinic.clinic_id}>
            {clinic.clinic_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
