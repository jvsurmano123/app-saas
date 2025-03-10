'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Patient } from '@/types/patient';
import { mockPatients } from '@/mocks/patients-data';
import { CalendarDays, Clock } from 'lucide-react';

interface PatientHeaderProps {
  patientId: string;
}

export function PatientHeader({ patientId }: PatientHeaderProps) {
  const patient = mockPatients.find(p => p.id === patientId);

  if (!patient) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={patient.photo} alt={patient.name} />
              <AvatarFallback>{patient.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="text-muted-foreground">
                {patient.species === 'dog' ? 'Cachorro' : 'Gato'} • {patient.breed} • {patient.age} anos
              </p>
              
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                  {patient.gender === 'male' ? 'Macho' : 'Fêmea'}
                </Badge>
                {patient.allergies && patient.allergies.length > 0 && (
                  <Badge variant="destructive">Alergias</Badge>
                )}
                {patient.chronicConditions && patient.chronicConditions.length > 0 && (
                  <Badge variant="secondary">Condições Crônicas</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {patient.lastVisit && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Última Visita</p>
                  <p className="font-medium">
                    {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            )}
            
            {patient.nextVisit && (
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Próxima Visita</p>
                  <p className="font-medium">
                    {new Date(patient.nextVisit).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {patient.notes && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">{patient.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 