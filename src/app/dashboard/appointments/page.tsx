'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AppointmentCalendar } from '@/components/appointments/AppointmentCalendar'
import { AppointmentDetails } from '@/components/appointments/AppointmentDetails'
import { AppointmentForm } from '@/components/appointments/AppointmentForm'
import { AppointmentFilters } from '@/components/appointments/AppointmentFilters'
import {
  mockAppointments,
  getAvailableTimeSlots,
  mockVets,
} from '@/mocks/appointments-data'
import { Appointment, AppointmentFilters as FiltersType, CreateAppointmentData } from '@/types'
import { format, addMinutes } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export default function AppointmentsPage() {
  // Estados
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedVetId, setSelectedVetId] = useState('')
  const [editingAppointment, setEditingAppointment] = useState<Appointment | undefined>(undefined)

  // Dados mockados de pacientes
  const mockPatients = appointments
    .map((app) => ({
      id: app.patientId,
      name: app.patientName,
      ownerName: app.ownerName,
    }))
    .filter((patient, index, self) => 
      index === self.findIndex((p) => p.id === patient.id)
    )

  // Efeito para carregar horários disponíveis quando o veterinário ou data mudar
  useEffect(() => {
    if (selectedVetId) {
      const slots = getAvailableTimeSlots(selectedVetId, selectedDate)
      setAvailableTimeSlots(slots)
    } else {
      setAvailableTimeSlots([])
    }
  }, [selectedVetId, selectedDate])

  // Manipulador para selecionar um agendamento
  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsOpen(true)
  }

  // Manipulador para selecionar um slot vazio no calendário
  const handleSelectSlot = (slotInfo: any) => {
    setSelectedDate(slotInfo.start)
    setSelectedVetId('') // Resetar o veterinário selecionado
    setIsFormOpen(true)
  }

  // Manipulador para abrir o formulário de novo agendamento
  const handleNewAppointment = () => {
    setEditingAppointment(undefined)
    setSelectedVetId('') // Resetar o veterinário selecionado
    setSelectedDate(new Date()) // Resetar a data selecionada
    setIsFormOpen(true)
  }

  // Manipulador para editar um agendamento
  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setSelectedVetId(appointment.vetId)
    setSelectedDate(new Date(appointment.date))
    
    // Carregar horários disponíveis para o veterinário e data do agendamento
    const slots = getAvailableTimeSlots(appointment.vetId, new Date(appointment.date))
    // Adicionar o horário atual do agendamento à lista de horários disponíveis
    if (!slots.includes(appointment.startTime)) {
      slots.push(appointment.startTime)
      slots.sort()
    }
    setAvailableTimeSlots(slots)
    
    setIsDetailsOpen(false)
    setIsFormOpen(true)
  }

  // Manipulador para salvar um agendamento (novo ou editado)
  const handleSaveAppointment = (data: CreateAppointmentData) => {
    // Encontrar o paciente selecionado
    const patient = mockPatients.find((p) => p.id === data.patientId)
    
    // Encontrar o veterinário selecionado
    const vet = mockVets.find((v) => v.id === data.vetId) || { id: data.vetId, name: 'Veterinário' }

    // Calcular o horário de término
    const [hours, minutes] = data.startTime.split(':').map(Number)
    const startDate = new Date(data.date)
    startDate.setHours(hours, minutes, 0)
    const endDate = addMinutes(startDate, data.duration)
    const endTime = format(endDate, 'HH:mm')

    if (editingAppointment) {
      // Atualizar agendamento existente
      const updatedAppointments = appointments.map((app) =>
        app.id === editingAppointment.id
          ? {
              ...app,
              patientId: data.patientId,
              patientName: patient?.name || app.patientName,
              vetId: data.vetId,
              vetName: vet.name,
              date: data.date,
              startTime: data.startTime,
              endTime,
              duration: data.duration,
              type: data.type,
              notes: data.notes,
              updatedAt: new Date(),
            }
          : app
      )
      setAppointments(updatedAppointments)
    } else {
      // Criar novo agendamento
      const newAppointment: Appointment = {
        id: `app-${uuidv4().substring(0, 8)}`,
        patientId: data.patientId,
        patientName: patient?.name || 'Paciente',
        ownerName: patient?.ownerName || 'Tutor',
        ownerPhone: '(00) 00000-0000', // Mockado
        vetId: data.vetId,
        vetName: vet.name,
        date: data.date,
        startTime: data.startTime,
        endTime,
        duration: data.duration,
        type: data.type,
        status: 'scheduled',
        notes: data.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setAppointments([...appointments, newAppointment])
    }

    setIsFormOpen(false)
  }

  // Manipulador para cancelar um agendamento
  const handleCancelAppointment = (appointment: Appointment) => {
    const updatedAppointments = appointments.map((app) =>
      app.id === appointment.id
        ? { ...app, status: 'cancelled', updatedAt: new Date() }
        : app
    )
    setAppointments(updatedAppointments)
    setIsDetailsOpen(false)
  }

  // Manipulador para confirmar um agendamento
  const handleConfirmAppointment = (appointment: Appointment) => {
    const updatedAppointments = appointments.map((app) =>
      app.id === appointment.id
        ? { ...app, status: 'confirmed', updatedAt: new Date() }
        : app
    )
    setAppointments(updatedAppointments)
    setIsDetailsOpen(false)
  }

  // Manipulador para iniciar/concluir um atendimento
  const handleCompleteAppointment = (appointment: Appointment) => {
    const newStatus = appointment.status === 'confirmed' ? 'in-progress' : 'completed'
    const updatedAppointments = appointments.map((app) =>
      app.id === appointment.id
        ? { ...app, status: newStatus, updatedAt: new Date() }
        : app
    )
    setAppointments(updatedAppointments)
    setIsDetailsOpen(false)
  }

  // Manipulador para filtrar agendamentos
  const handleFilterAppointments = (filters: FiltersType) => {
    let filteredAppointments = [...mockAppointments]

    // Aplicar filtros
    if (filters.startDate && filters.endDate) {
      filteredAppointments = filteredAppointments.filter(
        (app) => {
          const appDate = new Date(app.date)
          return appDate >= filters.startDate! && appDate <= filters.endDate!
        }
      )
    }

    if (filters.patientId && filters.patientId !== 'all') {
      filteredAppointments = filteredAppointments.filter(
        (app) => app.patientId === filters.patientId
      )
    }

    if (filters.vetId && filters.vetId !== 'all') {
      filteredAppointments = filteredAppointments.filter(
        (app) => app.vetId === filters.vetId
      )
    }

    if (filters.status && filters.status !== 'all') {
      filteredAppointments = filteredAppointments.filter(
        (app) => app.status === filters.status
      )
    }

    if (filters.type && filters.type !== 'all') {
      filteredAppointments = filteredAppointments.filter(
        (app) => app.type === filters.type
      )
    }

    setAppointments(filteredAppointments)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <Button onClick={handleNewAppointment}>Novo Agendamento</Button>
      </div>

      {/* Filtros */}
      <AppointmentFilters onFilter={handleFilterAppointments} patients={mockPatients} />

      {/* Calendário */}
      <AppointmentCalendar
        appointments={appointments}
        onSelectAppointment={handleSelectAppointment}
        onSelectSlot={handleSelectSlot}
      />

      {/* Modal de detalhes */}
      <AppointmentDetails
        appointment={selectedAppointment}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={handleEditAppointment}
        onCancel={handleCancelAppointment}
        onConfirm={handleConfirmAppointment}
        onComplete={handleCompleteAppointment}
      />

      {/* Modal de formulário */}
      <AppointmentForm
        appointment={editingAppointment}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveAppointment}
        availableTimeSlots={availableTimeSlots}
        patients={mockPatients}
      />
    </div>
  )
} 