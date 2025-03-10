import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus } from "lucide-react";
import Link from "next/link";

// TODO: Implementar a busca dos prontuários do banco de dados
const mockRecords = [
  {
    id: "1",
    patientName: "Max",
    species: "Cachorro",
    breed: "Golden Retriever",
    age: 5,
    lastVisit: new Date(),
    status: "Saudável",
  },
  {
    id: "2",
    patientName: "Luna",
    species: "Gato",
    breed: "Siamês",
    age: 3,
    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: "Em tratamento",
  },
];

export default function MedicalRecordsPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Prontuários</h1>
        <Button asChild>
          <Link href="/patients/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Paciente
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Espécie</TableHead>
              <TableHead>Raça</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Última Visita</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {record.patientName}
                </TableCell>
                <TableCell>{record.species}</TableCell>
                <TableCell>{record.breed}</TableCell>
                <TableCell>{record.age} anos</TableCell>
                <TableCell>
                  {format(record.lastVisit, "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/medical-records/${record.id}`}>
                      Ver Prontuário
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 