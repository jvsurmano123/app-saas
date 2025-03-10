'use client';

import { useEffect, Suspense, useState } from 'react';
import { PatientList } from '@/components/patients/patient-list';
import { PatientSearch } from '@/components/patients/patient-search';
import { PatientFilters } from '@/components/patients/patient-filters';
import { PatientKanban } from '@/components/patients/patient-kanban';
import { NewPatientDialog } from '@/components/patients/new-patient-dialog';
import { usePatients } from '@/hooks/use-patients';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function PatientsContent() {
  const {
    patients,
    isLoading,
    search,
    setSearch,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    refreshPatients,
  } = usePatients();

  const [view, setView] = useState<'list' | 'kanban'>('kanban');

  useEffect(() => {
    refreshPatients();
  }, [search, filters, currentPage]);

  const handlePatientMove = async (patientId: string, newStatus: string) => {
    // TODO: Implementar atualização do status do paciente no banco de dados
    console.log(`Movendo paciente ${patientId} para ${newStatus}`);
    await refreshPatients();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os pacientes da clínica
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="border rounded-md p-1">
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'kanban' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setView('kanban')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
            <NewPatientDialog>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Paciente
              </Button>
            </NewPatientDialog>
          </div>
        </div>

        <Separator />

        <Card className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <PatientSearch 
              value={search} 
              onChange={setSearch} 
              className="md:max-w-xs" 
            />
            <PatientFilters 
              filters={filters} 
              onFiltersChange={setFilters} 
            />
          </div>
        </Card>

        {view === 'list' ? (
          <PatientList 
            isLoading={isLoading} 
            patients={patients}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : (
          <PatientKanban 
            patients={patients}
            onPatientMove={handlePatientMove}
          />
        )}
      </div>
    </div>
  );
}

export default function PatientsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PatientsContent />
    </Suspense>
  );
} 