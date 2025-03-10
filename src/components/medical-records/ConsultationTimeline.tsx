'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Consultation } from "@/types/medical-record";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, FileText, Pill, TestTube } from "lucide-react";

interface ConsultationTimelineProps {
  consultations: Consultation[];
}

export function ConsultationTimeline({ consultations }: ConsultationTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Consultas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    Consulta com Dr(a). {consultation.veterinarian}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {format(consultation.date, "PPp", { locale: ptBR })}
                  </time>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Motivo:</strong> {consultation.reason}</p>
                  <p><strong>Diagnóstico:</strong> {consultation.diagnosis}</p>
                </div>
                <div className="flex gap-4 mt-4">
                  {consultation.prescriptions.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4" />
                      <span className="text-sm">
                        {consultation.prescriptions.length} Medicamentos
                      </span>
                    </div>
                  )}
                  {consultation.exams.length > 0 && (
                    <div className="flex items-center gap-2">
                      <TestTube className="h-4 w-4" />
                      <span className="text-sm">
                        {consultation.exams.length} Exames
                      </span>
                    </div>
                  )}
                  {consultation.notes && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Observações</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 