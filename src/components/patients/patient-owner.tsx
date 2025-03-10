'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOwners, patientOwnerRelations } from "@/mocks/patients-data";
import { Mail, MapPin, Phone, User } from "lucide-react";

interface PatientOwnerProps {
  patientId: string;
}

export function PatientOwner({ patientId }: PatientOwnerProps) {
  const ownerId = patientOwnerRelations[patientId];
  const owner = ownerId ? mockOwners[ownerId] : null;

  if (!owner) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Proprietário</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">{owner.name}</p>
            <p className="text-sm text-muted-foreground">CPF: {owner.document}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">{owner.phone}</p>
            <p className="text-sm text-muted-foreground">Telefone principal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">{owner.email}</p>
            <p className="text-sm text-muted-foreground">E-mail principal</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">
              {owner.address.street}, {owner.address.number}
              {owner.address.complement && ` - ${owner.address.complement}`}
            </p>
            <p className="text-sm text-muted-foreground">
              {owner.address.neighborhood} - {owner.address.city}
            </p>
            <p className="text-sm text-muted-foreground">
              CEP: {owner.address.zipCode}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 