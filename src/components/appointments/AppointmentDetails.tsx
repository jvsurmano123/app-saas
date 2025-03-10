'use client'

import { Appointment, AppointmentStatus } from '@/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'

interface AppointmentDetailsProps {
  appointment: Appointment | null
  isOpen: boolean
  onClose: () => void
  onEdit: (appointment: Appointment) => void
  onCancel: (appointment: Appointment) => void
  onConfirm: (appointment: Appointment) => void
  onComplete: (appointment: Appointment) => void
}

export function AppointmentDetails({
  appointment,
  isOpen,
  onClose,
  onEdit,
  onCancel,
  onConfirm,
  onComplete,
}: AppointmentDetailsProps) {
  if (!appointment) return null

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
  function getAppointmentStatusLabel(status: AppointmentStatus) {
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

  // Função para obter a cor do badge de status
  function getStatusBadgeVariant(status: AppointmentStatus) {
    const statusVariants = {
      scheduled: 'secondary',
      confirmed: 'default',
      'in-progress': 'warning',
      completed: 'success',
      cancelled: 'destructive',
      'no-show': 'outline',
    } as const
    return statusVariants[status]
  }

  // Formatar a data e hora do agendamento
  const formattedDate = format(new Date(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  const formattedTime = `${appointment.startTime} - ${appointment.endTime}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Detalhes do Agendamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Status do agendamento */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <Badge variant={getStatusBadgeVariant(appointment.status)}>
              {getAppointmentStatusLabel(appointment.status)}
            </Badge>
          </div>

          {/* Tipo de agendamento */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Tipo:</span>
            <span className="text-sm font-medium">{getAppointmentTypeLabel(appointment.type)}</span>
          </div>

          {/* Data e hora */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Data e hora:</span>
            <span className="text-sm font-medium">
              {formattedDate}, {formattedTime}
            </span>
          </div>

          {/* Duração */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Duração:</span>
            <span className="text-sm font-medium">{appointment.duration} minutos</span>
          </div>

          {/* Separador */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Informações do paciente */}
          <div>
            <h3 className="text-md font-semibold mb-2">Paciente</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Nome:</span>
                <p className="text-sm">{appointment.patientName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Tutor:</span>
                <p className="text-sm">{appointment.ownerName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Telefone:</span>
                <p className="text-sm">{appointment.ownerPhone}</p>
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Informações do veterinário */}
          <div>
            <h3 className="text-md font-semibold mb-2">Veterinário</h3>
            <div>
              <span className="text-sm font-medium text-gray-500">Responsável:</span>
              <p className="text-sm">{appointment.vetName}</p>
            </div>
          </div>

          {/* Observações */}
          {appointment.notes && (
            <>
              <div className="border-t border-gray-200 my-4"></div>
              <div>
                <h3 className="text-md font-semibold mb-2">Observações</h3>
                <p className="text-sm bg-gray-50 p-3 rounded">{appointment.notes}</p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {/* Botões de ação com base no status */}
          {appointment.status === 'scheduled' && (
            <>
              <Button variant="outline" onClick={() => onConfirm(appointment)}>
                Confirmar
              </Button>
              <Button variant="destructive" onClick={() => onCancel(appointment)}>
                Cancelar
              </Button>
            </>
          )}

          {appointment.status === 'confirmed' && (
            <>
              <Button variant="default" onClick={() => onComplete(appointment)}>
                Iniciar Atendimento
              </Button>
              <Button variant="destructive" onClick={() => onCancel(appointment)}>
                Cancelar
              </Button>
            </>
          )}

          {appointment.status === 'in-progress' && (
            <Button variant="default" onClick={() => onComplete(appointment)}>
              Concluir Atendimento
            </Button>
          )}

          {/* Botão de edição disponível para todos os status, exceto concluído e cancelado */}
          {!['completed', 'cancelled'].includes(appointment.status) && (
            <Button variant="secondary" onClick={() => onEdit(appointment)}>
              Editar
            </Button>
          )}

          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 