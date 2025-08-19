import type { Patient } from "@/types/patient"

// Pacientes Demo - Clínica Central
export const demoCentralPatients: Patient[] = [
  {
    id: "demo_central_1",
    name: "Ana María López",
    email: "ana.lopez@email.com",
    phone: "(809) 555-0101",
    dateOfBirth: "1985-03-15",
    gender: "Femenino",
    address: "Calle Principal #123, Santo Domingo",
    emergencyContact: {
      name: "Carlos López",
      phone: "(809) 555-0102",
      relationship: "Esposo"
    },
    insurance: "ARS Humano",
    insuranceNumber: "HUM-123456789",
    bloodType: "O+",
    allergies: ["Penicilina", "Polen"],
    chronicConditions: ["Hipertensión"],
    status: "Activo",
    image: "/woman-face-2.png",
    notes: "Paciente con hipertensión controlada. Requiere seguimiento mensual.",
    createdAt: "2024-01-15",
    updatedAt: "2024-07-15",
    clinicId: "clinic_central"
  },
  {
    id: "demo_central_2",
    name: "Roberto Carlos Silva",
    email: "roberto.silva@email.com",
    phone: "(809) 555-0201",
    dateOfBirth: "1978-07-22",
    gender: "Masculino",
    address: "Avenida Independencia #456, Santiago",
    emergencyContact: {
      name: "María Silva",
      phone: "(809) 555-0202",
      relationship: "Esposa"
    },
    insurance: "ARS Universal",
    insuranceNumber: "UNI-987654321",
    bloodType: "A+",
    allergies: ["Sulfas"],
    chronicConditions: ["Diabetes Tipo 2"],
    status: "Activo",
    image: "/man-face.png",
    notes: "Paciente diabético con buen control. Monitoreo de glucosa diario.",
    createdAt: "2024-02-10",
    updatedAt: "2024-07-20",
    clinicId: "clinic_central"
  },
  {
    id: "demo_central_3",
    name: "Carmen Elena Torres",
    email: "carmen.torres@email.com",
    phone: "(809) 555-0301",
    dateOfBirth: "1990-11-08",
    gender: "Femenino",
    address: "Calle Duarte #789, Haina",
    emergencyContact: {
      name: "José Torres",
      phone: "(809) 555-0302",
      relationship: "Esposo"
    },
    insurance: "ARS Monumental",
    insuranceNumber: "MON-456789123",
    bloodType: "B+",
    allergies: ["Látex"],
    chronicConditions: ["Asma"],
    status: "Activo",
    image: "/woman-face-3.png",
    notes: "Paciente asmática. Control ambiental importante.",
    createdAt: "2024-03-05",
    updatedAt: "2024-07-22",
    clinicId: "clinic_central"
  },
  {
    id: "demo_central_4",
    name: "Miguel Ángel Herrera",
    email: "miguel.herrera@email.com",
    phone: "(809) 555-0401",
    dateOfBirth: "1965-12-03",
    gender: "Masculino",
    address: "Calle Sánchez #321, San Pedro de Macorís",
    emergencyContact: {
      name: "Isabel Herrera",
      phone: "(809) 555-0402",
      relationship: "Hija"
    },
    insurance: "ARS Monumental",
    insuranceNumber: "MON-789123456",
    bloodType: "AB+",
    allergies: ["Mariscos"],
    chronicConditions: ["Artritis", "Hipertensión"],
    status: "Activo",
    image: "/man-face-2.png",
    notes: "Paciente con artritis reumatoide. Requiere tratamiento especializado.",
    createdAt: "2024-01-20",
    updatedAt: "2024-07-18",
    clinicId: "clinic_central"
  },
  {
    id: "demo_central_5",
    name: "Patricia Isabel Mendoza",
    email: "patricia.mendoza@email.com",
    phone: "(809) 555-0501",
    dateOfBirth: "1982-05-18",
    gender: "Femenino",
    address: "Avenida 27 de Febrero #654, Santo Domingo",
    emergencyContact: {
      name: "Luis Mendoza",
      phone: "(809) 555-0502",
      relationship: "Esposo"
    },
    insurance: "ARS Humano",
    insuranceNumber: "HUM-321654987",
    bloodType: "O-",
    allergies: ["Polvo", "Ácaros"],
    chronicConditions: ["Rinitis alérgica"],
    status: "Activo",
    image: "/woman-face-4.png",
    notes: "Paciente con rinitis alérgica estacional. Control ambiental.",
    createdAt: "2024-04-12",
    updatedAt: "2024-07-25",
    clinicId: "clinic_central"
  }
]

// Pacientes Demo - Clínica Norte
export const demoNortePatients: Patient[] = [
  {
    id: "demo_norte_1",
    name: "Francisco Javier Ruiz",
    email: "francisco.ruiz@email.com",
    phone: "(809) 555-0601",
    dateOfBirth: "1975-09-30",
    gender: "Masculino",
    address: "Calle Libertad #987, Santiago",
    emergencyContact: {
      name: "Ana Ruiz",
      phone: "(809) 555-0602",
      relationship: "Esposa"
    },
    insurance: "ARS Universal",
    insuranceNumber: "UNI-147258369",
    bloodType: "A-",
    allergies: ["Polen"],
    chronicConditions: ["Hipertensión"],
    status: "Activo",
    image: "/man-face-3.png",
    notes: "Paciente hipertenso. Control de presión arterial diario.",
    createdAt: "2024-02-15",
    updatedAt: "2024-07-28",
    clinicId: "clinic_norte"
  },
  {
    id: "demo_norte_2",
    name: "Sofía Alejandra Vega",
    email: "sofia.vega@email.com",
    phone: "(809) 555-0701",
    dateOfBirth: "1995-02-14",
    gender: "Femenino",
    address: "Avenida Estrella #147, Santiago",
    emergencyContact: {
      name: "Carlos Vega",
      phone: "(809) 555-0702",
      relationship: "Padre"
    },
    insurance: "ARS Humano",
    insuranceNumber: "HUM-963852741",
    bloodType: "B-",
    allergies: ["Látex", "Polvo"],
    chronicConditions: ["Asma"],
    status: "Activo",
    image: "/woman-face.png",
    notes: "Paciente asmática joven. Control ambiental estricto.",
    createdAt: "2024-03-20",
    updatedAt: "2024-07-30",
    clinicId: "clinic_norte"
  }
]

// Pacientes Demo - Clínica Sur
export const demoSurPatients: Patient[] = [
  {
    id: "demo_sur_1",
    name: "José Manuel Ortega",
    email: "jose.ortega@email.com",
    phone: "(809) 555-0801",
    dateOfBirth: "1968-11-25",
    gender: "Masculino",
    address: "Calle San Cristóbal #258, San Cristóbal",
    emergencyContact: {
      name: "Rosa Ortega",
      phone: "(809) 555-0802",
      relationship: "Esposa"
    },
    insurance: "ARS Monumental",
    insuranceNumber: "MON-852963741",
    bloodType: "O+",
    allergies: ["Penicilina"],
    chronicConditions: ["Diabetes Tipo 1"],
    status: "Activo",
    image: "/man-face-4.png",
    notes: "Paciente diabético tipo 1. Control de insulina diario.",
    createdAt: "2024-01-30",
    updatedAt: "2024-08-01",
    clinicId: "clinic_sur"
  },
  {
    id: "demo_sur_2",
    name: "Laura Cristina Jiménez",
    email: "laura.jimenez@email.com",
    phone: "(809) 555-0901",
    dateOfBirth: "1988-07-07",
    gender: "Femenino",
    address: "Avenida Constitución #369, San Cristóbal",
    emergencyContact: {
      name: "Roberto Jiménez",
      phone: "(809) 555-0902",
      relationship: "Esposo"
    },
    insurance: "ARS Universal",
    insuranceNumber: "UNI-741852963",
    bloodType: "A+",
    allergies: ["Sulfas", "Polen"],
    chronicConditions: ["Hipertensión"],
    status: "Activo",
    image: "/woman-face-2.png",
    notes: "Paciente hipertensa. Control de presión y dieta.",
    createdAt: "2024-04-05",
    updatedAt: "2024-08-03",
    clinicId: "clinic_sur"
  }
]

// Combinar todos los pacientes demo
export const demoPatients: Patient[] = [
  ...demoCentralPatients,
  ...demoNortePatients,
  ...demoSurPatients
]

// Función para obtener pacientes por clínica
export const getPatientsByClinic = (clinicId: string): Patient[] => {
  switch (clinicId) {
    case "clinic_central":
      return demoCentralPatients
    case "clinic_norte":
      return demoNortePatients
    case "clinic_sur":
      return demoSurPatients
    default:
      return demoPatients
  }
}

// Función para obtener un paciente por ID
export const getPatientById = (id: string): Patient | undefined => {
  return demoPatients.find(patient => patient.id === id)
}

// Función para buscar pacientes
export const searchPatients = (query: string): Patient[] => {
  const lowercaseQuery = query.toLowerCase()
  return demoPatients.filter(patient =>
    patient.name.toLowerCase().includes(lowercaseQuery) ||
    patient.email.toLowerCase().includes(lowercaseQuery) ||
    patient.phone.includes(query)
  )
} 