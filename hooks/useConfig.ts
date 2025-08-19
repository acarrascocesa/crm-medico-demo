import { useState } from 'react';

interface BasicSettings {
  clinicName: string;
  timezone: string;
  language: string;
}

interface DoctorProfile {
  fullName: string;
  specialty: string;
  licenseNumber: string;
  phone: string;
  consultationHours: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

// Datos demo para configuraciones
const demoBasicSettings: BasicSettings = {
  clinicName: "MediCRM Demo",
  timezone: "America/Santo_Domingo",
  language: "es"
};

const demoDoctorProfile: DoctorProfile = {
  fullName: "Dr. Carlos Manuel Rodríguez",
  specialty: "Medicina General",
  licenseNumber: "EXQ. 123-456",
  phone: "(809) 555-1000",
  consultationHours: "Lunes a Viernes: 8:00 AM - 5:00 PM"
};

export const useConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Funciones para configuraciones básicas
  const getBasicSettings = async (): Promise<BasicSettings> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      return demoBasicSettings;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const saveBasicSettings = async (settings: BasicSettings): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Configuraciones guardadas (demo):', settings);
      // En demo, no guardamos realmente, solo simulamos
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para perfil del doctor
  const getDoctorProfile = async (): Promise<DoctorProfile> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      return demoDoctorProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const saveDoctorProfile = async (profile: DoctorProfile): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Perfil guardado (demo):', profile);
      // En demo, no guardamos realmente, solo simulamos
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cambio de contraseña
  const changePassword = async (passwords: PasswordChangeData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // En demo, validamos que la contraseña actual sea demo123
      if (passwords.currentPassword !== 'demo123') {
        throw new Error('Contraseña actual incorrecta');
      }
      
      console.log('Contraseña cambiada (demo):', passwords.newPassword);
      // En demo, no cambiamos realmente, solo simulamos
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getBasicSettings,
    saveBasicSettings,
    getDoctorProfile,
    saveDoctorProfile,
    changePassword
  };
};

export default useConfig;
