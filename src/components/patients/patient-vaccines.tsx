'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react';

interface PatientVaccinesProps {
  patientId: string;
}

// TODO: Implementar busca das vacinas do paciente
const mockVaccines = [
  {
    id: '1',
    name: 'V10',
    date: new Date(),
    nextDueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    appliedBy: 'Dr. João Silva',
    batch: '123456',
  },
  {
    id: '2',
    name: 'Antirrábica',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextDueDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
    appliedBy: 'Dra. Maria Santos',
    batch: '789012',
  },
];

export function PatientVaccines({ patientId }: PatientVaccinesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Carteira de Vacinação</CardTitle>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Vacina
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vacina</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Próxima Dose</TableHead>
              <TableHead>Aplicada por</TableHead>
              <TableHead>Lote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVaccines.map((vaccine) => (
              <TableRow key={vaccine.id}>
                <TableCell className="font-medium">
                  {vaccine.name}
                </TableCell>
                <TableCell>
                  {format(vaccine.date, 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>
                  {format(vaccine.nextDueDate, 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>{vaccine.appliedBy}</TableCell>
                <TableCell>{vaccine.batch}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 