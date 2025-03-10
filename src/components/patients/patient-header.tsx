'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface PatientHeaderProps {
  patientId: string;
}

// TODO: Implementar busca dos dados do paciente
const mockPatient = {
  name: "Max",
  species: "Cachorro",
  breed: "Golden Retriever",
  age: 5,
  photo: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=200&auto=format&fit=crop",
};

export function PatientHeader({ patientId }: PatientHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mockPatient.photo} alt={mockPatient.name} />
              <AvatarFallback>{mockPatient.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{mockPatient.name}</h1>
              <p className="text-muted-foreground">
                {mockPatient.species} • {mockPatient.breed} • {mockPatient.age} anos
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/dashboard/medical-records/${patientId}/new-consultation`}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 