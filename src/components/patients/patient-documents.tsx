'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Download, FileText, Plus } from 'lucide-react';

interface PatientDocumentsProps {
  patientId: string;
}

// TODO: Implementar busca dos documentos do paciente
const mockDocuments = [
  {
    id: '1',
    name: 'Carteira de Vacinação',
    type: 'PDF',
    uploadedAt: new Date(),
    uploadedBy: 'Dr. João Silva',
    size: '1.2 MB',
  },
  {
    id: '2',
    name: 'Laudo Hemograma',
    type: 'PDF',
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    uploadedBy: 'Dra. Maria Santos',
    size: '856 KB',
  },
];

export function PatientDocuments({ patientId }: PatientDocumentsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Documentos</CardTitle>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Documento
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Adicionado por</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDocuments.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {document.name}
                  </div>
                </TableCell>
                <TableCell>{document.type}</TableCell>
                <TableCell>
                  {format(document.uploadedAt, 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>{document.uploadedBy}</TableCell>
                <TableCell>{document.size}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 