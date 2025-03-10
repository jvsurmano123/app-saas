'use client';

import { NewConsultationForm } from "@/components/medical-records/NewConsultationForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewConsultationPageProps {
  params: {
    id: string;
  };
}

export default function NewConsultationPage({ params }: NewConsultationPageProps) {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      // TODO: Implementar a chamada à API
      console.log("Dados da consulta:", data);
      
      // Simula um delay de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Consulta registrada com sucesso!");
      router.push(`/dashboard/medical-records/${params.id}`);
    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
      toast.error("Erro ao registrar consulta. Tente novamente.");
    }
  };

  return (
    <div className="container py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Nova Consulta</h1>
        <p className="text-muted-foreground">
          Registre uma nova consulta para o paciente
        </p>
      </div>

      <NewConsultationForm patientId={params.id} onSubmit={handleSubmit} />
    </div>
  );
} 