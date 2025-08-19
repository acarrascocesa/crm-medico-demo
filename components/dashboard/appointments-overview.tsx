"use client"

import { useAppContext } from "@/context/app-context"

export function AppointmentsOverview() {
  const { medicalRecords } = useAppContext()

  // Función para obtener el color según el tipo de consulta médica real
  const getColorForType = (type: string) => {
    const typeLower = type.toLowerCase()
    
    // Colores médicos profesionales basados en los tipos reales de historias clínicas
    if (typeLower.includes('consulta general') || typeLower.includes('general')) {
      return "#3B82F6" // Azul médico
    }
    if (typeLower.includes('seguimiento') || typeLower.includes('control')) {
      return "#10B981" // Verde médico
    }
    if (typeLower.includes('procedimiento')) {
      return "#F59E0B" // Naranja médico
    }
    if (typeLower.includes('emergencia') || typeLower.includes('urgente')) {
      return "#EF4444" // Rojo médico
    }
    
    // Colores por defecto para otros tipos
    return "#6B7280" // Gris médico
  }

  // Función para obtener datos reales de las historias clínicas agrupadas por tipo
  const getMedicalRecordsByType = () => {
    const typeCounts: { [key: string]: number } = {}
    
    // Contar historias clínicas por tipo de consulta
    medicalRecords.forEach((record: any) => {
      const type = record.record_type || record.type || "Sin especificar"
      typeCounts[type] = (typeCounts[type] || 0) + 1
    })

    // Convertir a array y ordenar por cantidad
    const sortedTypes = Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6) // Tomar solo los 6 tipos más comunes

    return sortedTypes.map(([name, value]) => ({
      name,
      value,
      color: getColorForType(name)
    }))
  }

  const data = getMedicalRecordsByType()
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Si no hay datos, mostrar mensaje
  if (total === 0) {
    return (
      <div className="w-full h-[300px] flex flex-col items-center justify-center">
        <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-gray-800 text-center">No hay consultas registradas</p>
        <p className="text-xs text-gray-600 text-center mt-2">Los datos aparecerán cuando se registren historias clínicas</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[300px] flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100
              const previousPercentages = data
                .slice(0, index)
                .reduce((sum, d) => sum + (d.value / total) * 100, 0)
              const startAngle = (previousPercentages / 100) * 360
              const endAngle = ((previousPercentages + percentage) / 100) * 360
              
              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
              
              const largeArcFlag = percentage > 50 ? 1 : 0
              
              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  data-title={`${item.name}: ${item.value} consultas (${percentage.toFixed(1)}%)`}
                />
              )
            })}
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
        {data.map((item, index) => {
          const percentage = total > 0 ? ((item.value / total) * 100) : 0
          return (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-800 truncate">{item.name}</span>
              <span className="font-medium text-gray-900">{percentage.toFixed(1)}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
