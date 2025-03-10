'use client'

import { Appointment } from '@/types'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addDays, isToday, isWeekend } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/calendar.css'
import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import { CalendarIcon, Clock, Users, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

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

// Mapeamento de ícones por tipo de agendamento (emoji como placeholder)
const eventTypeIcons = {
  consultation: '👨‍⚕️',
  vaccination: '💉',
  surgery: '🔪',
  exam: '🔬',
  'follow-up': '🔄',
  emergency: '🚑',
  grooming: '🛁',
  other: '📋',
}

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

// Função para obter o rótulo do status do agendamento
function getAppointmentStatusLabel(status: Appointment['status']) {
  const statusLabels = {
    scheduled: 'Agendado',
    confirmed: 'Confirmado',
    'in-progress': 'Em andamento',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    'no-show': 'Não compareceu',
  }
  return statusLabels[status]
}

// Componente personalizado para o cabeçalho do calendário
const CustomToolbar = (toolbar: any) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV')
  }

  const goToNext = () => {
    toolbar.onNavigate('NEXT')
  }

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY')
  }

  const viewNames = {
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda'
  }

  const currentDate = useMemo(() => {
    const start = toolbar.date
    const end = addDays(start, 6)
    
    if (toolbar.view === 'month') {
      return format(start, 'MMMM yyyy', { locale: ptBR })
    } else if (toolbar.view === 'week') {
      return `${format(start, 'dd', { locale: ptBR })} - ${format(end, 'dd', { locale: ptBR })} de ${format(start, 'MMMM yyyy', { locale: ptBR })}`
    } else if (toolbar.view === 'day') {
      return format(start, "dd 'de' MMMM yyyy", { locale: ptBR })
    }
    
    return toolbar.label
  }, [toolbar.date, toolbar.view, toolbar.label])

  return (
    <div className="rbc-toolbar flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-gray-800">Agenda</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="rbc-btn-group flex">
          <button type="button" onClick={goToCurrent} className="hover:bg-primary hover:text-white">
            Hoje
          </button>
          <button type="button" onClick={goToBack}>
            Anterior
          </button>
          <button type="button" onClick={goToNext}>
            Próximo
          </button>
        </div>
        
        <span className="rbc-toolbar-label text-lg font-medium">{currentDate}</span>
      </div>
      
      <div className="rbc-btn-group">
        {Object.keys(viewNames).map(key => (
          <button
            key={key}
            type="button"
            className={toolbar.view === key ? 'rbc-active' : ''}
            onClick={() => toolbar.onView(key)}
          >
            {viewNames[key as keyof typeof viewNames]}
          </button>
        ))}
      </div>
    </div>
  )
}

// Componente personalizado para o cabeçalho do dia da semana
const CustomHeaderCell = ({ date, label }: { date: Date; label: string }) => {
  const dayNumber = format(date, 'd', { locale: ptBR })
  const dayName = format(date, 'EEEE', { locale: ptBR })
  
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-2',
        isToday(date) && 'text-primary font-bold',
        isWeekend(date) && 'text-gray-500'
      )}
    >
      <span className="text-lg">{dayNumber}</span>
      <span className="text-xs capitalize">{dayName}</span>
    </div>
  )
}

// Componente de legenda para os tipos de agendamento
const CalendarLegend = () => {
  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">Legenda</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(eventTypeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-600">
              {getAppointmentTypeLabel(type as Appointment['type'])}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
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
        borderRadius: '6px',
        opacity: appointment.status === 'cancelled' ? 0.6 : 1,
        fontWeight: 'bold',
        fontSize: '0.85em',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
      },
    }
  }

  // Componente personalizado para renderizar eventos
  const EventComponent = ({ event }: any) => {
    const appointment = event.resource as Appointment
    const icon = eventTypeIcons[appointment.type] || '📋'
    
    return (
      <Tooltip content={
        <div className="p-2">
          <div className="font-bold mb-1">{appointment.patientName}</div>
          <div className="flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            <span>{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}</span>
          </div>
          <div className="flex items-center gap-1 text-xs mt-1">
            <Users className="h-3 w-3" />
            <span>{appointment.veterinarianName}</span>
          </div>
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              {getAppointmentStatusLabel(appointment.status)}
            </Badge>
          </div>
        </div>
      }>
        <div className="flex items-center gap-1">
          <span>{icon}</span>
          <span className="truncate">{event.title}</span>
        </div>
      </Tooltip>
    )
  }

  // Componente personalizado para renderizar o cabeçalho da agenda
  const AgendaHeaderComponent = ({ label }: any) => {
    return (
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <div className="flex gap-2">
          {Object.entries(eventTypeColors).map(([type, color]) => (
            <Badge key={type} style={{ backgroundColor: color }} className="text-white">
              {getAppointmentTypeLabel(type as Appointment['type'])}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="calendar-container h-[calc(100vh-220px)]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100% - 60px)' }}
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
        components={{
          event: EventComponent,
          agenda: {
            header: AgendaHeaderComponent
          },
          toolbar: CustomToolbar,
          timeGutterHeader: () => <div className="text-center text-xs font-medium text-gray-500 py-2">Horário</div>,
          week: {
            header: CustomHeaderCell
          },
          day: {
            header: CustomHeaderCell
          }
        }}
      />
      <CalendarLegend />
    </div>
  )
} 