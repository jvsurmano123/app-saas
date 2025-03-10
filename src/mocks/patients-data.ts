import { Patient, Owner, MedicalRecord } from '@/types/patient';

export const mockOwners: Record<string, Owner> = {
  "1": {
    id: "1",
    name: "João Silva",
    phone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    document: "123.456.789-00",
    address: {
      zipCode: "01234-567",
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Jardim América",
      city: "São Paulo"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  "2": {
    id: "2",
    name: "Maria Oliveira",
    phone: "(11) 98765-1234",
    email: "maria.oliveira@email.com",
    document: "987.654.321-00",
    address: {
      zipCode: "04567-890",
      street: "Avenida Principal",
      number: "456",
      neighborhood: "Centro",
      city: "São Paulo"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  "3": {
    id: "3",
    name: "Pedro Santos",
    phone: "(11) 98765-5678",
    email: "pedro.santos@email.com",
    document: "456.789.123-00",
    address: {
      zipCode: "02345-678",
      street: "Rua do Comércio",
      number: "789",
      neighborhood: "Vila Nova",
      city: "São Paulo"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Max",
    species: "dog",
    breed: "Golden Retriever",
    gender: "male",
    status: "waiting",
    photo: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=200&auto=format&fit=crop",
    age: 5,
    allergies: ["Dipirona", "Penicilina"],
    chronicConditions: ["Artrite"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
    nextVisit: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Paciente dócil, mas fica ansioso durante procedimentos",
    imageUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Luna",
    species: "dog",
    breed: "Labrador",
    gender: "female",
    status: "in_consultation",
    photo: "https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?q=80&w=200&auto=format&fit=crop",
    age: 3,
    allergies: ["Amoxicilina"],
    chronicConditions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastVisit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    nextVisit: new Date().toISOString(),
    notes: "Muito ativa e brincalhona",
    imageUrl: "https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Bob",
    species: "dog",
    breed: "Poodle",
    gender: "male",
    status: "waiting",
    photo: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?q=80&w=200&auto=format&fit=crop",
    age: 2,
    allergies: [],
    chronicConditions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastVisit: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Primeira consulta",
    imageUrl: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?q=80&w=200&auto=format&fit=crop"
  }
];

// Relacionamento entre pacientes e proprietários
export const patientOwnerRelations = {
  "1": "1", // Max -> João Silva
  "2": "2", // Luna -> Maria Oliveira
  "3": "3"  // Bob -> Pedro Santos
};

export const mockMedicalRecords: Record<string, MedicalRecord> = {
  "1": {
    id: "1",
    patientId: "1",
    patientName: "Max",
    species: "Cachorro",
    breed: "Golden Retriever",
    age: 5,
    photo: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=200&auto=format&fit=crop",
    allergies: ["Dipirona", "Penicilina"],
    chronicConditions: ["Artrite"],
    consultations: [
      {
        id: "1",
        date: new Date(),
        veterinarian: "Dr. João Silva",
        reason: "Consulta de rotina",
        symptoms: ["Letargia", "Perda de apetite"],
        diagnosis: "Gripe canina",
        notes: "Paciente apresentou melhora após medicação",
        vitalSigns: {
          weight: 32.5,
          temperature: 38.5,
          heartRate: 120,
          respiratoryRate: 30,
          bloodPressure: "120/80"
        },
        prescriptions: [
          {
            id: "1",
            name: "Prednisolona",
            dosage: "20mg",
            frequency: "1x ao dia",
            duration: "7 dias",
            instructions: "Administrar com comida",
            prescribedAt: new Date(),
            prescribedBy: "Dr. João Silva"
          }
        ],
        exams: [
          {
            id: "1",
            name: "Hemograma",
            requestedAt: new Date(),
            requestedBy: "Dr. João Silva",
            status: "completed",
            results: "Resultados normais",
            attachments: []
          }
        ]
      }
    ],
    vaccinations: [
      {
        id: "1",
        name: "V10",
        date: new Date(),
        nextDueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        appliedBy: "Dr. João Silva",
        batch: "123456"
      }
    ],
    currentMedications: [
      {
        id: "1",
        name: "Prednisolona",
        dosage: "20mg",
        frequency: "1x ao dia",
        duration: "7 dias",
        instructions: "Administrar com comida",
        prescribedAt: new Date(),
        prescribedBy: "Dr. João Silva"
      }
    ],
    alerts: ["Alérgico a Dipirona", "Alérgico a Penicilina"]
  },
  "2": {
    id: "2",
    patientId: "2",
    patientName: "Luna",
    species: "Cachorro",
    breed: "Labrador",
    age: 3,
    photo: "https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?q=80&w=200&auto=format&fit=crop",
    allergies: ["Amoxicilina"],
    chronicConditions: [],
    consultations: [],
    vaccinations: [],
    currentMedications: [],
    alerts: ["Alérgico a Amoxicilina"]
  },
  "3": {
    id: "3",
    patientId: "3",
    patientName: "Bob",
    species: "Cachorro",
    breed: "Poodle",
    age: 2,
    photo: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?q=80&w=200&auto=format&fit=crop",
    allergies: [],
    chronicConditions: [],
    consultations: [],
    vaccinations: [],
    currentMedications: [],
    alerts: []
  }
}; 