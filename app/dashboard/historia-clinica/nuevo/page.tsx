"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ArrowLeft, Plus, Trash, ChevronsUpDown, Check } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Esquema de validación para el formulario
const formSchema = z.object({
  patientId: z.string({
    required_error: "Por favor seleccione un paciente.",
  }),
  date: z.string({
    required_error: "Por favor seleccione una fecha.",
  }),
  type: z.string({
    required_error: "Por favor seleccione el tipo de registro.",
  }),
  diagnosis: z.string({
    required_error: "Por favor ingrese el diagnóstico.",
  }),
  status: z.string({
    required_error: "Por favor seleccione el estado.",
  }),
  notes: z.string().optional(),
})

interface Prescription {
  medication: string
  dosage: string
  frequency: string
  duration: string
}

interface Attachment {
  name: string
  type: string
  url: string
}

export default function NewMedicalRecordPage() {
  const router = useRouter()
  const { patients, addMedicalRecord, selectedClinicId, currentUser, addNotification } = useAppContext()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Configurar el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Consulta General",
      status: "Completo",
      notes: "",
    },
  })

  // Obtener patientId de la URL si existe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const patientIdFromUrl = urlParams.get('patientId')
    if (patientIdFromUrl) {
      form.setValue('patientId', patientIdFromUrl)
    }
  }, [form])



  // Manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const patient = patients.find((p) => p.id === values.patientId)

    if (!patient) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Paciente no encontrado'
      })
      return
    }

    if (!selectedClinicId) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se ha seleccionado una clínica'
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Formatear la fecha correctamente para evitar problemas de timezone
      // Aplicar la misma solución que usamos para las citas
      // Forzar mediodía UTC para evitar problemas de timezone
      const newRecord = {
        patient_id: patient.id,
        clinic_id: selectedClinicId,
        record_date: values.date + 'T12:00:00.000Z', // Forzar mediodía UTC
        record_type: values.type,
        diagnosis: values.diagnosis,
        status: values.status,
        notes: values.notes || ""
      }

      console.log('📅 Fecha que se está enviando al backend:', values.date)
      console.log('📋 Datos completos del registro:', newRecord)

      await addMedicalRecord(newRecord)
      
      addNotification({
        type: 'success',
        title: 'Éxito',
        message: 'Registro médico creado correctamente'
      })
      
      router.push('/dashboard/historia-clinica')
    } catch (error) {
      console.error('Error creando registro médico:', error)
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al crear el registro médico'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-9xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/historia-clinica">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Registro Médico</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Registro</CardTitle>
          <CardDescription>Ingrese los detalles del nuevo registro médico</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Paciente</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between w-full"
                          >
                            {field.value
                              ? patients.find((patient) => patient.id === field.value)?.name
                              : "Seleccionar paciente..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-full" align="start">
                        <Command>
                          <CommandInput placeholder="Buscar paciente..." />
                          <CommandList>
                            <CommandEmpty>No se encontraron pacientes.</CommandEmpty>
                            <CommandGroup>
                              {patients.map((patient) => (
                                <CommandItem
                                  key={patient.id}
                                  value={patient.name}
                                  onSelect={() => {
                                    form.setValue("patientId", patient.id)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      patient.id === field.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {patient.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Seleccione el paciente para este registro médico.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Consulta</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Consulta General">Consulta General</SelectItem>
                          <SelectItem value="Seguimiento">Seguimiento</SelectItem>
                          <SelectItem value="Procedimiento">Procedimiento</SelectItem>
                          <SelectItem value="Emergencia">Emergencia</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar estado..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Completo">Completo</SelectItem>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnóstico</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Ingrese el diagnóstico detallado... Puede usar la barra de herramientas para formatear el texto."
                        className="min-h-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas Personales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ingrese notas personales sobre la consulta..."
                        className="resize-none font-bold"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild disabled={isSubmitting}>
                  <Link href="/dashboard/historia-clinica">Cancelar</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Plus className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Creando...' : 'Crear Registro'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
