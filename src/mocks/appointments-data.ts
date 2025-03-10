import { Appointment, AppointmentStatus, AppointmentType } from '@/types';
import { addDays, addHours, addMinutes, format, setHours, setMinutes, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Função auxiliar para criar datas
const createDate = (daysFromNow: number, hours: number, minutes: number): Date => {
  const date = addDays(new Date(), daysFromNow);
  return setMinutes(setHours(date, hours), minutes);
};

// Função para gerar horário de término com base no início e duração
const calculateEndTime = (startTime: string, durationMinutes: number): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0);
  const endDate = addMinutes(startDate, durationMinutes);
  return format(endDate, 'HH:mm');
};

// Lista de veterinários mockados
export const mockVets = [
  { id: 'vet-1', name: 'Dra. Ana Silva' },
  { id: 'vet-2', name: 'Dr. Carlos Mendes' },
  { id: 'vet-3', name: 'Dra. Juliana Costa' },
];

// Lista de agendamentos mockados
export const mockAppointments: Appointment[] = [
  {
    id: 'app-1',
    patientId: 'pet-1',
    patientName: 'Rex',
    ownerName: 'João Silva',
    ownerPhone: '(11) 98765-4321',
    vetId: 'vet-1',
    vetName: 'Dra. Ana Silva',
    date: createDate(0, 9, 0), // Hoje às 9:00
    startTime: '09:00',
    endTime: '09:30',
    duration: 30,
    type: 'consultation',
    status: 'completed',
    notes: 'Consulta de rotina',
    createdAt: addDays(new Date(), -5),
    updatedAt: addDays(new Date(), -5),
  },
  {
    id: 'app-2',
    patientId: 'pet-2',
    patientName: 'Luna',
    ownerName: 'Maria Oliveira',
    ownerPhone: '(11) 91234-5678',
    vetId: 'vet-2',
    vetName: 'Dr. Carlos Mendes',
    date: createDate(0, 11, 0), // Hoje às 11:00
    startTime: '11:00',
    endTime: '12:00',
    duration: 60,
    type: 'surgery',
    status: 'in-progress',
    notes: 'Cirurgia de castração',
    createdAt: addDays(new Date(), -3),
    updatedAt: addDays(new Date(), -1),
  },
  {
    id: 'app-3',
    patientId: 'pet-3',
    patientName: 'Mia',
    ownerName: 'Pedro Santos',
    ownerPhone: '(11) 97777-8888',
    vetId: 'vet-1',
    vetName: 'Dra. Ana Silva',
    date: createDate(0, 14, 30), // Hoje às 14:30
    startTime: '14:30',
    endTime: '15:00',
    duration: 30,
    type: 'vaccination',
    status: 'scheduled',
    notes: 'Vacina antirrábica',
    createdAt: addDays(new Date(), -2),
    updatedAt: addDays(new Date(), -2),
  },
  {
    id: 'app-4',
    patientId: 'pet-4',
    patientName: 'Thor',
    ownerName: 'Carla Mendes',
    ownerPhone: '(11) 96666-5555',
    vetId: 'vet-3',
    vetName: 'Dra. Juliana Costa',
    date: createDate(0, 16, 0), // Hoje às 16:00
    startTime: '16:00',
    endTime: '16:30',
    duration: 30,
    type: 'exam',
    status: 'confirmed',
    notes: 'Exame de sangue',
    createdAt: addDays(new Date(), -1),
    updatedAt: addDays(new Date(), -1),
  },
  {
    id: 'app-5',
    patientId: 'pet-5',
    patientName: 'Nina',
    ownerName: 'Roberto Alves',
    ownerPhone: '(11) 95555-4444',
    vetId: 'vet-2',
    vetName: 'Dr. Carlos Mendes',
    date: createDate(1, 10, 0), // Amanhã às 10:00
    startTime: '10:00',
    endTime: '10:30',
    duration: 30,
    type: 'consultation',
    status: 'scheduled',
    notes: 'Consulta de rotina',
    createdAt: addDays(new Date(), -4),
    updatedAt: addDays(new Date(), -4),
  },
  {
    id: 'app-6',
    patientId: 'pet-6',
    patientName: 'Simba',
    ownerName: 'Fernanda Lima',
    ownerPhone: '(11) 94444-3333',
    vetId: 'vet-1',
    vetName: 'Dra. Ana Silva',
    date: createDate(1, 13, 0), // Amanhã às 13:00
    startTime: '13:00',
    endTime: '13:30',
    duration: 30,
    type: 'follow-up',
    status: 'scheduled',
    notes: 'Retorno pós-cirurgia',
    createdAt: addDays(new Date(), -7),
    updatedAt: addDays(new Date(), -2),
  },
  {
    id: 'app-7',
    patientId: 'pet-7',
    patientName: 'Bella',
    ownerName: 'Marcelo Costa',
    ownerPhone: '(11) 93333-2222',
    vetId: 'vet-3',
    vetName: 'Dra. Juliana Costa',
    date: createDate(1, 15, 30), // Amanhã às 15:30
    startTime: '15:30',
    endTime: '16:00',
    duration: 30,
    type: 'vaccination',
    status: 'scheduled',
    notes: 'Vacina V10',
    createdAt: addDays(new Date(), -3),
    updatedAt: addDays(new Date(), -3),
  },
  {
    id: 'app-8',
    patientId: 'pet-8',
    patientName: 'Max',
    ownerName: 'Luciana Ferreira',
    ownerPhone: '(11) 92222-1111',
    vetId: 'vet-2',
    vetName: 'Dr. Carlos Mendes',
    date: createDate(2, 9, 30), // Depois de amanhã às 9:30
    startTime: '09:30',
    endTime: '10:00',
    duration: 30,
    type: 'consultation',
    status: 'scheduled',
    notes: 'Consulta de rotina',
    createdAt: addDays(new Date(), -5),
    updatedAt: addDays(new Date(), -5),
  },
  {
    id: 'app-9',
    patientId: 'pet-9',
    patientName: 'Lola',
    ownerName: 'Ricardo Sousa',
    ownerPhone: '(11) 91111-0000',
    vetId: 'vet-1',
    vetName: 'Dra. Ana Silva',
    date: createDate(2, 11, 30), // Depois de amanhã às 11:30
    startTime: '11:30',
    endTime: '12:00',
    duration: 30,
    type: 'exam',
    status: 'scheduled',
    notes: 'Exame de urina',
    createdAt: addDays(new Date(), -2),
    updatedAt: addDays(new Date(), -2),
  },
  {
    id: 'app-10',
    patientId: 'pet-10',
    patientName: 'Toby',
    ownerName: 'Amanda Vieira',
    ownerPhone: '(11) 90000-9999',
    vetId: 'vet-3',
    vetName: 'Dra. Juliana Costa',
    date: createDate(-1, 14, 0), // Ontem às 14:00
    startTime: '14:00',
    endTime: '14:30',
    duration: 30,
    type: 'consultation',
    status: 'completed',
    notes: 'Consulta de rotina',
    createdAt: addDays(new Date(), -8),
    updatedAt: addDays(new Date(), -1),
  },
];

// Função para obter agendamentos por data
export const getAppointmentsByDate = (date: Date): Appointment[] => {
  const dateString = format(date, 'yyyy-MM-dd');
  return mockAppointments.filter(
    (appointment) => format(appointment.date, 'yyyy-MM-dd') === dateString
  );
};

// Função para obter agendamentos por veterinário
export const getAppointmentsByVet = (vetId: string): Appointment[] => {
  return mockAppointments.filter((appointment) => appointment.vetId === vetId);
};

// Função para obter agendamentos por paciente
export const getAppointmentsByPatient = (patientId: string): Appointment[] => {
  return mockAppointments.filter((appointment) => appointment.patientId === patientId);
};

// Função para obter agendamentos por status
export const getAppointmentsByStatus = (status: AppointmentStatus): Appointment[] => {
  return mockAppointments.filter((appointment) => appointment.status === status);
};

// Função para obter agendamentos por tipo
export const getAppointmentsByType = (type: AppointmentType): Appointment[] => {
  return mockAppointments.filter((appointment) => appointment.type === type);
};

// Função para obter agendamentos por período
export const getAppointmentsByPeriod = (startDate: Date, endDate: Date): Appointment[] => {
  return mockAppointments.filter(
    (appointment) => appointment.date >= startDate && appointment.date <= endDate
  );
};

// Função para obter agendamentos do dia atual
export const getTodayAppointments = (): Appointment[] => {
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  return mockAppointments.filter(
    (appointment) => appointment.date >= today && appointment.date < tomorrow
  );
};

// Função para obter próximos agendamentos
export const getUpcomingAppointments = (count: number = 5): Appointment[] => {
  const now = new Date();
  return mockAppointments
    .filter((appointment) => appointment.date > now && appointment.status !== 'cancelled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count);
};

// Função para obter horários disponíveis para um veterinário em uma data específica
export const getAvailableTimeSlots = (vetId: string, date: Date): string[] => {
  // Horários de trabalho: 9h às 18h, com intervalos de 30 minutos
  const workHours = Array.from({ length: 18 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  // Obter agendamentos do veterinário na data especificada
  const dateString = format(date, 'yyyy-MM-dd');
  const vetAppointments = mockAppointments.filter(
    (appointment) =>
      appointment.vetId === vetId &&
      format(appointment.date, 'yyyy-MM-dd') === dateString
  );

  // Remover horários já agendados
  const bookedTimes = vetAppointments.map((appointment) => appointment.startTime);
  return workHours.filter((time) => !bookedTimes.includes(time));
}; 