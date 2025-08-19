import type { User } from "@/context/app-context"

// Usuarios demo
export const demoUsers: User[] = [
  // MÉDICOS
  {
    id: "demo_doctor_1",
    name: "Dr. Carlos Manuel Rodríguez",
    email: "carlos.rodriguez@demo.com",
    password: "demo123", // Para demo
    role: "doctor",
    avatar: "/doctor-avatar.png",
    license: "EXQ. 123-456",
    clinicIds: ["clinic_central"],
  },
  {
    id: "demo_doctor_2",
    name: "Dra. Ana Sofía Martínez",
    email: "ana.martinez@demo.com",
    password: "demo123", // Para demo
    role: "doctor",
    avatar: "/serene-woman.png",
    license: "EXQ. 456-789",
    clinicIds: ["clinic_norte"],
  },
  {
    id: "demo_doctor_3",
    name: "Dr. Roberto Luis Silva",
    email: "roberto.silva@demo.com",
    password: "demo123", // Para demo
    role: "doctor",
    avatar: "/doctor-avatar.png",
    license: "EXQ. 789-123",
    clinicIds: ["clinic_sur"],
  },
  
  // SECRETARIAS
  {
    id: "demo_secretary_1",
    name: "María Elena López",
    email: "maria.lopez@demo.com",
    password: "demo123", // Para demo
    role: "secretary",
    avatar: "/woman-face-2.png",
    license: null,
    clinicIds: ["clinic_central"],
  },
  {
    id: "demo_secretary_2",
    name: "Carmen Isabel Torres",
    email: "carmen.torres@demo.com",
    password: "demo123", // Para demo
    role: "secretary",
    avatar: "/woman-face-3.png",
    license: null,
    clinicIds: ["clinic_norte"],
  },
  {
    id: "demo_secretary_3",
    name: "Patricia Rosa Vega",
    email: "patricia.vega@demo.com",
    password: "demo123", // Para demo
    role: "secretary",
    avatar: "/woman-face-4.png",
    license: null,
    clinicIds: ["clinic_sur"],
  },
  
  // ADMIN
  {
    id: "demo_admin_1",
    name: "Administrador Sistema",
    email: "admin@demo.com",
    password: "demo123", // Para demo
    role: "admin",
    avatar: "/placeholder-user.jpg",
    license: null,
    clinicIds: ["clinic_central", "clinic_norte", "clinic_sur"],
  },
]

// Función para obtener usuario por ID
export const getUserById = (id: string): User | undefined => {
  return demoUsers.find(user => user.id === id)
}

// Función para obtener usuario por email
export const getUserByEmail = (email: string): User | undefined => {
  return demoUsers.find(user => user.email === email)
}

// Función para autenticar usuario (demo)
export const authenticateUser = (email: string, password: string): User | null => {
  const user = getUserByEmail(email)
  if (user && user.password === password) {
    return user
  }
  return null
}
