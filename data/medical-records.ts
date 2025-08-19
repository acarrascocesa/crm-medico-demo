import type { MedicalRecord } from "@/context/app-context"

export const medicalRecords: MedicalRecord[] = [
  // Historiales de la Clínica Central
  {
    id: "1",
    patient: {
      id: "demo_central_1",
      name: "Ana María López",
      image: "/woman-face-2.png"
    },
    date: "2024-07-15",
    doctor: "Dr. Carlos Manuel Rodríguez",
    type: "Consulta General",
    diagnosis: "Hipertensión arterial controlada",
    status: "Completo",
    notes: "Paciente presenta presión arterial 130/85 mmHg. Medicación actual: Losartán 50mg diario. Se mantiene control estable.",
    prescriptions: [
      {
        medication: "Losartán",
        dosage: "50mg",
        frequency: "1 vez al día",
        duration: "Continuar indefinidamente"
      }
    ],
    attachments: [
      {
        name: "Electrocardiograma",
        type: "ECG",
        url: "#"
      }
    ],
    clinicId: "clinic_central"
  },
  {
    id: "2",
    patient: {
      id: "demo_central_2",
      name: "Roberto Carlos Silva",
      image: "/man-face.png"
    },
    date: "2024-07-20",
    doctor: "Dr. Carlos Manuel Rodríguez",
    type: "Consulta Especializada",
    diagnosis: "Diabetes mellitus tipo 2",
    status: "Completo",
    notes: "Glucosa en ayunas: 95 mg/dL. Hemoglobina glicosilada: 6.2%. Control metabólico adecuado.",
    prescriptions: [
      {
        medication: "Metformina",
        dosage: "500mg",
        frequency: "2 veces al día",
        duration: "Continuar indefinidamente"
      }
    ],
    attachments: [
      {
        name: "Perfil lipídico",
        type: "Laboratorio",
        url: "#"
      }
    ],
    clinicId: "clinic_central"
  },
  {
    id: "3",
    patient: {
      id: "demo_central_3",
      name: "Carmen Elena Torres",
      image: "/woman-face-3.png"
    },
    date: "2024-07-18",
    doctor: "Dr. Carlos Manuel Rodríguez",
    type: "Consulta Especializada",
    diagnosis: "Asma bronquial",
    status: "Completo",
    notes: "Paciente refiere crisis asmáticas ocasionales. Espirometría: FEV1 85%. Control ambiental recomendado.",
    prescriptions: [
      {
        medication: "Salbutamol",
        dosage: "Inhalador",
        frequency: "Según necesidad",
        duration: "Continuar"
      },
      {
        medication: "Budesonida",
        dosage: "Inhalador",
        frequency: "2 veces al día",
        duration: "Continuar"
      }
    ],
    attachments: [
      {
        name: "Espirometría",
        type: "Prueba funcional",
        url: "#"
      }
    ],
    clinicId: "clinic_central"
  },
  
  // Historiales de la Clínica Norte
  {
    id: "4",
    patient: {
      id: "demo_norte_1",
      name: "Francisco Javier Ruiz",
      image: "/man-face-3.png"
    },
    date: "2024-07-22",
    doctor: "Dra. Ana Sofía Martínez",
    type: "Consulta Especializada",
    diagnosis: "Hipertensión arterial",
    status: "Completo",
    notes: "Presión arterial: 145/95 mmHg. Inicio de tratamiento antihipertensivo.",
    prescriptions: [
      {
        medication: "Atorvastatina",
        dosage: "20mg",
        frequency: "1 vez por noche",
        duration: "Continuar indefinidamente"
      },
      {
        medication: "Metoprolol",
        dosage: "50mg",
        frequency: "2 veces al día",
        duration: "Continuar indefinidamente"
      }
    ],
    attachments: [
      {
        name: "Electrocardiograma",
        type: "ECG",
        url: "#"
      }
    ],
    clinicId: "clinic_norte"
  },
  {
    id: "5",
    patient: {
      id: "demo_norte_2",
      name: "Sofía Alejandra Vega",
      image: "/woman-face.png"
    },
    date: "2024-07-25",
    doctor: "Dra. Ana Sofía Martínez",
    type: "Consulta Especializada",
    diagnosis: "Asma bronquial",
    status: "Completo",
    notes: "Paciente joven con asma controlada. Espirometría: FEV1 90%. Control ambiental estricto.",
    prescriptions: [
      {
        medication: "Salbutamol",
        dosage: "Inhalador",
        frequency: "Según necesidad",
        duration: "Continuar"
      },
      {
        medication: "Loratadina",
        dosage: "10mg",
        frequency: "1 vez al día",
        duration: "Continuar"
      }
    ],
    attachments: [
      {
        name: "Espirometría",
        type: "Prueba funcional",
        url: "#"
      }
    ],
    clinicId: "clinic_norte"
  },
  
  // Historiales de la Clínica Sur
  {
    id: "6",
    patient: {
      id: "demo_sur_1",
      name: "José Manuel Ortega",
      image: "/man-face-4.png"
    },
    date: "2024-07-28",
    doctor: "Dr. Roberto Luis Silva",
    type: "Consulta Especializada",
    diagnosis: "Diabetes mellitus tipo 1",
    status: "Completo",
    notes: "Paciente diabético tipo 1. Glucosa en ayunas: 120 mg/dL. Ajuste de insulina requerido.",
    prescriptions: [
      {
        medication: "Insulina Regular",
        dosage: "Según glucemia",
        frequency: "Antes de comidas",
        duration: "Continuar indefinidamente"
      },
      {
        medication: "Enalapril",
        dosage: "10mg",
        frequency: "1 vez al día",
        duration: "Continuar indefinidamente"
      }
    ],
    attachments: [
      {
        name: "Perfil glucémico",
        type: "Laboratorio",
        url: "#"
      }
    ],
    clinicId: "clinic_sur"
  },
  {
    id: "7",
    patient: {
      id: "demo_sur_2",
      name: "Laura Cristina Jiménez",
      image: "/woman-face-2.png"
    },
    date: "2024-07-30",
    doctor: "Dr. Roberto Luis Silva",
    type: "Consulta General",
    diagnosis: "Hipertensión arterial",
    status: "Completo",
    notes: "Presión arterial: 140/90 mmHg. Control de presión y dieta recomendado.",
    prescriptions: [
      {
        medication: "Hidroclorotiazida",
        dosage: "25mg",
        frequency: "1 vez al día",
        duration: "Continuar indefinidamente"
      }
    ],
    attachments: [
      {
        name: "Electrocardiograma",
        type: "ECG",
        url: "#"
      }
    ],
    clinicId: "clinic_sur"
  }
] 