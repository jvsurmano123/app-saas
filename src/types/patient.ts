export interface Patient {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'other';
  breed: string;
  gender: 'male' | 'female';
  birthDate: string;
  weight: number;
  status: 'active' | 'inactive';
  microchip?: string;
  allergies?: string;
  observations?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
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