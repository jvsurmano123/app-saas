'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MedicalRecord } from "@/types/medical-record";

interface PatientHeaderProps {
  record: MedicalRecord;
}

export function PatientHeader({ record }: PatientHeaderProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={record.photo} alt={record.patientName} />
          <AvatarFallback>{record.patientName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-2xl font-bold">{record.patientName}</h2>
            <p className="text-muted-foreground">
              ID: {record.id} | Idade: {record.age} anos
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">{record.species}</Badge>
            <Badge variant="outline">{record.breed}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {record.allergies.length > 0 && (
            <div>
              <h3 className="font-semibold text-red-600">Alergias:</h3>
              <div className="flex gap-1 flex-wrap mt-1">
                {record.allergies.map((allergy) => (
                  <Badge key={allergy} variant="destructive">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {record.chronicConditions.length > 0 && (
            <div>
              <h3 className="font-semibold text-yellow-600">Condições Crônicas:</h3>
              <div className="flex gap-1 flex-wrap mt-1">
                {record.chronicConditions.map((condition) => (
                  <Badge key={condition} variant="warning">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 