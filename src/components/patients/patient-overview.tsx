'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, Heart, Scale } from "lucide-react";

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

// TODO: Implementar busca dos dados do paciente
const mockData = {
  lastVisit: "10/03/2024",
  weight: "32.5 kg",
  heartRate: "120 bpm",
  temperature: "38.5°C",
  nextAppointment: "25/03/2024",
  allergies: ["Dipirona", "Penicilina"],
  chronicConditions: ["Artrite"],
  currentMedications: [
    {
      name: "Prednisolona",
      dosage: "20mg",
      frequency: "1x ao dia",
    }
  ]
};

export function PatientOverview({ patientId }: PatientOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Última Consulta</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.lastVisit}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Peso Atual</CardTitle>
          <Scale className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.weight}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Freq. Cardíaca</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.heartRate}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.temperature}</div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Alergias</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            {mockData.allergies.map((allergy) => (
              <li key={allergy} className="text-red-600">{allergy}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Condições Crônicas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            {mockData.chronicConditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Medicamentos em Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            {mockData.currentMedications.map((medication) => (
              <li key={medication.name}>
                {medication.name} - {medication.dosage} ({medication.frequency})
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 