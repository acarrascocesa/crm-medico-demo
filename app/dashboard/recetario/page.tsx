"use client"

import { useState, useEffect } from "react"
import { MedicalPrescription } from "@/components/dashboard/medical-prescription"
import { useAppContext } from "@/context/app-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, User, FileText, Save, Printer, Pill, Plus, Stethoscope } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { getCurrentDateISO } from "@/lib/utils"

export default function RecetarioPage() {
  const { currentUser, clinics, selectedClinicId, patients, prescriptions, medications, services, addPrescription } = useAppContext()
  const [selectedPatientId, setSelectedPatientId] = useState("")
  const [prescriptionText, setPrescriptionText] = useState("")
  const [showPrescriptionList, setShowPrescriptionList] = useState(false)
  const [showMedicationSelector, setShowMedicationSelector] = useState(false)
  const [showServiceSelector, setShowServiceSelector] = useState(false)

  // Función para obtener iniciales del nombre y apellido
  const getInitials = (name: string) => {
    const names = name.split(' ')
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  // Función para agregar medicamento al texto de la prescripción
  const addMedicationToPrescription = (medication: any) => {
    // Contar solo medicamentos y servicios existentes (líneas que empiecen con número)
    const existingItems = prescriptionText.split('\n').filter(line => /^\d+\./.test(line.trim()));
    const nextNumber = existingItems.length + 1;
    
    // Manejar campos undefined
    const dosage = medication.dosage || "Dosis no especificada";
    const frequency = medication.frequency || "Frecuencia no especificada";
    const typicalDuration = medication.typicalDuration || "Duración no especificada";
    const instructions = medication.instructions || "Sin instrucciones específicas";
    
    const medicationText = `${nextNumber}. ${medication.name} ${dosage} - ${frequency} - ${typicalDuration}\nInstrucciones: ${instructions}\n\n`
    setPrescriptionText(prev => prev + medicationText)
    setShowMedicationSelector(false)
  }

  // Función para agregar servicio al texto de la prescripción
  const addServiceToPrescription = (service: any) => {
    // Contar solo medicamentos y servicios existentes (líneas que empiecen con número)
    const existingItems = prescriptionText.split('\n').filter(line => /^\d+\./.test(line.trim()));
    const nextNumber = existingItems.length + 1;
    
    // Manejar campos undefined
    const description = service.description || "Sin descripción";
    const category = service.category || "Sin categoría";
    const basePrice = service.basePrice || 0;
    
    const serviceText = `${nextNumber}. SERVICIO RECOMENDADO: ${service.name}\nDescripción: ${description}\nCategoría: ${category}\nPrecio estimado: RD$ ${basePrice.toLocaleString()}\n\n`
    setPrescriptionText(prev => prev + serviceText)
    setShowServiceSelector(false)
  }

  // Obtener patientId de la URL si existe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const patientIdFromUrl = urlParams.get('patientId')
    if (patientIdFromUrl) {
      setSelectedPatientId(patientIdFromUrl)
    }
  }, [])

  const selectedClinic = clinics.find((c) => c.clinic_id === selectedClinicId)
  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  if (!currentUser || !selectedClinic) {
    return (
      <div className="flex items-center justify-center h-full">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Información no disponible</AlertTitle>
          <AlertDescription>
            Por favor, asegúrese de haber iniciado sesión y seleccionado un centro médico para generar un recetario.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleSavePrescription = async () => {
    if (!selectedPatient || !prescriptionText.trim()) return
    
    try {
      const newPrescription = {
        patient_id: selectedPatientId,
        clinic_id: selectedClinicId!,
        prescription_text: prescriptionText,
        prescription_date: getCurrentDateISO() + 'T12:00:00.000Z', // Forzar mediodía UTC
        notes: ""
      }

      await addPrescription(newPrescription)
      setPrescriptionText("")
      setSelectedPatientId("")
      alert("Prescripción guardada exitosamente")
    } catch (error) {
      console.error('Error guardando prescripción:', error)
      alert("Error al guardar la prescripción")
    }
  }

  const handlePrintPrescription = () => {
    if (!selectedPatient) return
    
    // Crear el contenido HTML de la receta
    const prescriptionHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receta Médica - ${selectedPatient.name}</title>
        <style>
          @media print {
            body { margin: 0; }
            .prescription-container { 
              width: 100%; 
              max-width: none; 
              margin: 0; 
              padding: 20px;
              box-shadow: none;
              border: 2px solid #ccc;
            }
            .no-print { display: none !important; }
          }
          
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
          }
          
          .prescription-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 2px solid #ccc;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(to right, #dbeafe, #bfdbfe);
            color: #1e3a8a;
            padding: 20px;
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 20px;
          }
          
          .patient-info {
            flex: 1;
          }
          
          .patient-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .date {
            font-size: 14px;
            opacity: 0.9;
          }
          
          .doctor-logo {
            text-align: center;
            width: 120px;
          }
          
          .logo-container {
            background: white;
            border-radius: 8px;
            padding: 8px;
            margin-bottom: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 100px;
            height: 100px;
            margin: 0 auto 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .logo-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          
          .patient-details {
            padding: 15px 20px;
            background: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
            font-size: 14px;
          }
          
          .prescription-content {
            padding: 30px;
            min-height: 400px;
          }
          
          .prescription-text {
            width: 100%;
            min-height: 350px;
            font-size: 16px;
            line-height: 1.8;
            font-family: monospace;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 20px;
            background: white;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          
          .signature-section {
            padding: 30px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          }
          
          .doctor-stamp {
            width: 120px;
            height: 120px;
            margin: 0 auto 20px;
            border: 3px solid #2563eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .stamp-content {
            text-align: center;
            font-size: 12px;
          }
          
          .stamp-icon {
            font-size: 24px;
            margin-bottom: 4px;
          }
          
          .stamp-name {
            font-weight: bold;
            color: #1e40af;
            line-height: 1.2;
          }
          
          .stamp-specialty {
            color: #3b82f6;
            line-height: 1.2;
          }
          
          .stamp-license {
            color: #3b82f6;
            font-family: monospace;
            line-height: 1.2;
          }
          
          .signature-line {
            width: 200px;
            height: 2px;
            background: #9ca3af;
            margin: 0 auto 10px;
          }
          
          .doctor-signature {
            font-weight: bold;
            color: #374151;
            margin-bottom: 5px;
          }
          
          .doctor-credentials {
            color: #6b7280;
            font-size: 14px;
          }
          
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
          }
          
          .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 15px;
          }
          
          .footer-section h4 {
            font-weight: bold;
            color: #374151;
            margin-bottom: 5px;
          }
          
          .footer-section p {
            margin: 0;
            word-break: break-word;
          }
          
          .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .print-button:hover {
            background: #1d4ed8;
          }
          
          @media print {
            .print-button { display: none; }
          }
        </style>
      </head>
      <body>
        <button class="print-button no-print" onclick="window.print()">🖨️ Imprimir</button>
        
        <div class="prescription-container">
          <!-- Header -->
          <div class="header">
            <div class="header-content">
              <div class="patient-info">
                <div class="patient-name">${selectedPatient.name.toUpperCase()}</div>
              </div>
              
              <div class="doctor-logo">
                <div class="date">FECHA: ${new Date().toLocaleDateString("es-DO", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}</div>
              </div>
            </div>
          </div>
          
          <!-- Patient Details -->
          <div class="patient-details">
            <span><strong>Edad:</strong> ${selectedPatient.dateOfBirth ? (() => {
              const today = new Date();
              const birth = new Date(selectedPatient.dateOfBirth);
              let age = today.getFullYear() - birth.getFullYear();
              const monthDiff = today.getMonth() - birth.getMonth();
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
              }
              return age;
            })() : "N/A"} años</span>
          </div>
          
          <!-- Prescription Content -->
          <div class="prescription-content">
            <div class="prescription-text">${prescriptionText || "Escriba aquí las indicaciones médicas, medicamentos, dosis, frecuencia, etc..."}</div>
          </div>
          
          <!-- Signature Section -->
          <div class="signature-section">
            <div class="doctor-stamp">
              <div class="stamp-content">
                <div class="stamp-icon">⚕️</div>
                <div class="stamp-name">${currentUser.name}</div>
                <div class="stamp-specialty">${currentUser.name.toLowerCase().includes("linda") ? "Alergología" : "Cardiología"}</div>
                <div class="stamp-license">Lic: ${currentUser.licenseNumber || "N/A"}</div>
              </div>
            </div>
            
            <div class="signature-line"></div>
            <div class="doctor-signature">${currentUser.name}</div>
            <div class="doctor-credentials">${currentUser.name.toLowerCase().includes("linda") ? "Alergología" : "Cardiología"} • Lic: ${currentUser.licenseNumber || "N/A"}</div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-grid">
              <div class="footer-section">
                <h4>Dirección</h4>
                <p>${selectedClinic.clinic_address}</p>
              </div>
              <div class="footer-section">
                <h4>Contacto</h4>
                <p>${selectedClinic.clinic_phone}</p>
                ${selectedClinic.clinic_email ? `<p>${selectedClinic.clinic_email}</p>` : ""}
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
    
    // Abrir nueva ventana con solo la receta
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (printWindow) {
      printWindow.document.write(prescriptionHTML)
      printWindow.document.close()
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4 max-w-9xl mx-auto w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Recetario Médico</h1>
        <div className="flex flex-wrap gap-2">
          {selectedPatient && (
            <>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => setShowMedicationSelector(true)}>
                <Pill className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Agregar Medicamento</span>
                <span className="sm:hidden">Medicamento</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => setShowServiceSelector(true)}>
                <Stethoscope className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Agregar Servicio</span>
                <span className="sm:hidden">Servicio</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={handleSavePrescription}>
                <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Guardar
              </Button>
            </>
          )}
          {!selectedPatient && (
            <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => setShowPrescriptionList(true)}>
              <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Ver Recetas</span>
              <span className="sm:hidden">Recetas</span>
            </Button>
          )}
        </div>
      </div>

      {/* Selector de Medicamentos */}
      {showMedicationSelector && (
        <Dialog open={showMedicationSelector} onOpenChange={setShowMedicationSelector}>
          <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Seleccionar Medicamento</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Elige un medicamento de tu catálogo para agregarlo a la prescripción
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              {medications.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Pill className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium mb-2">No hay medicamentos</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    Primero debes agregar medicamentos a tu catálogo
                  </p>
                  <Button asChild size="sm" className="text-xs sm:text-sm">
                    <Link href="/dashboard/medicamentos">
                      Ir a Medicamentos
                    </Link>
                  </Button>
                </div>
              ) : (
                medications.map((medication) => (
                  <Card key={medication.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-3 sm:p-4" onClick={() => addMedicationToPrescription(medication)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                            <h3 className="font-semibold text-sm sm:text-lg">{medication.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {medication.genericName}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {medication.category}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                            <div>
                              <span className="font-medium">Dosis:</span>
                              <p className="text-muted-foreground">{medication.dosage}</p>
                            </div>
                            <div>
                              <span className="font-medium">Frecuencia:</span>
                              <p className="text-muted-foreground">{medication.frequency}</p>
                            </div>
                            <div>
                              <span className="font-medium">Duración:</span>
                              <p className="text-muted-foreground">{medication.typicalDuration}</p>
                            </div>
                            <div>
                              <span className="font-medium">Instrucciones:</span>
                              <p className="text-muted-foreground line-clamp-2">{medication.instructions}</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Selector de Servicios */}
      {showServiceSelector && (
        <Dialog open={showServiceSelector} onOpenChange={setShowServiceSelector}>
          <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Seleccionar Servicio</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Recomienda un servicio de tu catálogo para agregarlo a la prescripción
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {services.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Stethoscope className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium mb-2">No hay servicios</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    Primero debes agregar servicios a tu catálogo
                  </p>
                  <Button asChild size="sm" className="text-xs sm:text-sm">
                    <Link href="/dashboard/servicios">
                      Ir a Servicios
                    </Link>
                  </Button>
                </div>
              ) : (
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
                    <TabsTrigger value="all" className="text-xs sm:text-sm">Todos</TabsTrigger>
                    <TabsTrigger value="Consulta" className="text-xs sm:text-sm">Consulta</TabsTrigger>
                    <TabsTrigger value="Procedimiento" className="text-xs sm:text-sm">Procedimiento</TabsTrigger>
                    <TabsTrigger value="Imagenología" className="text-xs sm:text-sm">Imagenología</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {services.map((service) => (
                      <Card key={service.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardContent className="p-3 sm:p-4" onClick={() => addServiceToPrescription(service)}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                                <h3 className="font-semibold text-sm sm:text-lg">{service.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {service.category}
                                </Badge>
                                <Badge variant={service.insuranceType === "Seguro" ? "default" : "secondary"} className="text-xs">
                                  {service.insuranceType}
                                </Badge>
                              </div>
                              
                              <p className="text-xs sm:text-sm text-muted-foreground mb-2">{service.description}</p>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">
                                <span className="font-medium">
                                  Precio: RD$ {service.basePrice.toLocaleString()}
                                </span>
                                {service.insuranceCoveragePercentage > 0 && (
                                  <span className="text-muted-foreground">
                                    ({service.insuranceCoveragePercentage}% cubierto)
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  {["Consulta", "Procedimiento", "Imagenología"].map((category) => (
                    <TabsContent key={category} value={category} className="space-y-4">
                      {services
                        .filter((service) => service.category === category)
                        .map((service) => (
                          <Card key={service.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                            <CardContent className="p-3 sm:p-4" onClick={() => addServiceToPrescription(service)}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                                    <h3 className="font-semibold text-sm sm:text-lg">{service.name}</h3>
                                    <Badge variant={service.insuranceType === "Seguro" ? "default" : "secondary"} className="text-xs">
                                      {service.insuranceType}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">{service.description}</p>
                                  
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">
                                    <span className="font-medium">
                                      Precio: RD$ {service.basePrice.toLocaleString()}
                                    </span>
                                    {service.insuranceCoveragePercentage > 0 && (
                                      <span className="text-muted-foreground">
                                        ({service.insuranceCoveragePercentage}% cubierto)
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs">
                                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showPrescriptionList ? (
        /* Lista de Recetas */
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => setShowPrescriptionList(false)}>
              ← Volver
            </Button>
            <h2 className="text-lg sm:text-xl font-semibold">Recetas Generadas</h2>
          </div>

          {prescriptions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No hay recetas generadas</h3>
                <p className="text-muted-foreground mb-4">
                  Aún no se han creado recetas para esta clínica.
                </p>
                <Button onClick={() => setShowPrescriptionList(false)}>
                  Crear Primera Receta
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                          <AvatarFallback className="text-xs sm:text-sm font-medium">
                            {getInitials(prescription.patient_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">{prescription.patient_name}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {new Date(prescription.prescription_date).toLocaleDateString()} • {prescription.doctor_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={prescription.status === "Activa" ? "default" : "secondary"} className="text-xs">
                          {prescription.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => window.print()}>
                          <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-muted rounded-lg">
                      <p className="text-xs sm:text-sm whitespace-pre-line line-clamp-3">
                        {prescription.prescription_text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : selectedPatientId && selectedPatient ? (
        /* Receta Directa */
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => setSelectedPatientId("")}>
              ← Cambiar Paciente
            </Button>
            <div className="flex gap-2">
              <Button size="sm" className="text-xs sm:text-sm" onClick={handlePrintPrescription}>
                <Printer className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Imprimir
              </Button>
            </div>
          </div>

          {/* Receta */}
          <MedicalPrescription 
            patient={selectedPatient}
            prescription={prescriptionText}
            setPrescription={setPrescriptionText}
            doctorName={currentUser.name}
            doctorSpecialty={currentUser.name.toLowerCase().includes("linda") ? "Alergología" : "Cardiología"}
            doctorLicense={currentUser.licenseNumber || "N/A"}
            clinicAddress={selectedClinic.clinic_address}
            clinicPhone={selectedClinic.clinic_phone}
            clinicEmail={selectedClinic.clinic_email || ""}
            clinicWebsite=""
            doctorId={currentUser.id}
          />
        </div>
      ) : (
        /* Selección de Paciente */
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Selección de Paciente */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                Seleccionar Paciente
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Elige el paciente para el cual generar la receta médica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <div>
                <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                            <AvatarFallback className="text-xs font-medium">
                              {getInitials(patient.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs sm:text-sm">{patient.name}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {patient.insuranceProvider || "Sin seguro"}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPatient && (
                <div className="p-3 sm:p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarFallback className="text-sm sm:text-lg font-medium">
                        {getInitials(selectedPatient.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">{selectedPatient.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{selectedPatient.email}</p>
                    </div>
                  </div>
                  <div className="grid gap-1 sm:gap-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Teléfono:</span>
                      <span>{selectedPatient.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seguro:</span>
                      <Badge variant="outline" className="text-xs">{selectedPatient.insurance || "Sin seguro"}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Estado:</span>
                      <Badge variant={selectedPatient.status === "activo" ? "default" : "secondary"} className="text-xs">
                        {selectedPatient.status || "activo"}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información del Doctor */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                Información del Doctor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <div>
                <Label className="text-xs sm:text-sm font-medium">Doctor</Label>
                <p className="text-sm sm:text-lg font-semibold">{currentUser.name}</p>
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-medium">Licencia</Label>
                <p className="text-xs sm:text-sm">{currentUser.licenseNumber || "N/A"}</p>
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-medium">Clínica</Label>
                <p className="text-xs sm:text-sm font-medium">{selectedClinic.clinic_name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{selectedClinic.clinic_address}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{selectedClinic.clinic_phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
