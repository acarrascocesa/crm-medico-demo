"use client"

import { AppointmentsOverview } from "@/components/dashboard/appointments-overview"
import { RecentPatients } from "@/components/dashboard/recent-patients"
import { RevenueByClinicChart } from "@/components/dashboard/revenue-by-clinic-chart"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "@/context/app-context"
import { useAuth } from "@/context/auth-context"
import { DollarSign, Users, Calendar, Activity, Stethoscope, CheckCircle } from "lucide-react"

// Funciones de cálculo para datos reales
const calculateTotalRevenue = (invoices: any[]) => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return invoices
    .filter((invoice: any) => {
      const invoiceDate = new Date(invoice.invoice_date || invoice.invoiceDate)
      return invoice.status === "Pagada" && 
             invoiceDate.getMonth() === currentMonth &&
             invoiceDate.getFullYear() === currentYear
    })
    .reduce((sum: number, invoice: any) => sum + Number(invoice.total_services || invoice.totalServices || 0), 0)
}

const calculatePreviousMonthRevenue = (invoices: any[]) => {
  const previousMonth = new Date().getMonth() - 1
  const currentYear = new Date().getFullYear()
  
  return invoices
    .filter((invoice: any) => {
      const invoiceDate = new Date(invoice.invoice_date || invoice.invoiceDate)
      return invoice.status === "Pagada" && 
             invoiceDate.getMonth() === previousMonth &&
             invoiceDate.getFullYear() === currentYear
    })
    .reduce((sum: number, invoice: any) => sum + Number(invoice.total_services || invoice.totalServices || 0), 0)
}

const calculateActivePatients = (patients: any[]) => {
  return patients.filter((p: any) => p.status === "Activo").length
}

const calculatePendingAppointments = (appointments: any[]) => {
  return appointments.filter((a: any) => a.status === "Pendiente").length
}

const calculateAttendanceRate = (appointments: any[]) => {
  const completed = appointments.filter((a: any) => a.status === "Completada").length
  const total = appointments.filter((a: any) => 
    a.status === "Completada" || a.status === "Cancelada"
  ).length
  
  return total > 0 ? Math.round((completed / total) * 100) : 0
}

const calculatePreviousMonthAttendanceRate = (appointments: any[]) => {
  const previousMonth = new Date().getMonth() - 1
  const currentYear = new Date().getFullYear()
  
  const previousMonthAppointments = appointments.filter((a: any) => {
    const appointmentDate = new Date(a.appointment_date || a.date)
    return appointmentDate.getMonth() === previousMonth &&
           appointmentDate.getFullYear() === currentYear
  })
  
  const completed = previousMonthAppointments.filter((a: any) => a.status === "Completada").length
  const total = previousMonthAppointments.filter((a: any) => 
    a.status === "Completada" || a.status === "Cancelada"
  ).length
  
  return total > 0 ? Math.round((completed / total) * 100) : 0
}

export default function DashboardPage() {
  const { patients, appointments, invoices } = useAppContext()
  const { user: authUser } = useAuth()

  // Calcular métricas reales
  const totalRevenue = calculateTotalRevenue(invoices)
  const previousMonthRevenue = calculatePreviousMonthRevenue(invoices)
  const revenueChange = previousMonthRevenue > 0 
    ? ((totalRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 
    : 0

  const activePatients = calculateActivePatients(patients)
  const pendingAppointments = calculatePendingAppointments(appointments)
  const attendanceRate = calculateAttendanceRate(appointments)
  const previousAttendanceRate = calculatePreviousMonthAttendanceRate(appointments)
  const attendanceChange = previousAttendanceRate > 0 
    ? attendanceRate - previousAttendanceRate 
    : 0

  return (
    <div className="flex flex-col gap-4 overflow-hidden max-w-9xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Vista general de su clínica médica</p>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs sm:text-sm font-medium text-green-800">Ingresos Totales</CardTitle>
            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-lg sm:text-2xl font-bold text-green-900">${totalRevenue.toLocaleString()}</div>
            <p className={`text-xs ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {revenueChange >= 0 ? '+' : ''}{revenueChange.toFixed(1)}% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-800">Pacientes Activos</CardTitle>
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-lg sm:text-2xl font-bold text-blue-900">{activePatients}</div>
            <p className="text-xs text-blue-600">Pacientes en tratamiento</p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs sm:text-sm font-medium text-orange-800">Citas Pendientes</CardTitle>
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-lg sm:text-2xl font-bold text-orange-900">{pendingAppointments}</div>
            <p className="text-xs text-orange-600">Por confirmar</p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gray-200 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-800">Tasa de Asistencia</CardTitle>
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{attendanceRate}%</div>
            <p className={`text-xs ${attendanceChange >= 0 ? 'text-gray-600' : 'text-red-600'}`}>
              {attendanceChange >= 0 ? '+' : ''}{attendanceChange}% vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              {authUser?.multiClinicView ? 'Ingresos por Clínicas' : 'Ingresos de la Clínica'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueByClinicChart />
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-base sm:text-lg text-blue-800">Próximas Citas</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <UpcomingAppointments />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="lg:col-span-2 xl:col-span-2 relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-base sm:text-lg text-blue-800">Pacientes Recientes</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <RecentPatients />
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Resumen de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentsOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
