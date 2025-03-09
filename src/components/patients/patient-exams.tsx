'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Download, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PatientExamsProps {
  patientId: string;
}

const examData = [
  {
    date: '10/02/2024',
    type: 'Hemograma Completo',
    status: 'completed',
    requestedBy: 'Dr. Carlos Santos',
    laboratory: 'Lab Vet Plus',
    results: {
      file: '/exams/hemograma-10-02-2024.pdf',
      preview: '/exams/hemograma-10-02-2024.jpg',
    },
    observations: 'Todos os parâmetros dentro da normalidade.',
  },
  {
    date: '10/02/2024',
    type: 'Bioquímico',
    status: 'completed',
    requestedBy: 'Dr. Carlos Santos',
    laboratory: 'Lab Vet Plus',
    results: {
      file: '/exams/bioquimico-10-02-2024.pdf',
      preview: '/exams/bioquimico-10-02-2024.jpg',
    },
    observations: 'Leve alteração nas enzimas hepáticas.',
  },
  {
    date: '15/03/2024',
    type: 'Ultrassonografia Abdominal',
    status: 'scheduled',
    requestedBy: 'Dra. Ana Paula',
    laboratory: 'Centro de Imagem Vet',
    results: null,
    observations: 'Agendado para avaliação de rotina.',
  },
];

export function PatientExams({ patientId }: PatientExamsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Exames
          </h2>
          <p className="text-sm text-muted-foreground">
            Histórico e resultados de exames
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Solicitar Exame
        </Button>
      </div>

      <div className="grid gap-6">
        {examData.map((exam, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <CardTitle>{exam.type}</CardTitle>
                    {exam.status === 'completed' ? (
                      <Badge variant="default" className="bg-green-600">
                        Concluído
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Agendado
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Solicitado por {exam.requestedBy} • {exam.laboratory}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {exam.date}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exam.observations && (
                  <div>
                    <p className="text-sm font-medium">Observações</p>
                    <p className="text-sm text-muted-foreground">{exam.observations}</p>
                  </div>
                )}

                {exam.results && (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 border rounded-lg p-4">
                      <img
                        src={exam.results.preview}
                        alt={`Preview do exame ${exam.type}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Ver Laudo
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Abrir Original
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 