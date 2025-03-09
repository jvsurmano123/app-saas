'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Mail, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PatientHeaderProps {
  patientId: string;
}

export function PatientHeader({ patientId }: PatientHeaderProps) {
  return (
    <div className="flex items-start justify-between pb-6 border-b">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder-pet.jpg" alt="Rex" />
          <AvatarFallback>RX</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Rex</h1>
            <Badge>Ativo</Badge>
          </div>

          <div className="text-muted-foreground">
            <p>ID: #{patientId}</p>
            <p>Canino • Pastor Alemão • Macho • 3 anos</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <FileText className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Mail className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 