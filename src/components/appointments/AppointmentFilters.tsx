'use client'

import { AppointmentFilters as FiltersType, AppointmentStatus, AppointmentType } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { mockVets } from '@/mocks/appointments-data'
import { format, parse } from 'date-fns'

interface AppointmentFiltersProps {
  onFilter: (filters: FiltersType) => void
  patients: Array<{ id: string; name: string }>
}

export function AppointmentFilters({ onFilter, patients }: AppointmentFiltersProps) {
  const [filters, setFilters] = useState<FiltersType>({})

  // Manipuladores de alteração de filtro
  const handleChange = (field: keyof FiltersType, value: any) => {
    setFilters((prev) => {
      // Se o valor for "all", remova o filtro
      if (value === 'all') {
        const newFilters = { ...prev }
        delete newFilters[field]
        return newFilters
      }
      return { ...prev, [field]: value }
    })
  }

  // Manipulador de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter(filters)
  }

  // Manipulador para limpar filtros
  const handleClear = () => {
    setFilters({})
    onFilter({})
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

  // Opções de status
  const statusOptions: { value: AppointmentStatus; label: string }[] = [
    { value: 'scheduled', label: 'Agendado' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'in-progress', label: 'Em andamento' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'no-show', label: 'Não compareceu' },
  ]

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro por data inicial */}
        <div className="space-y-2">
          <Label htmlFor="startDate">Data inicial</Label>
          <Input
            id="startDate"
            type="date"
            value={filters.startDate ? format(filters.startDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => {
              const value = e.target.value
              handleChange(
                'startDate',
                value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined
              )
            }}
          />
        </div>

        {/* Filtro por data final */}
        <div className="space-y-2">
          <Label htmlFor="endDate">Data final</Label>
          <Input
            id="endDate"
            type="date"
            value={filters.endDate ? format(filters.endDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => {
              const value = e.target.value
              handleChange(
                'endDate',
                value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined
              )
            }}
          />
        </div>

        {/* Filtro por paciente */}
        <div className="space-y-2">
          <Label htmlFor="patientId">Paciente</Label>
          <Select
            value={filters.patientId || 'all'}
            onValueChange={(value) => handleChange('patientId', value)}
          >
            <SelectTrigger id="patientId">
              <SelectValue placeholder="Todos os pacientes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os pacientes</SelectItem>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por veterinário */}
        <div className="space-y-2">
          <Label htmlFor="vetId">Veterinário</Label>
          <Select
            value={filters.vetId || 'all'}
            onValueChange={(value) => handleChange('vetId', value)}
          >
            <SelectTrigger id="vetId">
              <SelectValue placeholder="Todos os veterinários" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os veterinários</SelectItem>
              {mockVets.map((vet) => (
                <SelectItem key={vet.id} value={vet.id}>
                  {vet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por tipo */}
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select
            value={filters.type || 'all'}
            onValueChange={(value) => handleChange('type', value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {appointmentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status || 'all'}
            onValueChange={(value) => handleChange('status', value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botões de ação */}
        <div className="flex items-end space-x-2 md:col-span-2">
          <Button type="submit" variant="default">
            Filtrar
          </Button>
          <Button type="button" variant="outline" onClick={handleClear}>
            Limpar Filtros
          </Button>
        </div>
      </div>
    </form>
  )
} 