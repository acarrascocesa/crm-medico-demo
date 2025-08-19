"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  AlertTriangle,
  Clock,
  FileText,
  Lock,
  LogOut,
  Search,
  Settings,
  Shield,
  Smartphone,
  Trash,
  UserPlus,
  Plus,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SeguridadPage() {
  const [selectedTab, setSelectedTab] = useState("usuarios")

  // Datos de ejemplo para usuarios
  const users = [
    {
      id: "1",
      name: "Dr. Martínez",
      email: "doctor@ejemplo.com",
      role: "Administrador",
      status: "Activo",
      lastLogin: "Hoy, 9:30 AM",
      twoFactorEnabled: true,
      image: "/doctor-avatar.png",
    },
    {
      id: "2",
      name: "Dra. Sánchez",
      email: "sanchez@ejemplo.com",
      role: "Médico",
      status: "Activo",
      lastLogin: "Ayer, 4:15 PM",
      twoFactorEnabled: true,
      image: "/woman-face-2.png",
    },
    {
      id: "3",
      name: "Carlos Ramírez",
      email: "carlos@ejemplo.com",
      role: "Asistente",
      status: "Activo",
      lastLogin: "15/05/2023",
      twoFactorEnabled: false,
      image: "/man-face.png",
    },
    {
      id: "4",
      name: "Ana Jiménez",
      email: "ana@ejemplo.com",
      role: "Recepcionista",
      status: "Inactivo",
      lastLogin: "10/05/2023",
      twoFactorEnabled: false,
      image: "/woman-face-3.png",
    },
    {
      id: "5",
      name: "Roberto Méndez",
      email: "roberto@ejemplo.com",
      role: "Médico",
      status: "Pendiente",
      lastLogin: "-",
      twoFactorEnabled: false,
      image: "/man-face-2.png",
    },
  ]

  // Datos de ejemplo para roles
  const roles = [
    {
      id: "1",
      name: "Administrador",
      description: "Acceso completo a todas las funciones del sistema",
      users: 1,
      permissions: [
        "Gestión de usuarios",
        "Configuración del sistema",
        "Acceso a todos los módulos",
        "Reportes financieros",
        "Gestión de integraciones",
      ],
    },
    {
      id: "2",
      name: "Médico",
      description: "Acceso a historias clínicas, citas y pacientes",
      users: 2,
      permissions: [
        "Gestión de pacientes",
        "Historias clínicas",
        "Agenda de citas",
        "Recetas médicas",
        "Referencias médicas",
      ],
    },
    {
      id: "3",
      name: "Asistente",
      description: "Acceso limitado a citas y datos básicos de pacientes",
      users: 1,
      permissions: ["Ver pacientes", "Agendar citas", "Comunicaciones", "Ver referencias"],
    },
    {
      id: "4",
      name: "Recepcionista",
      description: "Gestión de citas y registro de pacientes",
      users: 1,
      permissions: ["Registro de pacientes", "Agendar citas", "Comunicaciones"],
    },
  ]

  // Datos de ejemplo para registros de auditoría
  const auditLogs = [
    {
      id: "1",
      date: "Hoy, 10:30 AM",
      user: "Dr. Martínez",
      action: "Acceso a historia clínica",
      resource: "Paciente: María Rodríguez",
      ip: "192.168.1.1",
      status: "Éxito",
    },
    {
      id: "2",
      date: "Hoy, 9:45 AM",
      user: "Dra. Sánchez",
      action: "Modificación de receta",
      resource: "Paciente: Juan Pérez",
      ip: "192.168.1.2",
      status: "Éxito",
    },
    {
      id: "3",
      date: "Ayer, 4:30 PM",
      user: "Carlos Ramírez",
      action: "Programación de cita",
      resource: "Paciente: Ana Gómez",
      ip: "192.168.1.3",
      status: "Éxito",
    },
    {
      id: "4",
      date: "Ayer, 3:15 PM",
      user: "Dr. Martínez",
      action: "Intento de acceso a facturación",
      resource: "Módulo: Facturación",
      ip: "192.168.1.1",
      status: "Denegado",
    },
    {
      id: "5",
      date: "15/05/2023",
      user: "Ana Jiménez",
      action: "Inicio de sesión",
      resource: "Sistema",
      ip: "192.168.1.4",
      status: "Éxito",
    },
  ]

  // Datos de ejemplo para sesiones activas
  const activeSessions = [
    {
      id: "1",
      device: "Chrome en Windows 10",
      ip: "192.168.1.1",
      location: "Santo Domingo, República Dominicana",
      lastActive: "Activo ahora",
      current: true,
    },
    {
      id: "2",
      device: "Safari en iPhone",
      ip: "192.168.1.1",
      location: "Santo Domingo, República Dominicana",
      lastActive: "Hace 2 horas",
      current: false,
    },
    {
      id: "3",
      device: "Chrome en MacBook Pro",
      ip: "190.80.12.45",
      location: "Santiago, República Dominicana",
      lastActive: "Ayer",
      current: false,
    },
  ]

  return (
    <div className="space-y-6 max-w-9xl mx-auto w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Seguridad</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Gestione usuarios, roles, permisos y configuraciones de seguridad</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="text-xs sm:text-sm">
            <Shield className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Configuración de seguridad
          </Button>
        </div>
      </div>

      <Tabs defaultValue="usuarios" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="usuarios" className="text-xs sm:text-sm">Usuarios</TabsTrigger>
          <TabsTrigger value="roles" className="text-xs sm:text-sm">Roles y Permisos</TabsTrigger>
          <TabsTrigger value="auditoria" className="text-xs sm:text-sm">Auditoría</TabsTrigger>
          <TabsTrigger value="sesiones" className="text-xs sm:text-sm">Sesiones</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle>Usuarios del Sistema</CardTitle>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nuevo usuario
                </Button>
              </div>
              <CardDescription>Gestione los usuarios que tienen acceso al sistema</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar usuario..." className="pl-8" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="doctor">Médico</SelectItem>
                        <SelectItem value="assistant">Asistente</SelectItem>
                        <SelectItem value="receptionist">Recepcionista</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último acceso</TableHead>
                    <TableHead>2FA</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Activo" ? "default" : user.status === "Inactivo" ? "secondary" : "outline"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        {user.twoFactorEnabled ? (
                          <Badge variant="default" className="bg-green-tranquil">
                            Activado
                          </Badge>
                        ) : (
                          <Badge variant="outline">Desactivado</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          {user.status === "Activo" && (
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500">
                              <Lock className="mr-2 h-4 w-4" />
                              Bloquear
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Nuevo Usuario</CardTitle>
                <CardDescription>Añada un nuevo usuario al sistema</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Nombre</Label>
                    <Input id="first-name" placeholder="Nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Apellido</Label>
                    <Input id="last-name" placeholder="Apellido" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="correo@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="doctor">Médico</SelectItem>
                      <SelectItem value="assistant">Asistente</SelectItem>
                      <SelectItem value="receptionist">Recepcionista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Autenticación de dos factores</Label>
                    <p className="text-sm text-muted-foreground">Requerir 2FA para este usuario</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <Button variant="outline">Cancelar</Button>
                <Button>Crear usuario</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>Políticas de seguridad para todos los usuarios</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-2fa">Requerir 2FA</Label>
                    <p className="text-sm text-muted-foreground">Obligar a todos los usuarios a usar 2FA</p>
                  </div>
                  <Switch id="require-2fa" checked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Expiración de contraseñas</Label>
                    <p className="text-sm text-muted-foreground">Forzar cambio de contraseña cada 90 días</p>
                  </div>
                  <Switch id="password-expiry" checked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Tiempo de inactividad</Label>
                    <p className="text-sm text-muted-foreground">Cerrar sesión después de 30 minutos de inactividad</p>
                  </div>
                  <Switch id="session-timeout" checked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="login-attempts">Bloqueo por intentos fallidos</Label>
                    <p className="text-sm text-muted-foreground">Bloquear cuenta después de 5 intentos fallidos</p>
                  </div>
                  <Switch id="login-attempts" checked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Política de contraseñas</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger id="password-policy">
                      <SelectValue placeholder="Seleccionar política" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básica (mínimo 8 caracteres)</SelectItem>
                      <SelectItem value="medium">Media (letras, números, 8+ caracteres)</SelectItem>
                      <SelectItem value="strong">Fuerte (letras, números, símbolos, 10+ caracteres)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">Guardar configuración</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle>Roles y Permisos</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo rol
                </Button>
              </div>
              <CardDescription>Gestione los roles y permisos de acceso al sistema</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rol</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Usuarios</TableHead>
                    <TableHead>Permisos</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.users}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 2).map((permission, index) => (
                            <Badge key={index} variant="outline" className="mr-1">
                              {permission}
                            </Badge>
                          ))}
                          {role.permissions.length > 2 && (
                            <Badge variant="outline">+{role.permissions.length - 2} más</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          {role.name !== "Administrador" && (
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500">
                              <Trash className="mr-2 h-4 w-4" />
                              Eliminar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Editar Rol</CardTitle>
                <CardDescription>Médico</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Nombre del rol</Label>
                  <Input id="role-name" defaultValue="Médico" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-description">Descripción</Label>
                  <Input id="role-description" defaultValue="Acceso a historias clínicas, citas y pacientes" />
                </div>
                <div className="space-y-2">
                  <Label>Permisos</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="permission-patients" checked />
                      <Label htmlFor="permission-patients">Gestión de pacientes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="permission-records" checked />
                      <Label htmlFor="permission-records">Historias clínicas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="permission-appointments" checked />
                      <Label htmlFor="permission-appointments">Agenda de citas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="permission-prescriptions" checked />
                      <Label htmlFor="permission-prescriptions">Recetas médicas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="permission-references" checked />
                      <Label htmlFor="permission-references">Referencias médicas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="permission-billing" />
                      <Label htmlFor="permission-billing">Facturación</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="permission-reports" />
                      <Label htmlFor="permission-reports">Reportes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="permission-users" />
                      <Label htmlFor="permission-users">Gestión de usuarios</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar cambios</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle>Usuarios con Rol de Médico</CardTitle>
                <CardDescription>Usuarios asignados a este rol</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {users
                    .filter((user) => user.role === "Médico")
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                        <Badge variant={user.status === "Activo" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Asignar usuarios a este rol
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="auditoria" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle>Registro de Auditoría</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar en registros..." className="pl-8 w-[250px]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las acciones</SelectItem>
                      <SelectItem value="login">Inicios de sesión</SelectItem>
                      <SelectItem value="access">Accesos a datos</SelectItem>
                      <SelectItem value="modify">Modificaciones</SelectItem>
                      <SelectItem value="denied">Accesos denegados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>Historial de actividades y accesos al sistema</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha y hora</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Detalles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === "Éxito" ? "default" : "destructive"}>{log.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="p-4 flex justify-between">
              <div className="text-sm text-muted-foreground">Mostrando 5 de 1,247 registros</div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  Alertas de Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="border rounded-md p-3 bg-red-50">
                    <div className="font-medium text-red-600">Múltiples intentos de inicio de sesión fallidos</div>
                    <div className="text-sm text-red-600 mt-1">
                      5 intentos fallidos para la cuenta ana@ejemplo.com desde IP 190.80.12.45
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Hoy, 8:45 AM</div>
                  </div>
                  <div className="border rounded-md p-3 bg-amber-50">
                    <div className="font-medium text-amber-600">Acceso desde ubicación inusual</div>
                    <div className="text-sm text-amber-600 mt-1">
                      Dr. Martínez inició sesión desde Santiago, República Dominicana
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Ayer, 7:30 PM</div>
                  </div>
                  <div className="border rounded-md p-3 bg-amber-50">
                    <div className="font-medium text-amber-600">Intento de acceso a datos sensibles</div>
                    <div className="text-sm text-amber-600 mt-1">
                      Carlos Ramírez intentó acceder a reportes financieros
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">15/05/2023</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="outline" className="w-full">
                  Ver todas las alertas
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-serene" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {auditLogs.slice(0, 4).map((log, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div
                        className={`h-2 w-2 mt-2 rounded-full ${
                          log.status === "Éxito" ? "bg-green-tranquil" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="text-sm">
                          <span className="font-medium">{log.user}</span> {log.action.toLowerCase()}
                        </div>
                        <div className="text-xs text-muted-foreground">{log.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="outline" className="w-full">
                  Ver toda la actividad
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-blue-serene" />
                  Configuración de Auditoría
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-login">Auditar inicios de sesión</Label>
                    <p className="text-sm text-muted-foreground">Registrar todos los inicios de sesión</p>
                  </div>
                  <Switch id="audit-login" checked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-access">Auditar acceso a datos</Label>
                    <p className="text-sm text-muted-foreground">Registrar accesos a datos sensibles</p>
                  </div>
                  <Switch id="audit-access" checked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-changes">Auditar cambios</Label>
                    <p className="text-sm text-muted-foreground">Registrar modificaciones de datos</p>
                  </div>
                  <Switch id="audit-changes" checked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-export">Exportación automática</Label>
                    <p className="text-sm text-muted-foreground">Exportar registros diariamente</p>
                  </div>
                  <Switch id="audit-export" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention">Retención de registros</Label>
                  <Select defaultValue="365">
                    <SelectTrigger id="retention">
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                      <SelectItem value="180">180 días</SelectItem>
                      <SelectItem value="365">1 año</SelectItem>
                      <SelectItem value="730">2 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">Guardar configuración</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sesiones" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Sesiones Activas</CardTitle>
              <CardDescription>Dispositivos y ubicaciones donde su cuenta está actualmente conectada</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Dirección IP</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Última actividad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{session.device}</div>
                            {session.current && <div className="text-xs text-green-tranquil">Sesión actual</div>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{session.ip}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>
                        <Badge variant={session.lastActive === "Activo ahora" ? "default" : "outline"}>
                          {session.lastActive}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {!session.current && (
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500">
                            <LogOut className="mr-2 h-4 w-4" />
                            Cerrar sesión
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="p-4">
              <Button variant="outline" className="w-full text-red-500 hover:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar todas las otras sesiones
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Configuración de Autenticación</CardTitle>
                <CardDescription>Gestione sus opciones de autenticación y seguridad</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor-auth">Autenticación de dos factores</Label>
                    <p className="text-sm text-muted-foreground">Añada una capa adicional de seguridad a su cuenta</p>
                  </div>
                  <Switch id="two-factor-auth" checked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="two-factor-method">Método de 2FA</Label>
                  <Select defaultValue="app">
                    <SelectTrigger id="two-factor-method">
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app">Aplicación de autenticación</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Correo electrónico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="remember-devices">Recordar dispositivos</Label>
                    <p className="text-sm text-muted-foreground">
                      No solicitar 2FA en dispositivos de confianza durante 30 días
                    </p>
                  </div>
                  <Switch id="remember-devices" checked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-logins">Notificar nuevos inicios de sesión</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibir notificaciones cuando se inicie sesión desde un nuevo dispositivo
                    </p>
                  </div>
                  <Switch id="notify-logins" checked />
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">Guardar configuración</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>Actualice su contraseña para mantener su cuenta segura</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña actual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password">Confirmar nueva contraseña</Label>
                  <Input id="confirm-new-password" type="password" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>La contraseña debe cumplir con los siguientes requisitos:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Al menos 10 caracteres</li>
                    <li>Al menos una letra mayúscula</li>
                    <li>Al menos una letra minúscula</li>
                    <li>Al menos un número</li>
                    <li>Al menos un símbolo</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">Cambiar contraseña</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
