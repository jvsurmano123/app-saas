'use client'

import { Appointment, AppointmentType, CreateAppointmentData } from '@/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { mockVets } from '@/mocks/appointments-data'
import { format, parse } from 'date-fns'

interface AppointmentFormProps {
  appointment?: Appointment
  isOpen: boolean
  onClose: () => void
  onSave: (data: CreateAppointmentData) => void
  availableTimeSlots: string[]
  patients: Array<{ id: string; name: string; ownerName: string }>
}

export function AppointmentForm({
  appointment,
  isOpen,
  onClose,
  onSave,
  availableTimeSlots,
  patients,
}: AppointmentFormProps) {
  // Estado inicial do formulário
  const [formData, setFormData] = useState<CreateAppointmentData>({
    patientId: '',
    vetId: '',
    date: new Date(),
    startTime: '',
    duration: 30,
    type: 'consultation',
    notes: '',
  })

  // Atualizar o formulário quando um agendamento for fornecido para edição
  useEffect(() => {
    if (appointment) {
      setFormData({
        patientId: appointment.patientId,
        vetId: appointment.vetId,
        date: new Date(appointment.date),
        startTime: appointment.startTime,
        duration: appointment.duration,
        type: appointment.type,
        notes: appointment.notes || '',
      })
    } else {
      // Resetar o formulário quando for um novo agendamento
      setFormData({
        patientId: '',
        vetId: '',
        date: new Date(),
        startTime: '',
        duration: 30,
        type: 'consultation',
        notes: '',
      })
    }
  }, [appointment, isOpen])

  // Manipuladores de alteração de campo
  const handleChange = (field: keyof CreateAppointmentData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Manipulador de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  // Opções de tipo de agendamento
  const appointmentTypes: { value: AppointmentType; label: string }[] = [
    { value: 'consultation', label: 'Consulta' },
    { value: 'vaccination', label: 'Vacinação' },
    { value: 'surgery', label: 'Cirurgia' },
    { value: 'exam', label: 'Exame' },
    { value: 'follow-up', label: 'Retorno' },
    { value: 'emergency', label: 'Emergência' },
    { value: 'grooming', label: 'Banho e Tosa' },
    { value: 'other', label: 'Outro' },
  ]

  // Opções de duração
  const durationOptions = [
    { value: 15, label: '15 minutos' },
    { value: 30, label: '30 minutos' },
    { value: 45, label: '45 minutos' },
    { value: 60, label: '1 hora' },
    { value: 90, label: '1 hora e 30 minutos' },
    { value: 120, label: '2 horas' },
  ]

  // Verificar se há horários disponíveis
  const hasAvailableSlots = availableTimeSlots.length > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {appointment ? 'Editar Agendamento' : 'Novo Agendamento'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Seleção de paciente */}
          <div className="space-y-2">
            <Label htmlFor="patientId">Paciente</Label>
            <Select
              value={formData.patientId}
              onValueChange={(value) => handleChange('patientId', value)}
              required
            >
              <SelectTrigger id="patientId">
                <SelectValue placeholder="Selecione um paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} ({patient.ownerName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seleção de veterinário */}
          <div className="space-y-2">
            <Label htmlFor="vetId">Veterinário</Label>
            <Select
              value={formData.vetId}
              onValueChange={(value) => handleChange('vetId', value)}
              required
            >
              <SelectTrigger id="vetId">
                <SelectValue placeholder="Selecione um veterinário" />
              </SelectTrigger>
              <SelectContent>
                {mockVets.map((vet) => (
                  <SelectItem key={vet.id} value={vet.id}>
                    {vet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Data do agendamento */}
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={format(formData.date, 'yyyy-MM-dd')}
              onChange={(e) => {
                const date = parse(e.target.value, 'yyyy-MM-dd', new Date())
                handleChange('date', date)
              }}
              required
            />
          </div>

          {/* Horário do agendamento */}
          <div className="space-y-2">
            <Label htmlFor="startTime">Horário</Label>
            <Select
              value={formData.startTime}
              onValueChange={(value) => handleChange('startTime', value)}
              required
              disabled={!hasAvailableSlots}
            >
              <SelectTrigger id="startTime">
                <SelectValue placeholder={hasAvailableSlots ? "Selecione um horário" : "Nenhum horário disponível"} />
              </SelectTrigger>
              <SelectContent>
                {hasAvailableSlots ? (
                  availableTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-slots" disabled>
                    Nenhum horário disponível
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {!hasAvailableSlots && formData.vetId && (
              <p className="text-sm text-red-500 mt-1">
                Não há horários disponíveis para este veterinário na data selecionada.
              </p>
            )}
          </div>

          {/* Duração do agendamento */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duração</Label>
            <Select
              value={formData.duration.toString()}
              onValueChange={(value) => handleChange('duration', parseInt(value))}
              required
            >
              <SelectTrigger id="duration">
                <SelectValue placeholder="Selecione a duração" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de agendamento */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange('type', value as AppointmentType)}
              required
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Adicione observações sobre o agendamento"
              rows={3}
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="submit" variant="default" disabled={!hasAvailableSlots && !appointment}>
              {appointment ? 'Atualizar' : 'Agendar'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 