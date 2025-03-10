'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, FileText, Pill, TestTube } from "lucide-react";

interface PatientHistoryProps {
  patientId: string;
}

// TODO: Implementar busca do histórico do paciente
const mockHistory = [
  {
    id: "1",
    date: new Date(),
    type: "consultation",
    title: "Consulta de Rotina",
    description: "Paciente apresentou melhora após medicação",
    doctor: "Dr. João Silva",
    details: {
      prescriptions: 2,
      exams: 1,
      hasNotes: true,
    },
  },
  {
    id: "2",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    type: "vaccination",
    title: "Vacinação V10",
    description: "Aplicação da vacina V10",
    doctor: "Dra. Maria Santos",
    details: {
      prescriptions: 0,
      exams: 0,
      hasNotes: true,
    },
  },
];

export function PatientHistory({ patientId }: PatientHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Atendimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {mockHistory.map((event) => (
            <div key={event.id} className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{event.title}</p>
                  <time className="text-sm text-muted-foreground">
                    {format(event.date, "PPp", { locale: ptBR })}
                  </time>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{event.description}</p>
                  <p>Responsável: {event.doctor}</p>
                </div>
                {event.details && (
                  <div className="flex gap-4 mt-4">
                    {event.details.prescriptions > 0 && (
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4" />
                        <span className="text-sm">
                          {event.details.prescriptions} Medicamentos
                        </span>
                      </div>
                    )}
                    {event.details.exams > 0 && (
                      <div className="flex items-center gap-2">
                        <TestTube className="h-4 w-4" />
                        <span className="text-sm">
                          {event.details.exams} Exames
                        </span>
                      </div>
                    )}
                    {event.details.hasNotes && (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Observações</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 