'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PatientVaccinesProps {
  patientId: string;
}

const vaccineData = [
  {
    name: 'V10',
    status: 'pending',
    lastDose: '10/09/2023',
    nextDose: '10/03/2024',
    doses: [
      { date: '10/03/2023', lot: 'ABC123', vet: 'Dr. Carlos Santos' },
      { date: '10/06/2023', lot: 'DEF456', vet: 'Dra. Ana Paula' },
      { date: '10/09/2023', lot: 'GHI789', vet: 'Dr. Carlos Santos' },
    ],
  },
  {
    name: 'Antirrábica',
    status: 'up-to-date',
    lastDose: '15/02/2024',
    nextDose: '15/02/2025',
    doses: [
      { date: '15/02/2024', lot: 'XYZ789', vet: 'Dra. Ana Paula' },
    ],
  },
  {
    name: 'Gripe Canina',
    status: 'up-to-date',
    lastDose: '01/12/2023',
    nextDose: '01/12/2024',
    doses: [
      { date: '01/12/2023', lot: 'JKL123', vet: 'Dr. Carlos Santos' },
    ],
  },
];

export function PatientVaccines({ patientId }: PatientVaccinesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Carteira de Vacinação
          </h2>
          <p className="text-sm text-muted-foreground">
            Histórico e programação de vacinas
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Vacina
        </Button>
      </div>

      <div className="grid gap-6">
        {vaccineData.map((vaccine, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle>{vaccine.name}</CardTitle>
                  {vaccine.status === 'pending' ? (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Pendente
                    </Badge>
                  ) : (
                    <Badge variant="default" className="flex items-center gap-1 bg-green-600">
                      <CheckCircle2 className="h-3 w-3" />
                      Em Dia
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Próxima dose: {vaccine.nextDose}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-sm">Data</th>
                        <th className="text-left p-3 text-sm">Lote</th>
                        <th className="text-left p-3 text-sm">Veterinário</th>
                        <th className="text-right p-3 text-sm">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vaccine.doses.map((dose, doseIndex) => (
                        <tr key={doseIndex} className="border-b last:border-0">
                          <td className="p-3 text-sm">{dose.date}</td>
                          <td className="p-3 text-sm">{dose.lot}</td>
                          <td className="p-3 text-sm">{dose.vet}</td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="sm">
                              Ver Detalhes
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 