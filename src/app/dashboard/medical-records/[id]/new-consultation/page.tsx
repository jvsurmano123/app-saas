import { NewConsultationPageClient } from "@/components/medical-records/NewConsultationPageClient";
import { use } from "react";

interface NewConsultationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function NewConsultationPage({ params }: NewConsultationPageProps) {
  const resolvedParams = use(params);
  return <NewConsultationPageClient patientId={resolvedParams.id} />;
} 