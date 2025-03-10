export interface Profile {
  id: string
  name: string
  email: string
  clinic: string
  created_at?: string
  updated_at?: string
}

export interface AuthError {
  message: string
}

// Exportando tipos de agendamentos
export * from './appointment';
export * from './patient';
export * from './medical-record'; 