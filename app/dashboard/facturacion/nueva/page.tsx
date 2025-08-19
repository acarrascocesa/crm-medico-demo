"use client"
import { useAuth } from "@/context/auth-context"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context/app-context"
import { useDemoClinics } from "@/hooks/useDemoData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { 
  ArrowLeft, 
  Plus, 
  Trash, 
  Calculator, 
  Phone, 
  CheckCircle,
  AlertCircle,
  DollarSign,
  User,
  FileText,
  Package,
  Building
} from "lucide-react"
import Link from "next/link"
import { getCurrentDateISO } from "@/lib/utils"

interface InvoiceItem {
  serviceId?: string
  description: string
  amount: number
  insuranceCovers: number
  patientPays: number
}

export default function NewInvoicePage() {
  const router = useRouter()
  const { patients, addInvoice, selectedClinicId, services } = useAppContext()
  const { user: currentUser } = useAuth()
  const hasMultiClinicView = currentUser?.multiClinicView && currentUser?.role === "doctor"
  const { clinics } = useDemoClinics()
  
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedFormClinicId, setSelectedFormClinicId] = useState<string>("")
  const [items, setItems] = useState<InvoiceItem[]>([
    { serviceId: undefined, description: "", amount: 0, insuranceCovers: 0, patientPays: 0 }
  ])
  
  // Obtener patientId de la URL si existe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const patientIdFromUrl = urlParams.get('patientId')
    if (patientIdFromUrl) {
      setSelectedPatient(patientIdFromUrl)
    }
  }, [])

  // Información del seguro
  const [hasInsurance, setHasInsurance] = useState(false)
  const [insuranceProvider, setInsuranceProvider] = useState("")
  const [policyNumber, setPolicyNumber] = useState("")
  const [coverageVerified, setCoverageVerified] = useState(false)
  const [verificationNotes, setVerificationNotes] = useState("")
  
  // Cálculos
  const totalServices = items.reduce((sum, item) => sum + Number(item.amount || 0), 0)
  const totalInsuranceCovers = items.reduce((sum, item) => sum + Number(item.insuranceCovers || 0), 0)
  const totalPatientPays = items.reduce((sum, item) => sum + Number(item.patientPays || 0), 0)

  const addItem = () => {
    setItems([...items, { serviceId: undefined, description: "", amount: 0, insuranceCovers: 0, patientPays: 0 }])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items]
    
    // Convertir valores numéricos
    if (field === 'amount' || field === 'insuranceCovers' || field === 'patientPays') {
      newItems[index] = { ...newItems[index], [field]: Number(value) || 0 }
    } else {
      newItems[index] = { ...newItems[index], [field]: value }
    }
    
    // Calcular patientPays automáticamente cuando cambia amount o insuranceCovers
    if (field === 'amount' || field === 'insuranceCovers') {
      const amount = Number(newItems[index].amount) || 0
      const insuranceCovers = Number(newItems[index].insuranceCovers) || 0
      newItems[index].patientPays = amount - insuranceCovers
    }
    
    setItems(newItems)
  }

  const handleSave = () => {
    if (!selectedPatient || !currentUser) return

    // Validar clínica para usuarios con vista unificada
    if (hasMultiClinicView && !selectedFormClinicId) {
      alert("Debe seleccionar un centro médico para la factura")
      return
    }

    const patient = patients.find(p => p.id === selectedPatient)
    if (!patient) return

    const newInvoice = {
      clinicId: hasMultiClinicView ? selectedFormClinicId : selectedClinicId!,
      patientId: selectedPatient,
      doctorId: currentUser.id,
      invoiceDate: getCurrentDateISO() + 'T12:00:00.000Z', // Forzar mediodía UTC
      totalServices,
      insuranceCovers: totalInsuranceCovers,
      patientPays: totalPatientPays,
      status: "Pendiente",
      paymentMethod: null,
      notes: "",
      insurance: hasInsurance ? {
        provider: insuranceProvider,
        policyNumber: policyNumber,
        coverageVerified: coverageVerified,
        verifiedBy: currentUser.name,
        verifiedDate: coverageVerified ? getCurrentDateISO() + 'T12:00:00.000Z' : "", // Forzar mediodía UTC
        notes: verificationNotes
      } : null,
      items: items.filter(item => item.description && item.amount > 0).map(item => ({
        serviceId: item.serviceId || null,
        description: item.description,
        quantity: 1,
        unitPrice: item.amount,
        totalPrice: item.amount,
        insuranceCovers: item.insuranceCovers,
        patientPays: item.patientPays
      }))
    }
    addInvoice(newInvoice)
    router.push("/dashboard/facturacion")
  }

  const selectedPatientData = patients.find(p => p.id === selectedPatient)

  return (
    <div className="flex flex-col gap-6 max-w-9xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/facturacion">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Nueva Factura</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información del Paciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Paciente
            </CardTitle>
            <CardDescription>Selecciona el paciente para la factura</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="patient">Paciente</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} - {patient.insurance}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPatientData && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium">{selectedPatientData.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedPatientData.email}</p>
                <p className="text-sm text-muted-foreground">{selectedPatientData.phone}</p>
                <Badge variant="outline" className="mt-2">
                  {selectedPatientData.insurance}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selector de Clínica para Vista Multiclínicas */}
        {hasMultiClinicView && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Centro Médico
              </CardTitle>
              <CardDescription>Selecciona el centro médico para la factura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clinic-selector">Centro Médico <span className="text-red-500">*</span></Label>
                <Select 
                  value={selectedFormClinicId} 
                  onValueChange={setSelectedFormClinicId}
                >
                  <SelectTrigger>
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
                {!selectedFormClinicId && hasMultiClinicView && (
                  <p className="text-sm text-red-500 mt-1">Debe seleccionar un centro médico</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Información del Seguro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Información del Seguro
            </CardTitle>
            <CardDescription>Configura la cobertura del seguro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="hasInsurance"
                checked={hasInsurance}
                onCheckedChange={setHasInsurance}
              />
              <Label htmlFor="hasInsurance">Paciente tiene seguro</Label>
            </div>

            {hasInsurance && (
              <>
                <div>
                  <Label htmlFor="insuranceProvider">Proveedor de Seguro</Label>
                  <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ARS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ARS Humano">ARS Humano</SelectItem>
                      <SelectItem value="ARS Universal">ARS Universal</SelectItem>
                      <SelectItem value="ARS Monumental">ARS Monumental</SelectItem>
                      <SelectItem value="ARS Palic">ARS Palic</SelectItem>
                      <SelectItem value="Mapfre Salud">Mapfre Salud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="policyNumber">Número de Póliza</Label>
                  <Input
                    id="policyNumber"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    placeholder="Ej: HUM-2024-001234"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="coverageVerified"
                    checked={coverageVerified}
                    onCheckedChange={setCoverageVerified}
                  />
                  <Label htmlFor="coverageVerified">Cobertura verificada con ARS</Label>
                </div>

                {coverageVerified && (
                  <div>
                    <Label htmlFor="verificationNotes">Notas de la verificación</Label>
                    <Textarea
                      id="verificationNotes"
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      placeholder="Ej: ARS cubre 80% de consulta, 60% de laboratorio..."
                      rows={3}
                    />
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Servicios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Servicios
          </CardTitle>
          <CardDescription>
            Agrega los servicios y sus montos. 
            <Link href="/dashboard/servicios" className="text-primary hover:underline ml-1">
              Gestionar catálogo de servicios
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid gap-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Servicio {index + 1}</h4>
                  {items.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`description-${index}`}>Descripción</Label>
                    <Input
                      id={`description-${index}`}
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                      placeholder="Ej: Consulta General"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`amount-${index}`}>Monto Total (RD$)</Label>
                    <Input
                      id={`amount-${index}`}
                      type="number"
                      value={item.amount}
                      onChange={(e) => updateItem(index, "amount", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>

                  {hasInsurance && (
                    <>
                      <div>
                        <Label htmlFor={`insuranceCovers-${index}`}>
                          Seguro Cubre (RD$)
                        </Label>
                        <Input
                          id={`insuranceCovers-${index}`}
                          type="number"
                          value={item.insuranceCovers}
                          onChange={(e) => updateItem(index, "insuranceCovers", parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`patientPays-${index}`}>
                          Paciente Paga (RD$)
                        </Label>
                        <Input
                          id={`patientPays-${index}`}
                          type="number"
                          value={item.patientPays}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <Button variant="outline" onClick={addItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Servicio Manual
              </Button>
              
              <div className="border-t pt-4">
                <Label className="text-sm font-medium mb-2 block">
                  Agregar desde Catálogo ({services.length} servicios disponibles)
                </Label>
                {services.length === 0 && (
                  <p className="text-sm text-muted-foreground mb-2">
                    No hay servicios configurados para esta clínica. 
                    <Link href="/dashboard/servicios" className="text-primary hover:underline ml-1">
                      Configurar servicios
                    </Link>
                  </p>
                )}
                {services.length > 0 && (
                  <Select onValueChange={(serviceId) => {
                    const service = services.find(s => s.id === serviceId)
                    if (service) {
                      const basePrice = Number(service.basePrice) || 0
                      const insurancePercentage = Number(service.insuranceCoveragePercentage) || 0
                      
                      const newItem = {
                        serviceId: service.id,
                        description: service.name,
                        amount: basePrice,
                        insuranceCovers: insurancePercentage > 0 ? (basePrice * insurancePercentage / 100) : 0,
                        patientPays: insurancePercentage > 0 ? (basePrice * (100 - insurancePercentage) / 100) : basePrice
                      }
                      setItems([...items, newItem])
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar servicio del catálogo" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{service.name}</span>
                            <span className="text-muted-foreground ml-2">
                              RD$ {service.basePrice.toLocaleString()}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Resumen de Facturación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Total Servicios</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  RD$ {totalServices.toLocaleString()}
                </p>
              </div>

              {hasInsurance && (
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Seguro Cubre</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    RD$ {totalInsuranceCovers.toLocaleString()}
                  </p>
                </div>
              )}

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Paciente Paga</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">
                  RD$ {totalPatientPays.toLocaleString()}
                </p>
              </div>
            </div>

            {hasInsurance && !coverageVerified && (
              <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">
                    Verificación Pendiente
                  </span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Recuerda llamar a la ARS para verificar la cobertura antes de generar la factura.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Botones de Acción */}
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/facturacion">Cancelar</Link>
        </Button>
        <Button onClick={handleSave} disabled={!selectedPatient || totalServices === 0}>
          Crear Factura
        </Button>
      </div>
    </div>
  )
}
