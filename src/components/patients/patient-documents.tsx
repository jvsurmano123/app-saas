'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Download, Printer, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PatientDocumentsProps {
  patientId: string;
}

const documentData = [
  {
    id: 1,
    type: 'prescription',
    title: 'Receita - Prednisolona',
    date: '01/02/2024',
    createdBy: 'Dr. Carlos Santos',
    status: 'active',
    file: '/documents/prescription-01022024.pdf',
  },
  {
    id: 2,
    type: 'certificate',
    title: 'Atestado de Saúde',
    date: '10/03/2024',
    createdBy: 'Dr. Carlos Santos',
    status: 'active',
    file: '/documents/certificate-10032024.pdf',
  },
  {
    id: 3,
    type: 'exam_request',
    title: 'Solicitação de Exames',
    date: '10/03/2024',
    createdBy: 'Dr. Carlos Santos',
    status: 'pending',
    file: '/documents/exam-request-10032024.pdf',
  },
  {
    id: 4,
    type: 'vaccination',
    title: 'Carteira de Vacinação',
    date: '15/02/2024',
    createdBy: 'Sistema',
    status: 'active',
    file: '/documents/vaccination-15022024.pdf',
  },
];

export function PatientDocuments({ patientId }: PatientDocumentsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Documentos
          </h2>
          <p className="text-sm text-muted-foreground">
            Receitas, atestados e outros documentos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gerar Documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prescription">Receita</SelectItem>
              <SelectItem value="certificate">Atestado</SelectItem>
              <SelectItem value="exam_request">Solicitação de Exame</SelectItem>
              <SelectItem value="vaccination">Carteira de Vacinação</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Documento
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentData.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{doc.date}</span>
                      <span>•</span>
                      <span>{doc.createdBy}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {doc.status === 'pending' ? (
                    <Badge variant="secondary">Pendente</Badge>
                  ) : (
                    <Badge variant="default" className="bg-green-600">Ativo</Badge>
                  )}
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Modelos de Documentos</CardTitle>
            <Button variant="outline">
              Gerenciar Modelos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-8 w-8" />
              <p>Receita Padrão</p>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-8 w-8" />
              <p>Atestado de Saúde</p>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-8 w-8" />
              <p>Solicitação de Exame</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 