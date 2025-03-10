import { ConsultationTimeline } from "@/components/medical-records/ConsultationTimeline";
import { CurrentMedications } from "@/components/medical-records/CurrentMedications";
import { PatientHeader } from "@/components/medical-records/PatientHeader";
import { VaccinationHistory } from "@/components/medical-records/VaccinationHistory";
import { VitalSigns } from "@/components/medical-records/VitalSigns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

// TODO: Implementar a busca do prontuário do banco de dados
const mockMedicalRecord = {
  id: "1",
  patientId: "123",
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
};

interface MedicalRecordPageProps {
  params: {
    id: string;
  };
}

export default function MedicalRecordPage({ params }: MedicalRecordPageProps) {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Prontuário</h1>
        <Button asChild>
          <Link href={`/medical-records/${params.id}/new-consultation`}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Consulta
          </Link>
        </Button>
      </div>

      <PatientHeader record={mockMedicalRecord} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VitalSigns vitalSigns={mockMedicalRecord.consultations[0].vitalSigns} />
        <CurrentMedications medications={mockMedicalRecord.currentMedications} />
      </div>

      <ConsultationTimeline consultations={mockMedicalRecord.consultations} />
      
      <VaccinationHistory vaccinations={mockMedicalRecord.vaccinations} />
    </div>
  );
} 