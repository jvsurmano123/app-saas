import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getPatients } from '@/services/patients';
import { testSupabaseConnection } from '@/lib/supabase';
import { Patient } from '@/types/patient';
import { useQuery } from '@tanstack/react-query';

interface PatientFilters {
  status?: string;
  species?: string;
  breed?: string;
}

export function usePatients() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<PatientFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const {
    data: queryData,
    isLoading,
    refetch: refreshPatients
  } = useQuery({
    queryKey: ['patients', search, filters, currentPage],
    queryFn: async () => {
      const isConnected = await testSupabaseConnection();
      
      if (!isConnected) {
        toast.error('Erro de conexão com o banco de dados');
        return { patients: [], total: 0 };
      }

      try {
        const data = await getPatients({
          search,
          filters,
          page: currentPage,
          limit: ITEMS_PER_PAGE
        });
        
        return data;
      } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
        toast.error('Erro ao carregar pacientes');
        return { patients: [], total: 0 };
      }
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