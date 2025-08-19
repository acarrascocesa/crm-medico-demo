export interface Patient {
  id: string
  clinicId: string
  name: string
  email: string
  phone: string
  cedula: string
  dateOfBirth: string | null
  gender: "Masculino" | "Femenino" | "Otro"
  address: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
  insuranceProvider: string
  insuranceNumber: string
  bloodType: string
  allergies: string[]
  chronicConditions: string[]
  status: "Activo" | "Pendiente" | "Inactivo"
  avatarUrl: string
  notes: string
  createdAt: string
  updatedAt: string
  clinicName?: string
  viewMode?: "unified" | "separated"
}
