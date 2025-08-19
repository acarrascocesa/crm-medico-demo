"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context"
import { useDemoPatients } from "@/hooks/useDemoData"
import { useDemoAppointments } from "@/hooks/useDemoData"
import { useDemoMedicalRecords } from "@/hooks/useDemoData"
import { useDemoClinics } from "@/hooks/useDemoData"
import { useDemoServices } from "@/hooks/useDemoData"
import { useDemoMedications } from "@/hooks/useDemoData"
import { useDemoInvoices } from "@/hooks/useDemoData"
import { useDemoPrescriptions } from "@/hooks/useDemoData"

// Definir tipos para nuestros datos
export interface User {
  id: string
  name: string
  email: string
  role: "doctor" | "secretary" | "admin"
  avatarUrl?: string
  licenseNumber?: string
  clinics?: Clinic[]
}

export interface Clinic {
  id: string
  user_id: string
  clinic_id: string
  role: string
  created_at: string
  clinic_name: string
  clinic_address: string
  clinic_phone: string
  clinic_email?: string
  clinic_is_active: boolean
}

interface AppContextType {
  currentUser: User | null
  clinics: Clinic[]
  selectedClinicId: string | null
  setSelectedClinicId: (clinicId: string | null) => void
  patients: any[]
  appointments: any[]
  medicalRecords: any[]
  invoices: any[]
  services: any[]
  medications: any[]
  prescriptions: any[]
  loading: boolean
  // Patient CRUD methods
  addPatient: (patientData: any) => Promise<void>
  updatePatient: (id: string, patientData: any) => Promise<void>
  deletePatient: (id: string) => Promise<void>
  // Appointment CRUD methods
  addAppointment: (appointmentData: any) => Promise<string>
  updateAppointment: (id: string, appointmentData: any) => Promise<void>
  deleteAppointment: (id: string) => Promise<void>
  // Service CRUD methods
  addService: (serviceData: any) => Promise<void>
  updateService: (id: string, serviceData: any) => Promise<void>
  deleteService: (id: string) => Promise<void>
  // Prescription CRUD methods
  addPrescription: (prescriptionData: any) => Promise<void>
  updatePrescription: (id: string, prescriptionData: any) => Promise<void>
  deletePrescription: (id: string) => Promise<void>
  // Medical Record CRUD methods
  addMedicalRecord: (recordData: any) => Promise<void>
  updateMedicalRecord: (id: string, recordData: any) => Promise<void>
  deleteMedicalRecord: (id: string) => Promise<void>
  // Invoice CRUD methods
  addInvoice: (invoiceData: any) => Promise<void>
  updateInvoice: (id: string, invoiceData: any) => Promise<void>
  deleteInvoice: (id: string) => Promise<void>
  // Notification methods
  notifications: any[]
  addNotification: (notification: any) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth()
  const { clinics } = useDemoClinics()
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<any[]>([])

  // Para usuarios con vista multiclínica, no filtrar por clínica específica
  const patientsClinicId = authUser?.multiClinicView ? undefined : selectedClinicId;
  const { 
    patients, 
    loading: patientsLoading,
    addPatient,
    updatePatient,
    deletePatient
  } = useDemoPatients(patientsClinicId || undefined);
  
  // Para usuarios con vista multiclinica, no filtrar por clinica; para otros, usar clinica seleccionada
  const appointmentsClinicId = authUser?.multiClinicView ? undefined : selectedClinicId;
  const { appointments, loading: appointmentsLoading, addAppointment, updateAppointment, deleteAppointment } = useDemoAppointments(appointmentsClinicId || undefined);
  
  const medicalRecordsClinicId = authUser?.multiClinicView ? undefined : selectedClinicId;
  const { medicalRecords, loading: medicalRecordsLoading, addMedicalRecord, updateMedicalRecord, deleteMedicalRecord } = useDemoMedicalRecords(undefined, medicalRecordsClinicId || undefined);
  
  // Para servicios, aplicar vista multiclínicas igual que con citas
  const servicesClinicId = authUser?.multiClinicView ? undefined : selectedClinicId;
  const { 
    services, 
    loading: servicesLoading,
    addService,
    updateService,
    deleteService
  } = useDemoServices(servicesClinicId || undefined)
  
  const { medications, loading: medicationsLoading } = useDemoMedications()
  
  // Para facturas, aplicar vista multiclínicas igual que con otros módulos
  const invoicesClinicId = authUser?.multiClinicView ? undefined : selectedClinicId;
  const { invoices, loading: invoicesLoading, addInvoice, updateInvoice, deleteInvoice } = useDemoInvoices(invoicesClinicId || undefined)
  
  const { 
    prescriptions, 
    loading: prescriptionsLoading,
    addPrescription,
    updatePrescription,
    deletePrescription
  } = useDemoPrescriptions(selectedClinicId || undefined, undefined, authUser?.id)

  useEffect(() => {
    if (authUser && clinics.length > 0 && !selectedClinicId) {
      setSelectedClinicId(clinics[0].clinic_id)
    }
  }, [authUser, clinics, selectedClinicId])

  const loading = patientsLoading || appointmentsLoading || medicalRecordsLoading || servicesLoading || medicationsLoading || invoicesLoading || prescriptionsLoading

  const addNotification = (notification: any) => {
    setNotifications(prev => [...prev, { ...notification, id: Date.now().toString() }])
  }

  const contextValue: AppContextType = {
    currentUser: authUser,
    clinics,
    selectedClinicId,
    setSelectedClinicId,
    patients,
    appointments,
    medicalRecords,
    invoices,
    services,
    medications,
    prescriptions,
    loading,
    // Patient CRUD methods
    addPatient,
    updatePatient,
    deletePatient,
    // Appointment CRUD methods
    addAppointment,
    updateAppointment,
    deleteAppointment,
    // Service CRUD methods
    addService,
    updateService,
    deleteService,
    // Medical Record CRUD methods
    addMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
    // Prescription CRUD methods
    addPrescription,
    updatePrescription,
    deletePrescription,
    // Invoice CRUD methods
    addInvoice,
    updateInvoice,
    deleteInvoice,
    // Notification methods
    notifications,
    addNotification,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
