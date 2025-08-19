# MediCRM Demo - Sistema de Gestión Médica

## 🏥 Descripción

MediCRM Demo es una aplicación web completa para la gestión de clínicas médicas, desarrollada con Next.js 15, TypeScript y Tailwind CSS. Esta versión demo incluye datos simulados para demostrar todas las funcionalidades del sistema.

## ✨ Características Principales

### 📋 Gestión de Pacientes
- Registro completo de pacientes con datos médicos
- Historial clínico detallado
- Gestión de archivos adjuntos
- Seguimiento de estado (Activo/Pendiente/Inactivo)

### 📅 Sistema de Citas
- Programación de citas médicas
- Estados: Pendiente, Confirmada, Completada, Cancelada
- Vista de calendario integrada
- Gestión de horarios y duración

### 💊 Recetario Médico
- Interfaz profesional con diseño médico
- Editor de texto rico (TipTap)
- Selección de medicamentos y servicios
- Impresión de recetas
- Logos personalizados por doctor

### 💰 Facturación
- Generación de facturas
- Gestión de servicios médicos
- Seguimiento de pagos
- Reportes financieros

### 📊 Dashboard Analítico
- Métricas en tiempo real
- Gráficos de ingresos por clínica
- Tasa de asistencia
- Pacientes activos
- Citas pendientes

### 🏢 Gestión Multiclínica
- Soporte para múltiples clínicas
- Roles de usuario (doctor, secretaria, admin)
- Vista unificada o separada por clínica

## 🚀 Tecnologías Utilizadas

- **Frontend:** Next.js 15 + React 19 + TypeScript
- **Styling:** Tailwind CSS + Radix UI Components
- **Estado:** Context API + Custom Hooks
- **Formularios:** React Hook Form + Zod
- **UI Components:** Shadcn/ui + Lucide React Icons
- **Editor de Texto:** TipTap (para recetas médicas)

## 📦 Instalación

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd medicrm-demo
```

2. **Instalar dependencias:**
```bash
npm install --legacy-peer-deps
```

3. **Ejecutar en desarrollo:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
```
http://localhost:3000
```

## 🔐 Credenciales Demo

### Usuarios Disponibles:

| Rol | Email | Contraseña | Descripción |
|-----|-------|------------|-------------|
| **Médico** | carlos.rodriguez@demo.com | demo123 | Clínica Central |
| **Cardióloga** | ana.martinez@demo.com | demo123 | Clínica Norte |
| **Administrador** | admin@demo.com | demo123 | Vista Multiclínica |

## 🏗️ Estructura del Proyecto

```
frontend/
├── app/                    # App Router de Next.js
├── components/             # Componentes reutilizables
├── context/               # Contextos de estado
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades y API client
├── types/                 # Definiciones TypeScript
└── data/                  # Datos mock (demo)
```

## 📱 Módulos Implementados

1. **✅ Dashboard** - Vista general con métricas
2. **✅ Pacientes** - Gestión completa de pacientes
3. **✅ Citas** - Sistema de citas médicas
4. **✅ Historia Clínica** - Registros médicos
5. **✅ Recetario** - Prescripciones médicas
6. **✅ Medicamentos** - Catálogo de medicamentos
7. **✅ Facturación** - Gestión financiera
8. **✅ Servicios** - Catálogo de servicios médicos
9. **✅ Comunicación** - Sistema de mensajería
10. **✅ Reportes** - Análisis y estadísticas
11. **✅ Configuración** - Ajustes del sistema

## 🎨 Características de Diseño

- **Diseño moderno y profesional** con gradientes y sombras
- **Responsive design** optimizado para móviles
- **Tema claro/oscuro** implementado
- **Navegación intuitiva** con sidebar colapsible
- **Componentes consistentes** usando Shadcn/ui

## 🚀 Despliegue en Vercel

1. **Conectar repositorio a Vercel:**
   - Ir a [vercel.com](https://vercel.com)
   - Importar proyecto desde GitHub
   - Configurar variables de entorno si es necesario

2. **Configuración automática:**
   - El archivo `vercel.json` ya está configurado
   - Build command: `npm run build`
   - Output directory: `.next`

3. **Despliegue:**
   - Vercel detectará automáticamente que es un proyecto Next.js
   - El despliegue se realizará automáticamente

## 📊 Datos Demo

El sistema incluye datos simulados para demostración:

- **3 Clínicas:** Central, Norte, Sur
- **9 Pacientes** con historiales médicos completos
- **Citas programadas** con diferentes estados
- **Servicios médicos** categorizados
- **Medicamentos** con dosificaciones
- **Facturas** con estados de pago
- **Recetas médicas** con formatos profesionales

## 🔧 Personalización

Para personalizar el demo para diferentes médicos:

1. **Cambiar datos en `data/` folder:**
   - `patients.ts` - Datos de pacientes
   - `users.ts` - Usuarios y credenciales
   - `clinics.ts` - Información de clínicas

2. **Actualizar branding:**
   - Cambiar logos en `public/` folder
   - Actualizar colores en `tailwind.config.ts`
   - Modificar textos en componentes

3. **Configurar autenticación:**
   - Editar `context/auth-context.tsx` para usar API real
   - Configurar endpoints reales según sea necesario

## 📝 Notas Importantes

- **Este es un sistema de demostración** con datos simulados
- **No contiene datos reales** de pacientes
- **Funciona completamente offline** para demo
- **Listo para personalización** para diferentes especialidades médicas

## 🤝 Soporte

Para soporte técnico o personalización:
- Revisar la documentación de Next.js
- Consultar la documentación de Shadcn/ui
- Verificar la configuración de Tailwind CSS

---

**MediCRM Demo** - Sistema de Gestión Médica Integral
