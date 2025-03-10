export type PatientStatus = 'aguardando' | 'em_tratamento' | 'alta' | 'cancelado';

export interface Patient {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breed: string;
  gender: 'male' | 'female';
  status: 'waiting' | 'in_consultation' | 'exams' | 'surgery' | 'completed';
  photo: string;
  age: number;
  allergies: string[];
  chronicConditions: string[];
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

export interface VitalSigns {
  weight: number;
  temperature: number;
  heartRate: number;
  respiratoryRate: number;
  bloodPressure: string;
}

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedAt: Date;
  prescribedBy: string;
}

export interface Exam {
  id: string;
  name: string;
  requestedAt: Date;
  requestedBy: string;
  status: 'pending' | 'in_progress' | 'completed';
  results?: string;
  attachments: string[];
}

export interface Consultation {
  id: string;
  date: Date;
  veterinarian: string;
  reason: string;
  symptoms: string[];
  diagnosis: string;
  notes: string;
  vitalSigns: VitalSigns;
  prescriptions: Prescription[];
  exams: Exam[];
}

export interface Vaccination {
  id: string;
  name: string;
  date: Date;
  nextDueDate: Date;
  appliedBy: string;
  batch: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  species: string;
  breed: string;
  age: number;
  photo: string;
  allergies: string[];
  chronicConditions: string[];
  consultations: Consultation[];
  vaccinations: Vaccination[];
  currentMedications: Prescription[];
  alerts: string[];
} 