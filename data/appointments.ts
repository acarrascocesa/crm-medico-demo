import type { Appointment } from "@/context/app-context"

export const appointments: Appointment[] = [
  // Citas de la Clínica Central
  {
    id: "1",
    patient: {
      id: "demo_central_1",
      name: "Ana María López",
      image: "/woman-face-2.png"
    },
    date: "2024-07-30",
    time: "09:00",
    duration: 30,
    status: "Confirmada",
    type: "Consulta General",
    doctor: "Dr. Carlos Manuel Rodríguez",
    notes: "Control de hipertensión. Revisar medicación.",
    reason: "Control rutinario",
    clinicId: "clinic_central"
  },
  {
    id: "2",
    patient: {
      id: "demo_central_2",
      name: "Roberto Carlos Silva",
      image: "/man-face.png"
    },
    date: "2024-07-30",
    time: "10:30",
    duration: 45,
    status: "Confirmada",
    type: "Consulta Especializada",
    doctor: "Dr. Carlos Manuel Rodríguez",
    notes: "Control de diabetes. Revisar niveles de glucosa.",
    reason: "Control diabético",
    clinicId: "clinic_central"
  },
  {
    id: "3",
    patient: {
      id: "demo_central_3",
      name: "Carmen Elena Torres",
      image: "/woman-face-3.png"
    },
    date: "2024-07-31",
    time: "08:00",
    duration: 60,
    status: "Confirmada",
    type: "Consulta Especializada",
    doctor: "Dr. Carlos Manuel Rodríguez",
    notes: "Evaluación de asma. Control ambiental.",
    reason: "Control asmático",
    clinicId: "clinic_central"
  },
  {
    id: "4",
    patient: {
      id: "demo_central_4",
      name: "Miguel Ángel Herrera",
      image: "/man-face-2.png"
    },
    date: "2024-07-31",
    time: "11:00",
    duration: 30,
    status: "Confirmada",
    type: "Consulta General",
    doctor: "Dr. Carlos Manuel Rodríguez",
    notes: "Control de artritis. Posible cambio de medicación.",
    reason: "Dolor articular",
    clinicId: "clinic_central"
  },
  {
    id: "5",
    patient: {
      id: "demo_central_5",
      name: "Patricia Isabel Mendoza",
      image: "/woman-face-4.png"
    },
    date: "2024-08-02",
    time: "10:00",
    duration: 30,
    status: "Pendiente",
    type: "Consulta General",
    doctor: "Dr. Carlos Manuel Rodríguez",
    notes: "Control de rinitis alérgica. Revisar tratamiento.",
    reason: "Rinitis alérgica",
    clinicId: "clinic_central"
  },
  
  // Citas de la Clínica Norte
  {
    id: "6",
    patient: {
      id: "demo_norte_1",
      name: "Francisco Javier Ruiz",
      image: "/man-face-3.png"
    },
    date: "2024-08-01",
    time: "09:30",
    duration: 30,
    status: "Confirmada",
    type: "Consulta General",
    doctor: "Dra. Ana Sofía Martínez",
    notes: "Control de hipertensión. Monitoreo de presión.",
    reason: "Control hipertensivo",
    clinicId: "clinic_norte"
  },
  {
    id: "7",
    patient: {
      id: "demo_norte_2",
      name: "Sofía Alejandra Vega",
      image: "/woman-face.png"
    },
    date: "2024-08-01",
    time: "11:30",
    duration: 45,
    status: "Confirmada",
    type: "Consulta Especializada",
    doctor: "Dra. Ana Sofía Martínez",
    notes: "Control de asma. Revisar inhalador.",
    reason: "Control asmático",
    clinicId: "clinic_norte"
  },
  
  // Citas de la Clínica Sur
  {
    id: "8",
    patient: {
      id: "demo_sur_1",
      name: "José Manuel Ortega",
      image: "/man-face-4.png"
    },
    date: "2024-08-03",
    time: "08:00",
    duration: 60,
    status: "Confirmada",
    type: "Consulta Especializada",
    doctor: "Dr. Roberto Luis Silva",
    notes: "Control de diabetes tipo 1. Ajuste de insulina.",
    reason: "Control diabético",
    clinicId: "clinic_sur"
  },
  {
    id: "9",
    patient: {
      id: "demo_sur_2",
      name: "Laura Cristina Jiménez",
      image: "/woman-face-2.png"
    },
    date: "2024-08-03",
    time: "10:00",
    duration: 30,
    status: "Pendiente",
    type: "Consulta General",
    doctor: "Dr. Roberto Luis Silva",
    notes: "Control de hipertensión. Revisar dieta.",
    reason: "Control hipertensivo",
    clinicId: "clinic_sur"
  }
] 