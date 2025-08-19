"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Filter, Plus, Search, Phone, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAppContext } from "@/context/app-context"

export default function InvoicesPage() {
  const { invoices } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  // Función para obtener iniciales del nombre y apellido
  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') {
      return 'N/A'
    }
    const names = name.split(' ')
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  // Filtrar facturas según el término de búsqueda y la pestaña activa
  // Filtrar facturas según el término de búsqueda y la pestaña activa
  const filteredInvoices = invoices.filter((invoice) => {
    if (!invoice) return false;
    
    const matchesSearch = !searchTerm ||
      (invoice.patient_name && invoice.patient_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (invoice.insurance_provider && invoice.insurance_provider.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (invoice.policy_number && invoice.policy_number.toLowerCase().includes(searchTerm.toLowerCase()))

    if (activeTab === "todos") return matchesSearch
    return matchesSearch && invoice.status && invoice.status.toLowerCase() === activeTab.toLowerCase()
  })

  // Función para exportar facturas a CSV
  const exportInvoices = () => {
    // Crear cabeceras CSV
    const headers = ["ID", "Paciente", "Fecha", "Total Servicios", "Seguro Cubre", "Paciente Paga", "Estado", "ARS"]

    // Convertir datos de facturas a filas CSV
    const rows = filteredInvoices.map((invoice) => [
      invoice.id,
      invoice.patient_name,
      (invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString() : ""),
      (invoice.total_services || 0),
      (invoice.insurance_covers || 0),
      (invoice.patient_pays || 0),
      invoice.status,
      (invoice.insurance_provider || "Sin seguro"),
    ])

    // Combinar cabeceras y filas
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Crear un blob y descargar
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "facturas.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
    <div className="flex flex-col gap-4 max-w-9xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Facturación</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Gestione las facturas y cobros de sus pacientes</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild size="sm" className="text-xs sm:text-sm">
            <Link href="/dashboard/facturacion/nueva">
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Nueva Factura</span>
              <span className="sm:hidden">Nueva</span>
            </Link>
          </Button>
          <Button variant="outline" onClick={exportInvoices} size="sm" className="text-xs sm:text-sm">
            <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Exportar</span>
            <span className="sm:hidden">Exportar</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="todos" className="text-xs sm:text-sm">Todas</TabsTrigger>
            <TabsTrigger value="pendiente" className="text-xs sm:text-sm">Pendientes</TabsTrigger>
            <TabsTrigger value="pagada" className="text-xs sm:text-sm">Pagadas</TabsTrigger>
            <TabsTrigger value="parcial" className="text-xs sm:text-sm">Parciales</TabsTrigger>
            <TabsTrigger value="rechazada" className="text-xs sm:text-sm">Rechazadas</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar factura..."
                className="pl-8 w-full sm:w-[250px] text-xs sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Filtrar</span>
            </Button>
          </div>
        </div>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base sm:text-lg">Lista de Facturas</CardTitle>
              <CardDescription className="text-sm">
                Total: {filteredInvoices.length} facturas{" "}
                {activeTab !== "todos" ? activeTab.toLowerCase() + "s" : "registradas"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Vista Desktop - Tabla */}
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Total Servicios</TableHead>
                      <TableHead>Seguro Cubre</TableHead>
                      <TableHead>Paciente Paga</TableHead>
                      <TableHead>ARS</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No se encontraron facturas
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="text-sm font-medium">
                                  {getInitials(invoice.patient_name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{invoice.patient_name}</div>
                                <div className="text-sm text-muted-foreground">ID: {invoice.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{(invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString() : "")}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">RD$ {(invoice.total_services || 0).toLocaleString()}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-green-600 font-medium">
                              RD$ {(invoice.insurance_covers || 0).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-orange-600 font-medium">
                              RD$ {(invoice.patient_pays || 0).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="text-sm">{(invoice.insurance_provider || "Sin seguro")}</div>
                              {false && (
                                <CheckCircle className="h-3 w-3 text-green-500" data-title="Cobertura verificada" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(invoice.status)}
                              <Badge variant={getStatusBadgeVariant(invoice.status)}>
                                {invoice.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/facturacion/${invoice.id}`}>Ver</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Vista Mobile/Tablet - Cards */}
              <div className="lg:hidden space-y-4 p-4">
                {filteredInvoices.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No se encontraron facturas</p>
                  </div>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <Card key={invoice.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="text-sm font-medium">
                              {getInitials(invoice.patient_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm sm:text-base">{invoice.patient_name}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">ID: {invoice.id}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(invoice.status)}
                          <Badge variant={getStatusBadgeVariant(invoice.status)} className="text-xs">
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm mb-3">
                        <div>
                          <span className="font-medium">Fecha:</span>
                          <p className="text-muted-foreground">{(invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString() : "")}</p>
                        </div>
                        <div>
                          <span className="font-medium">ARS:</span>
                          <p className="text-muted-foreground truncate">{(invoice.insurance_provider || "Sin seguro")}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm mb-3">
                        <div>
                          <span className="font-medium">Total:</span>
                          <p className="text-muted-foreground">RD$ {(invoice.total_services || 0).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium text-green-600">Seguro:</span>
                          <p className="text-green-600">RD$ {(invoice.insurance_covers || 0).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium text-orange-600">Paciente:</span>
                          <p className="text-orange-600">RD$ {(invoice.patient_pays || 0).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm">
                          <Link href={`/dashboard/facturacion/${invoice.id}`}>Ver Detalles</Link>
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
