import type { Clinic } from "@/context/app-context"

// Clínicas demo
export const demoClinics: Clinic[] = [
  {
    id: "clinic_central",
    name: "Clínica Central",
    address: "Av. Independencia #123, Santo Domingo",
    phone: "(809) 555-1000",
    doctorId: "demo_doctor_1"
  },
  {
    id: "clinic_norte",
    name: "Clínica Norte",
    address: "Calle Libertad #456, Santiago",
    phone: "(809) 555-2000",
    doctorId: "demo_doctor_2"
  },
  {
    id: "clinic_sur",
    name: "Clínica Sur",
    address: "Av. Constitución #789, San Cristóbal",
    phone: "(809) 555-3000",
    doctorId: "demo_doctor_3"
  }
]

// Función para obtener clínica por ID
export const getClinicById = (id: string): Clinic | undefined => {
  return demoClinics.find(clinic => clinic.id === id)
}

// Función para obtener clínicas por doctor
export const getClinicsByDoctor = (doctorId: string): Clinic[] => {
  return demoClinics.filter(clinic => clinic.doctorId === doctorId)
}
