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
import { FileText, Plus } from 'lucide-react';

interface PatientExamsProps {
  patientId: string;
}

// TODO: Implementar busca dos exames do paciente
const mockExams = [
  {
    id: "1",
    name: "Hemograma",
    requestedAt: new Date(),
    requestedBy: "Dr. João Silva",
    status: "completed",
    results: "Resultados normais",
  },
  {
    id: "2",
    name: "Raio-X Tórax",
    requestedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    requestedBy: "Dra. Maria Santos",
    status: "pending",
  },
];

export function PatientExams({ patientId }: PatientExamsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Exames</CardTitle>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Solicitar Exame
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exame</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Solicitado por</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockExams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">
                  {exam.name}
                </TableCell>
                <TableCell>
                  {format(exam.requestedAt, "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>{exam.requestedBy}</TableCell>
                <TableCell>
                  <span className={exam.status === "completed" ? "text-green-600" : "text-yellow-600"}>
                    {exam.status === "completed" ? "Concluído" : "Pendente"}
                  </span>
                </TableCell>
                <TableCell>
                  {exam.status === "completed" && (
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 