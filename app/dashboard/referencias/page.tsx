"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Check,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Plus,
  Search,
  Share2,
  Upload,
  User,
  Phone,
  Mail,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReferenciasPage() {
  const [selectedTab, setSelectedTab] = useState("activas")

  // Datos de ejemplo para referencias
  const references = [
    {
      id: "REF-001",
      patient: {
        id: "1",
        name: "María Rodríguez",
        image: "/serene-woman.png",
      },
      date: "15/05/2023",
      specialist: "Dr. Roberto Sánchez",
      specialty: "Cardiología",
      hospital: "Hospital General Docente de la Plaza de la Salud",
      status: "Pendiente",
      priority: "Alta",
      reason: "Evaluación de arritmia cardíaca",
    },
    {
      id: "REF-002",
      patient: {
        id: "2",
        name: "Juan Pérez",
        image: "/man-face.png",
      },
      date: "10/05/2023",
      specialist: "Dra. Carmen Jiménez",
      specialty: "Neurología",
      hospital: "Centro Médico UCE",
      status: "Completada",
      priority: "Normal",
      reason: "Evaluación de migrañas crónicas",
    },
    {
      id: "REF-003",
      patient: {
        id: "3",
        name: "Ana Gómez",
        image: "/woman-face-2.png",
      },
      date: "12/05/2023",
      specialist: "Dr. Miguel Hernández",
      specialty: "Endocrinología",
      hospital: "CEDIMAT",
      status: "En proceso",
      priority: "Normal",
      reason: "Control de diabetes tipo 2",
    },
    {
      id: "REF-004",
      patient: {
        id: "4",
        name: "Carlos Díaz",
        image: "/man-face-2.png",
      },
      date: "05/04/2023",
      specialist: "Dra. Laura Méndez",
      specialty: "Traumatología",
      hospital: "Hospital Metropolitano de Santiago (HOMS)",
      status: "Cancelada",
      priority: "Alta",
      reason: "Evaluación de lesión en rodilla",
    },
    {
      id: "REF-005",
      patient: {
        id: "5",
        name: "Laura Sánchez",
        image: "/woman-face-3.png",
      },
      date: "20/04/2023",
      specialist: "Dr. José Ramírez",
      specialty: "Gastroenterología",
      hospital: "Hospital General de la Plaza de la Salud",
      status: "Completada",
      priority: "Normal",
      reason: "Estudio de reflujo gastroesofágico",
    },
  ]

  // Datos de ejemplo para especialistas
  const specialists = [
    {
      id: "1",
      name: "Dr. Roberto Sánchez",
      specialty: "Cardiología",
      hospital: "Hospital General Docente de la Plaza de la Salud",
      phone: "809-555-1234",
      email: "roberto.sanchez@hospital.com",
      image: "/doctor-avatar.png",
    },
    {
      id: "2",
      name: "Dra. Carmen Jiménez",
      specialty: "Neurología",
      hospital: "Centro Médico UCE",
      phone: "809-555-5678",
      email: "carmen.jimenez@hospital.com",
      image: "/woman-face-4.png",
    },
    {
      id: "3",
      name: "Dr. Miguel Hernández",
      specialty: "Endocrinología",
      hospital: "CEDIMAT",
      phone: "809-555-9012",
      email: "miguel.hernandez@hospital.com",
      image: "/man-face-3.png",
    },
    {
      id: "4",
      name: "Dra. Laura Méndez",
      specialty: "Traumatología",
      hospital: "Hospital Metropolitano de Santiago (HOMS)",
      phone: "809-555-3456",
      email: "laura.mendez@hospital.com",
      image: "/woman-face-2.png",
    },
    {
      id: "5",
      name: "Dr. José Ramírez",
      specialty: "Gastroenterología",
      hospital: "Hospital General de la Plaza de la Salud",
      phone: "809-555-7890",
      email: "jose.ramirez@hospital.com",
      image: "/man-face-4.png",
    },
  ]

  // Datos de ejemplo para hospitales
  const hospitals = [
    {
      id: "1",
      name: "Hospital General Docente de la Plaza de la Salud",
      address: "Av. Ortega y Gasset, Santo Domingo",
      phone: "809-565-7477",
      email: "contacto@hgps.org.do",
      specialties: ["Cardiología", "Neurología", "Gastroenterología", "Oncología"],
    },
    {
      id: "2",
      name: "Centro Médico UCE",
      address: "Av. Máximo Gómez, Santo Domingo",
      phone: "809-689-2222",
      email: "info@centromedicouce.com",
      specialties: ["Neurología", "Pediatría", "Ginecología", "Urología"],
    },
    {
      id: "3",
      name: "CEDIMAT",
      address: "Plaza de la Salud, Santo Domingo",
      phone: "809-565-9989",
      email: "contacto@cedimat.com",
      specialties: ["Cardiología", "Endocrinología", "Nefrología", "Radiología"],
    },
    {
      id: "4",
      name: "Hospital Metropolitano de Santiago (HOMS)",
      address: "Autopista Duarte Km 2 1/2, Santiago",
      phone: "809-724-2222",
      email: "info@homs.com.do",
      specialties: ["Traumatología", "Neurocirugía", "Cardiología", "Oncología"],
    },
    {
      id: "5",
      name: "Clínica Corazones Unidos",
      address: "Calle Fantino Falco, Santo Domingo",
      phone: "809-565-3636",
      email: "contacto@corazonesunidos.com.do",
      specialties: ["Cardiología", "Medicina Interna", "Neumología", "Cirugía Cardiovascular"],
    },
  ]

  return (
    <div className="space-y-6 max-w-9xl mx-auto w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Referencias Médicas</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gestione las referencias de sus pacientes a especialistas y centros médicos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button size="sm" className="text-xs sm:text-sm">
            <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Nueva referencia
          </Button>
        </div>
      </div>

      <Tabs defaultValue="activas" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="activas" className="text-xs sm:text-sm">Referencias Activas</TabsTrigger>
          <TabsTrigger value="historial" className="text-xs sm:text-sm">Historial</TabsTrigger>
          <TabsTrigger value="especialistas" className="text-xs sm:text-sm">Especialistas</TabsTrigger>
          <TabsTrigger value="centros" className="text-xs sm:text-sm">Centros Médicos</TabsTrigger>
        </TabsList>

        <TabsContent value="activas" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Referencias Activas</CardTitle>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar referencia..." className="pl-8 w-full sm:w-[250px]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="in-progress">En proceso</SelectItem>
                      <SelectItem value="completed">Completada</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Vista de tabla para desktop */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Referencia</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Especialista</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {references
                      .filter((ref) => ref.status !== "Completada" && ref.status !== "Cancelada")
                      .map((reference) => (
                        <TableRow key={reference.id}>
                          <TableCell className="font-medium">{reference.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={reference.patient.image || "/placeholder.svg"}
                                  alt={reference.patient.name}
                                />
                                <AvatarFallback>{reference.patient.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{reference.patient.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{reference.specialist}</div>
                              <div className="text-xs text-muted-foreground">{reference.specialty}</div>
                            </div>
                          </TableCell>
                          <TableCell>{reference.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                reference.status === "Pendiente"
                                  ? "outline"
                                  : reference.status === "En proceso"
                                    ? "default"
                                    : reference.status === "Completada"
                                      ? "secondary"
                                      : "destructive"
                              }
                            >
                              {reference.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={reference.priority === "Alta" ? "destructive" : "secondary"}
                              className="bg-opacity-50"
                            >
                              {reference.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver detalles</span>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Ver documento</span>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Compartir</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              {/* Vista de cards para móvil/tablet */}
              <div className="lg:hidden space-y-3 p-4">
                {references
                  .filter((ref) => ref.status !== "Completada" && ref.status !== "Cancelada")
                  .map((reference) => (
                    <Card key={reference.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={reference.patient.image || "/placeholder.svg"}
                              alt={reference.patient.name}
                            />
                            <AvatarFallback>{reference.patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{reference.patient.name}</div>
                            <div className="text-xs text-muted-foreground">{reference.id}</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Especialista:</span>
                          <span>{reference.specialist}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Especialidad:</span>
                          <span>{reference.specialty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fecha:</span>
                          <span>{reference.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Estado:</span>
                          <Badge
                            variant={
                              reference.status === "Pendiente"
                                ? "outline"
                                : reference.status === "En proceso"
                                  ? "default"
                                  : reference.status === "Completada"
                                    ? "secondary"
                                    : "destructive"
                            }
                            className="text-xs"
                          >
                            {reference.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Prioridad:</span>
                          <Badge
                            variant={reference.priority === "Alta" ? "destructive" : "secondary"}
                            className="bg-opacity-50 text-xs"
                          >
                            {reference.priority}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Detalles de la Referencia</CardTitle>
                <CardDescription>REF-001 - María Rodríguez</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Paciente</h4>
                      <p className="text-sm">María Rodríguez</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Fecha</h4>
                      <p className="text-sm">15/05/2023</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Especialista</h4>
                      <p className="text-sm">Dr. Roberto Sánchez</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Especialidad</h4>
                      <p className="text-sm">Cardiología</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Centro Médico</h4>
                      <p className="text-sm">Hospital General Docente de la Plaza de la Salud</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Estado</h4>
                      <Badge variant="outline">Pendiente</Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Prioridad</h4>
                      <Badge variant="destructive" className="bg-opacity-50">
                        Alta
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Médico referente</h4>
                      <p className="text-sm">Dr. Martínez</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Motivo de referencia</h4>
                    <p className="text-sm mt-1">
                      Paciente de 58 años con antecedentes de hipertensión arterial controlada. Presenta episodios de
                      palpitaciones y mareos. ECG muestra arritmia supraventricular. Se refiere para evaluación
                      cardiológica completa y posible tratamiento.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Documentos adjuntos</h4>
                    <div className="flex flex-col gap-2 mt-1">
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-serene" />
                          <span className="text-sm">ECG_Maria_Rodriguez.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-serene" />
                          <span className="text-sm">Historia_Clinica_Maria.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex flex-col sm:flex-row justify-between gap-2">
                <Button variant="outline" size="sm">Editar</Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir
                  </Button>
                  <Button size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    Marcar como completada
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle>Nueva Referencia</CardTitle>
                <CardDescription>Complete el formulario para crear una nueva referencia</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Paciente</Label>
                    <Select>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Seleccionar paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">María Rodríguez</SelectItem>
                        <SelectItem value="2">Juan Pérez</SelectItem>
                        <SelectItem value="3">Ana Gómez</SelectItem>
                        <SelectItem value="4">Carlos Díaz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad</Label>
                    <Select>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Seleccionar especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiología</SelectItem>
                        <SelectItem value="neurology">Neurología</SelectItem>
                        <SelectItem value="endocrinology">Endocrinología</SelectItem>
                        <SelectItem value="traumatology">Traumatología</SelectItem>
                        <SelectItem value="gastroenterology">Gastroenterología</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialist">Especialista</Label>
                    <Select>
                      <SelectTrigger id="specialist">
                        <SelectValue placeholder="Seleccionar especialista" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Dr. Roberto Sánchez</SelectItem>
                        <SelectItem value="2">Dra. Carmen Jiménez</SelectItem>
                        <SelectItem value="3">Dr. Miguel Hernández</SelectItem>
                        <SelectItem value="4">Dra. Laura Méndez</SelectItem>
                        <SelectItem value="5">Dr. José Ramírez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Centro Médico</Label>
                    <Select>
                      <SelectTrigger id="hospital">
                        <SelectValue placeholder="Seleccionar centro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Hospital General Docente de la Plaza de la Salud</SelectItem>
                        <SelectItem value="2">Centro Médico UCE</SelectItem>
                        <SelectItem value="3">CEDIMAT</SelectItem>
                        <SelectItem value="4">Hospital Metropolitano de Santiago (HOMS)</SelectItem>
                        <SelectItem value="5">Clínica Corazones Unidos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Seleccionar fecha
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridad</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Seleccionar prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo de referencia</Label>
                  <Textarea id="reason" placeholder="Describa el motivo de la referencia" className="min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label>Documentos</Label>
                  <div className="border rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Arrastre archivos aquí o haga clic para seleccionar</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex flex-col sm:flex-row justify-between gap-2">
                <Button variant="outline" size="sm">Cancelar</Button>
                <Button size="sm">Crear referencia</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Historial de Referencias</CardTitle>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar referencia..." className="pl-8 w-full sm:w-[250px]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="completed">Completada</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Vista de tabla para desktop */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Referencia</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Especialista</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Resultado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {references
                      .filter((ref) => ref.status === "Completada" || ref.status === "Cancelada")
                      .map((reference) => (
                        <TableRow key={reference.id}>
                          <TableCell className="font-medium">{reference.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={reference.patient.image || "/placeholder.svg"}
                                  alt={reference.patient.name}
                                />
                                <AvatarFallback>{reference.patient.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{reference.patient.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{reference.specialist}</div>
                              <div className="text-xs text-muted-foreground">{reference.specialty}</div>
                            </div>
                          </TableCell>
                          <TableCell>{reference.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={reference.status === "Completada" ? "secondary" : "destructive"}
                              className={reference.status === "Cancelada" ? "bg-opacity-50" : ""}
                            >
                              {reference.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {reference.status === "Completada" ? (
                              <span className="text-sm">Informe recibido</span>
                            ) : (
                              <span className="text-sm text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver detalles</span>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Ver documento</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              {/* Vista de cards para móvil/tablet */}
              <div className="lg:hidden space-y-3 p-4">
                {references
                  .filter((ref) => ref.status === "Completada" || ref.status === "Cancelada")
                  .map((reference) => (
                    <Card key={reference.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={reference.patient.image || "/placeholder.svg"}
                              alt={reference.patient.name}
                            />
                            <AvatarFallback>{reference.patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{reference.patient.name}</div>
                            <div className="text-xs text-muted-foreground">{reference.id}</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Especialista:</span>
                          <span>{reference.specialist}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Especialidad:</span>
                          <span>{reference.specialty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fecha:</span>
                          <span>{reference.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Estado:</span>
                          <Badge
                            variant={reference.status === "Completada" ? "secondary" : "destructive"}
                            className={`text-xs ${reference.status === "Cancelada" ? "bg-opacity-50" : ""}`}
                          >
                            {reference.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resultado:</span>
                          <span className="text-sm">
                            {reference.status === "Completada" ? "Informe recibido" : "N/A"}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="especialistas" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Directorio de Especialistas</CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir especialista
                </Button>
              </div>
              <CardDescription className="text-sm">Gestione el directorio de especialistas para referencias médicas</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar especialista..." className="pl-8" />
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="cardiology">Cardiología</SelectItem>
                        <SelectItem value="neurology">Neurología</SelectItem>
                        <SelectItem value="endocrinology">Endocrinología</SelectItem>
                        <SelectItem value="traumatology">Traumatología</SelectItem>
                        <SelectItem value="gastroenterology">Gastroenterología</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Centro médico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="1">Hospital General Plaza de la Salud</SelectItem>
                        <SelectItem value="2">Centro Médico UCE</SelectItem>
                        <SelectItem value="3">CEDIMAT</SelectItem>
                        <SelectItem value="4">HOMS</SelectItem>
                        <SelectItem value="5">Clínica Corazones Unidos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4">
                {specialists.map((specialist) => (
                  <Card key={specialist.id} className="overflow-hidden">
                    <div className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarImage src={specialist.image || "/placeholder.svg"} alt={specialist.name} />
                        <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">{specialist.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{specialist.specialty}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{specialist.hospital}</p>
                      </div>
                    </div>
                    <div className="border-t p-3 sm:p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        <span className="truncate">{specialist.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        <span className="truncate">{specialist.email}</span>
                      </div>
                    </div>
                    <div className="border-t p-3 sm:p-4 flex flex-col sm:flex-row justify-between gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <User className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Ver perfil
                      </Button>
                      <Button size="sm" className="text-xs">
                        <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Referir
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="centros" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Centros Médicos</CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir centro
                </Button>
              </div>
              <CardDescription className="text-sm">Directorio de centros médicos para referencias de pacientes</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar centro médico..." className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="cardiology">Cardiología</SelectItem>
                      <SelectItem value="neurology">Neurología</SelectItem>
                      <SelectItem value="endocrinology">Endocrinología</SelectItem>
                      <SelectItem value="traumatology">Traumatología</SelectItem>
                      <SelectItem value="gastroenterology">Gastroenterología</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 p-4">
                {hospitals.map((hospital) => (
                  <Card key={hospital.id} className="overflow-hidden">
                    <div className="p-3 sm:p-4">
                      <h3 className="font-medium text-base sm:text-lg">{hospital.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{hospital.address}</p>
                    </div>
                                          <div className="border-t p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                            <span className="truncate">{hospital.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                            <span className="truncate">{hospital.email}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-medium mb-2">Especialidades</h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {hospital.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                                          <div className="border-t p-3 sm:p-4 flex flex-col sm:flex-row justify-between gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ExternalLink className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Visitar sitio web
                        </Button>
                        <Button size="sm" className="text-xs">
                          <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Referir paciente
                        </Button>
                      </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
