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
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
];

const SPECIES_OPTIONS = [
  { value: 'dog', label: 'Cachorro' },
  { value: 'cat', label: 'Gato' },
  { value: 'bird', label: 'Pássaro' },
  { value: 'other', label: 'Outro' },
];

const BREED_OPTIONS = {
  dog: [
    { value: 'golden', label: 'Golden Retriever' },
    { value: 'labrador', label: 'Labrador' },
    { value: 'poodle', label: 'Poodle' },
    { value: 'other', label: 'Outro' },
  ],
  cat: [
    { value: 'persian', label: 'Persa' },
    { value: 'siamese', label: 'Siamês' },
    { value: 'maine_coon', label: 'Maine Coon' },
    { value: 'other', label: 'Outro' },
  ],
};

export function PatientFilters({ filters, onFiltersChange }: PatientFiltersProps) {
  const handleFilterChange = (key: keyof PatientFilters, value: string | undefined) => {
    const newFilters = { ...filters };
    
    if (value === undefined) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }

    // Se mudar a espécie, limpa a raça
    if (key === 'species') {
      delete newFilters.breed;
    }

    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="ml-2 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
              {activeFiltersCount}
            </span>
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

          {filters.species && BREED_OPTIONS[filters.species as keyof typeof BREED_OPTIONS] && (
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
                  {BREED_OPTIONS[filters.species as keyof typeof BREED_OPTIONS].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
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