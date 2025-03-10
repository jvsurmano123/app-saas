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

interface PatientMedicationsProps {
  patientId: string;
}

// TODO: Implementar busca das medicações do paciente
const mockMedications = [
  {
    id: '1',
    name: 'Prednisolona',
    dosage: '20mg',
    frequency: '1x ao dia',
    duration: '7 dias',
    instructions: 'Administrar com comida',
    prescribedAt: new Date(),
    prescribedBy: 'Dr. João Silva',
    status: 'active',
  },
  {
    id: '2',
    name: 'Amoxicilina',
    dosage: '250mg',
    frequency: '2x ao dia',
    duration: '10 dias',
    instructions: 'Administrar a cada 12 horas',
    prescribedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    prescribedBy: 'Dra. Maria Santos',
    status: 'completed',
  },
];

export function PatientMedications({ patientId }: PatientMedicationsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Medicações</CardTitle>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Prescrição
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicamento</TableHead>
              <TableHead>Dosagem</TableHead>
              <TableHead>Frequência</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Prescrito em</TableHead>
              <TableHead>Prescrito por</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMedications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell className="font-medium">
                  {medication.name}
                </TableCell>
                <TableCell>{medication.dosage}</TableCell>
                <TableCell>{medication.frequency}</TableCell>
                <TableCell>{medication.duration}</TableCell>
                <TableCell>
                  {format(medication.prescribedAt, 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>{medication.prescribedBy}</TableCell>
                <TableCell>
                  <span className={medication.status === 'active' ? 'text-green-600' : 'text-muted-foreground'}>
                    {medication.status === 'active' ? 'Em uso' : 'Concluído'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 