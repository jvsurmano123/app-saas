'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PatientOverviewProps {
  patientId: string;
}

const weightData = [
  { date: '01/01/2024', weight: 32.5 },
  { date: '01/02/2024', weight: 33.0 },
  { date: '01/03/2024', weight: 32.8 },
  { date: '01/04/2024', weight: 33.2 },
  { date: '01/05/2024', weight: 33.5 },
];

export function PatientOverview({ patientId }: PatientOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            Vacina V10 pendente - Última dose em 10/09/2023
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                <p className="font-medium">10/03/2021</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Idade</p>
                <p className="font-medium">3 anos</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sexo</p>
                <p className="font-medium">Macho</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Castrado</p>
                <p className="font-medium">Sim</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Peso Atual</p>
                <p className="font-medium">33.5 kg</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Microchip</p>
                <p className="font-medium">#987654321</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Alergias</p>
              <p className="font-medium">Dipirona</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Observações</p>
              <p className="font-medium">Paciente com histórico de ansiedade de separação</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Peso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Consultas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-2 border-muted pl-4 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">10/03/2024</p>
                <p className="font-medium">Consulta de Rotina</p>
                <p className="text-sm">Dr. Carlos Santos</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">15/02/2024</p>
                <p className="font-medium">Vacinação</p>
                <p className="text-sm">Dra. Ana Paula</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">01/02/2024</p>
                <p className="font-medium">Dermatite</p>
                <p className="text-sm">Dr. Carlos Santos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 