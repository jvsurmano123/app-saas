'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";

interface PatientOwnerProps {
  patientId: string;
}

// TODO: Implementar busca dos dados do tutor
const mockOwner = {
  name: "João Silva",
  email: "joao.silva@email.com",
  phone: "(11) 99999-9999",
  address: "Rua das Flores, 123 - São Paulo, SP",
};

export function PatientOwner({ patientId }: PatientOwnerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{mockOwner.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <Button variant="link" className="p-0 h-auto" asChild>
            <a href={`mailto:${mockOwner.email}`}>{mockOwner.email}</a>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <Button variant="link" className="p-0 h-auto" asChild>
            <a href={`tel:${mockOwner.phone}`}>{mockOwner.phone}</a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {mockOwner.address}
        </p>
      </CardContent>
    </Card>
  );
} 