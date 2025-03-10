export type VitalSigns = {
  weight: number;
  temperature: number;
  heartRate: number;
  respiratoryRate: number;
  bloodPressure: string;
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedAt: Date;
  prescribedBy: string;
};

export type Exam = {
  id: string;
  name: string;
  requestedAt: Date;
  requestedBy: string;
  status: 'pending' | 'completed';
  results?: string;
  attachments?: string[];
};

export type Vaccination = {
  id: string;
  name: string;
  date: Date;
  nextDueDate: Date;
  appliedBy: string;
  batch: string;
};

export type Consultation = {
  id: string;
  date: Date;
  veterinarian: string;
  reason: string;
  symptoms: string[];
  diagnosis: string;
  notes: string;
  vitalSigns: VitalSigns;
  prescriptions: Medication[];
  exams: Exam[];
};

export type MedicalRecord = {
  id: string;
  patientId: string;
  patientName: string;
  species: string;
  breed: string;
  age: number;
  photo?: string;
  allergies: string[];
  chronicConditions: string[];
  consultations: Consultation[];
  vaccinations: Vaccination[];
  currentMedications: Medication[];
  alerts: string[];
}; 