"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context/app-context"
import { useAuth } from "@/context/auth-context"
import { useDemoClinics } from "@/hooks/useDemoData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { formatDateToISO } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NewAppointmentPage() {
  const router = useRouter()
  const { patients, addAppointment, selectedClinicId, currentUser } = useAppContext()
  const { user } = useAuth()
  const hasMultiClinicView = user?.multiClinicView && user?.role === "doctor"
  const { clinics } = useDemoClinics()

  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState<string>("09:00 AM")
  const [duration, setDuration] = useState<string>("30")
  const [type, setType] = useState<string>("Consulta General")
  const [status, setStatus] = useState<string>("Pendiente")
  const [reason, setReason] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [selectedFormClinicId, setSelectedFormClinicId] = useState<string>("")
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones básicas
    if (!selectedPatient) {
      alert("Por favor, seleccione un paciente")
      return
    }

    // Validar clínica para usuarios con vista unificada
    if (hasMultiClinicView && !selectedFormClinicId) {
      alert("Debe seleccionar un centro médico para la cita")
      return
    }

    const patientData = patients.find((p) => p.id === selectedPatient)

    if (!patientData) {
      alert("Paciente no encontrado")
      return
    }

    // Convertir tiempo de formato 12h a 24h
    const convertTo24Hour = (time12h: string) => {
      const [time, modifier] = time12h.split(" ")
      let [hours, minutes] = time.split(":")
      if (hours === "12") {
        hours = "00"
      }
      if (modifier === "PM") {
        hours = (parseInt(hours, 10) + 12).toString()
      }
      return `${hours}:${minutes}`
    }

    // Formatear fecha y hora para el backend 
    // SOLUCIÓN DEFINITIVA: Usar el método 3 que funciona correctamente
    // Usar toISOString().split('T')[0] para evitar problemas de zona horaria
    // CORRECCIÓN: Usar métodos locales para evitar problemas de zona horaria
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const appointmentDate = `${year}-${month}-${day}`;
    const appointmentTime = convertTo24Hour(time)
    

    
    const newAppointment = {
      patientId: patientData.id,
      clinicId: hasMultiClinicView ? selectedFormClinicId : selectedClinicId!,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      reason: reason || type,
      notes: notes,
      status: status,
      type: type,
      doctor: currentUser?.name || "Doctor",
      duration: Number.parseInt(duration)
    }

    const id = addAppointment(newAppointment)
    router.push(`/dashboard/citas/${id}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/citas">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Nueva Cita</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Paciente</CardTitle>
            <CardDescription>Seleccione el paciente para la cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Campo selector de clínica para usuarios con vista unificada */}
            {hasMultiClinicView && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Label htmlFor="clinic-selector" className="text-sm font-medium text-blue-800">
                  Centro Médico donde agendar la cita <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={selectedFormClinicId} 
                  onValueChange={setSelectedFormClinicId}
                >
                  <SelectTrigger className={`mt-2 ${errors.clinic ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Seleccionar centro médico..." />
                  </SelectTrigger>
                  <SelectContent>
                    {clinics.map((clinic) => (
                      <SelectItem key={clinic.clinic_id} value={clinic.clinic_id}>
                        {clinic.clinic_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clinic && (
                  <p className="text-sm text-red-500 mt-1">{errors.clinic}</p>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="patient">Paciente</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={patient.image} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{patient.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Cita</CardTitle>
            <CardDescription>Configure la fecha, hora y tipo de cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"].map((timeSlot) => (
                      <SelectItem key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración (min)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Duración" />
                  </SelectTrigger>
                  <SelectContent>
                    {["15", "30", "45", "60"].map((dur) => (
                      <SelectItem key={dur} value={dur}>
                        {dur} minutos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Cita</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consulta General">Consulta General</SelectItem>
                    <SelectItem value="Seguimiento">Seguimiento</SelectItem>
                    <SelectItem value="Emergencia">Emergencia</SelectItem>
                    <SelectItem value="Control">Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Confirmada">Confirmada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo de la consulta</Label>
              <Textarea
                id="reason"
                placeholder="Describe el motivo de la cita..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Añadir notas sobre la cita..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/citas">Cancelar</Link>
          </Button>
          <Button type="submit">Crear Cita</Button>
        </div>
      </form>
    </div>
  )
}
