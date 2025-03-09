'use client';

import { useEffect, useState } from 'react';
import { PatientList } from '@/components/patients/patient-list';
import { PatientSearch } from '@/components/patients/patient-search';
import { PatientFilters } from '@/components/patients/patient-filters';
import { NewPatientDialog } from '@/components/patients/new-patient-dialog';
import { getPatients } from '@/services/patients';
import { testSupabaseConnection } from '@/lib/supabase';
import { toast } from 'sonner';
import { Patient } from '@/types/patient';

export default function PatientsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');

  const loadPatients = async () => {
    try {
      // Testa a conexão com o Supabase primeiro
      const isConnected = await testSupabaseConnection();
      
      if (!isConnected) {
        toast.error('Erro de conexão com o banco de dados');
        return;
      }

      const data = await getPatients(search);
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      toast.error('Erro ao carregar pacientes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [search]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
        <NewPatientDialog onSuccess={loadPatients} />
      </div>

      <div className="flex items-center space-x-4">
        <PatientSearch value={search} onChange={setSearch} />
        <PatientFilters />
      </div>

      <PatientList isLoading={isLoading} patients={patients} />
    </div>
  );
} 