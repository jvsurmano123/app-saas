'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

interface PatientOwnerProps {
  patientId: string;
}

export function PatientOwner({ patientId }: PatientOwnerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Tutor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder-owner.jpg" alt="João Silva" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">João Silva</p>
            <p className="text-sm text-muted-foreground">Tutor Principal</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>(11) 98765-4321</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>joao.silva@email.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>Rua das Flores, 123 - São Paulo, SP</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Outros Pets</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-pet-2.jpg" alt="Luna" />
              <AvatarFallback>LN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Luna</p>
              <p className="text-xs text-muted-foreground">Felino • 2 anos</p>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          Ver Cadastro Completo
        </Button>
      </CardContent>
    </Card>
  );
} 