export interface Medication {
  id: string
  name: string
  genericName: string
  category: "Antibióticos" | "Analgésicos" | "Cardiovasculares" | "Antihistamínicos" | "Corticosteroides" | "Otros"
  dosage: string
  frequency: string
  typicalDuration: string
  instructions: string
  contraindications: string
  sideEffects: string
  doctorId: string // Asociado al doctor, no a la clínica
  isActive: boolean
}

export const medications: Medication[] = [
  // MEDICAMENTOS DEL DR. CARLOS (MEDICINA GENERAL)
  {
    id: "med_1",
    name: "Amlodipino",
    genericName: "Amlodipine",
    category: "Cardiovasculares",
    dosage: "5-10 mg",
    frequency: "Una vez al día",
    typicalDuration: "Indefinido",
    instructions: "Tomar por la mañana, con o sin alimentos",
    contraindications: "Hipersensibilidad al amlodipino",
    sideEffects: "Edema, mareos, fatiga",
    doctorId: "demo_doctor_1",
    isActive: true
  },
  {
    id: "med_2",
    name: "Losartán",
    genericName: "Losartan",
    category: "Cardiovasculares",
    dosage: "50-100 mg",
    frequency: "Una vez al día",
    typicalDuration: "Indefinido",
    instructions: "Tomar por la mañana, con o sin alimentos",
    contraindications: "Embarazo, hipersensibilidad",
    sideEffects: "Mareos, fatiga, tos seca",
    doctorId: "demo_doctor_1",
    isActive: true
  },
  {
    id: "med_3",
    name: "Metformina",
    genericName: "Metformin",
    category: "Otros",
    dosage: "500-2000 mg",
    frequency: "Dos veces al día",
    typicalDuration: "Indefinido",
    instructions: "Tomar con las comidas principales",
    contraindications: "Insuficiencia renal severa",
    sideEffects: "Náuseas, diarrea, malestar estomacal",
    doctorId: "demo_doctor_1",
    isActive: true
  },
  {
    id: "med_4",
    name: "Aspirina",
    genericName: "Acetylsalicylic Acid",
    category: "Cardiovasculares",
    dosage: "81-325 mg",
    frequency: "Una vez al día",
    typicalDuration: "Indefinido",
    instructions: "Tomar con alimentos para evitar irritación gástrica",
    contraindications: "Úlcera gástrica, alergia a aspirina",
    sideEffects: "Irritación gástrica, sangrado",
    doctorId: "demo_doctor_1",
    isActive: true
  },
  {
    id: "med_5",
    name: "Ibuprofeno",
    genericName: "Ibuprofen",
    category: "Analgésicos",
    dosage: "400-800 mg",
    frequency: "Cada 6-8 horas",
    typicalDuration: "3-7 días",
    instructions: "Tomar con alimentos",
    contraindications: "Úlcera gástrica, alergia a AINEs",
    sideEffects: "Irritación gástrica, dolor de cabeza",
    doctorId: "demo_doctor_1",
    isActive: true
  },

  // MEDICAMENTOS DE LA DRA. ANA (CARDIOLOGÍA)
  {
    id: "med_6",
    name: "Atorvastatina",
    genericName: "Atorvastatin",
    category: "Cardiovasculares",
    dosage: "10-80 mg",
    frequency: "Una vez al día",
    typicalDuration: "Indefinido",
    instructions: "Tomar por la noche, con o sin alimentos",
    contraindications: "Enfermedad hepática activa",
    sideEffects: "Dolor muscular, náuseas, dolor de cabeza",
    doctorId: "demo_doctor_2",
    isActive: true
  },
  {
    id: "med_7",
    name: "Metoprolol",
    genericName: "Metoprolol",
    category: "Cardiovasculares",
    dosage: "25-200 mg",
    frequency: "Una o dos veces al día",
    typicalDuration: "Indefinido",
    instructions: "Tomar con alimentos, no suspender abruptamente",
    contraindications: "Bradicardia severa, bloqueo AV",
    sideEffects: "Fatiga, mareos, bradicardia",
    doctorId: "demo_doctor_2",
    isActive: true
  },
  {
    id: "med_8",
    name: "Salbutamol",
    genericName: "Albuterol",
    category: "Otros",
    dosage: "2 inhalaciones",
    frequency: "Cada 4-6 horas según necesidad",
    typicalDuration: "Según necesidad",
    instructions: "Inhalar lentamente y mantener la respiración",
    contraindications: "Hipersensibilidad al salbutamol",
    sideEffects: "Temblores, taquicardia, nerviosismo",
    doctorId: "demo_doctor_2",
    isActive: true
  },
  {
    id: "med_9",
    name: "Loratadina",
    genericName: "Loratadine",
    category: "Antihistamínicos",
    dosage: "10 mg",
    frequency: "Una vez al día",
    typicalDuration: "7-14 días",
    instructions: "Tomar por la mañana, con o sin alimentos",
    contraindications: "Hipersensibilidad a loratadina",
    sideEffects: "Somnolencia, sequedad de boca",
    doctorId: "demo_doctor_2",
    isActive: true
  },
  {
    id: "med_10",
    name: "Budesonida",
    genericName: "Budesonide",
    category: "Corticosteroides",
    dosage: "200-400 mcg",
    frequency: "Dos veces al día",
    typicalDuration: "Según necesidad",
    instructions: "Inhalar por la mañana y noche",
    contraindications: "Infecciones respiratorias activas",
    sideEffects: "Candidiasis oral, ronquera",
    doctorId: "demo_doctor_2",
    isActive: true
  },

  // MEDICAMENTOS DEL DR. ROBERTO (MEDICINA GENERAL)
  {
    id: "med_11",
    name: "Insulina Regular",
    genericName: "Regular Insulin",
    category: "Otros",
    dosage: "Según glucemia",
    frequency: "Antes de las comidas",
    typicalDuration: "Indefinido",
    instructions: "Inyectar 15-30 minutos antes de comer",
    contraindications: "Hipoglucemia",
    sideEffects: "Hipoglucemia, aumento de peso",
    doctorId: "demo_doctor_3",
    isActive: true
  },
  {
    id: "med_12",
    name: "Enalapril",
    genericName: "Enalapril",
    category: "Cardiovasculares",
    dosage: "5-40 mg",
    frequency: "Una vez al día",
    typicalDuration: "Indefinido",
    instructions: "Tomar por la mañana, con o sin alimentos",
    contraindications: "Embarazo, angioedema",
    sideEffects: "Tos seca, mareos, fatiga",
    doctorId: "demo_doctor_3",
    isActive: true
  },
  {
    id: "med_13",
    name: "Hidroclorotiazida",
    genericName: "Hydrochlorothiazide",
    category: "Cardiovasculares",
    dosage: "12.5-25 mg",
    frequency: "Una vez al día",
    typicalDuration: "Indefinido",
    instructions: "Tomar por la mañana",
    contraindications: "Anuria, hipersensibilidad",
    sideEffects: "Aumento de la micción, mareos",
    doctorId: "demo_doctor_3",
    isActive: true
  },
  {
    id: "med_14",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    category: "Analgésicos",
    dosage: "500-1000 mg",
    frequency: "Cada 4-6 horas",
    typicalDuration: "3-7 días",
    instructions: "Tomar con o sin alimentos",
    contraindications: "Enfermedad hepática severa",
    sideEffects: "Náuseas, dolor estomacal",
    doctorId: "demo_doctor_3",
    isActive: true
  },
  {
    id: "med_15",
    name: "Amoxicilina",
    genericName: "Amoxicillin",
    category: "Antibióticos",
    dosage: "500-875 mg",
    frequency: "Dos veces al día",
    typicalDuration: "7-10 días",
    instructions: "Tomar con o sin alimentos",
    contraindications: "Alergia a penicilinas",
    sideEffects: "Náuseas, diarrea, candidiasis",
    doctorId: "demo_doctor_3",
    isActive: true
  }
] 