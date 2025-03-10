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
import { Vaccination } from "@/types/medical-record";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus } from "lucide-react";

interface VaccinationHistoryProps {
  vaccinations: Vaccination[];
}

export function VaccinationHistory({ vaccinations }: VaccinationHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Histórico de Vacinação</CardTitle>
        <Button size="sm">
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
            {vaccinations.map((vaccination) => (
              <TableRow key={vaccination.id}>
                <TableCell className="font-medium">
                  {vaccination.name}
                </TableCell>
                <TableCell>
                  {format(vaccination.date, "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  {format(vaccination.nextDueDate, "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>{vaccination.appliedBy}</TableCell>
                <TableCell>{vaccination.batch}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 