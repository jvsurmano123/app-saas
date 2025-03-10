'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Medication } from "@/types/medical-record";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CurrentMedicationsProps {
  medications: Medication[];
}

export function CurrentMedications({ medications }: CurrentMedicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medicamentos em Uso</CardTitle>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell className="font-medium">
                  {medication.name}
                </TableCell>
                <TableCell>{medication.dosage}</TableCell>
                <TableCell>{medication.frequency}</TableCell>
                <TableCell>{medication.duration}</TableCell>
                <TableCell>
                  {format(medication.prescribedAt, "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>{medication.prescribedBy}</TableCell>
              </TableRow>
            ))}
            {medications.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Nenhum medicamento em uso atualmente
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 