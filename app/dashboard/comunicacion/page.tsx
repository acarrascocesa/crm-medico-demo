"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Calendar, 
  ChevronRight, 
  Edit, 
  Filter, 
  Mail, 
  Phone, 
  Plus, 
  Search, 
  Send, 
  Users, 
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  RefreshCw
} from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
// Demo API client - no real API needed
const apiClient = {
  getEmailHistory: async () => [],
  getEmailTemplates: async () => [],
  sendAppointmentReminder: async () => ({ success: true }),
  sendPrescriptionEmail: async () => ({ success: true }),
  sendMedicalResults: async () => ({ success: true }),
  sendInvoiceEmail: async () => ({ success: true }),
  updateEmailTemplate: async () => ({ success: true })
}

interface EmailHistory {
  id: string
  patient_id: string
  patient: {
    name: string
    email: string
  }
  email_type: string
  status: 'sent' | 'failed' | 'pending'
  created_at: string
  sent_at: string | null
  error_message: string | null
  template_id: string | null
  metadata: any
}

interface EmailTemplate {
  id: string
  name: string
  type: 'appointment_reminder' | 'prescription' | 'results' | 'invoice'
  subject: string
  html_content: string
  is_active: boolean
  created_at: string
}

export default function CommunicationPage() {
  const { patients, appointments, prescriptions, invoices, user } = useAppContext()
  const { toast } = useToast()
  
  const [selectedTab, setSelectedTab] = useState("envio-rapido")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [emailHistory, setEmailHistory] = useState<EmailHistory[]>([])
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([])
  
  // Estados para envío rápido
  const [selectedEmailType, setSelectedEmailType] = useState<string>("")
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [selectedAppointment, setSelectedAppointment] = useState<string>("")
  const [selectedPrescription, setSelectedPrescription] = useState<string>("")
  const [selectedInvoice, setSelectedInvoice] = useState<string>("")
  
  // Estados para diálogos
  const [isViewTemplateOpen, setIsViewTemplateOpen] = useState(false)
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    html_content: ''
  })

  // Cargar datos iniciales
  useEffect(() => {
    loadEmailHistory()
    loadEmailTemplates()
  }, [])

  const loadEmailHistory = async () => {
    try {
      setIsLoading(true)
      const history = await apiClient.getEmailHistory(undefined, user?.clinic_id)
      setEmailHistory(history)
    } catch (error) {
      console.error('Error loading email history:', error)
      toast({
        title: "Error",
        description: "No se pudo cargar el historial de emails",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadEmailTemplates = async () => {
    try {
      const templates = await apiClient.getEmailTemplates()
      setEmailTemplates(templates)
    } catch (error) {
      console.error('Error loading email templates:', error)
    }
  }

  const handleSendEmail = async () => {
    if (!selectedEmailType || !selectedPatient) {
      toast({
        title: "Error",
        description: "Debe seleccionar un tipo de email y un paciente",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      let response

      switch (selectedEmailType) {
        case 'appointment_reminder':
          if (!selectedAppointment) {
            throw new Error("Debe seleccionar una cita")
          }
          response = await apiClient.sendAppointmentReminder(selectedAppointment)
          break
        case 'prescription':
          if (!selectedPrescription) {
            throw new Error("Debe seleccionar una prescripción")
          }
          response = await apiClient.sendPrescriptionEmail(selectedPrescription)
          break
        case 'results':
          response = await apiClient.sendMedicalResults(selectedPatient)
          break
        case 'invoice':
          if (!selectedInvoice) {
            throw new Error("Debe seleccionar una factura")
          }
          response = await apiClient.sendInvoiceEmail(selectedInvoice)
          break
        default:
          throw new Error("Tipo de email no válido")
      }

      toast({
        title: "Email enviado",
        description: "El email ha sido enviado exitosamente",
      })
      
      loadEmailHistory()
      
      // Limpiar formulario
      setSelectedEmailType("")
      setSelectedPatient("")
      setSelectedAppointment("")
      setSelectedPrescription("")
      setSelectedInvoice("")
      
    } catch (error: any) {
      console.error('Error sending email:', error)
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      html_content: template.html_content
    })
    setIsEditTemplateOpen(true)
  }

  const handleSaveTemplate = async () => {
    if (!selectedTemplate) return

    try {
      setIsLoading(true)
      await apiClient.updateEmailTemplate(selectedTemplate.id, {
        name: templateForm.name,
        subject: templateForm.subject,
        html_content: templateForm.html_content,
        is_active: selectedTemplate.is_active
      })
      
      toast({
        title: "Plantilla actualizada",
        description: "La plantilla ha sido actualizada exitosamente",
      })
      
      setIsEditTemplateOpen(false)
      loadEmailTemplates()
      
    } catch (error) {
      console.error('Error updating template:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar la plantilla",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Funciones auxiliares
  const getAvailablePatients = () => {
    if (!selectedEmailType) return patients || []
    
    switch (selectedEmailType) {
      case 'appointment_reminder':
        return (patients || []).filter(patient => 
          (appointments || []).some(apt => 
            apt.patient_id === patient.id && new Date(apt.date) > new Date()
          )
        )
      case 'prescription':
        return (patients || []).filter(patient => 
          (prescriptions || []).some(pres => pres.patient_id === patient.id)
        )
      case 'invoice':
        return (patients || []).filter(patient => 
          (invoices || []).some(inv => inv.patient_id === patient.id)
        )
      default:
        return patients || []
    }
  }

  const getPatientAppointments = () => {
    if (!selectedPatient) return []
    return (appointments || []).filter(apt => 
      apt.patient_id === selectedPatient && new Date(apt.date) > new Date()
    )
  }

  const getPatientPrescriptions = () => {
    if (!selectedPatient) return []
    return (prescriptions || []).filter(pres => pres.patient_id === selectedPatient)
  }

  const getPatientInvoices = () => {
    if (!selectedPatient) return []
    return (invoices || []).filter(inv => inv.patient_id === selectedPatient)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'sent':
        return 'default'
      case 'failed':
        return 'destructive'
      case 'pending':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getEmailTypeLabel = (type: string) => {
    switch (type) {
      case 'appointment_reminder':
        return 'Recordatorio de cita'
      case 'prescription':
        return 'Receta médica'
      case 'results':
        return 'Resultados médicos'
      case 'invoice':
        return 'Factura'
      default:
        return type
    }
  }

  // Filtrar historial de emails
  const filteredEmailHistory = emailHistory.filter((email) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      email.patient.name.toLowerCase().includes(searchLower) ||
      email.email_type.toLowerCase().includes(searchLower) ||
      email.status.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6 max-w-9xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Comunicación por Email</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Envíe emails automáticos y gestione plantillas de comunicación médica
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadEmailHistory}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="envio-rapido" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-[600px]">
          <TabsTrigger value="envio-rapido">Envío Rápido</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
        </TabsList>

        {/* TAB: ENVÍO RÁPIDO */}
        <TabsContent value="envio-rapido" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
              <CardHeader>
                <CardTitle>Enviar Email Médico</CardTitle>
                <CardDescription>
                  Seleccione el tipo de email y destinatario para envío inmediato
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Email</Label>
                  <Select value={selectedEmailType} onValueChange={setSelectedEmailType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de email" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appointment_reminder">Recordatorio de Cita</SelectItem>
                      <SelectItem value="prescription">Receta Médica</SelectItem>
                      <SelectItem value="results">Resultados Médicos</SelectItem>
                      <SelectItem value="invoice">Factura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedEmailType && (
                  <div className="space-y-2">
                    <Label>Paciente</Label>
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailablePatients().map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedEmailType === 'appointment_reminder' && selectedPatient && (
                  <div className="space-y-2">
                    <Label>Cita</Label>
                    <Select value={selectedAppointment} onValueChange={setSelectedAppointment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cita" />
                      </SelectTrigger>
                      <SelectContent>
                        {getPatientAppointments().map((appointment) => (
                          <SelectItem key={appointment.id} value={appointment.id}>
                            {new Date(appointment.date).toLocaleDateString('es-ES')} - {appointment.time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedEmailType === 'prescription' && selectedPatient && (
                  <div className="space-y-2">
                    <Label>Prescripción</Label>
                    <Select value={selectedPrescription} onValueChange={setSelectedPrescription}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar prescripción" />
                      </SelectTrigger>
                      <SelectContent>
                        {getPatientPrescriptions().map((prescription) => (
                          <SelectItem key={prescription.id} value={prescription.id}>
                            {new Date(prescription.created_at).toLocaleDateString('es-ES')} - {prescription.status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedEmailType === 'invoice' && selectedPatient && (
                  <div className="space-y-2">
                    <Label>Factura</Label>
                    <Select value={selectedInvoice} onValueChange={setSelectedInvoice}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar factura" />
                      </SelectTrigger>
                      <SelectContent>
                        {getPatientInvoices().map((invoice) => (
                          <SelectItem key={invoice.id} value={invoice.id}>
                            #{invoice.invoice_number} - ${invoice.total}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSendEmail} 
                  disabled={isLoading || !selectedEmailType || !selectedPatient}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Email
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Envío</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Emails enviados hoy</span>
                      <span className="font-bold text-blue-600">
                        {emailHistory.filter(e => 
                          new Date(e.created_at).toDateString() === new Date().toDateString()
                        ).length}
                      </span>
                                </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Exitosos</span>
                      <span className="font-bold text-green-600">
                        {emailHistory.filter(e => e.status === 'sent').length}
                      </span>
                              </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fallidos</span>
                      <span className="font-bold text-red-600">
                        {emailHistory.filter(e => e.status === 'failed').length}
                      </span>
                            </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pendientes</span>
                      <span className="font-bold text-yellow-600">
                        {emailHistory.filter(e => e.status === 'pending').length}
                      </span>
                        </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Email Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Recordatorios de citas</span>
                        </div>
                        <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Recetas médicas</span>
                      </div>
                        <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Resultados médicos</span>
                        </div>
                          <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Facturas</span>
                        </div>
                      </div>
                    </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* TAB: HISTORIAL */}
        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                    <div>
                  <CardTitle>Historial de Emails</CardTitle>
                  <CardDescription>
                    Registro de todos los emails enviados desde el sistema
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar emails..."
                      className="pl-8 w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                {isLoading ? (
                  <div className="p-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="flex items-center space-y-2 py-2">
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                ) : filteredEmailHistory.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No se encontraron emails en el historial
                    </div>
                ) : (
                  <div className="divide-y">
                    {filteredEmailHistory.map((email) => (
                      <div key={email.id} className="p-4 hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(email.status)}
                    <div>
                              <div className="font-medium">{email.patient.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {email.patient.email}
                    </div>
                    </div>
                  </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={getStatusBadgeVariant(email.status)}>
                              {email.status}
                            </Badge>
                            <Badge variant="outline">
                              {getEmailTypeLabel(email.email_type)}
                            </Badge>
                            <div className="text-sm text-muted-foreground text-right">
                              <div>{new Date(email.created_at).toLocaleDateString('es-ES')}</div>
                              <div>{new Date(email.created_at).toLocaleTimeString('es-ES', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}</div>
              </div>
                          </div>
                        </div>
                        {email.error_message && (
                          <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                            Error: {email.error_message}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                </div>
              </CardContent>
            </Card>
        </TabsContent>

        {/* TAB: PLANTILLAS */}
        <TabsContent value="plantillas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Email</CardTitle>
              <CardDescription>
                Gestione las plantillas de email utilizadas para la comunicación automática
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                {emailTemplates.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No se encontraron plantillas
                  </div>
                ) : (
                  <div className="divide-y">
                    {emailTemplates.map((template) => (
                      <div key={template.id} className="p-4 hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="font-medium">{template.name}</div>
                              <Badge variant="outline">
                                {getEmailTypeLabel(template.type)}
                              </Badge>
                              {!template.is_active && (
                                <Badge variant="secondary">Inactiva</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {template.subject}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedTemplate(template)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{template.name}</DialogTitle>
                                  <DialogDescription>
                                    Plantilla para: {getEmailTypeLabel(template.type)}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label>Asunto</Label>
                                    <div className="p-2 bg-muted rounded text-sm">
                                      {template.subject}
                                    </div>
                </div>
                                  <div>
                                    <Label>Contenido HTML</Label>
                                    <div 
                                      className="p-4 bg-muted rounded text-sm max-h-[300px] overflow-y-auto"
                                      dangerouslySetInnerHTML={{ __html: template.html_content }}
                                    />
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditTemplate(template)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                    </div>
                  </div>
                ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* DIALOG: EDITAR PLANTILLA */}
      <Dialog open={isEditTemplateOpen} onOpenChange={setIsEditTemplateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Plantilla</DialogTitle>
            <DialogDescription>
              Modifique la plantilla de email. Use variables como {"{"}patient_name{"}"}, {"{"}clinic_name{"}"}, etc.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
              <div className="space-y-2">
              <Label htmlFor="template-name">Nombre</Label>
              <Input
                id="template-name"
                value={templateForm.name}
                onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre de la plantilla"
              />
              </div>
              <div className="space-y-2">
              <Label htmlFor="template-subject">Asunto</Label>
              <Input
                id="template-subject"
                value={templateForm.subject}
                onChange={(e) => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Asunto del email"
                />
              </div>
              <div className="space-y-2">
              <Label htmlFor="template-content">Contenido HTML</Label>
              <Textarea
                id="template-content"
                value={templateForm.html_content}
                onChange={(e) => setTemplateForm(prev => ({ ...prev, html_content: e.target.value }))}
                placeholder="Contenido HTML de la plantilla"
                className="min-h-[300px] font-mono text-sm"
              />
              </div>
            <div className="text-sm text-muted-foreground">
              <strong>Variables disponibles:</strong> {"{"}patient_name{"}"}, {"{"}patient_email{"}"}, {"{"}doctor_name{"}"}, 
              {"{"}clinic_name{"}"}, {"{"}appointment_date{"}"}, {"{"}appointment_time{"}"}, {"{"}invoice_number{"}"}, {"{"}invoice_total{"}"}
                </div>
              </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTemplateOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTemplate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
