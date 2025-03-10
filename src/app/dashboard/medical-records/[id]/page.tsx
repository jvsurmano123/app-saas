import { ConsultationTimeline } from "@/components/medical-records/ConsultationTimeline";
import { CurrentMedications } from "@/components/medical-records/CurrentMedications";
import { PatientHeader } from "@/components/medical-records/PatientHeader";
import { VaccinationHistory } from "@/components/medical-records/VaccinationHistory";
import { VitalSigns } from "@/components/medical-records/VitalSigns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { mockMedicalRecords } from "@/mocks/patients-data";
import { notFound } from "next/navigation";

interface MedicalRecordPageProps {
  params: {
    id: string;
  };
}

export default function MedicalRecordPage({ params }: MedicalRecordPageProps) {
  const record = mockMedicalRecords[params.id];

  if (!record) {
    notFound();
  }

  const latestConsultation = record.consultations[0];
  const vitalSigns = latestConsultation?.vitalSigns;

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Prontuário</h1>
        <Button asChild>
          <Link href={`/dashboard/medical-records/${params.id}/new-consultation`}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Consulta
          </Link>
        </Button>
      </div>

      <PatientHeader record={record} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vitalSigns && <VitalSigns vitalSigns={vitalSigns} />}
        <CurrentMedications medications={record.currentMedications} />
      </div>

      <ConsultationTimeline consultations={record.consultations} />
      
      <VaccinationHistory vaccinations={record.vaccinations} />
    </div>
  );
} 