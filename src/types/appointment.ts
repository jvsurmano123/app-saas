export type AppointmentStatus = 
  | 'scheduled' // agendado
  | 'confirmed' // confirmado
  | 'in-progress' // em andamento
  | 'completed' // concluído
  | 'cancelled' // cancelado
  | 'no-show'; // não compareceu

export type AppointmentType = 
  | 'consultation' // consulta
  | 'vaccination' // vacinação
  | 'surgery' // cirurgia
  | 'exam' // exame
  | 'follow-up' // retorno
  | 'emergency' // emergência
  | 'grooming' // banho e tosa
  | 'other'; // outro

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  ownerName: string;
  ownerPhone: string;
  vetId: string;
  vetName: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // em minutos
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface para criação de um novo agendamento
export interface CreateAppointmentData {
  patientId: string;
  vetId: string;
  date: Date;
  startTime: string;
  duration: number;
  type: AppointmentType;
  notes?: string;
}

// Interface para atualização de um agendamento existente
export interface UpdateAppointmentData {
  id: string;
  vetId?: string;
  date?: Date;
  startTime?: string;
  duration?: number;
  type?: AppointmentType;
  status?: AppointmentStatus;
  notes?: string;
}

// Interface para filtros de busca de agendamentos
export interface AppointmentFilters {
  startDate?: Date;
  endDate?: Date;
  patientId?: string | 'all';
  vetId?: string | 'all';
  status?: AppointmentStatus | 'all';
  type?: AppointmentType | 'all';
}

// Interface para representar um slot de horário disponível
export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

// Interface para representar um dia no calendário
export interface CalendarDay {
  date: Date;
  appointments: Appointment[];
  availableSlots: TimeSlot[];
} 