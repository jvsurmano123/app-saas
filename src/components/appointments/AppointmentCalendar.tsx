'use client'

import { Appointment } from '@/types'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/calendar.css'
import { useState } from 'react'

// Configuração do localizador para o calendário
const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Tradução dos textos do calendário
const messages = {
  today: 'Hoje',
  previous: 'Anterior',
  next: 'Próximo',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Dia inteiro',
  noEventsInRange: 'Não há agendamentos neste período.',
}

// Mapeamento de cores por tipo de agendamento
const eventTypeColors = {
  consultation: '#4CAF50', // Verde
  vaccination: '#2196F3', // Azul
  surgery: '#F44336', // Vermelho
  exam: '#9C27B0', // Roxo
  'follow-up': '#FF9800', // Laranja
  emergency: '#E91E63', // Rosa
  grooming: '#00BCD4', // Ciano
  other: '#607D8B', // Cinza azulado
}

// Mapeamento de cores por status
const eventStatusColors = {
  scheduled: '#BBDEFB', // Azul claro
  confirmed: '#C8E6C9', // Verde claro
  'in-progress': '#FFF9C4', // Amarelo claro
  completed: '#D1C4E9', // Roxo claro
  cancelled: '#FFCCBC', // Vermelho claro
  'no-show': '#CFD8DC', // Cinza claro
}

interface AppointmentCalendarProps {
  appointments: Appointment[]
  onSelectAppointment: (appointment: Appointment) => void
  onSelectSlot: (slotInfo: any) => void
}

export function AppointmentCalendar({
  appointments,
  onSelectAppointment,
  onSelectSlot,
}: AppointmentCalendarProps) {
  const [view, setView] = useState(Views.WEEK)
  const [date, setDate] = useState(new Date())

  // Converter os agendamentos para o formato esperado pelo react-big-calendar
  const events = appointments.map((appointment) => {
    const startDate = new Date(appointment.date)
    const [startHours, startMinutes] = appointment.startTime.split(':').map(Number)
    startDate.setHours(startHours, startMinutes, 0)

    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + appointment.duration)

    return {
      id: appointment.id,
      title: `${appointment.patientName} - ${getAppointmentTypeLabel(appointment.type)}`,
      start: startDate,
      end: endDate,
      resource: appointment,
    }
  })

  // Função para obter o rótulo do tipo de agendamento
  function getAppointmentTypeLabel(type: Appointment['type']) {
    const typeLabels = {
      consultation: 'Consulta',
      vaccination: 'Vacinação',
      surgery: 'Cirurgia',
      exam: 'Exame',
      'follow-up': 'Retorno',
      emergency: 'Emergência',
      grooming: 'Banho e Tosa',
      other: 'Outro',
    }
    return typeLabels[type]
  }

  // Função para estilizar os eventos no calendário
  const eventStyleGetter = (event: any) => {
    const appointment = event.resource as Appointment
    const backgroundColor = eventTypeColors[appointment.type] || '#607D8B'
    const borderColor = eventStatusColors[appointment.status] || '#CFD8DC'
    
    return {
      style: {
        backgroundColor,
        borderLeft: `4px solid ${borderColor}`,
        color: '#fff',
        borderRadius: '4px',
        opacity: appointment.status === 'cancelled' ? 0.6 : 1,
        fontWeight: 'bold',
        fontSize: '0.85em',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      },
    }
  }

  return (
    <div className="h-[calc(100vh-220px)] bg-white rounded-lg shadow-sm p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week', 'day', 'agenda']}
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        messages={messages}
        culture="pt-BR"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => onSelectAppointment(event.resource)}
        onSelectSlot={onSelectSlot}
        selectable
        popup
        step={30}
        timeslots={1}
        defaultView={Views.WEEK}
        min={new Date(0, 0, 0, 8, 0)} // Horário de início: 8h
        max={new Date(0, 0, 0, 19, 0)} // Horário de término: 19h
      />
    </div>
  )
} 