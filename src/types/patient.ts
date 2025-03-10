export type PatientStatus = 'aguardando' | 'em_tratamento' | 'alta' | 'cancelado';

export interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  status: PatientStatus;
  createdAt: string;
  updatedAt: string;
  lastVisit?: string;
  nextVisit?: string;
  notes?: string;
  imageUrl?: string;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NewPatientData {
  name: string;
  species: Patient['species'];
  breed: string;
  gender: Patient['gender'];
  birthDate: string;
  weight: number;
  owner: {
    name: string;
    phone: string;
    email: string;
    document: string;
    address: Owner['address'];
  };
} 