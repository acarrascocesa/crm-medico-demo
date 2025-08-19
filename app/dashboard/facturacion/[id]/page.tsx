"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  DollarSign, 
  User, 
  FileText, 
  Trash, 
  CheckCircle,
  AlertCircle,
  Phone,
  Printer,
  Download,
  CreditCard,
  Banknote,
  Building
} from "lucide-react"
import Link from "next/link"
import { use } from "react"
import { getCurrentDateISO } from "@/lib/utils"

export default function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { invoices, updateInvoice, deleteInvoice } = useAppContext()
  const router = useRouter()

  // Desenvolver los params usando React.use()
  const { id } = use(params)

  const [invoice, setInvoice] = useState<any | null>(null)
  const [status, setStatus] = useState<"Pagada" | "Pendiente" | "Parcial" | "Rechazada">("Pendiente")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"Efectivo" | "Tarjeta" | "Transferencia" | "Cheque">("Efectivo")
  const [notes, setNotes] = useState("")

  // Función para obtener iniciales del nombre y apellido
  const getInitials = (name: string) => {
    if (!name || name === 'Paciente') return 'P'
    const names = name.split(' ')
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  useEffect(() => {
    const foundInvoice = invoices.find((inv) => inv.id === id)
    if (foundInvoice) {
      setInvoice(foundInvoice)
      setStatus(foundInvoice.status)
      setPaymentMethod(foundInvoice.paymentMethod || "Efectivo")
      setNotes(foundInvoice.notes || "")
    }
  }, [invoices, id])

  const handleUpdate = async () => {
    if (!invoice) return

    const updatedInvoiceData = {
      ...invoice,
      status,
      paymentMethod,
      notes,
      paymentDate: status === "Pagada" ? getCurrentDateISO() + 'T12:00:00.000Z' : undefined // Forzar mediodía UTC
    }

    // Pasar el ID como primer parámetro y los datos como segundo parámetro
    try {
      await updateInvoice(invoice.id, updatedInvoiceData)
      console.log('Factura actualizada correctamente')
    } catch (error) {
      console.error('Error actualizando factura:', error)
    }
  }

  const handleDelete = async () => {
    if (!invoice || isDeleting) return
    
    setIsDeleting(true)
    try {
      await deleteInvoice(invoice.id)
      router.push("/dashboard/facturacion")
    } catch (error) {
      console.error("Error eliminando factura:", error)
      // El error ya se maneja en el hook
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handlePrint = () => {
    if (!invoice) return
    
    // Crear el contenido HTML de la factura para imprimir
    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Factura #${invoice.id}</title>
        <style>
          @media print {
            body { margin: 0; }
            .invoice-container { 
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
          
          .invoice-container {
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
            text-align: center;
          }
          
          .invoice-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .invoice-number {
            font-size: 18px;
            opacity: 0.9;
          }
          
          .content {
            padding: 30px;
          }
          
          .section {
            margin-bottom: 30px;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
          }
          
          .patient-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          
          .info-item {
            margin-bottom: 10px;
          }
          
          .info-label {
            font-weight: bold;
            color: #374151;
          }
          
          .info-value {
            color: #6b7280;
          }
          
          .services-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }
          
          .services-table th,
          .services-table td {
            border: 1px solid #d1d5db;
            padding: 12px;
            text-align: left;
          }
          
          .services-table th {
            background: #f9fafb;
            font-weight: bold;
            color: #374151;
          }
          
          .summary {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
          }
          
          .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          
          .summary-total {
            font-size: 18px;
            font-weight: bold;
            color: #dc2626;
            border-top: 2px solid #e5e7eb;
            padding-top: 10px;
            margin-top: 10px;
          }
          
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
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
        
        <div class="invoice-container">
          <div class="header">
            <div class="invoice-title">FACTURA MÉDICA</div>
            <div class="invoice-number">#${invoice.id}</div>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Información del Paciente</div>
              <div class="patient-info">
                <div class="info-item">
                  <span class="info-label">Nombre:</span>
                  <span class="info-value">${invoice.patient_name || 'N/A'}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">ID:</span>
                  <span class="info-value">${invoice.patient_id || 'N/A'}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Fecha:</span>
                  <span class="info-value">${invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Estado:</span>
                  <span class="info-value">${invoice.status || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Servicios</div>
              <table class="services-table">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Monto</th>
                    <th>Seguro Cubre</th>
                    <th>Paciente Paga</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoice.items && invoice.items.length > 0 ? 
                    invoice.items.map((item: any) => `
                      <tr>
                        <td>${item.description || 'N/A'}</td>
                        <td>RD$ ${(item.unit_price || 0).toLocaleString()}</td>
                        <td>RD$ ${(item.insurance_covers || 0).toLocaleString()}</td>
                        <td>RD$ ${(item.patient_pays || 0).toLocaleString()}</td>
                      </tr>
                    `).join('') : 
                    '<tr><td colspan="4" style="text-align: center;">No hay servicios registrados</td></tr>'
                  }
                </tbody>
              </table>
            </div>
            
            <div class="summary">
              <div class="summary-row">
                <span>Total Servicios:</span>
                <span>RD$ ${(invoice.total_services || 0).toLocaleString()}</span>
              </div>
              <div class="summary-row">
                <span>Seguro Cubre:</span>
                <span>RD$ ${(invoice.insurance_covers || 0).toLocaleString()}</span>
              </div>
              <div class="summary-row summary-total">
                <span>Paciente Paga:</span>
                <span>RD$ ${(invoice.patient_pays || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Esta factura fue generada automáticamente por el sistema HSaludPro-360</p>
          </div>
        </div>
      </body>
      </html>
    `
    
    // Abrir nueva ventana con la factura
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (printWindow) {
      printWindow.document.write(invoiceHTML)
      printWindow.document.close()
    }
  }

  const handleDownloadPDF = () => {
    if (!invoice) return
    
    // Por ahora, solo mostrar un mensaje ya que la generación de PDF requiere librerías adicionales
    alert('Función de descarga de PDF en desarrollo. Por favor, use la función de imprimir para guardar como PDF.')
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">Factura no encontrada</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/facturacion">Volver a Facturación</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pagada":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Pendiente":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "Parcial":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "Rechazada":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pagada":
        return "default"
      case "Pendiente":
        return "outline"
      case "Parcial":
        return "secondary"
      case "Rechazada":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-9xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/facturacion">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Factura #{invoice.id}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Información Principal */}
        <div className="md:col-span-2 space-y-6">
          {/* Información del Paciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Paciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl font-medium">
                    {getInitials(invoice.patient_name || 'Paciente')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{invoice.patient_name || 'Paciente desconocido'}</h3>
                  <p className="text-muted-foreground">ID: {invoice.patient_id || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información del Seguro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Información del Seguro
              </CardTitle>
            </CardHeader>
            <CardContent>
              {invoice.insurance_provider ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">Proveedor</Label>
                    <p className="text-sm">{invoice.insurance_provider || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Número de Póliza</Label>
                    <p className="text-sm">{invoice.policy_number || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Verificación</Label>
                    <div className="flex items-center gap-2">
                      {invoice.coverage_verified ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm">
                        {invoice.coverage_verified ? "Verificada" : "Pendiente"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Verificada por</Label>
                    <p className="text-sm">{invoice.verified_by || "N/A"}</p>
                  </div>
                  {invoice.verification_notes && (
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium">Notas de Verificación</Label>
                      <p className="text-sm text-muted-foreground">{invoice.verification_notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No hay información de seguro</p>
              )}
            </CardContent>
          </Card>

          {/* Servicios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Servicios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoice.items && invoice.items.length > 0 ? (
                  invoice.items.map((item: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{item.description || 'Sin descripción'}</h4>
                        <span className="text-lg font-semibold">RD$ {(item.unit_price || 0).toLocaleString()}</span>
                      </div>
                      <div className="grid gap-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Seguro cubre:</span>
                          <span className="text-green-600 font-medium">RD$ {(item.insurance_covers || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Paciente paga:</span>
                          <span className="text-orange-600 font-medium">RD$ {(item.patient_pays || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No hay servicios registrados</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Resumen de Montos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resumen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total Servicios:</span>
                <span className="font-semibold">RD$ {(invoice.total_services || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Seguro Cubre:</span>
                <span className="font-semibold">RD$ {(invoice.insurance_covers || 0).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-orange-600">
                <span>Paciente Paga:</span>
                <span>RD$ {(invoice.patient_pays || 0).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Estado y Pago */}
          <Card>
            <CardHeader>
              <CardTitle>Estado y Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Estado</Label>
                <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Pagada">Pagada</SelectItem>
                    <SelectItem value="Parcial">Parcial</SelectItem>
                    <SelectItem value="Rechazada">Rechazada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="paymentMethod">Método de Pago</Label>
                <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Efectivo">Efectivo</SelectItem>
                    <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                    <SelectItem value="Transferencia">Transferencia</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notas adicionales..."
                  rows={3}
                />
              </div>

              <Button onClick={handleUpdate} className="w-full">
                Actualizar Factura
              </Button>
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" className="w-full" onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash className="mr-2 h-4 w-4" />
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará permanentemente la factura.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive">
                      {isDeleting ? "Eliminando..." : "Eliminar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
