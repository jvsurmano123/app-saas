import { NewConsultationForm } from "@/components/medical-records/NewConsultationForm";

export default function NewConsultationPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Nova Consulta</h1>
        <p className="text-muted-foreground">
          Registre uma nova consulta para o paciente
        </p>
      </div>

      <NewConsultationForm />
    </div>
  );
} 