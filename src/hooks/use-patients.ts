import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getPatients } from '@/services/patients';
import { testSupabaseConnection } from '@/lib/supabase';
import { Patient } from '@/types/patient';
import { useQuery } from '@tanstack/react-query';
import { mockPatients } from '@/lib/seed-data';

interface PatientFilters {
  status?: string;
  species?: string;
  breed?: string;
}

interface UsePatientProps {
  view?: 'list' | 'kanban';
}

export function usePatients({ view = 'list' }: UsePatientProps = {}) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<PatientFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const {
    data: queryData,
    isLoading,
    refetch: refreshPatients
  } = useQuery({
    queryKey: ['patients', search, filters, currentPage, view],
    queryFn: async () => {
      // Usando dados mockados
      let filteredPatients = [...mockPatients];

      // Aplicar busca
      if (search) {
        const searchLower = search.toLowerCase();
        filteredPatients = filteredPatients.filter(
          patient =>
            patient.name.toLowerCase().includes(searchLower) ||
            patient.owner_name?.toLowerCase().includes(searchLower)
        );
      }

      // Aplicar filtros
      if (filters.status) {
        filteredPatients = filteredPatients.filter(
          patient => patient.status === filters.status
        );
      }
      if (filters.species) {
        filteredPatients = filteredPatients.filter(
          patient => patient.species === filters.species
        );
      }
      if (filters.breed) {
        filteredPatients = filteredPatients.filter(
          patient => patient.breed.toLowerCase() === filters.breed?.toLowerCase()
        );
      }

      // Ordenar por data de criação (mais recentes primeiro)
      filteredPatients.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const total = filteredPatients.length;

      // Se for visualização Kanban, retorna todos os pacientes
      if (view === 'kanban') {
        return {
          patients: filteredPatients,
          total
        };
      }

      // Se for lista, aplica paginação
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const paginatedPatients = filteredPatients.slice(start, end);

      return {
        patients: paginatedPatients,
        total
      };
    },
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    keepPreviousData: true
  });

  const patients = queryData?.patients ?? [];
  const totalItems = queryData?.total ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1); // Reset para primeira página ao pesquisar
  }, []);

  const handleFiltersChange = useCallback((newFilters: PatientFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset para primeira página ao filtrar
  }, []);

  return {
    patients,
    isLoading,
    search,
    setSearch: handleSearch,
    filters,
    setFilters: handleFiltersChange,
    currentPage,
    setCurrentPage,
    totalPages,
    refreshPatients
  };
} 