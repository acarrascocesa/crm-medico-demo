"use client"

import { useState } from "react"
import { CalendarIcon, Download, FileText, Filter, Printer } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function ReportesPage() {
  const [date, setDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  // Datos de ejemplo para los informes recientes
  const recentReports = [
    {
      id: "REP-001",
      name: "Informe Mensual SENASA",
      date: "2023-04-15",
      status: "Enviado",
      type: "Mensual",
      insurance: "SENASA",
    },
    {
      id: "REP-002",
      name: "Informe Trimestral ARS Humano",
      date: "2023-04-01",
      status: "Pendiente",
      type: "Trimestral",
      insurance: "ARS Humano",
    },
    {
      id: "REP-003",
      name: "Informe Procedimientos SENASA",
      date: "2023-03-28",
      status: "Enviado",
      type: "Procedimientos",
      insurance: "SENASA",
    },
    {
      id: "REP-004",
      name: "Informe Consultas ARS Universal",
      date: "2023-03-15",
      status: "Enviado",
      type: "Consultas",
      insurance: "ARS Universal",
    },
    {
      id: "REP-005",
      name: "Informe Mensual ARS Palic",
      date: "2023-03-01",
      status: "Rechazado",
      type: "Mensual",
      insurance: "ARS Palic",
    },
  ]

  // Datos de ejemplo para las plantillas de informes
  const reportTemplates = [
    {
      id: "TEMP-001",
      name: "Informe Mensual SENASA",
      description: "Reporte mensual de servicios prestados para SENASA",
      insurance: "SENASA",
      type: "Mensual",
    },
    {
      id: "TEMP-002",
      name: "Informe Trimestral SENASA",
      description: "Reporte trimestral de servicios prestados para SENASA",
      insurance: "SENASA",
      type: "Trimestral",
    },
    {
      id: "TEMP-003",
      name: "Informe Procedimientos SENASA",
      description: "Detalle de procedimientos realizados para pacientes de SENASA",
      insurance: "SENASA",
      type: "Procedimientos",
    },
    {
      id: "TEMP-004",
      name: "Informe Consultas SENASA",
      description: "Detalle de consultas realizadas para pacientes de SENASA",
      insurance: "SENASA",
      type: "Consultas",
    },
    {
      id: "TEMP-005",
      name: "Informe Mensual ARS Humano",
      description: "Reporte mensual de servicios prestados para ARS Humano",
      insurance: "ARS Humano",
      type: "Mensual",
    },
    {
      id: "TEMP-006",
      name: "Informe Mensual ARS Universal",
      description: "Reporte mensual de servicios prestados para ARS Universal",
      insurance: "ARS Universal",
      type: "Mensual",
    },
    {
      id: "TEMP-007",
      name: "Informe Mensual ARS Palic",
      description: "Reporte mensual de servicios prestados para ARS Palic",
      insurance: "ARS Palic",
      type: "Mensual",
    },
  ]

  const handleGenerateReport = () => {
    // Aquí iría la lógica para generar el informe
    console.log("Generando informe:", selectedReport, "desde", date, "hasta", endDate)
  }

  return (
    <div className="space-y-6 max-w-9xl mx-auto w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Reportes</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="generar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generar">Generar Informes</TabsTrigger>
          <TabsTrigger value="historial">Historial de Informes</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="generar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generar Nuevo Informe</CardTitle>
              <CardDescription>
                Crea informes para aseguradoras como SENASA, ARS Humano, ARS Universal, entre otras.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance">Aseguradora</Label>
                  <Select>
                    <SelectTrigger id="insurance">
                      <SelectValue placeholder="Seleccionar aseguradora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senasa">SENASA</SelectItem>
                      <SelectItem value="ars-humano">ARS Humano</SelectItem>
                      <SelectItem value="ars-universal">ARS Universal</SelectItem>
                      <SelectItem value="ars-palic">ARS Palic</SelectItem>
                      <SelectItem value="mapfre">Mapfre Salud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-type">Tipo de Informe</Label>
                  <Select>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Informe Mensual</SelectItem>
                      <SelectItem value="quarterly">Informe Trimestral</SelectItem>
                      <SelectItem value="procedures">Informe de Procedimientos</SelectItem>
                      <SelectItem value="consultations">Informe de Consultas</SelectItem>
                      <SelectItem value="claims">Reclamaciones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">Fecha Inicial</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={es} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">Fecha Final</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus locale={es} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-filters">Filtros Adicionales</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-3 w-3" />
                    Médico
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-3 w-3" />
                    Especialidad
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-3 w-3" />
                    Tipo de Servicio
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-3 w-3" />
                    Estado de Pago
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Vista Previa</Button>
              <Button onClick={handleGenerateReport}>Generar Informe</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informes Rápidos</CardTitle>
              <CardDescription>
                Genera informes predefinidos con un solo clic para las aseguradoras más comunes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportTemplates.slice(0, 6).map((template) => (
                  <Card
                    key={template.id}
                    className={cn(
                      "cursor-pointer hover:border-blue-serene transition-colors",
                      selectedReport === template.id ? "border-blue-serene bg-blue-serene-50" : "",
                    )}
                    onClick={() => setSelectedReport(template.id)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Badge variant="outline">{template.insurance}</Badge>
                      <Badge variant="outline">{template.type}</Badge>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={!selectedReport} onClick={handleGenerateReport}>
                Generar Informe Seleccionado
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Informes</CardTitle>
              <CardDescription>Visualiza y gestiona los informes que has generado anteriormente.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center py-4">
                <Input placeholder="Buscar informes..." className="max-w-sm" />
                <div className="ml-auto flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Aseguradora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="senasa">SENASA</SelectItem>
                      <SelectItem value="ars-humano">ARS Humano</SelectItem>
                      <SelectItem value="ars-universal">ARS Universal</SelectItem>
                      <SelectItem value="ars-palic">ARS Palic</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="sent">Enviados</SelectItem>
                      <SelectItem value="pending">Pendientes</SelectItem>
                      <SelectItem value="rejected">Rechazados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                  <div>ID</div>
                  <div className="col-span-2">Nombre</div>
                  <div>Fecha</div>
                  <div>Aseguradora</div>
                  <div>Estado</div>
                </div>
                {recentReports.map((report) => (
                  <div key={report.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-muted/50">
                    <div className="font-medium">{report.id}</div>
                    <div className="col-span-2">{report.name}</div>
                    <div>{report.date}</div>
                    <div>{report.insurance}</div>
                    <div>
                      <Badge
                        variant={
                          report.status === "Enviado"
                            ? "default"
                            : report.status === "Pendiente"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Mostrando 5 de 24 informes</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="plantillas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Informes</CardTitle>
              <CardDescription>Gestiona las plantillas predefinidas para generar informes rápidamente.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center py-4">
                <Input placeholder="Buscar plantillas..." className="max-w-sm" />
                <Button className="ml-auto" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Nueva Plantilla
                </Button>
              </div>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                  <div>ID</div>
                  <div className="col-span-2">Nombre</div>
                  <div>Aseguradora</div>
                  <div>Tipo</div>
                </div>
                {reportTemplates.map((template) => (
                  <div key={template.id} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-muted/50">
                    <div className="font-medium">{template.id}</div>
                    <div className="col-span-2">{template.name}</div>
                    <div>{template.insurance}</div>
                    <div>{template.type}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Mostrando 7 de 12 plantillas</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
