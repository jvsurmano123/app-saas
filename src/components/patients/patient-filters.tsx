'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PatientFilters {
  status?: string;
  species?: string;
  breed?: string;
}

interface PatientFiltersProps {
  filters: PatientFilters;
  onFiltersChange: (filters: PatientFilters) => void;
}

const STATUS_OPTIONS = [
  { value: 'waiting', label: 'Aguardando' },
  { value: 'in_consultation', label: 'Em Consulta' },
  { value: 'exams', label: 'Exames' },
  { value: 'surgery', label: 'Cirurgia' },
  { value: 'completed', label: 'Concluído' },
  { value: 'inactive', label: 'Inativo' },
];

const SPECIES_OPTIONS = [
  { value: 'dog', label: 'Cachorro' },
  { value: 'cat', label: 'Gato' },
  { value: 'bird', label: 'Pássaro' },
  { value: 'other', label: 'Outro' },
];

const BREED_OPTIONS = [
  // Cães
  { value: 'labrador', label: 'Labrador' },
  { value: 'golden retriever', label: 'Golden Retriever' },
  { value: 'bulldog francês', label: 'Bulldog Francês' },
  { value: 'poodle', label: 'Poodle' },
  { value: 'shih tzu', label: 'Shih Tzu' },
  { value: 'rottweiler', label: 'Rottweiler' },
  { value: 'yorkshire', label: 'Yorkshire' },
  { value: 'pastor alemão', label: 'Pastor Alemão' },
  { value: 'cocker spaniel', label: 'Cocker Spaniel' },
  // Gatos
  { value: 'siamês', label: 'Siamês' },
  { value: 'persa', label: 'Persa' },
  { value: 'maine coon', label: 'Maine Coon' },
  { value: 'ragdoll', label: 'Ragdoll' },
  { value: 'sphynx', label: 'Sphynx' },
  { value: 'angorá', label: 'Angorá' },
];

export function PatientFilters({ filters, onFiltersChange }: PatientFiltersProps) {
  const handleFilterChange = (key: keyof PatientFilters, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] p-4">
        <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Espécie</Label>
            <Select
              value={filters.species}
              onValueChange={(value) => handleFilterChange('species', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma espécie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas</SelectItem>
                {SPECIES_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Raça</Label>
            <Select
              value={filters.breed}
              onValueChange={(value) => handleFilterChange('breed', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma raça" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas</SelectItem>
                {BREED_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={clearFilters}
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 