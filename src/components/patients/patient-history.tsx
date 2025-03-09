'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Syringe, TestTube, Pill, Hospital } from 'lucide-react';

interface PatientHistoryProps {
  patientId: string;
}

const historyData = [
  {
    date: '10/03/2024',
    type: 'consultation',
    title: 'Consulta de Rotina',
    description: 'Checkup geral. Paciente apresentou bom estado de saúde.',
    doctor: 'Dr. Carlos Santos',
    icon: FileText,
  },
  {
    date: '15/02/2024',
    type: 'vaccine',
    title: 'Vacinação',
    description: 'Aplicação da vacina V10.',
    doctor: 'Dra. Ana Paula',
    icon: Syringe,
  },
  {
    date: '10/02/2024',
    type: 'exam',
    title: 'Exame de Sangue',
    description: 'Hemograma completo e bioquímico.',
    doctor: 'Dr. Carlos Santos',
    icon: TestTube,
  },
  {
    date: '01/02/2024',
    type: 'consultation',
    title: 'Dermatite',
    description: 'Paciente apresentou coceira e vermelhidão na região abdominal.',
    doctor: 'Dr. Carlos Santos',
    icon: FileText,
  },
  {
    date: '15/01/2024',
    type: 'medication',
    title: 'Prescrição de Medicamento',
    description: 'Prednisolona 20mg - 1 comprimido por dia durante 5 dias.',
    doctor: 'Dr. Carlos Santos',
    icon: Pill,
  },
  {
    date: '10/01/2024',
    type: 'hospitalization',
    title: 'Internação',
    description: 'Internação para tratamento de gastroenterite.',
    doctor: 'Dra. Ana Paula',
    icon: Hospital,
  },
];

export function PatientHistory({ patientId }: PatientHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Histórico Completo
          </h2>
          <p className="text-sm text-muted-foreground">
            Todos os eventos relacionados ao paciente
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Filtrar por Data
          </Button>
          <Button variant="outline">
            Exportar Histórico
          </Button>
        </div>
      </div>

      <div className="relative pl-6 border-l-2 border-muted space-y-6">
        {historyData.map((event, index) => {
          const Icon = event.icon;
          return (
            <div key={index} className="relative">
              <div className="absolute -left-[29px] p-1 bg-background border-2 border-muted rounded-full">
                <Icon className="h-4 w-4" />
              </div>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.doctor}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-sm">{event.description}</p>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
} 