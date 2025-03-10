'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

interface PatientRecordsProps {
  patientId: string;
}

// TODO: Implementar busca dos prontuários do paciente
const mockRecords = [
  {
    id: "1",
    date: new Date(),
    type: "Consulta",
    doctor: "Dr. João Silva",
    diagnosis: "Gripe canina",
    status: "Concluído",
  },
  {
    id: "2",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    type: "Retorno",
    doctor: "Dra. Maria Santos",
    diagnosis: "Acompanhamento pós-cirúrgico",
    status: "Em andamento",
  },
];

export function PatientRecords({ patientId }: PatientRecordsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Prontuários</CardTitle>
        <Button asChild>
          <Link href={`/dashboard/medical-records/${patientId}/new-consultation`}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Consulta
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Diagnóstico</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  {format(record.date, "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/medical-records/${patientId}/records/${record.id}`}>
                      <FileText className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 