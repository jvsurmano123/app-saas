'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Clock, PawPrint } from 'lucide-react'

interface Appointment {
  id: string
  time: string
  patient: {
    id: string
    name: string
    species: string
    breed: string
    owner: string
  }
  type: string
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled'
}

export function AppointmentsCard() {
  const appointments: Appointment[] = [
    {
      id: '1',
      time: '14:30',
      patient: {
        id: '123',
        name: 'Max',
        species: 'Cachorro',
        breed: 'Labrador',
        owner: 'João Silva',
      },
      type: 'Consulta de Rotina',
      status: 'waiting',
    },
    {
      id: '2',
      time: '15:00',
      patient: {
        id: '124',
        name: 'Luna',
        species: 'Gato',
        breed: 'Siamês',
        owner: 'Ana Oliveira',
      },
      type: 'Vacinação',
      status: 'waiting',
    },
    {
      id: '3',
      time: '15:30',
      patient: {
        id: '125',
        name: 'Thor',
        species: 'Cachorro',
        breed: 'Golden Retriever',
        owner: 'Pedro Santos',
      },
      type: 'Retorno',
      status: 'waiting',
    },
  ]

  function getStatusColor(status: Appointment['status']) {
    switch (status) {
      case 'waiting':
        return 'bg-blue-100 text-blue-700'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
    }
  }

  function getStatusText(status: Appointment['status']) {
    switch (status) {
      case 'waiting':
        return 'Aguardando'
      case 'in_progress':
        return 'Em Atendimento'
      case 'completed':
        return 'Concluído'
      case 'cancelled':
        return 'Cancelado'
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Próximas Consultas
        </CardTitle>
        <Link href="/dashboard/appointments">
          <Button variant="outline" size="sm">
            Ver Agenda Completa
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="divide-y">
        {appointments.map((appointment) => (
          <Link
            key={appointment.id}
            href={`/dashboard/medical-records/${appointment.patient.id}/appointments/${appointment.id}`}
            className="block py-4 first:pt-0 last:pb-0 hover:bg-gray-50 -mx-6 px-6 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <PawPrint className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {appointment.patient.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({appointment.patient.species} - {appointment.patient.breed})
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Tutor: {appointment.patient.owner}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{appointment.type}</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {getStatusText(appointment.status)}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
} 