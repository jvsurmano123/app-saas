'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Plus } from 'lucide-react';

interface PatientRecordsProps {
  patientId: string;
}

export function PatientRecords({ patientId }: PatientRecordsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Prontuário
          </h2>
          <p className="text-sm text-muted-foreground">
            Registro detalhado das consultas e procedimentos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Entrada
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nova Consulta - 10/03/2024</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Temperatura (°C)</Label>
              <Input type="number" step="0.1" placeholder="38.5" />
            </div>
            <div className="space-y-2">
              <Label>Freq. Cardíaca (bpm)</Label>
              <Input type="number" placeholder="120" />
            </div>
            <div className="space-y-2">
              <Label>Freq. Respiratória</Label>
              <Input type="number" placeholder="20" />
            </div>
            <div className="space-y-2">
              <Label>Peso (kg)</Label>
              <Input type="number" step="0.1" placeholder="33.5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subjetivo (S)</Label>
            <Textarea 
              placeholder="Queixa principal e histórico relatado pelo tutor..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Objetivo (O)</Label>
            <Textarea 
              placeholder="Achados do exame físico..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Avaliação (A)</Label>
            <Textarea 
              placeholder="Impressão diagnóstica..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Plano (P)</Label>
            <Textarea 
              placeholder="Conduta, prescrições e recomendações..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              Cancelar
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Prontuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Exemplo de entrada anterior */}
            <div className="border-l-2 border-muted pl-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">01/02/2024</p>
                  <p className="font-medium">Consulta - Dermatite</p>
                  <p className="text-sm text-muted-foreground">Dr. Carlos Santos</p>
                </div>
                <Button variant="ghost">Ver Detalhes</Button>
              </div>
            </div>

            <div className="border-l-2 border-muted pl-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">15/01/2024</p>
                  <p className="font-medium">Consulta de Rotina</p>
                  <p className="text-sm text-muted-foreground">Dra. Ana Paula</p>
                </div>
                <Button variant="ghost">Ver Detalhes</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 