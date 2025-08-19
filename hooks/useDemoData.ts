import { useState, useEffect } from 'react'
import { demoPatients, getPatientsByClinic } from '@/data/patients'
import { demoClinics } from '@/data/clinics'
import { demoUsers } from '@/data/users'
import { appointments } from '@/data/appointments'
import { services } from '@/data/services'
import { medications } from '@/data/medications'
import { invoices } from '@/data/invoices'
import { prescriptions } from '@/data/prescriptions'
import { medicalRecords } from '@/data/medical-records'
import type { Clinic } from '@/context/app-context'

export const useDemoPatients = (clinicId?: string) => {
  const [patients, setPatients] = useState(demoPatients)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (clinicId) {
      setPatients(getPatientsByClinic(clinicId))
    } else {
      setPatients(demoPatients)
    }
  }, [clinicId])

  const addPatient = async (patientData: any) => {
    const newPatient = {
      ...patientData,
      id: `demo_patient_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setPatients(prev => [...prev, newPatient])
  }

  const updatePatient = async (id: string, patientData: any) => {
    setPatients(prev => prev.map(p => 
      p.id === id ? { ...p, ...patientData, updatedAt: new Date().toISOString() } : p
    ))
  }

  const deletePatient = async (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id))
  }

  return { patients, loading, addPatient, updatePatient, deletePatient }
}

export const useDemoClinics = () => {
  // Adaptar las clínicas demo al tipo Clinic esperado por la app
  const mappedClinics: Clinic[] = demoClinics.map((c) => ({
    id: c.id,
    user_id: c.doctorId,
    clinic_id: c.id,
    role: 'doctor',
    created_at: new Date().toISOString(),
    clinic_name: c.name,
    clinic_address: c.address,
    clinic_phone: c.phone,
    clinic_email: undefined,
    clinic_is_active: true,
  }))

  return { clinics: mappedClinics, loading: false }
}

export const useDemoAppointments = (clinicId?: string) => {
  // Convertir las fechas string a objetos Date
  const appointmentsWithDates = appointments.map(appointment => ({
    ...appointment,
    date: new Date(appointment.date)
  }))
  
  const [appointmentsData, setAppointmentsData] = useState(appointmentsWithDates)
  const [loading, setLoading] = useState(false)

  const addAppointment = async (appointmentData: any) => {
    const newAppointment = {
      ...appointmentData,
      id: `demo_appointment_${Date.now()}`,
      date: appointmentData.date instanceof Date ? appointmentData.date : new Date(appointmentData.date),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setAppointmentsData(prev => [...prev, newAppointment])
    return newAppointment.id
  }

  const updateAppointment = async (id: string, appointmentData: any) => {
    setAppointmentsData(prev => prev.map(a => 
      a.id === id ? { 
        ...a, 
        ...appointmentData, 
        date: appointmentData.date instanceof Date ? appointmentData.date : new Date(appointmentData.date),
        updatedAt: new Date().toISOString() 
      } : a
    ))
  }

  const deleteAppointment = async (id: string) => {
    setAppointmentsData(prev => prev.filter(a => a.id !== id))
  }

  return { 
    appointments: appointmentsData, 
    loading, 
    addAppointment, 
    updateAppointment, 
    deleteAppointment 
  }
}

export const useDemoServices = (clinicId?: string) => {
  const [servicesData, setServicesData] = useState(services)
  const [loading, setLoading] = useState(false)

  const addService = async (serviceData: any) => {
    const newService = {
      ...serviceData,
      id: `demo_service_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setServicesData(prev => [...prev, newService])
  }

  const updateService = async (id: string, serviceData: any) => {
    setServicesData(prev => prev.map(s => 
      s.id === id ? { ...s, ...serviceData, updatedAt: new Date().toISOString() } : s
    ))
  }

  const deleteService = async (id: string) => {
    setServicesData(prev => prev.filter(s => s.id !== id))
  }

  return { 
    services: servicesData, 
    loading, 
    addService, 
    updateService, 
    deleteService 
  }
}

export const useDemoMedications = () => {
  return { medications, loading: false }
}

export const useDemoInvoices = (clinicId?: string) => {
  const [invoicesData, setInvoicesData] = useState(invoices)
  const [loading, setLoading] = useState(false)

  const addInvoice = async (invoiceData: any) => {
    const newInvoice = {
      ...invoiceData,
      id: `demo_invoice_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setInvoicesData(prev => [...prev, newInvoice])
  }

  const updateInvoice = async (id: string, invoiceData: any) => {
    setInvoicesData(prev => prev.map(i => 
      i.id === id ? { ...i, ...invoiceData, updatedAt: new Date().toISOString() } : i
    ))
  }

  const deleteInvoice = async (id: string) => {
    setInvoicesData(prev => prev.filter(i => i.id !== id))
  }

  return { 
    invoices: invoicesData, 
    loading, 
    addInvoice, 
    updateInvoice, 
    deleteInvoice 
  }
}

export const useDemoPrescriptions = (clinicId?: string, patientId?: string, doctorId?: string) => {
  const [prescriptionsData, setPrescriptionsData] = useState(prescriptions)
  const [loading, setLoading] = useState(false)

  const addPrescription = async (prescriptionData: any) => {
    const newPrescription = {
      ...prescriptionData,
      id: `demo_prescription_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setPrescriptionsData(prev => [...prev, newPrescription])
  }

  const updatePrescription = async (id: string, prescriptionData: any) => {
    setPrescriptionsData(prev => prev.map(p => 
      p.id === id ? { ...p, ...prescriptionData, updatedAt: new Date().toISOString() } : p
    ))
  }

  const deletePrescription = async (id: string) => {
    setPrescriptionsData(prev => prev.filter(p => p.id !== id))
  }

  return { 
    prescriptions: prescriptionsData, 
    loading, 
    addPrescription, 
    updatePrescription, 
    deletePrescription 
  }
}

export const useDemoMedicalRecords = (patientId?: string, clinicId?: string) => {
  const [medicalRecordsData, setMedicalRecordsData] = useState(medicalRecords)
  const [loading, setLoading] = useState(false)

  const addMedicalRecord = async (recordData: any) => {
    const newRecord = {
      ...recordData,
      id: `demo_record_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setMedicalRecordsData(prev => [...prev, newRecord])
  }

  const updateMedicalRecord = async (id: string, recordData: any) => {
    setMedicalRecordsData(prev => prev.map(r => 
      r.id === id ? { ...r, ...recordData, updatedAt: new Date().toISOString() } : r
    ))
  }

  const deleteMedicalRecord = async (id: string) => {
    setMedicalRecordsData(prev => prev.filter(r => r.id !== id))
  }

  return { 
    medicalRecords: medicalRecordsData, 
    loading, 
    addMedicalRecord, 
    updateMedicalRecord, 
    deleteMedicalRecord 
  }
}
