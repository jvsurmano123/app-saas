'use client';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Patient } from '@/types/patient';
import { useState, useEffect } from 'react';

// Definição dos estados do fluxo de atendimento
const WORKFLOW_STATES = {
  WAITING: 'waiting',
  IN_CONSULTATION: 'in_consultation',
  EXAMS: 'exams',
  SURGERY: 'surgery',
  COMPLETED: 'completed',
} as const;

const WORKFLOW_COLUMNS = [
  {
    id: WORKFLOW_STATES.WAITING,
    title: 'Aguardando',
    icon: Clock,
    color: 'bg-yellow-500',
  },
  {
    id: WORKFLOW_STATES.IN_CONSULTATION,
    title: 'Em Consulta',
    icon: AlertCircle,
    color: 'bg-blue-500',
  },
  {
    id: WORKFLOW_STATES.EXAMS,
    title: 'Exames',
    icon: AlertCircle,
    color: 'bg-purple-500',
  },
  {
    id: WORKFLOW_STATES.SURGERY,
    title: 'Cirurgia',
    icon: AlertCircle,
    color: 'bg-red-500',
  },
  {
    id: WORKFLOW_STATES.COMPLETED,
    title: 'Concluído',
    icon: CheckCircle2,
    color: 'bg-green-500',
  },
];

interface PatientKanbanProps {
  patients: Patient[];
  onPatientMove: (patientId: string, newStatus: string) => void;
}

interface PatientCardProps {
  patient: Patient;
  index: number;
}

function PatientCard({ patient, index }: PatientCardProps) {
  return (
    <Draggable draggableId={patient.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${patient.name}`} />
                    <AvatarFallback>{patient.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold">{patient.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {patient.species === 'dog' ? 'Cachorro' : 'Gato'} • {patient.breed}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Histórico</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {patient.gender === 'male' ? 'Macho' : 'Fêmea'}
                </Badge>
                {patient.allergies && (
                  <Badge variant="destructive" className="text-xs">
                    Alergias
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export function PatientKanban({ patients, onPatientMove }: PatientKanbanProps) {
  const [columns, setColumns] = useState<Record<string, typeof WORKFLOW_COLUMNS[0] & { patients: Patient[] }>>({});

  // Atualiza as colunas quando os pacientes mudarem
  useEffect(() => {
    const cols = WORKFLOW_COLUMNS.reduce((acc, column) => {
      acc[column.id] = {
        ...column,
        patients: patients.filter((p) => p.status === column.id),
      };
      return acc;
    }, {} as Record<string, typeof WORKFLOW_COLUMNS[0] & { patients: Patient[] }>);
    setColumns(cols);
  }, [patients]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Reordenar na mesma coluna
      const column = columns[source.droppableId];
      const newPatients = Array.from(column.patients);
      const [removed] = newPatients.splice(source.index, 1);
      newPatients.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          patients: newPatients,
        },
      });
    } else {
      // Mover para outra coluna
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourcePatients = Array.from(sourceColumn.patients);
      const destPatients = Array.from(destColumn.patients);
      const [removed] = sourcePatients.splice(source.index, 1);
      destPatients.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          patients: sourcePatients,
        },
        [destination.droppableId]: {
          ...destColumn,
          patients: destPatients,
        },
      });

      onPatientMove(removed.id, destination.droppableId);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {WORKFLOW_COLUMNS.map((column) => (
          <div key={column.id} className="flex flex-col">
            <div className="mb-3 flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${column.color}`} />
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant="secondary" className="ml-auto">
                {columns[column.id]?.patients.length || 0}
              </Badge>
            </div>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 bg-muted/20 rounded-lg p-3 min-h-[500px]"
                >
                  {columns[column.id]?.patients.map((patient, index) => (
                    <PatientCard
                      key={patient.id}
                      patient={patient}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
} 