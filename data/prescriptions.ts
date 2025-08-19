import type { Prescription } from "@/context/app-context"

export const prescriptions: Prescription[] = [
  // Prescripciones de la Clínica Central
  {
    id: "prescription_1",
    patient_id: "demo_central_1",
    doctor_id: "demo_doctor_1",
    clinic_id: "clinic_central",
    prescription_date: new Date("2024-07-15"),
    prescription_text: "1. Amlodipino 5mg - 1 tableta por la mañana\n2. Losartán 50mg - 1 tableta por la mañana\n\nInstrucciones: Tomar ambos medicamentos por la mañana con o sin alimentos. Control de presión arterial semanal.",
    status: "Activa",
    created_at: new Date("2024-07-15"),
    updated_at: new Date("2024-07-15")
  },
  {
    id: "prescription_2",
    patient_id: "demo_central_2",
    doctor_id: "demo_doctor_1",
    clinic_id: "clinic_central",
    prescription_date: new Date("2024-07-20"),
    prescription_text: "1. Metformina 500mg - 1 tableta dos veces al día con las comidas\n2. Aspirina 81mg - 1 tableta por la mañana\n\nInstrucciones: Tomar metformina con las comidas principales. Control de glucosa diario.",
    status: "Activa",
    created_at: new Date("2024-07-20"),
    updated_at: new Date("2024-07-20")
  },
  {
    id: "prescription_3",
    patient_id: "demo_central_3",
    doctor_id: "demo_doctor_1",
    clinic_id: "clinic_central",
    prescription_date: new Date("2024-07-18"),
    prescription_text: "1. Salbutamol inhalador - 2 inhalaciones cada 4-6 horas según necesidad\n2. Budesonida inhalador - 2 inhalaciones dos veces al día\n\nInstrucciones: Usar salbutamol para crisis asmáticas. Budesonida para control diario.",
    status: "Activa",
    created_at: new Date("2024-07-18"),
    updated_at: new Date("2024-07-18")
  },
  
  // Prescripciones de la Clínica Norte
  {
    id: "prescription_4",
    patient_id: "demo_norte_1",
    doctor_id: "demo_doctor_2",
    clinic_id: "clinic_norte",
    prescription_date: new Date("2024-07-22"),
    prescription_text: "1. Atorvastatina 20mg - 1 tableta por la noche\n2. Metoprolol 50mg - 1 tableta dos veces al día\n\nInstrucciones: Atorvastatina por la noche. Metoprolol con las comidas.",
    status: "Activa",
    created_at: new Date("2024-07-22"),
    updated_at: new Date("2024-07-22")
  },
  {
    id: "prescription_5",
    patient_id: "demo_norte_2",
    doctor_id: "demo_doctor_2",
    clinic_id: "clinic_norte",
    prescription_date: new Date("2024-07-25"),
    prescription_text: "1. Salbutamol inhalador - 2 inhalaciones cada 4-6 horas según necesidad\n2. Loratadina 10mg - 1 tableta por la mañana\n\nInstrucciones: Salbutamol para crisis. Loratadina para control de alergias.",
    status: "Activa",
    created_at: new Date("2024-07-25"),
    updated_at: new Date("2024-07-25")
  },
  
  // Prescripciones de la Clínica Sur
  {
    id: "prescription_6",
    patient_id: "demo_sur_1",
    doctor_id: "demo_doctor_3",
    clinic_id: "clinic_sur",
    prescription_date: new Date("2024-07-28"),
    prescription_text: "1. Insulina Regular - Según glucemia antes de las comidas\n2. Enalapril 10mg - 1 tableta por la mañana\n\nInstrucciones: Insulina 15-30 minutos antes de comer. Enalapril por la mañana.",
    status: "Activa",
    created_at: new Date("2024-07-28"),
    updated_at: new Date("2024-07-28")
  },
  {
    id: "prescription_7",
    patient_id: "demo_sur_2",
    doctor_id: "demo_doctor_3",
    clinic_id: "clinic_sur",
    prescription_date: new Date("2024-07-30"),
    prescription_text: "1. Hidroclorotiazida 25mg - 1 tableta por la mañana\n2. Paracetamol 500mg - 1-2 tabletas cada 6 horas según dolor\n\nInstrucciones: Hidroclorotiazida por la mañana. Paracetamol solo si hay dolor.",
    status: "Activa",
    created_at: new Date("2024-07-30"),
    updated_at: new Date("2024-07-30")
  }
]
