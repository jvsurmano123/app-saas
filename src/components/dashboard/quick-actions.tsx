'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Calendar,
  FilePlus,
  Package,
  PawPrint,
  Stethoscope,
} from 'lucide-react'

const actions = [
  {
    name: 'Novo Agendamento',
    href: '/dashboard/appointments/new',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'group-hover:border-blue-200',
  },
  {
    name: 'Cadastrar Paciente',
    href: '/dashboard/patients/new',
    icon: PawPrint,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    borderColor: 'group-hover:border-emerald-200',
  },
  {
    name: 'Abrir Prontuário',
    href: '/dashboard/medical-records/new',
    icon: FilePlus,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'group-hover:border-purple-200',
  },
  {
    name: 'Nova Consulta',
    href: '/dashboard/appointments/new',
    icon: Stethoscope,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'group-hover:border-red-200',
  },
  {
    name: 'Adicionar Item',
    href: '/dashboard/inventory/new',
    icon: Package,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'group-hover:border-orange-200',
  },
]

export function QuickActions() {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Acesso Rápido
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {actions.map((action) => {
            const Icon = action.icon

            return (
              <Link
                key={action.name}
                href={action.href}
                className={`group flex flex-col items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-sm ${action.borderColor}`}
              >
                <div className={`p-3.5 rounded-lg ${action.bgColor}`}>
                  <Icon className={`h-7 w-7 ${action.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-gray-900">
                  {action.name}
                </span>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 