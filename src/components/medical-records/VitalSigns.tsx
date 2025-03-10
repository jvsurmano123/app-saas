'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VitalSigns as VitalSignsType } from "@/types/medical-record";
import { Activity, Scale, Thermometer } from "lucide-react";

interface VitalSignsProps {
  vitalSigns: VitalSignsType;
}

export function VitalSigns({ vitalSigns }: VitalSignsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sinais Vitais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peso</p>
              <p className="font-medium">{vitalSigns.weight} kg</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Thermometer className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temperatura</p>
              <p className="font-medium">{vitalSigns.temperature}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Freq. Cardíaca</p>
              <p className="font-medium">{vitalSigns.heartRate} bpm</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Freq. Respiratória</p>
              <p className="font-medium">{vitalSigns.respiratoryRate} rpm</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 