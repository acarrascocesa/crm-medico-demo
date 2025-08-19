import type { Invoice } from "@/context/app-context"

export const invoices: Invoice[] = [
  // Facturas de la Clínica Central
  {
    id: "1",
    patient: {
      id: "demo_central_1",
      name: "Ana María López",
      image: "/woman-face-2.png"
    },
    date: "2024-07-15",
    doctor: "Dr. Carlos Manuel Rodríguez",
    clinicId: "clinic_central",
    totalServices: 2500,
    insuranceCovers: 2000,
    patientPays: 500,
    insurance: {
      provider: "ARS Humano",
      policyNumber: "HUM-2024-001234",
      coverageVerified: true,
      verifiedBy: "María Elena López",
      verifiedDate: "2024-07-15",
      notes: "ARS cubre 80% de consulta y 100% de ECG"
    },
    items: [
      {
        description: "Consulta General",
        amount: 1500,
        insuranceCovers: 1200,
        patientPays: 300
      },
      {
        description: "Electrocardiograma",
        amount: 1000,
        insuranceCovers: 800,
        patientPays: 200
      }
    ],
    status: "Pagada",
    paymentMethod: "Tarjeta de crédito",
    paymentDate: "2024-07-15",
    notes: "Pago completo realizado en la consulta"
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
    clinicId: "clinic_central",
    totalServices: 3200,
    insuranceCovers: 2560,
    patientPays: 640,
    insurance: {
      provider: "ARS Universal",
      policyNumber: "UNI-2024-005678",
      coverageVerified: true,
      verifiedBy: "María Elena López",
      verifiedDate: "2024-07-20",
      notes: "ARS cubre 80% de consulta especializada y 80% de laboratorio"
    },
    items: [
      {
        description: "Consulta Especializada",
        amount: 2000,
        insuranceCovers: 1600,
        patientPays: 400
      },
      {
        description: "Perfil lipídico",
        amount: 1200,
        insuranceCovers: 960,
        patientPays: 240
      }
    ],
    status: "Pagada",
    paymentMethod: "Efectivo",
    paymentDate: "2024-07-20",
    notes: "Pago en efectivo"
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
    clinicId: "clinic_central",
    totalServices: 1800,
    insuranceCovers: 1440,
    patientPays: 360,
    insurance: {
      provider: "ARS Monumental",
      policyNumber: "MON-2024-003456",
      coverageVerified: true,
      verifiedBy: "María Elena López",
      verifiedDate: "2024-07-18",
      notes: "ARS cubre 80% de consulta general"
    },
    items: [
      {
        description: "Consulta General",
        amount: 1500,
        insuranceCovers: 1200,
        patientPays: 300
      },
      {
        description: "Evaluación respiratoria",
        amount: 300,
        insuranceCovers: 240,
        patientPays: 60
      }
    ],
    status: "Pagada",
    paymentMethod: "Transferencia bancaria",
    paymentDate: "2024-07-18",
    notes: "Pago por transferencia"
  },
  
  // Facturas de la Clínica Norte
  {
    id: "4",
    patient: {
      id: "demo_norte_1",
      name: "Francisco Javier Ruiz",
      image: "/man-face-3.png"
    },
    date: "2024-07-22",
    doctor: "Dra. Ana Sofía Martínez",
    clinicId: "clinic_norte",
    totalServices: 2100,
    insuranceCovers: 1680,
    patientPays: 420,
    insurance: {
      provider: "ARS Universal",
      policyNumber: "UNI-2024-007890",
      coverageVerified: true,
      verifiedBy: "Carmen Isabel Torres",
      verifiedDate: "2024-07-22",
      notes: "ARS cubre 80% de consulta especializada"
    },
    items: [
      {
        description: "Consulta Especializada",
        amount: 1600,
        insuranceCovers: 1280,
        patientPays: 320
      },
      {
        description: "Monitoreo de presión",
        amount: 500,
        insuranceCovers: 400,
        patientPays: 100
      }
    ],
    status: "Pagada",
    paymentMethod: "Efectivo",
    paymentDate: "2024-07-22",
    notes: "Pago en efectivo"
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
    clinicId: "clinic_norte",
    totalServices: 2400,
    insuranceCovers: 1920,
    patientPays: 480,
    insurance: {
      provider: "ARS Humano",
      policyNumber: "HUM-2024-009876",
      coverageVerified: true,
      verifiedBy: "Carmen Isabel Torres",
      verifiedDate: "2024-07-25",
      notes: "ARS cubre 80% de consulta y pruebas respiratorias"
    },
    items: [
      {
        description: "Consulta Especializada",
        amount: 1600,
        insuranceCovers: 1280,
        patientPays: 320
      },
      {
        description: "Espirometría",
        amount: 800,
        insuranceCovers: 640,
        patientPays: 160
      }
    ],
    status: "Pendiente",
    paymentMethod: "Pendiente",
    paymentDate: null,
    notes: "Pendiente de pago"
  },
  
  // Facturas de la Clínica Sur
  {
    id: "6",
    patient: {
      id: "demo_sur_1",
      name: "José Manuel Ortega",
      image: "/man-face-4.png"
    },
    date: "2024-07-28",
    doctor: "Dr. Roberto Luis Silva",
    clinicId: "clinic_sur",
    totalServices: 1900,
    insuranceCovers: 1520,
    patientPays: 380,
    insurance: {
      provider: "ARS Monumental",
      policyNumber: "MON-2024-011234",
      coverageVerified: true,
      verifiedBy: "Patricia Rosa Vega",
      verifiedDate: "2024-07-28",
      notes: "ARS cubre 80% de consulta y monitoreo diabético"
    },
    items: [
      {
        description: "Consulta General",
        amount: 1400,
        insuranceCovers: 1120,
        patientPays: 280
      },
      {
        description: "Monitoreo de glucosa",
        amount: 500,
        insuranceCovers: 400,
        patientPays: 100
      }
    ],
    status: "Pagada",
    paymentMethod: "Tarjeta de débito",
    paymentDate: "2024-07-28",
    notes: "Pago con tarjeta de débito"
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
    clinicId: "clinic_sur",
    totalServices: 1400,
    insuranceCovers: 1120,
    patientPays: 280,
    insurance: {
      provider: "ARS Universal",
      policyNumber: "UNI-2024-013456",
      coverageVerified: true,
      verifiedBy: "Patricia Rosa Vega",
      verifiedDate: "2024-07-30",
      notes: "ARS cubre 80% de consulta general"
    },
    items: [
      {
        description: "Consulta General",
        amount: 1400,
        insuranceCovers: 1120,
        patientPays: 280
      }
    ],
    status: "Pendiente",
    paymentMethod: "Pendiente",
    paymentDate: null,
    notes: "Pendiente de pago"
  }
] 