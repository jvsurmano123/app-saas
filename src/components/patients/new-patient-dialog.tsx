'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { createPatient } from '@/services/patients';
import { NewPatientData } from '@/types/patient';
import { toast } from 'sonner';

interface NewPatientDialogProps {
  onSuccess?: () => void;
}

export function NewPatientDialog({ onSuccess }: NewPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<NewPatientData>({
    name: '',
    species: 'dog',
    breed: '',
    gender: 'male',
    birthDate: '',
    weight: 0,
    owner: {
      name: '',
      phone: '',
      email: '',
      document: '',
      address: {
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createPatient(formData);
      toast.success('Paciente cadastrado com sucesso!');
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao cadastrar paciente. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    const [parent, child] = field.split('.');
    if (child) {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof NewPatientData],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      owner: {
        ...prev.owner,
        address: {
          ...prev.owner.address,
          [field]: value,
        },
      },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
            <DialogDescription>
              Preencha as informações do paciente e do tutor.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Pet</Label>
                <Input
                  id="name"
                  placeholder="Nome do pet"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="species">Espécie</Label>
                <Select
                  value={formData.species}
                  onValueChange={(value) => handleChange('species', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Canino</SelectItem>
                    <SelectItem value="cat">Felino</SelectItem>
                    <SelectItem value="bird">Ave</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="breed">Raça</Label>
                <Input
                  id="breed"
                  placeholder="Raça"
                  value={formData.breed}
                  onChange={(e) => handleChange('breed', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Sexo</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleChange('gender', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Macho</SelectItem>
                    <SelectItem value="female">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.weight || ''}
                  onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-4">Informações do Tutor</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Nome do Tutor</Label>
                  <Input
                    id="ownerName"
                    placeholder="Nome completo"
                    value={formData.owner.name}
                    onChange={(e) => handleChange('owner.name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">Telefone</Label>
                  <Input
                    id="ownerPhone"
                    placeholder="(00) 00000-0000"
                    value={formData.owner.phone}
                    onChange={(e) => handleChange('owner.phone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">E-mail</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.owner.email}
                    onChange={(e) => handleChange('owner.email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerDocument">CPF</Label>
                  <Input
                    id="ownerDocument"
                    placeholder="000.000.000-00"
                    value={formData.owner.document}
                    onChange={(e) => handleChange('owner.document', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-4">Endereço</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    placeholder="00000-000"
                    value={formData.owner.address.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    placeholder="Nome da rua"
                    value={formData.owner.address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    placeholder="123"
                    value={formData.owner.address.number}
                    onChange={(e) => handleAddressChange('number', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    placeholder="Apto 123"
                    value={formData.owner.address.complement}
                    onChange={(e) => handleAddressChange('complement', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    placeholder="Nome do bairro"
                    value={formData.owner.address.neighborhood}
                    onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    placeholder="Nome da cidade"
                    value={formData.owner.address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 