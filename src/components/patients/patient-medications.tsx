'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PatientMedicationsProps {
  patientId: string;
}

const medicationData = [
  {
    name: 'Prednisolona 20mg',
    status: 'active',
    startDate: '01/02/2024',
    endDate: '15/02/2024',
    dosage: '1 comprimido',
    frequency: '1x ao dia',
    duration: '15 dias',
    prescribedBy: 'Dr. Carlos Santos',
    observations: 'Administrar pela manhã com alimento.',
    type: 'oral',
  },
  {
    name: 'Apoquel 5.4mg',
    status: 'active',
    startDate: '01/02/2024',
    endDate: 'Contínuo',
    dosage: '1 comprimido',
    frequency: '2x ao dia',
    duration: 'Uso contínuo',
    prescribedBy: 'Dr. Carlos Santos',
    observations: 'Reavaliar em 30 dias.',
    type: 'oral',
  },
  {
    name: 'Dipirona Gotas',
    status: 'finished',
    startDate: '15/01/2024',
    endDate: '20/01/2024',
    dosage: '10 gotas',
    frequency: '8/8 horas',
    duration: '5 dias',
    prescribedBy: 'Dra. Ana Paula',
    observations: 'Administrar em caso de febre.',
    type: 'oral',
  },
];

export function PatientMedications({ patientId }: PatientMedicationsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Medicações
          </h2>
          <p className="text-sm text-muted-foreground">
            Histórico e controle de medicações
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Medicação
        </Button>
      </div>

      <div className="grid gap-6">
        {medicationData.map((medication, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <CardTitle>{medication.name}</CardTitle>
                    {medication.status === 'active' ? (
                      <Badge variant="default" className="bg-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Em Uso
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Finalizado
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prescrito por {medication.prescribedBy} em {medication.startDate}
                  </p>
                </div>
                {medication.status === 'active' && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Registrar Reação
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium">Dosagem</p>
                  <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Frequência</p>
                  <p className="text-sm text-muted-foreground">{medication.frequency}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duração</p>
                  <p className="text-sm text-muted-foreground">{medication.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Término</p>
                  <p className="text-sm text-muted-foreground">{medication.endDate}</p>
                </div>
              </div>

              {medication.observations && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Observações</p>
                  <p className="text-sm text-muted-foreground">{medication.observations}</p>
                </div>
              )}

              {medication.status === 'active' && (
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Histórico de Administração
                  </Button>
                  <Button variant="outline" size="sm">
                    Imprimir Receita
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 