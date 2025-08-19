import type { MedicalService } from "@/context/app-context"

export const services: MedicalService[] = [
  // CLÍNICA CENTRAL
  {
    id: "central_consulta_egk_seguro",
    name: "Consulta + EKG",
    category: "Consulta",
    description: "Consulta médica con electrocardiograma incluido",
    basePrice: 1500,
    insuranceCoverage: 100, // 100% cubierto por seguro
    clinicId: "clinic_central",
    isActive: true,
    insuranceType: "Seguro"
  },
  {
    id: "central_consulta_seguro",
    name: "Consulta",
    category: "Consulta", 
    description: "Consulta médica general",
    basePrice: 1500,
    insuranceCoverage: 100,
    clinicId: "clinic_central",
    isActive: true,
    insuranceType: "Seguro"
  },
  {
    id: "central_evaluacion_prequirurgica_seguro",
    name: "Evaluación cardiovascular prequirúrgica",
    category: "Procedimiento",
    description: "Evaluación cardiovascular completa para cirugía",
    basePrice: 2000,
    insuranceCoverage: 100,
    clinicId: "clinic_central",
    isActive: true,
    insuranceType: "Seguro"
  },
  {
    id: "central_resultados_seguro",
    name: "Resultados",
    category: "Laboratorio",
    description: "Entrega de resultados (menos de 21 días)",
    basePrice: 500,
    insuranceCoverage: 100,
    clinicId: "clinic_central",
    isActive: true,
    insuranceType: "Seguro"
  },
  // No asegurado - CENTRAL
  {
    id: "central_consulta_egk_no_seguro",
    name: "Consulta + EKG",
    category: "Consulta",
    description: "Consulta médica con electrocardiograma incluido",
    basePrice: 2000,
    insuranceCoverage: 0,
    clinicId: "clinic_central",
    isActive: true,
    insuranceType: "No asegurado"
  },
  {
    id: "central_consulta_no_seguro",
    name: "Consulta",
    category: "Consulta",
    description: "Consulta médica general",
    basePrice: 2000,
    insuranceCoverage: 0,
    clinicId: "clinic_central",
    isActive: true,
    insuranceType: "No asegurado"
  },
  {
    id: "central_evaluacion_prequirurgica_no_seguro",
    name: "Evaluación cardiovascular prequirúrgica",
    category: "Procedimiento",
    description: "Evaluación cardiovascular completa para cirugía",
    basePrice: 2500,
    insuranceCoverage: 0,
    clinicId: "clinic_central",
    isActive: true,
    insuranceType: "No asegurado"
  },
  {
    id: "central_resultados_no_seguro",
    name: "Resultados",
    category: "Laboratorio",
    description: "Entrega de resultados (menos de 21 días)",
    basePrice: 500,
    insuranceCoverage: 0,
    clinicId: "clinic_central",
    isActive: true,
    insuranceType: "No asegurado"
  },

  // CLÍNICA NORTE
  {
    id: "norte_consulta_egk_seguro",
    name: "Consulta + EKG",
    category: "Consulta",
    description: "Consulta médica con electrocardiograma incluido",
    basePrice: 1600,
    insuranceCoverage: 100,
    clinicId: "clinic_norte",
    isActive: true,
    insuranceType: "Seguro"
  },
  {
    id: "norte_consulta_seguro",
    name: "Consulta",
    category: "Consulta",
    description: "Consulta médica general",
    basePrice: 1600,
    insuranceCoverage: 100,
    clinicId: "clinic_norte",
    isActive: true,
    insuranceType: "Seguro"
  },
  {
    id: "norte_consulta_egk_no_seguro",
    name: "Consulta + EKG",
    category: "Consulta",
    description: "Consulta médica con electrocardiograma incluido",
    basePrice: 2100,
    insuranceCoverage: 0,
    clinicId: "clinic_norte",
    isActive: true,
    insuranceType: "No asegurado"
  },
  {
    id: "norte_consulta_no_seguro",
    name: "Consulta",
    category: "Consulta",
    description: "Consulta médica general",
    basePrice: 2100,
    insuranceCoverage: 0,
    clinicId: "clinic_norte",
    isActive: true,
    insuranceType: "No asegurado"
  },

  // CLÍNICA SUR
  {
    id: "sur_consulta_egk_seguro",
    name: "Consulta + EKG",
    category: "Consulta",
    description: "Consulta médica con electrocardiograma incluido",
    basePrice: 1400,
    insuranceCoverage: 100,
    clinicId: "clinic_sur",
    isActive: true,
    insuranceType: "Seguro"
  },
  {
    id: "sur_consulta_seguro",
    name: "Consulta",
    category: "Consulta",
    description: "Consulta médica general",
    basePrice: 1400,
    insuranceCoverage: 100,
    clinicId: "clinic_sur",
    isActive: true,
    insuranceType: "Seguro"
  },
  {
    id: "sur_consulta_egk_no_seguro",
    name: "Consulta + EKG",
    category: "Consulta",
    description: "Consulta médica con electrocardiograma incluido",
    basePrice: 1900,
    insuranceCoverage: 0,
    clinicId: "clinic_sur",
    isActive: true,
    insuranceType: "No asegurado"
  },
  {
    id: "sur_consulta_no_seguro",
    name: "Consulta",
    category: "Consulta",
    description: "Consulta médica general",
    basePrice: 1900,
    insuranceCoverage: 0,
    clinicId: "clinic_sur",
    isActive: true,
    insuranceType: "No asegurado"
  }
] 