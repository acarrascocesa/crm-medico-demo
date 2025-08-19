"use client"

import { useAppContext } from "@/context/app-context"
import { useAuth } from "@/context/auth-context"

export function RevenueByClinicChart() {
  const { invoices, clinics } = useAppContext()
  const { user: authUser } = useAuth()

  // Función para obtener ingresos por clínica
  const getRevenueByClinic = () => {
    const clinicRevenue: { [key: string]: number } = {}
    const clinicNames: { [key: string]: string } = {}
    let otherClinicsRevenue = 0

    // Obtener nombres de clínicas
    clinics.forEach((clinic: any) => {
      clinicNames[clinic.clinic_id] = clinic.clinic_name || 'Clínica sin nombre'
      // Inicializar todas las clínicas con 0 ingresos
      clinicRevenue[clinic.clinic_id] = 0
    })

    // Calcular ingresos por clínica
    invoices.forEach((invoice: any) => {
      if (invoice.status === "Pagada") {
        const clinicId = invoice.clinic_id || invoice.clinicId
        const amount = Number(invoice.total_services || invoice.totalServices || 0)
        
        // Buscar la clínica por clinic_id o por id
        let foundClinic = null
        if (clinicId) {
          foundClinic = clinics.find(clinic => 
            clinic.clinic_id === clinicId || clinic.id === clinicId
          )
        }
        
        if (foundClinic) {
          // Usar clinic_id de la clínica encontrada
          const targetClinicId = foundClinic.clinic_id
          if (clinicRevenue.hasOwnProperty(targetClinicId)) {
            clinicRevenue[targetClinicId] += amount
          } else {
            // Si no está inicializada, agregarla
            clinicRevenue[targetClinicId] = amount
            clinicNames[targetClinicId] = foundClinic.clinic_name
          }
        } else if (clinicId) {
          // Clínica no encontrada pero tiene ID, agregar a "Otras Clínicas"
          otherClinicsRevenue += amount
        } else {
          // Sin clinic_id, agregar a "Otras Clínicas"
          otherClinicsRevenue += amount
        }
      }
    })

    // Convertir a array y ordenar por ingresos
    let sortedData = Object.entries(clinicRevenue)
      .map(([clinicId, total]) => ({
        clinicId,
        name: clinicNames[clinicId] || 'Clínica desconocida',
        total
      }))
      .sort((a, b) => b.total - a.total)

    // Agregar "Otras Clínicas" si hay ingresos
    if (otherClinicsRevenue > 0) {
      sortedData.push({
        clinicId: 'other',
        name: 'Otras Clínicas',
        total: otherClinicsRevenue
      })
      // Reordenar para mantener el orden por ingresos
      sortedData.sort((a, b) => b.total - a.total)
    }

    return sortedData
  }

  const data = getRevenueByClinic()
  const maxValue = Math.max(...data.map(d => d.total), 1) // Mínimo 1 para evitar división por cero
  const formatCurrency = (value: number) => `RD$ ${value.toLocaleString()}`

  // Colores para las clínicas
  const getClinicColor = (index: number) => {
    const colors = [
      'from-blue-600 to-blue-500',
      'from-green-600 to-green-500', 
      'from-orange-600 to-orange-500',
      'from-purple-600 to-purple-500',
      'from-cyan-600 to-cyan-500',
      'from-pink-600 to-pink-500',
      'from-indigo-600 to-indigo-500',
      'from-teal-600 to-teal-500'
    ]
    return colors[index % colors.length]
  }

  // Si no hay datos, mostrar estado vacío
  if (data.length === 0) {
    return (
      <div className="w-full h-[350px] flex flex-col items-center justify-center">
        <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-gray-800 text-center">No hay ingresos registrados</p>
        <p className="text-xs text-gray-600 text-center mt-2">Los datos aparecerán cuando se registren facturas pagadas</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[350px] flex flex-col">
      <div className="flex-1 flex flex-col gap-3 px-2 sm:px-4 pb-4 overflow-y-auto">
        {data.map((item, index) => {
          const percentage = maxValue > 0 ? (item.total / maxValue) * 100 : 0
          const barWidth = Math.max(percentage, 5) // Mínimo 5% para visibilidad
          
          return (
            <div key={item.clinicId} className="flex flex-col space-y-1">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-gray-800 truncate pr-2">
                  {item.name}
                </span>
                <span className="font-semibold text-gray-900 whitespace-nowrap">
                  {formatCurrency(item.total)}
                </span>
              </div>
              <div className="relative w-full h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getClinicColor(index)} rounded-full transition-all duration-500 ease-out shadow-sm hover:shadow-md`}
                  style={{ width: `${barWidth}%` }}
                  title={`${item.name}: ${formatCurrency(item.total)} (${percentage.toFixed(1)}%)`}
                />
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Información adicional */}
      <div className="border-t pt-3 px-2 sm:px-4">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <span className="font-medium">
            {authUser?.multiClinicView ? 'Total Multiclínicas' : 'Total Clínica'}
          </span>
          <span className="font-semibold text-gray-800">
            {formatCurrency(data.reduce((sum, item) => sum + item.total, 0))}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {data.length} {data.length === 1 ? 'clínica' : 'clínicas'} con ingresos
        </div>
      </div>
    </div>
  )
}
