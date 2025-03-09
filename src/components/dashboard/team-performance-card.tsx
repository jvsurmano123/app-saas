'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { User } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  appointments: number
  procedures: number
  revenue: number
  rating: number
}

export function TeamPerformanceCard() {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dra. Maria Santos',
      role: 'Veterinária',
      appointments: 45,
      procedures: 12,
      revenue: 8500,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Dr. Carlos Lima',
      role: 'Veterinário',
      appointments: 38,
      procedures: 15,
      revenue: 7200,
      rating: 4.7,
    },
    {
      id: '3',
      name: 'Dra. Ana Silva',
      role: 'Veterinária',
      appointments: 42,
      procedures: 10,
      revenue: 6800,
      rating: 4.9,
    },
  ]

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Desempenho da Equipe
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-700">Profissional</TableHead>
              <TableHead className="text-right text-gray-700">Consultas</TableHead>
              <TableHead className="text-right text-gray-700">Procedimentos</TableHead>
              <TableHead className="text-right text-gray-700">Faturamento</TableHead>
              <TableHead className="text-right text-gray-700">Avaliação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-gray-700">
                  {member.appointments}
                </TableCell>
                <TableCell className="text-right font-medium text-gray-700">
                  {member.procedures}
                </TableCell>
                <TableCell className="text-right font-medium text-gray-700">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(member.revenue)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="font-medium text-gray-700">{member.rating}</span>
                    <span className="text-amber-500">★</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 